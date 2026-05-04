import { z } from "zod";

import { groupHeroImageUrlField } from "@/lib/validations/product-group";

export const productGroupDisplayUpsertSchema = z.object({
  groupSlug: z.string().min(1).max(200),
  displayName: z.string().min(1).max(300),
  description: z.string().max(8000).optional().nullable(),
  heroImageUrl: groupHeroImageUrlField.optional(),
});

export type ProductGroupDisplayUpsert = z.infer<typeof productGroupDisplayUpsertSchema>;
