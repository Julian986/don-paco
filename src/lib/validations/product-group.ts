import { z } from "zod";

export const groupSlugSchema = z
  .string()
  .min(1)
  .max(200)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Solo minúsculas, números y guiones (kebab-case)");

export const productGroupCreateSchema = z.object({
  displayName: z.string().min(1).max(300),
  description: z.string().max(8000).optional().nullable(),
});

export const productGroupUpdateSchema = z.object({
  slug: groupSlugSchema,
  displayName: z.string().min(1).max(300),
  description: z.string().max(8000).optional().nullable(),
});

export type ProductGroupCreateInput = z.infer<typeof productGroupCreateSchema>;
export type ProductGroupUpdateInput = z.infer<typeof productGroupUpdateSchema>;
