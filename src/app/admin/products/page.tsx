import Link from "next/link";

import { listAdminGroups, listStandaloneCatalogProducts } from "@/lib/admin-catalog-groups";
import { ProductsTable } from "@/app/admin/products/products-table";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = [];
  try {
    if (process.env.DATABASE_URL?.trim()) {
      products = await prisma.product.findMany({ orderBy: { updatedAt: "desc" } });
    }
  } catch {
    products = [];
  }

  const groups = await listAdminGroups();
  const standaloneCatalog = await listStandaloneCatalogProducts();
  const standaloneSlugs = new Set(standaloneCatalog.map((p) => p.slug));
  const orphanRows = products.filter((p) => standaloneSlugs.has(p.slug));

  return (
    <div className="space-y-10 pb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-black tracking-tight text-[#18181b]">Productos</h1>
          <p className="mt-1 text-sm leading-relaxed text-[#71717a]">
            Gestioná por <strong className="font-semibold text-[#52525b]">grupo</strong> (misma ficha en la tienda) y
            después las variantes. Los que no están en ningún grupo aparecen abajo como sueltos.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button
            asChild
            variant="outline"
            className="h-11 min-h-[44px] rounded-xl border-[#029f9c]/40 font-semibold text-[#029f9c] hover:bg-[#029f9c]/5 sm:h-10 sm:min-h-0"
          >
            <Link href="/admin/products/groups/new">+ Nuevo grupo</Link>
          </Button>
          <Button
            asChild
            className="h-11 min-h-[44px] shrink-0 rounded-xl bg-[#029f9c] font-semibold text-white hover:bg-[#027a78] sm:h-10 sm:min-h-0"
          >
            <Link href="/admin/products/new">+ Nuevo producto</Link>
          </Button>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#71717a]">
          Grupos ({groups.length})
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[#e4e4e7] bg-white shadow-sm">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="border-b border-[#e4e4e7] bg-[#fafafa] text-xs font-bold uppercase tracking-wide text-[#71717a]">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Ref. URL</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Variantes</th>
                <th className="px-4 py-3"> </th>
              </tr>
            </thead>
            <tbody>
              {groups.map((g) => (
                <tr key={g.slug} className="border-b border-[#f4f4f5] last:border-0">
                  <td className="px-4 py-3 font-medium text-[#18181b]">{g.displayName}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[#3f3f46]">{g.slug}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        g.kind === "static"
                          ? "rounded-full bg-[#f4f4f5] px-2 py-0.5 text-[11px] font-bold uppercase text-[#71717a]"
                          : "rounded-full bg-[#029f9c]/10 px-2 py-0.5 text-[11px] font-bold uppercase text-[#029f9c]"
                      }
                    >
                      {g.kind === "static" ? "Catálogo base" : "Panel"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#71717a]">{g.variantCount}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/products/groups/${encodeURIComponent(g.slug)}`}
                      className="font-semibold text-[#029f9c] hover:underline"
                    >
                      Abrir
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {orphanRows.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wide text-[#71717a]">
            Sin grupo ({orphanRows.length})
          </h2>
          <p className="text-sm text-[#71717a]">
            Presentaciones que no comparten ficha agrupada con otras. Podés asignarlas a un grupo desde la edición del
            producto.
          </p>
          <ul className="flex flex-wrap gap-2">
            {orphanRows.slice(0, 24).map((p) => (
              <li key={p.id}>
                <Link
                  href={`/admin/products/${p.id}/edit`}
                  className="inline-flex rounded-lg border border-[#e4e4e7] bg-white px-3 py-1.5 text-sm font-medium text-[#3f3f46] hover:border-[#029f9c]/40 hover:text-[#029f9c]"
                >
                  {p.nombre || p.name}
                </Link>
              </li>
            ))}
          </ul>
          {orphanRows.length > 24 ? (
            <p className="text-xs text-[#a1a1aa]">Y {orphanRows.length - 24} más en la tabla general.</p>
          ) : null}
        </section>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#71717a]">
          Todos los productos ({products.length})
        </h2>
        <ProductsTable products={products} />
      </section>
    </div>
  );
}
