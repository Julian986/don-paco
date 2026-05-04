"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { getProductGroupDefinition } from "@/lib/product-groups";
import { resolveProductGroupSlug } from "@/lib/product-group-slug";
import { slugifyLabel } from "@/lib/slugify-label";
import { productGroupCreateSchema, productGroupUpdateSchema } from "@/lib/validations/product-group";
import { getProducts } from "@/lib/products-build";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("UNAUTHORIZED");
  if (!process.env.DATABASE_URL?.trim()) throw new Error("DATABASE_URL no configurada");
}

function revalidateAllCatalogPaths(slugs: string[]) {
  revalidatePath("/", "layout");
  revalidatePath("/productos", "layout");
  for (const s of slugs) {
    if (s) revalidatePath(`/productos/${s}`);
  }
}

async function countGroupMembers(groupSlug: string): Promise<number> {
  const products = await getProducts();
  return products.filter((p) => resolveProductGroupSlug(p) === groupSlug).length;
}

async function allocateUniqueGroupSlug(baseLabel: string): Promise<string> {
  const base = slugifyLabel(baseLabel) || "grupo";
  for (let i = 0; i < 100; i++) {
    const candidate = i === 0 ? base : `${base}-${i + 1}`;
    const existing = await prisma.productGroup.findUnique({ where: { slug: candidate } });
    const reserved = getProductGroupDefinition(candidate);
    if (!existing && !reserved) return candidate;
  }
  throw new Error("No se pudo generar un slug único; probá otro nombre.");
}

export async function createProductGroup(raw: unknown) {
  await requireAdmin();
  const data = productGroupCreateSchema.parse(raw);
  const slug = await allocateUniqueGroupSlug(data.displayName.trim());

  await prisma.productGroup.create({
    data: {
      slug,
      displayName: data.displayName.trim(),
      description: data.description?.trim() ? data.description.trim() : null,
      isCustom: true,
    },
  });
  revalidateAllCatalogPaths([slug]);
  revalidatePath("/admin/products", "layout");
  return { ok: true as const, slug };
}

export async function updateProductGroup(raw: unknown) {
  await requireAdmin();
  const data = productGroupUpdateSchema.parse(raw);
  const currentSlug = data.slug.trim();
  const displayName = data.displayName.trim();
  const description = data.description?.trim() ? data.description.trim() : null;

  let row = await prisma.productGroup.findUnique({ where: { slug: currentSlug } });
  const staticDef = getProductGroupDefinition(currentSlug);

  if (!row && staticDef) {
    row = await prisma.productGroup.create({
      data: {
        slug: currentSlug,
        displayName: staticDef.displayName,
        description: null,
        isCustom: false,
      },
    });
  }
  if (!row) throw new Error("Grupo no encontrado");

  await prisma.productGroup.update({
    where: { slug: currentSlug },
    data: { displayName, description },
  });
  revalidateAllCatalogPaths([currentSlug]);
  revalidatePath("/admin/products", "layout");
  return { ok: true as const, slug: currentSlug };
}

export async function deleteProductGroup(slug: string) {
  await requireAdmin();
  const s = slug.trim();
  const n = await countGroupMembers(s);
  if (n > 0) {
    throw new Error(`No se puede eliminar: hay ${n} variante(s) en este grupo. Sacalas del grupo o borrálas antes.`);
  }

  await prisma.productGroup.deleteMany({ where: { slug: s } });
  await prisma.productGroupDisplay.deleteMany({ where: { groupSlug: s } });
  revalidateAllCatalogPaths([s]);
  revalidatePath("/admin/products", "layout");
  return { ok: true as const };
}
