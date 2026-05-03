import "server-only";

import fs from "node:fs";
import path from "node:path";

import type { CatalogRow } from "./catalog-types";

const DATA_PATH = path.join(process.cwd(), "data", "catalog.json");

let cache: { rows: CatalogRow[]; mtimeMs: number } | null = null;

export function readCatalogRows(): CatalogRow[] {
  const stat = fs.statSync(DATA_PATH);
  if (cache && cache.mtimeMs === stat.mtimeMs) {
    return cache.rows;
  }
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  const rows = JSON.parse(raw) as CatalogRow[];
  cache = { rows, mtimeMs: stat.mtimeMs };
  return rows;
}

export function invalidateCatalogCache() {
  cache = null;
}

export function writeCatalogRows(rows: CatalogRow[]) {
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(DATA_PATH, `${JSON.stringify(rows, null, 2)}\n`, "utf8");
  invalidateCatalogCache();
}
