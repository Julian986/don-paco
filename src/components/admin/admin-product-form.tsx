"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { listCategorySelectOptions } from "@/lib/admin-category-select";
import type { CatalogRow } from "@/lib/catalog-types";
import { CATEGORY_IDS, type CategoryId } from "@/lib/category-tree";
import { formatArs } from "@/lib/product-format";
import { precioTarjetaDesdeLista } from "@/lib/pricing";

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function defaultRow(): CatalogRow {
  return {
    slug: "",
    marca: "",
    nombre: "",
    lista: 0,
    cash: null,
    categoryId: CATEGORY_IDS[0]!,
  };
}

type AdminProductFormProps = {
  mode: "new" | "edit";
  initial: CatalogRow | null;
  allSlugs: string[];
};

export default function AdminProductForm({ mode, initial, allSlugs }: AdminProductFormProps) {
  const router = useRouter();
  const categoryOptions = useMemo(() => listCategorySelectOptions(), []);
  const base = initial ?? defaultRow();
  const [slug, setSlug] = useState(base.slug);
  const [marca, setMarca] = useState(base.marca);
  const [nombre, setNombre] = useState(base.nombre);
  const [lista, setLista] = useState<number>(base.lista);
  const [cash, setCash] = useState<string>(base.cash === null || base.cash === undefined ? "" : String(base.cash));
  const [categoryId, setCategoryId] = useState<CategoryId>(base.categoryId);
  const [imageSrc, setImageSrc] = useState(base.imageSrc?.trim() ?? "");
  const [destacado, setDestacado] = useState(Boolean(base.destacado));
  const [descripcion, setDescripcion] = useState(base.descripcion?.trim() ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const tarjeta = useMemo(() => precioTarjetaDesdeLista(Number(lista) || 0), [lista]);

  const isSlugTaken = useCallback(
    (s: string) => {
      if (mode === "edit" && s === initial?.slug) return false;
      return allSlugs.includes(s);
    },
    [allSlugs, mode, initial?.slug],
  );

  const suggestSlug = useCallback(() => {
    const raw = `${marca}-${nombre}`.trim() || nombre.trim() || marca.trim();
    if (!raw) return;
    setSlug(slugify(raw));
  }, [marca, nombre]);

  const suggestCash = () => {
    const l = Number(lista) || 0;
    if (!l) return;
    setCash(String(Math.round(l * 0.9)));
  };

  async function onUploadFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.set("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = (await res.json()) as { path?: string; error?: string };
      if (!res.ok) throw new Error(data.error || "No se pudo subir");
      if (data.path) setImageSrc(data.path);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al subir");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const slugTrim = slug.trim();
    const marcaTrim = marca.trim();
    const nombreTrim = nombre.trim();
    if (!slugTrim || !marcaTrim || !nombreTrim) {
      setError("Completá slug, marca y nombre.");
      return;
    }
    if (!Number.isFinite(lista) || lista < 0) {
      setError("El precio de lista debe ser un número válido.");
      return;
    }
    let cashNum: number | null = null;
    if (cash.trim() !== "") {
      const n = Number(cash.replace(",", "."));
      if (!Number.isFinite(n) || n < 0) {
        setError("Precio efectivo / transferencia inválido.");
        return;
      }
      cashNum = Math.round(n);
    }

    if (isSlugTaken(slugTrim)) {
      setError("Ese slug ya existe. Cambiá el slug o editá el producto existente.");
      return;
    }

    const row: CatalogRow = {
      slug: slugTrim,
      marca: marcaTrim,
      nombre: nombreTrim,
      lista: Math.round(lista),
      cash: cashNum,
      categoryId,
      imageSrc: imageSrc.trim() || undefined,
      destacado: destacado || undefined,
      descripcion: descripcion.trim() || undefined,
    };

    setSaving(true);
    try {
      const resList = await fetch("/api/admin/catalog");
      const listData = (await resList.json()) as { rows?: CatalogRow[]; error?: string };
      if (!resList.ok || !listData.rows) {
        throw new Error(listData.error || "No se pudo leer el catálogo");
      }
      let rows = [...listData.rows];
      if (mode === "new") {
        rows.push(row);
      } else {
        const idx = rows.findIndex((r) => r.slug === initial?.slug);
        if (idx < 0) {
          setError("No se encontró el producto original.");
          return;
        }
        if (initial?.slug !== slugTrim) {
          rows = rows.filter((r) => r.slug !== initial!.slug);
          rows.push(row);
        } else {
          rows[idx] = row;
        }
      }

      const put = await fetch("/api/admin/catalog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows }),
      });
      const putData = (await put.json()) as { error?: string };
      if (!put.ok) throw new Error(putData.error || "No se pudo guardar");

      router.push("/admin/productos");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="mx-auto max-w-3xl space-y-6" onSubmit={onSubmit}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-black text-[#18181b]">{mode === "new" ? "Nuevo producto" : "Editar producto"}</h2>
        {mode === "edit" && initial?.slug && (
          <Link
            href={`/productos/${encodeURIComponent(initial.slug)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#029f9c] hover:underline"
          >
            Ver en tienda ↗
          </Link>
        )}
      </div>

      {error && <p className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-semibold">Nombre</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full rounded-lg border border-[#e4e4e7] px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold">Marca</label>
          <input
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            className="w-full rounded-lg border border-[#e4e4e7] px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold">Slug (URL)</label>
          <div className="flex gap-2">
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="min-w-0 flex-1 rounded-lg border border-[#e4e4e7] px-3 py-2 text-sm"
              required
            />
            <button
              type="button"
              onClick={suggestSlug}
              className="shrink-0 rounded-lg border border-[#e4e4e7] px-2 text-xs font-semibold text-[#52525b] hover:bg-[#f4f4f5]"
            >
              Auto
            </button>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-semibold">Categoría</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value as CategoryId)}
            className="w-full rounded-lg border border-[#e4e4e7] px-3 py-2 text-sm"
          >
            {categoryOptions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold">Precio de lista (ARS)</label>
          <input
            type="number"
            min={0}
            step={1}
            value={Number.isFinite(lista) ? lista : 0}
            onChange={(e) => setLista(Number(e.target.value))}
            className="w-full rounded-lg border border-[#e4e4e7] px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold">Con tarjeta (calculado +10%)</label>
          <p className="rounded-lg border border-dashed border-[#e4e4e7] bg-[#fafafa] px-3 py-2 text-sm font-bold text-[#18181b]">
            {formatArs(tarjeta)}
          </p>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold">Efectivo / transferencia (ARS)</label>
          <div className="flex gap-2">
            <input
              type="number"
              min={0}
              step={1}
              value={cash}
              onChange={(e) => setCash(e.target.value)}
              placeholder="Vacío = usa lista"
              className="min-w-0 flex-1 rounded-lg border border-[#e4e4e7] px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={suggestCash}
              className="shrink-0 rounded-lg border border-[#e4e4e7] px-2 text-xs font-semibold text-[#52525b] hover:bg-[#f4f4f5]"
            >
              −10%
            </button>
          </div>
          <p className="mt-1 text-xs text-[#71717a]">
            Si lo dejás vacío, en la tienda el efectivo coincide con el precio de lista (como en el Excel original).
          </p>
        </div>
        <div className="flex items-center gap-2 sm:col-span-2">
          <input id="dest" type="checkbox" checked={destacado} onChange={(e) => setDestacado(e.target.checked)} />
          <label htmlFor="dest" className="text-sm font-semibold">
            Destacado
          </label>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-semibold">Descripción (opcional)</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-[#e4e4e7] px-3 py-2 text-sm"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-semibold">Imagen</label>
          <p className="mb-2 text-xs text-[#71717a]">
            Ruta bajo <code className="rounded bg-[#f4f4f5] px-1">/public</code> (ej.{" "}
            <code className="rounded bg-[#f4f4f5] px-1">/Perros/alimentos-secos/foo.webp</code>) o subí un archivo.
          </p>
          <input
            value={imageSrc}
            onChange={(e) => setImageSrc(e.target.value)}
            placeholder="/uploads/....webp"
            className="mb-3 w-full rounded-lg border border-[#e4e4e7] px-3 py-2 text-sm"
          />
          <div
            className="rounded-xl border-2 border-dashed border-[#d4d4d8] bg-[#fafafa] px-4 py-8 text-center text-sm text-[#71717a]"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files[0];
              if (f) void onUploadFile(f);
            }}
          >
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="mx-auto block text-sm"
              disabled={uploading}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void onUploadFile(f);
              }}
            />
            <p className="mt-2">{uploading ? "Subiendo…" : "Arrastrá una imagen aquí o elegí un archivo"}</p>
          </div>
          {imageSrc ? (
            <div className="mt-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageSrc} alt="" className="h-32 w-auto max-w-full rounded-lg border object-contain" />
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-[#029f9c] px-5 py-2 text-sm font-bold text-white disabled:opacity-60"
        >
          {saving ? "Guardando…" : "Guardar"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-[#e4e4e7] bg-white px-5 py-2 text-sm font-semibold text-[#52525b]"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
