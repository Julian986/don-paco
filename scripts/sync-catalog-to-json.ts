/**
 * Reformatea `data/catalog.json` (pretty-print + validación JSON).
 * Ejecutar: `npx tsx scripts/sync-catalog-to-json.ts`
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const out = join(process.cwd(), "data", "catalog.json");
const rows = JSON.parse(readFileSync(out, "utf8"));
writeFileSync(out, `${JSON.stringify(rows, null, 2)}\n`, "utf8");
console.log("OK:", Array.isArray(rows) ? rows.length : "?", "filas ->", out);
