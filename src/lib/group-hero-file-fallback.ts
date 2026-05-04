import "server-only";

import fs from "node:fs/promises";
import path from "node:path";

const FILE = path.join(process.cwd(), "data", "group-hero-urls.json");

type FileShape = Record<string, string>;

async function readRaw(): Promise<FileShape> {
  try {
    const t = await fs.readFile(FILE, "utf8");
    const o = JSON.parse(t) as unknown;
    if (o && typeof o === "object" && !Array.isArray(o)) return o as FileShape;
  } catch {
    /* sin archivo o JSON inválido */
  }
  return {};
}

export async function getGroupHeroFromFile(groupSlug: string): Promise<string | null> {
  const raw = await readRaw();
  const u = raw[groupSlug]?.trim();
  return u || null;
}

/** Para fusionar en el mapa de overlays (slug → url). */
export async function readGroupHeroFileMap(): Promise<Map<string, string>> {
  const raw = await readRaw();
  const m = new Map<string, string>();
  for (const [k, v] of Object.entries(raw)) {
    const url = typeof v === "string" ? v.trim() : "";
    if (url) m.set(k, url);
  }
  return m;
}

/** Cuando Prisma aún no tiene el campo `heroImageUrl` en ningún modelo. */
export async function setGroupHeroInFile(groupSlug: string, url: string | null): Promise<void> {
  const raw = await readRaw();
  const slug = groupSlug.trim();
  if (!slug) return;
  if (url?.trim()) {
    raw[slug] = url.trim();
  } else {
    delete raw[slug];
  }
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(raw, null, 2), "utf8");
}
