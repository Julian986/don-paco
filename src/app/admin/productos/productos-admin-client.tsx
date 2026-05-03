"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { AdminProductListItem } from "@/types/admin";
import { formatArs } from "@/lib/product-format";

type SortKey = "nombre" | "precio";

const PAGE_SIZE = 20;

export default function ProductosAdminClient() {
  const [items, setItems] = useState<AdminProductListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [pet, setPet] = useState<string>("");
  const [cat, setCat] = useState<string>("");
  const [soloDest, setSoloDest] = useState(false);
  const [sort, setSort] = useState<SortKey>("nombre");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/catalog");
      const data = (await res.json()) as { items?: AdminProductListItem[]; error?: string };
      if (!res.ok) throw new Error(data.error || "No se pudo cargar");
      setItems(data.items ?? []);
      setSelected(new Set());
      setPage(0);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const categories = useMemo(() => {
    const s = new Set<string>();
    for (const it of items) s.add(it.categoryId);
    return [...s].sort((a, b) => a.localeCompare(b, "es"));
  }, [items]);

  const filtered = useMemo(() => {
    let out = [...items];
    const qq = q.trim().toLowerCase();
    if (qq) {
      out = out.filter(
        (it) =>
          it.nombre.toLowerCase().includes(qq) ||
          it.marca.toLowerCase().includes(qq) ||
          it.slug.toLowerCase().includes(qq),
      );
    }
    if (pet) out = out.filter((it) => it.mascota === pet);
    if (cat) out = out.filter((it) => it.categoryId === cat);
    if (soloDest) out = out.filter((it) => it.destacado);
    out.sort((a, b) => {
      if (sort === "nombre") {
        return `${a.marca} ${a.nombre}`.localeCompare(`${b.marca} ${b.nombre}`, "es");
      }
      return a.priceCard - b.priceCard;
    });
    return out;
  }, [items, q, pet, cat, soloDest, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSafe = Math.min(page, pages - 1);
  const slice = filtered.slice(pageSafe * PAGE_SIZE, pageSafe * PAGE_SIZE + PAGE_SIZE);

  function toggleAllOnPage() {
    const onPage = slice.map((r) => r.slug);
    const allOn = onPage.every((s) => selected.has(s));
    const next = new Set(selected);
    if (allOn) for (const s of onPage) next.delete(s);
    else for (const s of onPage) next.add(s);
    setSelected(next);
  }

  async function persistRows(rows: import("@/lib/catalog-types").CatalogRow[]) {
    const res = await fetch("/api/admin/catalog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rows }),
    });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) throw new Error(data.error || "Error al guardar");
    await load();
  }

  async function removeSlugs(slugs: string[]) {
    if (!slugs.length) return;
    const ok = window.confirm(
      slugs.length === 1
        ? "¿Eliminar este producto? Esta acción no se puede deshacer."
        : `¿Eliminar ${slugs.length} productos? Esta acción no se puede deshacer.`,
    );
    if (!ok) return;
    const resList = await fetch("/api/admin/catalog");
    const data = (await resList.json()) as { rows?: import("@/lib/catalog-types").CatalogRow[] };
    const rows = (data.rows ?? []).filter((r) => !slugs.includes(r.slug));
    await persistRows(rows);
  }

  async function duplicate(it: AdminProductListItem) {
    const resList = await fetch("/api/admin/catalog");
    const data = (await resList.json()) as { rows?: import("@/lib/catalog-types").CatalogRow[] };
    const rows = data.rows ?? [];
    const orig = rows.find((r) => r.slug === it.slug);
    if (!orig) return;
    let n = 2;
    let newSlug = `${it.slug}-copia`;
    while (rows.some((r) => r.slug === newSlug)) {
      newSlug = `${it.slug}-copia-${n}`;
      n += 1;
    }
    const copy = {
      ...orig,
      slug: newSlug,
      nombre: `${orig.nombre} (copia)`,
      updatedAt: new Date().toISOString(),
    };
    await persistRows([...rows, copy]);
  }

  if (loading && items.length === 0) {
    return <p className="text-sm text-[#71717a]">Cargando productos…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#18181b]">Productos</h2>
          <p className="text-sm text-[#71717a]">{items.length} filas en el catálogo (cada fila es una presentación / variante).</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="rounded-lg bg-[#029f9c] px-4 py-2 text-sm font-bold text-white hover:opacity-95"
        >
          + Nuevo
        </Link>
      </div>

      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <div className="flex flex-wrap gap-3 rounded-xl border border-[#e4e4e7] bg-white p-4 shadow-sm">
        <input
          placeholder="Buscar por nombre, marca o slug…"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(0);
          }}
          className="min-w-[200px] flex-1 rounded-lg border border-[#e4e4e7] px-3 py-2 text-sm"
        />
        <select
          value={pet}
          onChange={(e) => {
            setPet(e.target.value);
            setPage(0);
          }}
          className="rounded-lg border border-[#e4e4e7] px-2 py-2 text-sm"
        >
          <option value="">Todas las mascotas</option>
          <option value="perro">Perro</option>
          <option value="gato">Gato</option>
          <option value="pez">Pez</option>
          <option value="general">General</option>
        </select>
        <select
          value={cat}
          onChange={(e) => {
            setCat(e.target.value);
            setPage(0);
          }}
          className="max-w-xs rounded-lg border border-[#e4e4e7] px-2 py-2 text-sm"
        >
          <option value="">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm font-medium text-[#3f3f46]">
          <input type="checkbox" checked={soloDest} onChange={(e) => setSoloDest(e.target.checked)} />
          Destacados
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-lg border border-[#e4e4e7] px-2 py-2 text-sm"
        >
          <option value="nombre">Orden: nombre</option>
          <option value="precio">Orden: precio tarjeta</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={toggleAllOnPage}
          className="text-sm font-semibold text-[#029f9c] hover:underline"
        >
          Seleccionar página
        </button>
        <button
          type="button"
          disabled={selected.size === 0}
          onClick={() => void removeSlugs([...selected])}
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-bold text-red-700 disabled:opacity-40"
        >
          Eliminar seleccionados ({selected.size})
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#e4e4e7] bg-white shadow-sm">
        <table className="min-w-[900px] w-full text-left text-sm">
          <thead className="border-b border-[#e4e4e7] bg-[#fafafa] text-xs font-bold uppercase text-[#71717a]">
            <tr>
              <th className="w-10 px-2 py-2" />
              <th className="px-2 py-2">Img</th>
              <th className="px-2 py-2">Nombre</th>
              <th className="px-2 py-2">Mascota</th>
              <th className="px-2 py-2">Categoría</th>
              <th className="px-2 py-2">Desde</th>
              <th className="px-2 py-2">Var.</th>
              <th className="px-2 py-2">Dest.</th>
              <th className="px-2 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((it) => (
              <tr key={it.slug} className="border-b border-[#f4f4f5] last:border-0">
                <td className="px-2 py-2">
                  <input
                    type="checkbox"
                    checked={selected.has(it.slug)}
                    onChange={() => {
                      const n = new Set(selected);
                      if (n.has(it.slug)) n.delete(it.slug);
                      else n.add(it.slug);
                      setSelected(n);
                    }}
                  />
                </td>
                <td className="px-2 py-2">
                  {it.imageSrc ? (
                    <Image
                      src={it.imageSrc}
                      alt=""
                      width={40}
                      height={40}
                      unoptimized
                      className="h-10 w-10 rounded object-contain"
                    />
                  ) : (
                    <span className="text-xs text-[#a1a1aa]">—</span>
                  )}
                </td>
                <td className="max-w-[220px] px-2 py-2">
                  <div className="font-semibold text-[#18181b]">
                    {it.marca} — {it.nombre}
                  </div>
                  <div className="truncate text-xs text-[#a1a1aa]">{it.slug}</div>
                </td>
                <td className="px-2 py-2 capitalize">{it.mascota}</td>
                <td className="max-w-[180px] truncate px-2 py-2 text-[#52525b]">{it.categoryLabel}</td>
                <td className="whitespace-nowrap px-2 py-2 font-medium">{formatArs(it.priceCard)}</td>
                <td className="px-2 py-2">{it.hasVariants ? "Sí" : "No"}</td>
                <td className="px-2 py-2">{it.destacado ? "★" : "—"}</td>
                <td className="space-x-2 whitespace-nowrap px-2 py-2">
                  <Link href={`/admin/productos/${encodeURIComponent(it.slug)}/editar`} className="font-semibold text-[#029f9c] hover:underline">
                    Editar
                  </Link>
                  <button type="button" className="font-semibold text-[#52525b] hover:underline" onClick={() => void duplicate(it)}>
                    Duplicar
                  </button>
                  <button type="button" className="font-semibold text-red-600 hover:underline" onClick={() => void removeSlugs([it.slug])}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <p className="text-[#71717a]">
          Página {pageSafe + 1} de {pages} · {filtered.length} resultados
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={pageSafe <= 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="rounded-lg border border-[#e4e4e7] px-3 py-1 disabled:opacity-40"
          >
            Anterior
          </button>
          <button
            type="button"
            disabled={pageSafe >= pages - 1}
            onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
            className="rounded-lg border border-[#e4e4e7] px-3 py-1 disabled:opacity-40"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
