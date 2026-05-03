import { getGroupSlugForVariantSlug } from "@/lib/product-groups";

export function getDetailHrefForProductSlug(productSlug: string) {
  return getGroupSlugForVariantSlug(productSlug) ?? productSlug;
}
