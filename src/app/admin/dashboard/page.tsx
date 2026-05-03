import { OrderStatus } from "@prisma/client";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  let productCount = 0;
  let pendingOrders = 0;
  let dbError = false;
  try {
    if (process.env.DATABASE_URL?.trim()) {
      productCount = await prisma.product.count();
      pendingOrders = await prisma.order.count({
        where: { status: { in: [OrderStatus.PENDING, OrderStatus.CONFIRMED] } },
      });
    } else {
      dbError = true;
    }
  } catch {
    dbError = true;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-[#18181b]">Dashboard</h1>
        <p className="text-sm text-[#71717a]">Resumen de la tienda y accesos rápidos.</p>
        {dbError && (
          <p className="mt-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
            Configurá <code className="rounded bg-amber-100 px-1">DATABASE_URL</code> (MongoDB) y ejecutá{" "}
            <code className="rounded bg-amber-100 px-1">npx prisma db push</code> para activar el panel con datos
            persistentes.
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Productos publicados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-black text-[#029f9c]">{productCount}</p>
            <Link href="/admin/products" className="mt-2 inline-block text-sm font-semibold text-[#029f9c] hover:underline">
              Ver productos →
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pedidos pendientes / confirmados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-black text-[#e4077d]">{pendingOrders}</p>
            <Link href="/admin/orders" className="mt-2 inline-block text-sm font-semibold text-[#029f9c] hover:underline">
              Ver pedidos →
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Acción rápida</CardTitle>
          </CardHeader>
          <CardContent>
            <Link
              href="/admin/products/new"
              className="inline-flex rounded-lg bg-[#029f9c] px-4 py-2 text-sm font-bold text-white hover:opacity-95"
            >
              + Nuevo producto
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
