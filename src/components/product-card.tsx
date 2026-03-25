"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { formatArs, type Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <article className="group rounded-xl border border-[#e2e2e2] bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="relative mb-3 overflow-hidden rounded-lg border border-[#e9e9e9] bg-gradient-to-br from-[#f5f5f5] to-[#ececec] p-3">
        <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase">
          <span className="rounded-full bg-[#e4077d] px-2 py-1 text-white">2x1</span>
          <span className="rounded-full bg-[#029f9c] px-2 py-1 text-white">Envio gratis</span>
        </div>
        <div className="flex h-44 items-center justify-center rounded bg-white/80 text-6xl">🐾</div>
      </div>
      <h4 className="mb-2 text-base font-extrabold uppercase leading-tight text-[#777]">
        <Link href={`/productos/${product.slug}`} className="transition-colors hover:text-[#029f9c]">
          {product.name}
        </Link>
      </h4>
      <p className="text-xl font-black text-[#029f9c]">{formatArs(product.price)}</p>
      <p className="mb-4 text-sm text-[#888]">{formatArs(product.cashPrice)} con Efectivo</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() =>
            addItem({
              slug: product.slug,
              name: product.name,
              price: product.price,
            })
          }
          className="flex-1 rounded-md bg-[#029f9c] px-3 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#028785]"
        >
          Comprar
        </button>
        <Link
          href={`/productos/${product.slug}`}
          className="rounded-md border border-[#e4077d] px-3 py-2 text-xs font-bold uppercase tracking-wide text-[#e4077d] transition-colors hover:bg-[#e4077d] hover:text-white"
        >
          Ver
        </Link>
      </div>
    </article>
  );
}
