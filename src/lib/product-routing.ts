import { getGroupSlugForVariantSlug } from "@/lib/product-groups";

/** Preferí `groupSlug` de la variante (DB) si lo tenés; si no, el mapa estático. */
export function getDetailHrefForProductSlug(productSlug: string, groupSlugFromDb?: string | null) {
  const db = groupSlugFromDb?.trim();
  if (db) return db;
  return getGroupSlugForVariantSlug(productSlug) ?? productSlug;
}
