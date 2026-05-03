import Link from "next/link";

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

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#18181b]">Productos</h1>
          <p className="text-sm text-[#71717a]">{products.length} productos en la base de datos.</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">+ Nuevo producto</Link>
        </Button>
      </div>
      <ProductsTable products={products} />
    </div>
  );
}
