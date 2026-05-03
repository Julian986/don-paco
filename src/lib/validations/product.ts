import { z } from "zod";

import { isCategoryId } from "@/lib/category-tree";

const imageRef = z.string().refine(
  (s) => s.startsWith("http://") || s.startsWith("https://") || s.startsWith("/"),
  "Imagen inválida",
);

export const productPayloadSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug: solo minúsculas, números y guiones"),
  name: z.string().min(1).max(400),
  marca: z.string().min(1).max(160),
  nombre: z.string().min(1).max(200),
  description: z.string().max(8000).optional(),
  lista: z.coerce.number().min(0),
  cash: z
    .any()
    .optional()
    .transform((v) => {
      if (v === "" || v === null || v === undefined) return null;
      const n = typeof v === "number" ? v : Number(v);
      if (!Number.isFinite(n)) return null;
      return n;
    }),
  categoryId: z.string().refine((v): v is import("@/lib/category-tree").CategoryId => isCategoryId(v), {
    message: "Categoría inválida",
  }),
  stock: z.coerce.number().int().min(0).max(999_999).default(5),
  images: z.array(imageRef).default([]),
  destacado: z.boolean().default(false),
});

export type ProductPayload = z.infer<typeof productPayloadSchema>;

export const productCreateSchema = productPayloadSchema.extend({
  images: z.array(imageRef).min(1, "Agregá al menos una imagen (URL o subida)"),
});
