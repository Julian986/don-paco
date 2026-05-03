import "server-only";

import fs from "node:fs";
import path from "node:path";

import type { Product as PrismaProductRow } from "@prisma/client";

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
import { prisma } from "@/lib/prisma";
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

let productsJsonCache: { mtimeMs: number; list: Product[] } | null = null;

function buildDescriptionFromLista(row: { lista: number; cash: number | null }) {
  const listaTxt = formatArs(row.lista);
  const tarjetaTxt = formatArs(precioTarjetaDesdeLista(row.lista));
  const efectivoTxt = formatArs(precioEfectivoTransfer(row.lista, row.cash));
  return `Precio de lista ${listaTxt}. Con tarjeta de crédito (lista +10%): ${tarjetaTxt}. Efectivo o transferencia: ${efectivoTxt}. Consultá promociones 2x1 en latas y pouches según disponibilidad en el local.`;
}

function mapCatalogRowToProduct(row: CatalogRow): Product {
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
    description: desc || buildDescriptionFromLista(row),
    colors: [],
    sizes: [],
    stock: 5,
    imageSrc: imageSrc || undefined,
    destacado: row.destacado === true,
  };
}

function getProductsFromCatalogJson(): Product[] {
  const mtimeMs = catalogMtimeMs();
  if (productsJsonCache && productsJsonCache.mtimeMs === mtimeMs) {
    return productsJsonCache.list;
  }
  const rows = getCatalogRows();
  const list = rows.map(mapCatalogRowToProduct);
  productsJsonCache = { mtimeMs, list };
  return list;
}

export function invalidateCatalogJsonProductCache() {
  productsJsonCache = null;
}

function mapPrismaRowToProduct(row: PrismaProductRow): Product {
  const categoryId = (isCategoryId(row.categoryId) ? row.categoryId : "mascota-perro-alimento-seco") as CategoryId;
  const manual = row.images?.find((u) => u?.trim())?.trim();
  const imageSrc = manual || productImageBySlug[row.slug];
  const cash = row.cash ?? null;
  const desc = row.description?.trim();
  return {
    slug: row.slug,
    name: row.name,
    brand: row.marca,
    precioLista: row.lista,
    price: precioTarjetaDesdeLista(row.lista),
    cashPrice: precioEfectivoTransfer(row.lista, cash),
    categoryId,
    category: categoryBadgeLabel(categoryId),
    shortDescription: desc ? desc.slice(0, 120) : `Lista ${formatArs(row.lista)} · ${row.marca}`,
    description: desc || buildDescriptionFromLista({ lista: row.lista, cash }),
    colors: [],
    sizes: [],
    stock: row.stock,
    imageSrc: imageSrc || undefined,
    destacado: row.destacado,
  };
}

async function loadProducts(): Promise<Product[]> {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return getProductsFromCatalogJson();
  try {
    const count = await prisma.product.count();
    if (count === 0) return getProductsFromCatalogJson();
    const rows = await prisma.product.findMany({ orderBy: { slug: "asc" } });
    return rows.map(mapPrismaRowToProduct);
  } catch {
    return getProductsFromCatalogJson();
  }
}

export async function getProducts(): Promise<Product[]> {
  return loadProducts();
}

export async function getProductBySlug(slug: string) {
  return (await getProducts()).find((product) => product.slug === slug);
}

export async function listAllProductPageSlugs(): Promise<string[]> {
  const slugs = new Set<string>();
  for (const p of await getProducts()) {
    slugs.add(p.slug);
  }
  for (const g of listGroupSlugs()) {
    slugs.add(g);
  }
  return [...slugs];
}

function buildListingFromProducts(products: Product[]): ListingEntry[] {
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

export async function buildListingEntries(): Promise<ListingEntry[]> {
  const products = await getProducts();
  return buildListingFromProducts(products);
}

export async function getGroupListingIfExists(groupSlug: string): Promise<(ListingEntry & { type: "group" }) | undefined> {
  const def = getProductGroupDefinition(groupSlug);
  if (!def) return undefined;
  const products = await getProducts();
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
