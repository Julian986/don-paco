/**
 * Uso: `npm run dev:counts`
 * Compara filas de `data/catalog.json` con documentos en Mongo (colección Product).
 */
import { readFileSync } from "node:fs";
import path from "node:path";

import { PrismaClient } from "@prisma/client";

async function main() {
  const catalogPath = path.join(process.cwd(), "data", "catalog.json");
  const jsonLen = JSON.parse(readFileSync(catalogPath, "utf8")).length as number;

  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    console.log({
      catalogJsonRows: jsonLen,
      note: "Sin DATABASE_URL la tienda usa solo el JSON (mismas filas).",
    });
    return;
  }

  const prisma = new PrismaClient();
  const mongoCount = await prisma.product.count();
  await prisma.$disconnect();

  console.log({
    catalogJsonRows: jsonLen,
    mongoProductDocuments: mongoCount,
    mongoMatchesCatalogJson: mongoCount === jsonLen,
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
