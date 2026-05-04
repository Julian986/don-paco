import "server-only";

import type { GroupSelectOption } from "@/lib/admin/product-form-values";
import { prisma } from "@/lib/prisma";
import { PRODUCT_GROUPS } from "@/lib/product-groups";

export type { GroupSelectOption };

/** Opciones del `<select>` de grupo: mapa estático + filas en BD (incluye grupos creados en el panel). */
export async function listGroupSelectOptions(): Promise<GroupSelectOption[]> {
  const labelBySlug = new Map<string, string>();
  for (const g of PRODUCT_GROUPS) {
    labelBySlug.set(g.groupSlug, g.displayName);
  }
  try {
    if (process.env.DATABASE_URL?.trim()) {
      const rows = await prisma.productGroup.findMany({
        select: { slug: true, displayName: true },
      });
      for (const r of rows) {
        labelBySlug.set(r.slug, r.displayName);
      }
    }
  } catch {
    /* ignore */
  }
  return [...labelBySlug.entries()]
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label, "es"));
}
