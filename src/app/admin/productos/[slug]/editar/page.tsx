import { notFound } from "next/navigation";

import AdminProductForm from "@/components/admin/admin-product-form";
import { readCatalogRows } from "@/lib/catalog-store";

type Props = { params: Promise<{ slug: string }> };

export default async function AdminProductoEditarPage({ params }: Props) {
  const { slug: raw } = await params;
  const slug = decodeURIComponent(raw);
  const rows = readCatalogRows();
  const row = rows.find((r) => r.slug === slug);
  if (!row) notFound();
  const allSlugs = rows.map((r) => r.slug);
  return <AdminProductForm mode="edit" initial={row} allSlugs={allSlugs} />;
}
