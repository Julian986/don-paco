import { getGroupSlugForVariantSlug } from "@/lib/product-groups";
import type { Product } from "@/lib/product-types";

/** Prioridad: `groupSlug` guardado en DB; si no, membresía definida en código. */
export function resolveProductGroupSlug(product: Pick<Product, "slug" | "groupSlug">): string | undefined {
  const db = product.groupSlug?.trim();
  if (db) return db;
  return getGroupSlugForVariantSlug(product.slug) ?? undefined;
}
