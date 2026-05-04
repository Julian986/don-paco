import type { Product } from "@prisma/client";
import type { z } from "zod";

import { productPayloadSchema } from "@/lib/validations/product";

export type ProductFormValues = z.infer<typeof productPayloadSchema>;

export function productToFormValues(p: Product): ProductFormValues {
  return {
    slug: p.slug,
    name: p.name,
    marca: p.marca,
    nombre: p.nombre,
    description: p.description ?? "",
    lista: p.lista,
    cash: p.cash ?? null,
    categoryId: p.categoryId as ProductFormValues["categoryId"],
    stock: p.stock,
    images: [...p.images],
    destacado: p.destacado,
  };
}
