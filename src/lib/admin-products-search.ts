import type { Product } from "@prisma/client";

import type { AdminGroupRow } from "@/lib/admin-catalog-groups";
import { resolveProductGroupSlug } from "@/lib/product-group-slug";

function norm(s: string) {
  return s.toLowerCase();
}

export function prismaProductMatchesSearch(p: Product, rawQuery: string): boolean {
  const q = norm(rawQuery.trim());
  if (!q) return true;
  return (
    norm(p.name).includes(q) ||
    norm(p.nombre).includes(q) ||
    norm(p.marca).includes(q) ||
    norm(p.slug).includes(q)
  );
}

/** Coincide nombre/slug del grupo o cualquier variante (nombre, marca, slug). */
export function adminGroupMatchesSearch(g: AdminGroupRow, rawQuery: string, products: Product[]): boolean {
  const q = norm(rawQuery.trim());
  if (!q) return true;
  if (norm(g.displayName).includes(q) || norm(g.slug).includes(q)) return true;
  const members = products.filter((p) => resolveProductGroupSlug(p) === g.slug);
  return members.some((p) => prismaProductMatchesSearch(p, q));
}
