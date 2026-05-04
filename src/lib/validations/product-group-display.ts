import { z } from "zod";

export const productGroupDisplayUpsertSchema = z.object({
  groupSlug: z.string().min(1).max(200),
  displayName: z.string().min(1).max(300),
  description: z.string().max(8000).optional().nullable(),
});

export type ProductGroupDisplayUpsert = z.infer<typeof productGroupDisplayUpsertSchema>;
