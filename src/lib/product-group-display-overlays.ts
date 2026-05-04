import "server-only";

import { getGroupHeroFromFile, readGroupHeroFileMap } from "@/lib/group-hero-file-fallback";
import { prisma } from "@/lib/prisma";
import { isUnknownHeroImageUrlError } from "@/lib/prisma-hero-field";
import { getProductGroupDefinition } from "@/lib/product-groups";

export type GroupDisplayOverlay = {
  displayName: string;
  description: string | null;
  /** Imagen de la card / ficha del grupo (prioridad sobre variantes y mapa estático). */
  heroImageUrl: string | null;
};

/** Sin caché en memoria: lectura consistente tras guardar (p. ej. varias instancias serverless). */
export async function loadGroupDisplayOverlayMap(): Promise<Map<string, GroupDisplayOverlay>> {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return new Map();
  const map = new Map<string, GroupDisplayOverlay>();

  try {
    const legacy: {
      groupSlug: string;
      displayName: string;
      description: string | null;
      heroImageUrl: string | null;
    }[] = await prisma.productGroupDisplay.findMany({
      select: { groupSlug: true, displayName: true, description: true, heroImageUrl: true },
    });
    for (const r of legacy) {
      map.set(r.groupSlug, {
        displayName: r.displayName.trim(),
        description: r.description?.trim() ?? null,
        heroImageUrl: r.heroImageUrl?.trim() ?? null,
      });
    }
  } catch {
    /* sin campo hero en colección vieja: sin hero */
    try {
      const legacy = await prisma.productGroupDisplay.findMany({
        select: { groupSlug: true, displayName: true, description: true },
      });
      for (const r of legacy) {
        map.set(r.groupSlug, {
          displayName: r.displayName.trim(),
          description: r.description?.trim() ?? null,
          heroImageUrl: null,
        });
      }
    } catch {
      /* empty */
    }
  }

  try {
    let rows: {
      slug: string;
      displayName: string;
      description: string | null;
      heroImageUrl: string | null;
    }[];
    try {
      rows = await prisma.productGroup.findMany({
        select: { slug: true, displayName: true, description: true, heroImageUrl: true },
      });
    } catch (e) {
      if (!isUnknownHeroImageUrlError(e)) throw e;
      const plain = await prisma.productGroup.findMany({
        select: { slug: true, displayName: true, description: true },
      });
      rows = plain.map((r) => ({
        ...r,
        heroImageUrl: null as string | null,
      }));
    }
    for (const r of rows) {
      const prev = map.get(r.slug);
      map.set(r.slug, {
        displayName: r.displayName.trim(),
        description: r.description?.trim() ?? null,
        heroImageUrl: r.heroImageUrl?.trim() || prev?.heroImageUrl?.trim() || null,
      });
    }
  } catch {
    /* empty */
  }

  const fromFile = await readGroupHeroFileMap();
  for (const [slug, url] of fromFile) {
    const cur = map.get(slug);
    if (cur) {
      if (!cur.heroImageUrl?.trim()) {
        map.set(slug, { ...cur, heroImageUrl: url });
      }
    } else {
      const def = getProductGroupDefinition(slug);
      if (def) {
        map.set(slug, {
          displayName: def.displayName,
          description: null,
          heroImageUrl: url,
        });
      }
    }
  }

  return map;
}

export async function getProductGroupDisplayRow(
  groupSlug: string,
): Promise<{
  groupSlug: string;
  displayName: string;
  description: string | null;
  heroImageUrl: string | null;
} | null> {
  if (!process.env.DATABASE_URL?.trim()) return null;

  type PgShape = {
    slug: string;
    displayName: string;
    description: string | null;
    heroImageUrl: string | null;
  } | null;

  let pgRow: PgShape = null;
  try {
    try {
      pgRow = await prisma.productGroup.findUnique({
        where: { slug: groupSlug },
        select: { slug: true, displayName: true, description: true, heroImageUrl: true },
      });
    } catch (e) {
      if (!isUnknownHeroImageUrlError(e)) throw e;
      const plain = await prisma.productGroup.findUnique({
        where: { slug: groupSlug },
        select: { slug: true, displayName: true, description: true },
      });
      pgRow = plain ? { ...plain, heroImageUrl: null } : null;
    }
  } catch {
    pgRow = null;
  }

  let legacyRow: {
    groupSlug: string;
    displayName: string;
    description: string | null;
    heroImageUrl: string | null;
  } | null = null;
  try {
    try {
      legacyRow = await prisma.productGroupDisplay.findUnique({
        where: { groupSlug },
        select: { groupSlug: true, displayName: true, description: true, heroImageUrl: true },
      });
    } catch {
      const plain = await prisma.productGroupDisplay.findUnique({
        where: { groupSlug },
        select: { groupSlug: true, displayName: true, description: true },
      });
      legacyRow = plain ? { ...plain, heroImageUrl: null as string | null } : null;
    }
  } catch {
    legacyRow = null;
  }

  const fileHero = await getGroupHeroFromFile(groupSlug);

  if (!pgRow && !legacyRow) {
    if (!fileHero) return null;
    const def = getProductGroupDefinition(groupSlug);
    return {
      groupSlug,
      displayName: def?.displayName ?? groupSlug,
      description: null,
      heroImageUrl: fileHero,
    };
  }

  const displayName =
    pgRow?.displayName?.trim() || legacyRow?.displayName?.trim() || "";
  const description = pgRow?.description ?? legacyRow?.description ?? null;
  const heroImageUrl =
    pgRow?.heroImageUrl?.trim() || legacyRow?.heroImageUrl?.trim() || fileHero || null;

  return {
    groupSlug,
    displayName,
    description,
    heroImageUrl,
  };
}
