"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import PawIcon from "@/components/paw-icon";
import { formatArs, type Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <article className="group rounded-xl border border-[#e2e2e2] bg-white p-2.5 shadow-sm transition-shadow hover:shadow-md sm:p-4">
      <div className="relative mb-2 overflow-hidden rounded-lg border border-[#e9e9e9] bg-gradient-to-br from-[#f5f5f5] to-[#ececec] p-2 sm:mb-3 sm:p-3">
        <div className="mb-2 flex items-center justify-between text-[9px] font-bold uppercase sm:text-[11px]">
          <span className="rounded-full bg-[#e4077d] px-1.5 py-0.5 text-white sm:px-2 sm:py-1">2x1</span>
          <span className="rounded-full bg-[#029f9c] px-1.5 py-0.5 text-white sm:px-2 sm:py-1">Envio gratis</span>
        </div>
        <div className="flex h-28 items-center justify-center rounded bg-white/80 sm:h-44">
          <PawIcon className="h-9 w-9 text-[#029f9c] sm:h-14 sm:w-14" />
        </div>
      </div>
      <h4 className="mb-1 text-[13px] font-extrabold uppercase leading-tight text-[#777] sm:mb-2 sm:text-base">
        <Link href={`/productos/${product.slug}`} className="transition-colors hover:text-[#029f9c]">
          {product.name}
        </Link>
      </h4>
      <p className="text-base font-black text-[#029f9c] sm:text-xl">{formatArs(product.price)}</p>
      <p className="mb-3 text-[11px] text-[#888] sm:mb-4 sm:text-sm">{formatArs(product.cashPrice)} con Efectivo</p>
      <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-2">
        <button
          type="button"
          onClick={() =>
            addItem({
              slug: product.slug,
              name: product.name,
              price: product.price,
            })
          }
          className="flex-1 rounded-md bg-[#029f9c] px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#028785] sm:text-xs"
        >
          Comprar
        </button>
        <Link
          href={`/productos/${product.slug}`}
          className="rounded-md border border-[#e4077d] px-3 py-2 text-center text-[11px] font-bold uppercase tracking-wide text-[#e4077d] transition-colors hover:bg-[#e4077d] hover:text-white sm:text-xs"
        >
          Ver
        </Link>
      </div>
    </article>
  );
}
