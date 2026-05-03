import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import type { CatalogRow } from "@/lib/catalog-types";
import { readCatalogRows, writeCatalogRows } from "@/lib/catalog-store";
import { catalogRowToAdminListItem } from "@/lib/admin-catalog-mapper";
import { isCategoryId } from "@/lib/category-tree";

function validateRows(rows: unknown): CatalogRow[] | { error: string } {
  if (!Array.isArray(rows)) return { error: "Se esperaba un array de productos" };
  const slugs = new Set<string>();
  const out: CatalogRow[] = [];
  for (const r of rows) {
    if (!r || typeof r !== "object") return { error: "Fila inválida" };
    const row = r as Record<string, unknown>;
    const slug = typeof row.slug === "string" ? row.slug.trim() : "";
    const marca = typeof row.marca === "string" ? row.marca.trim() : "";
    const nombre = typeof row.nombre === "string" ? row.nombre.trim() : "";
    const categoryId = typeof row.categoryId === "string" ? row.categoryId.trim() : "";
    const lista = typeof row.lista === "number" ? row.lista : Number(row.lista);
    if (!slug || !marca || !nombre || !isCategoryId(categoryId)) {
      return { error: `Fila inválida o categoría desconocida: ${slug || "(sin slug)"}` };
    }
    if (!Number.isFinite(lista) || lista < 0) {
      return { error: `Precio de lista inválido: ${slug}` };
    }
    if (slugs.has(slug)) return { error: `Slug duplicado: ${slug}` };
    slugs.add(slug);

    let cash: number | null = null;
    if (row.cash !== null && row.cash !== undefined && row.cash !== "") {
      const c = typeof row.cash === "number" ? row.cash : Number(row.cash);
      if (!Number.isFinite(c) || c < 0) return { error: `Precio efectivo inválido: ${slug}` };
      cash = c;
    }

    const imageSrc =
      typeof row.imageSrc === "string" && row.imageSrc.trim() ? row.imageSrc.trim() : null;
    const descripcion =
      typeof row.descripcion === "string" && row.descripcion.trim() ? row.descripcion.trim() : null;
    const destacado = row.destacado === true;
    const updatedAt =
      typeof row.updatedAt === "string" && row.updatedAt.trim() ? row.updatedAt.trim() : null;

    out.push({
      slug,
      marca,
      nombre,
      lista,
      cash,
      categoryId,
      imageSrc: imageSrc || undefined,
      destacado: destacado || undefined,
      descripcion: descripcion || undefined,
      updatedAt: updatedAt || undefined,
    });
  }
  return out;
}

export async function GET() {
  const rows = readCatalogRows();
  const items = rows.map(catalogRowToAdminListItem);
  return NextResponse.json({ rows, items });
}

export async function PUT(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = body as { rows?: unknown };
  const validated = validateRows(parsed.rows);
  if ("error" in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const stamped = validated.map((r) => ({
    ...r,
    updatedAt: new Date().toISOString(),
  }));

  writeCatalogRows(stamped);
  revalidatePath("/");
  revalidatePath("/productos", "layout");

  return NextResponse.json({ ok: true, count: stamped.length });
}
