import type { CategoryId } from "@/lib/category-tree";

/** Mascota inferida o explícita para filtros del panel (el catálogo usa `categoryId`). */
export type AdminPetFilter = "perro" | "gato" | "pez" | "general" | "sin";

export type AdminCatalogRowInput = {
  slug: string;
  marca: string;
  nombre: string;
  lista: number;
  cash: number | null;
  categoryId: CategoryId;
  imageSrc?: string | null;
  destacado?: boolean;
  descripcion?: string | null;
  updatedAt?: string | null;
};

export type AdminSiteSettingsInput = {
  storeName: string;
  address: string;
  cashDiscountLabel: string;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerLead: string;
};

export type AdminProductListItem = {
  slug: string;
  nombre: string;
  marca: string;
  mascota: AdminPetFilter;
  categoryId: CategoryId;
  categoryLabel: string;
  imageSrc?: string;
  lista: number;
  cash: number | null;
  priceCard: number;
  priceCash: number;
  hasVariants: boolean;
  destacado: boolean;
  updatedAt: string | null;
};
