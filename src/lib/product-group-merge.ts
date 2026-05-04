import "server-only";

import type { Product } from "@/lib/product-types";
import { resolveProductGroupSlug } from "@/lib/product-group-slug";
import type { ProductGroupDefinition } from "@/lib/product-groups";
import { getProductGroupDefinition, PRODUCT_GROUPS } from "@/lib/product-groups";
import { prisma } from "@/lib/prisma";

/** Definiciones fusionadas: mapa estático + grupos persistidos y slugs que aparecen en productos. */
export async function loadMergedGroupDefinitions(products: Product[]): Promise<Map<string, ProductGroupDefinition>> {
  const map = new Map<string, ProductGroupDefinition>();
  for (const g of PRODUCT_GROUPS) {
    map.set(g.groupSlug, {
      groupSlug: g.groupSlug,
      displayName: g.displayName,
      variantSlugs: [...g.variantSlugs],
    });
  }

  let dbRows: { slug: string; displayName: string; isCustom: boolean }[] = [];
  try {
    if (process.env.DATABASE_URL?.trim()) {
      dbRows = await prisma.productGroup.findMany({
        select: { slug: true, displayName: true, isCustom: true },
      });
    }
  } catch {
    dbRows = [];
  }

  for (const row of dbRows) {
    const staticDef = getProductGroupDefinition(row.slug);
    if (staticDef) {
      map.set(row.slug, {
        groupSlug: row.slug,
        displayName: staticDef.displayName,
        variantSlugs: [...staticDef.variantSlugs],
      });
      continue;
    }
    if (row.isCustom) {
      map.set(row.slug, {
        groupSlug: row.slug,
        displayName: row.displayName,
        variantSlugs: [],
      });
    }
  }

  const needed = new Set<string>();
  for (const p of products) {
    const g = resolveProductGroupSlug(p);
    if (g && !map.has(g)) needed.add(g);
  }

  for (const slug of needed) {
    const row = dbRows.find((r) => r.slug === slug);
    if (row) {
      map.set(slug, {
        groupSlug: slug,
        displayName: row.displayName,
        variantSlugs: [],
      });
    } else {
      map.set(slug, {
        groupSlug: slug,
        displayName: slug,
        variantSlugs: [],
      });
    }
  }

  return map;
}
