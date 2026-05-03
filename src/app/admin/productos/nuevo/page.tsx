import AdminProductForm from "@/components/admin/admin-product-form";
import { readCatalogRows } from "@/lib/catalog-store";

export default function AdminProductoNuevoPage() {
  const rows = readCatalogRows();
  const allSlugs = rows.map((r) => r.slug);
  return <AdminProductForm mode="new" initial={null} allSlugs={allSlugs} />;
}
