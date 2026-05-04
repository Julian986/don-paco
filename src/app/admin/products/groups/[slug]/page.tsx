import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminBackNav } from "@/components/admin/admin-back-nav";
import ProductGroupAdminForm from "@/components/admin/product-group-admin-form";
import { getProductGroupDisplayRow } from "@/lib/product-group-display-overlays";
import { loadMergedGroupDefinitions } from "@/lib/product-group-merge";
import { resolveProductGroupSlug } from "@/lib/product-group-slug";
import { getProductGroupDefinition } from "@/lib/product-groups";
import { prisma } from "@/lib/prisma";
import { getGroupListingIfExists, getProducts } from "@/lib/products-build";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function AdminProductGroupDetailPage({ params }: Props) {
  const { slug: raw } = await params;
  const slug = decodeURIComponent(raw);

  const products = await getProducts();
  const merged = await loadMergedGroupDefinitions(products);
  if (!merged.has(slug)) notFound();

  const def = merged.get(slug)!;
  const staticDef = getProductGroupDefinition(slug);
  const row = await getProductGroupDisplayRow(slug);
  const initialDisplayName = row?.displayName?.trim() || def.displayName;
  const initialDescription = row?.description?.trim() ?? "";
  const initialHeroImageUrl = row?.heroImageUrl?.trim() ?? null;

  const listingPreview = await getGroupListingIfExists(slug);
  const fallbackStorefrontHeroUrl = listingPreview?.imageSrc;

  let prismaProducts: Awaited<ReturnType<typeof prisma.product.findMany>> = [];
  try {
    if (process.env.DATABASE_URL?.trim()) {
      prismaProducts = await prisma.product.findMany({ orderBy: { nombre: "asc" } });
    }
  } catch {
    prismaProducts = [];
  }

  const members = prismaProducts.filter((p) =>
    resolveProductGroupSlug({ slug: p.slug, groupSlug: p.groupSlug ?? null }) === slug,
  );

  return (
    <div className="space-y-10 pb-8">
      <AdminBackNav href="/admin/products">Productos</AdminBackNav>

      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-black tracking-tight text-[#18181b]">{initialDisplayName}</h1>
          <p className="mt-1 text-xs text-[#71717a]">
            Ficha agrupada en la tienda. El enlace público lo mantiene desarrollo si hace falta cambiarlo.
          </p>
        </div>
        <Button
          asChild
          className="h-11 min-h-[44px] shrink-0 rounded-xl bg-[#029f9c] font-semibold text-white hover:bg-[#027a78] sm:h-10 sm:min-h-0"
        >
          <Link href={`/admin/products/new?groupSlug=${encodeURIComponent(slug)}`}>+ Variante en este grupo</Link>
        </Button>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#71717a]">Variantes ({members.length})</h2>
        <div className="overflow-x-auto rounded-xl border border-[#e4e4e7] bg-white">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="border-b border-[#e4e4e7] bg-[#fafafa] text-xs font-bold uppercase tracking-wide text-[#71717a]">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Ref. URL</th>
                <th className="px-4 py-3"> </th>
              </tr>
            </thead>
            <tbody>
              {members.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-[#71717a]">
                    Todavía no hay productos en este grupo.
                  </td>
                </tr>
              ) : (
                members.map((p) => (
                  <tr key={p.id} className="border-b border-[#f4f4f5] last:border-0">
                    <td className="px-4 py-3 font-medium text-[#18181b]">{p.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-[#3f3f46]">{p.slug}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="font-semibold text-[#029f9c] hover:underline"
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-black text-[#18181b]">Ficha del grupo</h2>
        <ProductGroupAdminForm
          mode="edit"
          groupSlug={slug}
          baseDisplayName={staticDef?.displayName ?? def.displayName}
          variantCount={members.length}
          initialDisplayName={initialDisplayName}
          initialDescription={initialDescription}
          initialHeroImageUrl={initialHeroImageUrl}
          fallbackStorefrontHeroUrl={fallbackStorefrontHeroUrl}
          isStaticCatalog={Boolean(staticDef)}
        />
      </section>
    </div>
  );
}
