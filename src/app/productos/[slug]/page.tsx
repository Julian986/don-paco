import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import PawIcon from "@/components/paw-icon";
import ProductGroupDetailView from "@/components/product-group-detail-view";
import ProductDetailActions from "@/components/product-detail-actions";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { getGroupSlugForVariantSlug } from "@/lib/product-groups";
import {
  formatArs,
  getDetailHrefForProductSlug,
  getGroupListingIfExists,
  getProductBySlug,
  listAllProductPageSlugs,
  products,
} from "@/lib/products";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listAllProductPageSlugs().map((slug) => ({ slug }));
}

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP ?? "5492984000000";
const LOCAL_ADDRESS = process.env.NEXT_PUBLIC_LOCAL_ADDRESS ?? "Roca 473, Gral. Fernández Oro — RN";

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const extraZoomOutProductSlugs = new Set(["sieger-pouch-perro"]);

  const group = getGroupListingIfExists(slug);
  if (group) {
    const exclude = new Set(group.variants.map((v) => v.slug));
    const relatedProducts = products
      .filter((p) => !exclude.has(p.slug))
      .sort((a, b) => {
        const aMatch = a.categoryId === group.categoryId ? 1 : 0;
        const bMatch = b.categoryId === group.categoryId ? 1 : 0;
        return bMatch - aMatch;
      })
      .slice(0, 3);
    return <ProductGroupDetailView group={group} relatedProducts={relatedProducts} />;
  }

  const groupSlug = getGroupSlugForVariantSlug(slug);
  if (groupSlug) {
    redirect(`/productos/${groupSlug}`);
  }

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((item) => item.slug !== product.slug)
    .sort((a, b) => {
      const aMatch = a.categoryId === product.categoryId ? 1 : 0;
      const bMatch = b.categoryId === product.categoryId ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 3);

  const waHref = `https://wa.me/${WA_NUMBER}?text=Hola!%20Quiero%20consultar%20sobre%20${encodeURIComponent(product.name)}.`;

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
            <li className="font-semibold text-[#666]">{product.name}</li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-4 rounded-2xl border border-[#e6e6e6] bg-gradient-to-br from-[#f6f6f6] to-[#ececec] p-6">
              <div className="relative flex h-64 items-center justify-center rounded-xl bg-white/80 sm:h-80 md:h-[360px]">
                {product.imageSrc ? (
                  <Image
                    src={product.imageSrc}
                    alt={product.name}
                    width={720}
                    height={720}
                    className={
                      extraZoomOutProductSlugs.has(product.slug)
                        ? "max-h-full w-auto max-w-full object-contain p-10"
                        : "max-h-full w-auto max-w-full object-contain p-6"
                    }
                    priority
                  />
                ) : (
                  <PawIcon className="h-20 w-20 text-[#029f9c] md:h-24 md:w-24" />
                )}
              </div>
            </div>

            {product.imageSrc ? (
              <div className="grid max-w-md grid-cols-4 gap-3">
                <div className="relative flex h-24 items-center justify-center rounded-lg border border-[#029f9c] bg-white">
                  <Image
                    src={product.imageSrc}
                    alt={`Miniatura de ${product.name}`}
                    width={120}
                    height={120}
                    className="max-h-[88px] w-auto object-contain p-1"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((thumb) => (
                  <button
                    key={thumb}
                    type="button"
                    className="flex h-24 items-center justify-center rounded-lg border border-[#e2e2e2] bg-[#f7f7f7] text-3xl transition-colors hover:border-[#029f9c]"
                  >
                    <PawIcon className="h-10 w-10 text-[#029f9c]" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-[#e6e6e6] bg-white p-6 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase">
              <span className="rounded-full bg-[#029f9c]/15 px-2.5 py-1 text-[#029f9c]">{product.category}</span>
              <span className="rounded-full bg-[#f0f0f0] px-2.5 py-1 text-[#777]">Stock: {product.stock}</span>
            </div>

            <h1 className="mb-2 text-2xl font-black uppercase leading-tight text-[#555] md:text-3xl">
              {product.name}
            </h1>
            <p className="mb-6 text-[15px] leading-7 text-[#707070]">{product.shortDescription}</p>

            <div className="mb-6 rounded-xl bg-[#f7f7f7] p-4">
              <p className="text-3xl font-black text-[#029f9c]">{formatArs(product.price)}</p>
              <p className="mt-1 text-sm text-[#7a7a7a]">
                {formatArs(product.cashPrice)} efectivo o transferencia
              </p>
              <p className="mt-2 text-xs text-[#8a8a8a]">Lista en local: {formatArs(product.precioLista)}</p>
              <p className="mt-3 text-xs uppercase tracking-wide text-[#8f8f8f]">
                Tarjeta de crédito: precio de lista + 10% (según lista del negocio)
              </p>
            </div>

            <ProductDetailActions
              slug={product.slug}
              name={product.name}
              price={product.price}
              colors={product.colors}
              sizes={product.sizes}
            />

            {/* Info envío y retiro */}
            <div className="grid gap-3 text-sm text-[#666] sm:grid-cols-2">
              <div className="flex items-start gap-2 rounded-lg border border-[#e4e4e4] bg-[#fafafa] p-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="#029f9c" strokeWidth="2" className="mt-0.5 h-4 w-4 shrink-0">
                  <rect x="1" y="3" width="15" height="13" rx="1" />
                  <path d="M16 8h4l3 5v4h-7V8Z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <div>
                  <p className="font-semibold text-[#555]">Envíos a todo el país</p>
                  <p className="mt-0.5 text-xs text-[#7d7d7d]">Recibí tu pedido en 24/72 hs.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-lg border border-[#e4e4e4] bg-[#fafafa] p-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="#029f9c" strokeWidth="2" className="mt-0.5 h-4 w-4 shrink-0">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <div>
                  <p className="font-semibold text-[#555]">Retiro sin costo</p>
                  <p className="mt-0.5 text-xs text-[#7d7d7d]">{LOCAL_ADDRESS.split(",")[0]}</p>
                </div>
              </div>
            </div>

            {/* Banner WhatsApp */}
            <div className="mt-4 rounded-xl border border-[#c8e8e6] bg-[#f0fafa] p-4">
              <p className="mb-3 text-[13px] font-semibold text-[#555]">
                ¿Tenés alguna consulta sobre este producto?
              </p>
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
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_330px]">
          <section className="rounded-2xl border border-[#e6e6e6] bg-white p-6">
            <h2 className="mb-3 text-lg font-extrabold uppercase tracking-wide text-[#029f9c]">
              Descripción del producto
            </h2>
            <p className="mb-5 text-[15px] leading-7 text-[#666]">{product.description}</p>
            <ul className="grid gap-2 text-sm text-[#666] sm:grid-cols-2">
              <li>• Materiales resistentes y faciles de limpiar.</li>
              <li>• Diseño pensado para confort diario.</li>
              <li>• Excelente relación precio/calidad.</li>
              <li>• Producto recomendado por clientes frecuentes.</li>
            </ul>
          </section>

          <aside className="rounded-2xl border border-[#e6e6e6] bg-[#f9f9f9] p-6">
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-[#029f9c]">
              Ficha técnica
            </h3>
            <dl className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4 border-b border-[#e5e5e5] pb-2">
                <dt className="text-[#8a8a8a]">Categoría</dt>
                <dd className="font-semibold text-[#555]">{product.category}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-[#e5e5e5] pb-2">
                <dt className="text-[#8a8a8a]">Stock</dt>
                <dd className="font-semibold text-[#555]">{product.stock} unidades</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-[#e5e5e5] pb-2">
                <dt className="text-[#8a8a8a]">Tamaños</dt>
                <dd className="font-semibold text-[#555]">
                  {product.sizes.length ? product.sizes.join(", ") : "No aplica"}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-[#8a8a8a]">Colores</dt>
                <dd className="text-right font-semibold text-[#555]">
                  {product.colors.length ? product.colors.join(", ") : "No aplica"}
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-wide text-[#029f9c]">
              También te puede interesar
            </h2>
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
