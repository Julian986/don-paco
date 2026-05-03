import type { CategoryId } from "./category-tree";

/** Fila del catálogo persistida en `data/catalog.json`. */
export type CatalogRow = {
  slug: string;
  marca: string;
  nombre: string;
  lista: number;
  cash: number | null;
  categoryId: CategoryId;
  /** Ruta bajo `public/`; si falta, se usa el mapa estático por slug. */
  imageSrc?: string | null;
  destacado?: boolean;
  descripcion?: string | null;
  /** ISO 8601 — lo setea el panel al guardar. */
  updatedAt?: string | null;
};
