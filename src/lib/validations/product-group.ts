import { z } from "zod";

export const groupSlugSchema = z
  .string()
  .min(1)
  .max(200)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Solo minúsculas, números y guiones (kebab-case)");

export const groupHeroImageUrlField = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((v) => {
    if (v == null || v === undefined) return null;
    const s = String(v).trim();
    return s === "" ? null : s;
  })
  .refine((v) => v === null || /^https?:\/\//i.test(v) || v.startsWith("/"), {
    message: "Imagen del grupo: usá una URL (https) o una ruta que empiece con /",
  });

export const productGroupCreateSchema = z.object({
  displayName: z.string().min(1).max(300),
  description: z.string().max(8000).optional().nullable(),
  heroImageUrl: groupHeroImageUrlField.optional(),
});

export const productGroupUpdateSchema = z.object({
  slug: groupSlugSchema,
  displayName: z.string().min(1).max(300),
  description: z.string().max(8000).optional().nullable(),
  heroImageUrl: groupHeroImageUrlField.optional(),
});

export type ProductGroupCreateInput = z.infer<typeof productGroupCreateSchema>;
export type ProductGroupUpdateInput = z.infer<typeof productGroupUpdateSchema>;
