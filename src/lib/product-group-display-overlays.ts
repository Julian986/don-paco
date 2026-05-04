import "server-only";

import { prisma } from "@/lib/prisma";

export type GroupDisplayOverlay = {
  displayName: string;
  description: string | null;
};

/** Sin caché en memoria: lectura consistente tras guardar (p. ej. varias instancias serverless). */
export async function loadGroupDisplayOverlayMap(): Promise<Map<string, GroupDisplayOverlay>> {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return new Map();
  const map = new Map<string, GroupDisplayOverlay>();
  try {
    const legacy: { groupSlug: string; displayName: string; description: string | null }[] =
      await prisma.productGroupDisplay.findMany({
        select: { groupSlug: true, displayName: true, description: true },
      });
    for (const r of legacy) {
      map.set(r.groupSlug, {
        displayName: r.displayName.trim(),
        description: r.description?.trim() ?? null,
      });
    }
  } catch {
    /* empty */
  }
  try {
    const rows = await prisma.productGroup.findMany({
      select: { slug: true, displayName: true, description: true },
    });
    for (const r of rows) {
      map.set(r.slug, {
        displayName: r.displayName.trim(),
        description: r.description?.trim() ?? null,
      });
    }
  } catch {
    /* empty */
  }
  return map;
}

export async function getProductGroupDisplayRow(
  groupSlug: string,
): Promise<{ groupSlug: string; displayName: string; description: string | null } | null> {
  if (!process.env.DATABASE_URL?.trim()) return null;
  try {
    const row = await prisma.productGroup.findUnique({
      where: { slug: groupSlug },
      select: { slug: true, displayName: true, description: true },
    });
    if (row) {
      return {
        groupSlug: row.slug,
        displayName: row.displayName,
        description: row.description,
      };
    }
  } catch {
    /* fall through */
  }
  try {
    return await prisma.productGroupDisplay.findUnique({
      where: { groupSlug },
      select: { groupSlug: true, displayName: true, description: true },
    });
  } catch {
    return null;
  }
}
