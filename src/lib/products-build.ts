import "server-only";

import fs from "node:fs";
import path from "node:path";

import { getCatalogRows } from "@/lib/catalog-rows";
import type { CatalogRow } from "@/lib/catalog-types";
import { categoryBadgeLabel, isCategoryId, type CategoryId } from "@/lib/category-tree";
import { CATALOGO_NO_PUBLICADO } from "@/lib/catalogo-reserva";
import { formatArs } from "@/lib/product-format";
import { productGroupImageByGroupSlug, productImageBySlug } from "@/lib/product-image-maps";
import type { ListingEntry, Product } from "@/lib/product-types";
import {
  getGroupSlugForVariantSlug,
  getProductGroupDefinition,
  listGroupSlugs,
} from "@/lib/product-groups";
import { precioEfectivoTransfer, precioTarjetaDesdeLista } from "@/lib/pricing";

void CATALOGO_NO_PUBLICADO;

const catalogPath = path.join(process.cwd(), "data", "catalog.json");

function catalogMtimeMs(): number {
  try {
    return fs.statSync(catalogPath).mtimeMs;
  } catch {
    return 0;
  }
}

let productsCache: { mtimeMs: number; list: Product[] } | null = null;

function buildDescription(row: CatalogRow) {
  const listaTxt = formatArs(row.lista);
  const tarjetaTxt = formatArs(precioTarjetaDesdeLista(row.lista));
  const efectivoTxt = formatArs(precioEfectivoTransfer(row.lista, row.cash));
  return `Precio de lista ${listaTxt}. Con tarjeta de crédito (lista +10%): ${tarjetaTxt}. Efectivo o transferencia: ${efectivoTxt}. Consultá promociones 2x1 en latas y pouches según disponibilidad en el local.`;
}

function mapRowToProduct(row: CatalogRow): Product {
  const manualImg = row.imageSrc?.trim();
  const imageSrc = manualImg || productImageBySlug[row.slug];
  const desc = row.descripcion?.trim();
  return {
    slug: row.slug,
    name: `${row.marca} — ${row.nombre}`.trim(),
    brand: row.marca,
    precioLista: row.lista,
    price: precioTarjetaDesdeLista(row.lista),
    cashPrice: precioEfectivoTransfer(row.lista, row.cash),
    categoryId: row.categoryId,
    category: categoryBadgeLabel(row.categoryId),
    shortDescription: `Lista ${formatArs(row.lista)} · ${row.marca}`,
    description: desc || buildDescription(row),
    colors: [],
    sizes: [],
    stock: 5,
    imageSrc: imageSrc || undefined,
    destacado: row.destacado === true,
  };
}

export function getProducts(): Product[] {
  const mtimeMs = catalogMtimeMs();
  if (productsCache && productsCache.mtimeMs === mtimeMs) {
    return productsCache.list;
  }
  const rows = getCatalogRows();
  const list = rows.map(mapRowToProduct);
  productsCache = { mtimeMs, list };
  return list;
}

export function getProductBySlug(slug: string) {
  return getProducts().find((product) => product.slug === slug);
}

export function listAllProductPageSlugs() {
  const slugs = new Set<string>();
  for (const p of getProducts()) {
    slugs.add(p.slug);
  }
  for (const g of listGroupSlugs()) {
    slugs.add(g);
  }
  return [...slugs];
}

export function buildListingEntries(): ListingEntry[] {
  const products = getProducts();
  const seenGroups = new Set<string>();
  const out: ListingEntry[] = [];

  for (const p of products) {
    const gSlug = getGroupSlugForVariantSlug(p.slug);
    if (gSlug) {
      if (seenGroups.has(gSlug)) continue;
      seenGroups.add(gSlug);
      const def = getProductGroupDefinition(gSlug);
      if (!def) continue;
      const variants = def.variantSlugs
        .map((s) => products.find((x) => x.slug === s))
        .filter((x): x is Product => !!x);
      if (variants.length === 0) continue;
      const fromPrice = Math.min(...variants.map((v) => v.price));
      const fromCashPrice = Math.min(...variants.map((v) => v.cashPrice));
      out.push({
        type: "group",
        groupSlug: gSlug,
        displayName: def.displayName,
        imageSrc: productGroupImageByGroupSlug[gSlug] ?? variants.find((v) => v.imageSrc)?.imageSrc,
        categoryId: variants[0]!.categoryId,
        fromPrice,
        fromCashPrice,
        variants,
      });
      continue;
    }
    out.push({ type: "product", product: p });
  }
  return out;
}

export function getGroupListingIfExists(groupSlug: string): (ListingEntry & { type: "group" }) | undefined {
  const def = getProductGroupDefinition(groupSlug);
  if (!def) return undefined;
  const products = getProducts();
  const variants = def.variantSlugs
    .map((s) => products.find((x) => x.slug === s))
    .filter((x): x is Product => !!x);
  if (variants.length === 0) return undefined;
  const fromPrice = Math.min(...variants.map((v) => v.price));
  const fromCashPrice = Math.min(...variants.map((v) => v.cashPrice));
  return {
    type: "group",
    groupSlug,
    displayName: def.displayName,
    imageSrc: productGroupImageByGroupSlug[groupSlug] ?? variants.find((v) => v.imageSrc)?.imageSrc,
    categoryId: variants[0]!.categoryId,
    fromPrice,
    fromCashPrice,
    variants,
  };
}

export { isCategoryId };
export type { CategoryId } from "./category-tree";
export type { ListingEntry, Product } from "./product-types";
