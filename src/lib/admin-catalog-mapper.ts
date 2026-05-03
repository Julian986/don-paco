import type { CatalogRow } from "@/lib/catalog-types";
import { categoryBadgeLabel } from "@/lib/category-tree";
import { productImageBySlug } from "@/lib/product-image-maps";
import { getGroupSlugForVariantSlug } from "@/lib/product-groups";
import { precioEfectivoTransfer, precioTarjetaDesdeLista } from "@/lib/pricing";
import type { AdminPetFilter, AdminProductListItem } from "@/types/admin";

export function inferPetFromCategoryId(categoryId: string): AdminPetFilter {
  if (categoryId.startsWith("mascota-perro")) return "perro";
  if (categoryId.startsWith("mascota-gato")) return "gato";
  if (categoryId.startsWith("mascota-peces")) return "pez";
  if (categoryId.startsWith("general-")) return "general";
  return "sin";
}

export function catalogRowToAdminListItem(row: CatalogRow): AdminProductListItem {
  const hasVariants = Boolean(getGroupSlugForVariantSlug(row.slug));
  const imageSrc = row.imageSrc?.trim() || productImageBySlug[row.slug];
  return {
    slug: row.slug,
    nombre: row.nombre,
    marca: row.marca,
    mascota: inferPetFromCategoryId(row.categoryId),
    categoryId: row.categoryId,
    categoryLabel: categoryBadgeLabel(row.categoryId),
    imageSrc: imageSrc || undefined,
    lista: row.lista,
    cash: row.cash,
    priceCard: precioTarjetaDesdeLista(row.lista),
    priceCash: precioEfectivoTransfer(row.lista, row.cash),
    hasVariants,
    destacado: row.destacado === true,
    updatedAt: row.updatedAt ?? null,
  };
}
