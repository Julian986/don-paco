"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getProductGroupDefinition } from "@/lib/product-groups";
import { productGroupDisplayUpsertSchema } from "@/lib/validations/product-group-display";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("UNAUTHORIZED");
  if (!process.env.DATABASE_URL?.trim()) throw new Error("DATABASE_URL no configurada");
}

function revalidateStorefrontGroups(groupSlug: string) {
  revalidatePath("/", "layout");
  revalidatePath("/productos", "layout");
  revalidatePath(`/productos/${groupSlug}`);
}

export async function upsertProductGroupDisplay(raw: unknown) {
  await requireAdmin();
  const data = productGroupDisplayUpsertSchema.parse(raw);
  const desc = data.description?.trim() ? data.description.trim() : null;
  const slug = data.groupSlug.trim();
  const isStaticCatalog = Boolean(getProductGroupDefinition(slug));
  await prisma.productGroup.upsert({
    where: { slug },
    create: {
      slug,
      displayName: data.displayName.trim(),
      description: desc,
      isCustom: !isStaticCatalog,
    },
    update: {
      displayName: data.displayName.trim(),
      description: desc,
    },
  });
  revalidateStorefrontGroups(slug);
  return { ok: true as const };
}

export async function deleteProductGroupDisplay(groupSlug: string) {
  await requireAdmin();
  const slug = groupSlug.trim();
  await prisma.productGroup.deleteMany({ where: { slug } });
  await prisma.productGroupDisplay.deleteMany({ where: { groupSlug: slug } });
  revalidateStorefrontGroups(slug);
  return { ok: true as const };
}
