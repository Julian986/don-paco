import Image from "next/image";
import Link from "next/link";
import PawIcon from "@/components/paw-icon";
import GroupVariantLines from "@/components/group-variant-lines";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { categoryBadgeLabel } from "@/lib/category-tree";
import { formatArs, getDetailHrefForProductSlug, type ListingEntry, type Product } from "@/lib/products";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP ?? "5492984000000";
const ADDRESS = process.env.NEXT_PUBLIC_LOCAL_ADDRESS ?? "Roca 473, Gral. Fernández Oro — RN";

type GroupModel = Extract<ListingEntry, { type: "group" }>;

type ProductGroupDetailViewProps = {
  group: GroupModel;
  relatedProducts: Product[];
};

export default function ProductGroupDetailView({ group, relatedProducts }: ProductGroupDetailViewProps) {
  const categoryLabel = categoryBadgeLabel(group.categoryId);
  const waHref = `https://wa.me/${WA_NUMBER}?text=Hola!%20Quiero%20consultar%20sobre%20${encodeURIComponent(group.displayName)}.`;
  const zoomOutGroupSlugs = new Set(["sieger-gato-kitten"]);
  const zoomInGroupSlugs = new Set(["agility-adulto", "agility-cordero", "agility-adulto-raza-peq"]);
  const imageFitClass = zoomOutGroupSlugs.has(group.groupSlug)
    ? "object-contain p-7"
    : zoomInGroupSlugs.has(group.groupSlug)
      ? "object-contain p-3"
      : "object-contain p-5";

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
              <div className="relative aspect-[4/5] w-full sm:aspect-[5/6] md:min-h-[360px]">
                {group.imageSrc ? (
                  <Image
                    src={group.imageSrc}
                    alt={group.displayName}
                    fill
                    className={imageFitClass}
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

            {/* Banner WhatsApp */}
            <div className="mt-6 rounded-xl bg-[#f0fafa] border border-[#c8e8e6] p-4">
              <p className="mb-3 text-[13px] font-semibold text-[#555]">
                ¿Tenés dudas sobre este producto?
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide text-white shadow transition-all hover:scale-105"
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 8.04 0C3.674 0 .12 3.554.12 7.92c0 1.398.365 2.762 1.057 3.965L0 16l4.235-1.11a7.902 7.902 0 0 0 3.805.968h.003c4.366 0 7.92-3.554 7.92-7.92a7.9 7.9 0 0 0-2.362-5.612Z" />
                  </svg>
                  Consultar por WhatsApp
                </a>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-[12px]">
                <div className="flex items-center gap-1.5 text-[#555]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#029f9c" strokeWidth="2" className="h-4 w-4 shrink-0">
                    <rect x="1" y="3" width="15" height="13" rx="1" />
                    <path d="M16 8h4l3 5v4h-7V8Z" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                  Envío en 24/72 hs.
                </div>
                <div className="flex items-center gap-1.5 text-[#555]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#029f9c" strokeWidth="2" className="h-4 w-4 shrink-0">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  Retiro en {ADDRESS.split(",")[0]}
                </div>
              </div>
            </div>
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
