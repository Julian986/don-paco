"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { invalidateCatalogJsonProductCache } from "@/lib/products-build";
import { prisma } from "@/lib/prisma";
import { productCreateSchema, productPayloadSchema } from "@/lib/validations/product";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("UNAUTHORIZED");
  }
  if (!process.env.DATABASE_URL?.trim()) {
    throw new Error("DATABASE_URL no configurada");
  }
}

function revalidateStore() {
  revalidatePath("/", "layout");
  revalidatePath("/productos", "layout");
  invalidateCatalogJsonProductCache();
}

export async function createProduct(raw: unknown) {
  await requireAdmin();
  const data = productCreateSchema.parse(raw);
  const dup = await prisma.product.findUnique({ where: { slug: data.slug } });
  if (dup) {
    throw new Error("SLUG_EXISTS");
  }
  await prisma.product.create({
    data: {
      slug: data.slug,
      name: data.name,
      marca: data.marca,
      nombre: data.nombre,
      description: data.description?.trim() ? data.description.trim() : null,
      lista: data.lista,
      cash: data.cash,
      categoryId: data.categoryId,
      stock: data.stock,
      images: data.images,
      destacado: data.destacado,
    },
  });
  revalidateStore();
  return { ok: true as const };
}

export async function updateProduct(id: string, raw: unknown) {
  await requireAdmin();
  const data = productPayloadSchema.parse(raw);
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) throw new Error("NOT_FOUND");
  if (data.slug !== existing.slug) {
    const dup = await prisma.product.findUnique({ where: { slug: data.slug } });
    if (dup) throw new Error("SLUG_EXISTS");
  }
  await prisma.product.update({
    where: { id },
    data: {
      slug: data.slug,
      name: data.name,
      marca: data.marca,
      nombre: data.nombre,
      description: data.description?.trim() ? data.description.trim() : null,
      lista: data.lista,
      cash: data.cash,
      categoryId: data.categoryId,
      stock: data.stock,
      images: data.images,
      destacado: data.destacado,
    },
  });
  revalidateStore();
  return { ok: true as const };
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id } });
  revalidateStore();
  return { ok: true as const };
}
