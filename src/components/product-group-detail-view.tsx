import Image from "next/image";
import Link from "next/link";
import PawIcon from "@/components/paw-icon";
import GroupVariantLines from "@/components/group-variant-lines";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { categoryBadgeLabel } from "@/lib/category-tree";
import { formatArs, getDetailHrefForProductSlug, type ListingEntry, type Product } from "@/lib/products";

type GroupModel = Extract<ListingEntry, { type: "group" }>;

type ProductGroupDetailViewProps = {
  group: GroupModel;
  relatedProducts: Product[];
};

export default function ProductGroupDetailView({ group, relatedProducts }: ProductGroupDetailViewProps) {
  const categoryLabel = categoryBadgeLabel(group.categoryId);

  return (
    <main className="min-h-screen bg-white text-[#3f3f3f]">
      <SiteHeader />

      <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
        <nav className="mb-6 text-sm text-[#8a8a8a]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[#029f9c]">
                Inicio
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/" className="hover:text-[#029f9c]">
                Productos
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-[#666]">{group.displayName}</li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="relative mb-4 overflow-hidden rounded-2xl border border-[#e6e6e6] bg-white">
              <div className="pointer-events-none absolute left-4 right-4 top-4 z-10 flex items-start justify-between gap-2">
                <span className="rounded-full bg-[#e4077d] px-2 py-1 text-[11px] font-bold uppercase text-white shadow-sm">
                  2x1
                </span>
                <span className="rounded-full bg-[#029f9c] px-2 py-1 text-[11px] font-bold uppercase text-white shadow-sm">
                  Envio gratis
                </span>
              </div>
              <div className="relative aspect-[4/5] w-full sm:aspect-[5/6] md:min-h-[360px]">
                {group.imageSrc ? (
                  <Image
                    src={group.imageSrc}
                    alt={group.displayName}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 640px"
                  />
                ) : (
                  <div className="flex h-80 items-center justify-center bg-[#f4f4f4]">
                    <PawIcon className="h-20 w-20 text-[#029f9c]" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e6e6e6] bg-white p-6 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase">
              <span className="rounded-full bg-[#029f9c]/15 px-2.5 py-1 text-[#029f9c]">{categoryLabel}</span>
              <span className="rounded-full bg-[#f0f0f0] px-2.5 py-1 text-[#777]">Varias presentaciones</span>
            </div>

            <h1 className="mb-2 text-2xl font-black uppercase leading-tight text-[#555] md:text-3xl">
              {group.displayName}
            </h1>
            <p className="mb-4 text-[15px] leading-7 text-[#707070]">
              Elegí el formato (presentación). Los precios son por bolsa; tarjeta de crédito = lista +10%.
            </p>

            <div className="mb-6 rounded-xl bg-[#f7f7f7] p-4">
              <p className="text-sm font-semibold text-[#555]">Desde {formatArs(group.fromPrice)} con tarjeta</p>
              <p className="mt-1 text-sm text-[#7a7a7a]">Desde {formatArs(group.fromCashPrice)} efectivo o transferencia</p>
            </div>

            <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#029f9c]">Formatos</h2>
            <GroupVariantLines variants={group.variants} />
          </div>
        </div>

        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-wide text-[#029f9c]">También te puede interesar</h2>
            <Link href="/" className="text-sm font-semibold text-[#e4077d] hover:underline">
              Ver todos
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {relatedProducts.map((item) => (
              <article
                key={item.slug}
                className="rounded-xl border border-[#e2e2e2] bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative mb-3 flex h-40 items-center justify-center rounded-lg bg-gradient-to-br from-[#f5f5f5] to-[#ececec]">
                  {item.imageSrc ? (
                    <Image
                      src={item.imageSrc}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="max-h-[140px] w-auto object-contain p-2"
                    />
                  ) : (
                    <PawIcon className="h-14 w-14 text-[#029f9c]" />
                  )}
                </div>
                <h3 className="mb-2 text-base font-extrabold uppercase leading-tight text-[#777]">
                  <Link href={`/productos/${getDetailHrefForProductSlug(item.slug)}`} className="hover:text-[#029f9c]">
                    {item.name}
                  </Link>
                </h3>
                <p className="text-xl font-black text-[#029f9c]">{formatArs(item.price)}</p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <SiteFooter />
    </main>
  );
}
