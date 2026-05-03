import { invalidateCatalogCache, readCatalogRows, writeCatalogRows } from "./catalog-store";

export type { CatalogRow } from "./catalog-types";
export { invalidateCatalogCache, readCatalogRows, writeCatalogRows };

/** Lectura del catálogo en runtime (servidor / route handlers). */
export function getCatalogRows() {
  return readCatalogRows();
}
