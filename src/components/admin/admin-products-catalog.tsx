"use client";

import type { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { ProductsTable } from "@/app/admin/products/products-table";
import { Input } from "@/components/ui/input";
import type { AdminGroupRow } from "@/lib/admin-catalog-groups";
import { adminGroupMatchesSearch, prismaProductMatchesSearch } from "@/lib/admin-products-search";

type Props = {
  groups: AdminGroupRow[];
  products: Product[];
  orphanRows: Product[];
};

export function AdminProductsCatalog({ groups, products, orphanRows }: Props) {
  const [q, setQ] = useState("");

  const query = q.trim();
  const filteredGroups = useMemo(
    () => (query ? groups.filter((g) => adminGroupMatchesSearch(g, query, products)) : groups),
    [groups, products, query],
  );
  const filteredOrphans = useMemo(
    () => (query ? orphanRows.filter((p) => prismaProductMatchesSearch(p, query)) : orphanRows),
    [orphanRows, query],
  );
  const filteredProducts = useMemo(
    () => (query ? products.filter((p) => prismaProductMatchesSearch(p, query)) : products),
    [products, query],
  );

  return (
    <>
      <div className="rounded-2xl border border-[#e4e4e7] bg-white p-4 shadow-sm">
        <label htmlFor="admin-catalog-search" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#71717a]">
          Buscar en grupos y productos
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#a1a1aa]"
            aria-hidden
          />
          <Input
            id="admin-catalog-search"
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            placeholder="Nombre del grupo, variante, marca o slug…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="h-11 min-h-[44px] rounded-xl border-[#e4e4e7] pl-11 pr-24 text-base sm:text-sm"
            aria-describedby="admin-catalog-search-hint"
          />
          {query ? (
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#71717a] hover:bg-[#f4f4f5] hover:text-[#029f9c]"
              onClick={() => setQ("")}
            >
              Limpiar
            </button>
          ) : null}
        </div>
        <p id="admin-catalog-search-hint" className="mt-2 text-xs leading-relaxed text-[#71717a]">
          Si encontramos una variante pero no el nombre del grupo, igual mostramos la fila del grupo.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#71717a]">
          Grupos ({filteredGroups.length}
          {query && groups.length !== filteredGroups.length ? ` / ${groups.length}` : ""})
        </h2>
        {filteredGroups.length === 0 && query ? (
          <p className="rounded-xl border border-dashed border-[#e4e4e7] bg-[#fafafa] px-4 py-6 text-sm text-[#71717a]">
            Ningún grupo coincide con «{query}» (ni por nombre de grupo ni por variantes).
          </p>
        ) : (
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
                {filteredGroups.map((g) => (
                  <tr key={g.slug} className="border-b border-[#f4f4f5] last:border-0">
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/products/groups/${encodeURIComponent(g.slug)}`}
                        className="inline-flex min-h-[44px] max-w-[min(100%,24rem)] items-center rounded-lg py-1.5 text-left text-[15px] font-semibold text-[#029f9c] underline-offset-2 hover:underline sm:min-h-0 sm:py-0"
                      >
                        {g.displayName}
                      </Link>
                    </td>
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
        )}
      </section>

      {orphanRows.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wide text-[#71717a]">
            Sin grupo ({filteredOrphans.length}
            {query && orphanRows.length !== filteredOrphans.length ? ` / ${orphanRows.length}` : ""})
          </h2>
          <p className="text-sm text-[#71717a]">
            Presentaciones que no comparten ficha agrupada con otras. Podés asignarlas a un grupo desde la edición del
            producto.
          </p>
          {filteredOrphans.length === 0 && query ? (
            <p className="text-sm text-[#a1a1aa]">Ningún producto suelto coincide con la búsqueda.</p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {filteredOrphans.slice(0, 24).map((p) => (
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
          )}
          {filteredOrphans.length > 24 ? (
            <p className="text-xs text-[#a1a1aa]">Y {filteredOrphans.length - 24} más en la tabla general.</p>
          ) : null}
        </section>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#71717a]">
          Todos los productos ({filteredProducts.length}
          {query && products.length !== filteredProducts.length ? ` / ${products.length}` : ""})
        </h2>
        <ProductsTable products={filteredProducts} embeddedSearch />
      </section>
    </>
  );
}
