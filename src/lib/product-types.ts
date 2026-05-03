import type { CategoryId } from "./category-tree";

export type Product = {
  slug: string;
  name: string;
  price: number;
  cashPrice: number;
  categoryId: CategoryId;
  category: string;
  brand: string;
  shortDescription: string;
  description: string;
  colors: string[];
  sizes: string[];
  stock: number;
  precioLista: number;
  imageSrc?: string;
  destacado?: boolean;
};

export type ListingEntry =
  | { type: "product"; product: Product }
  | {
      type: "group";
      groupSlug: string;
      displayName: string;
      imageSrc?: string;
      categoryId: CategoryId;
      fromPrice: number;
      fromCashPrice: number;
      variants: Product[];
    };
