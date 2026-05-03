import "server-only";

import fs from "node:fs";
import path from "node:path";

import type { SiteSettings } from "@/types/site-settings";

export type { SiteSettings };

const DATA_PATH = path.join(process.cwd(), "data", "site-settings.json");

let cache: { raw: string; parsed: SiteSettings } | null = null;

function readDisk(): SiteSettings {
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  return JSON.parse(raw) as SiteSettings;
}

export function getSiteSettings(): SiteSettings {
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  if (cache?.raw === raw) return cache.parsed;
  const parsed = JSON.parse(raw) as SiteSettings;
  cache = { raw, parsed };
  return parsed;
}

export function writeSiteSettings(next: SiteSettings) {
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(DATA_PATH, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  cache = null;
}
