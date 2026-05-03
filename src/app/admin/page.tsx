import Link from "next/link";

import { catalogRowToAdminListItem, inferPetFromCategoryId } from "@/lib/admin-catalog-mapper";
import { readCatalogRows } from "@/lib/catalog-store";
import { productImageBySlug } from "@/lib/product-image-maps";

export default function AdminDashboardPage() {
  const rows = readCatalogRows();
  const total = rows.length;
  const perro = rows.filter((r) => inferPetFromCategoryId(r.categoryId) === "perro").length;
  const gato = rows.filter((r) => inferPetFromCategoryId(r.categoryId) === "gato").length;
  const pez = rows.filter((r) => inferPetFromCategoryId(r.categoryId) === "pez").length;
  const sinImagen = rows.filter((r) => {
    const img = r.imageSrc?.trim() || productImageBySlug[r.slug];
    return !img;
  }).length;

  const recent = [...rows]
    .map((r) => ({ row: r, item: catalogRowToAdminListItem(r) }))
    .sort((a, b) => {
      const ta = a.row.updatedAt ? new Date(a.row.updatedAt).getTime() : 0;
      const tb = b.row.updatedAt ? new Date(b.row.updatedAt).getTime() : 0;
      return tb - ta;
    })
    .slice(0, 8);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#18181b]">Dashboard</h2>
          <p className="text-sm text-[#71717a]">Resumen del catálogo publicado en la tienda.</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="rounded-lg bg-[#029f9c] px-4 py-2 text-sm font-bold text-white hover:opacity-95"
        >
          + Agregar producto
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total productos", value: total },
          { label: "Perros", value: perro },
          { label: "Gatos", value: gato },
          { label: "Peces", value: pez },
        ].map((c) => (
          <div key={c.label} className="rounded-xl border border-[#e4e4e7] bg-white p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-[#a1a1aa]">{c.label}</p>
            <p className="mt-1 text-3xl font-black text-[#18181b]">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[#e4e4e7] bg-white p-4 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wide text-[#a1a1aa]">Sin imagen asignada</p>
        <p className="mt-1 text-2xl font-black text-[#e4077d]">{sinImagen}</p>
        <p className="mt-1 text-sm text-[#71717a]">
          Corregí la ruta en el producto o subí una imagen desde el formulario de edición.
        </p>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-bold text-[#18181b]">Últimos movimientos</h3>
        <div className="overflow-hidden rounded-xl border border-[#e4e4e7] bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#e4e4e7] bg-[#fafafa] text-xs font-bold uppercase text-[#71717a]">
              <tr>
                <th className="px-4 py-2">Producto</th>
                <th className="px-4 py-2">Categoría</th>
                <th className="hidden px-4 py-2 md:table-cell">Actualizado</th>
              </tr>
            </thead>
            <tbody>
              {recent.map(({ row, item }) => (
                <tr key={row.slug} className="border-b border-[#f4f4f5] last:border-0">
                  <td className="px-4 py-2 font-medium text-[#18181b]">
                    <Link href={`/admin/productos/${encodeURIComponent(row.slug)}/editar`} className="text-[#029f9c] hover:underline">
                      {item.marca} — {item.nombre}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-[#52525b]">{item.categoryLabel}</td>
                  <td className="hidden px-4 py-2 text-[#71717a] md:table-cell">
                    {row.updatedAt ? new Date(row.updatedAt).toLocaleString("es-AR") : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
