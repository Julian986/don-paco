"use client";

import type { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { deleteProduct } from "@/actions/product";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatArs } from "@/lib/product-format";
import { precioTarjetaDesdeLista } from "@/lib/pricing";

export function ProductsTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function onDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteProduct(id);
      toast.success("Producto eliminado");
      router.refresh();
    } catch {
      toast.error("No se pudo eliminar");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="rounded-xl border border-[#e4e4e7] bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-14">Img</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Tarjeta</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => {
            const thumb = p.images[0];
            return (
              <TableRow key={p.id}>
                <TableCell>
                  {thumb ? (
                    <Image src={thumb} alt="" width={40} height={40} unoptimized className="h-10 w-10 rounded object-cover" />
                  ) : (
                    <span className="text-xs text-[#a1a1aa]">—</span>
                  )}
                </TableCell>
                <TableCell className="max-w-[200px] font-medium">
                  <div className="truncate">{p.name}</div>
                </TableCell>
                <TableCell className="font-mono text-xs text-[#71717a]">{p.slug}</TableCell>
                <TableCell className="whitespace-nowrap font-semibold">{formatArs(precioTarjetaDesdeLista(p.lista))}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/products/${p.id}/edit`}>Editar</Link>
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          Eliminar
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>¿Eliminar producto?</DialogTitle>
                        </DialogHeader>
                        <p className="text-sm text-[#52525b]">Esta acción no se puede deshacer.</p>
                        <div className="flex justify-end gap-2">
                          <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                          </DialogClose>
                          <Button
                            variant="destructive"
                            disabled={deletingId === p.id}
                            onClick={() => void onDelete(p.id)}
                          >
                            {deletingId === p.id ? "Eliminando…" : "Sí, eliminar"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {products.length === 0 && (
        <p className="p-8 text-center text-sm text-[#71717a]">
          No hay productos. Importá el catálogo con{" "}
          <code className="rounded bg-[#f4f4f5] px-1">npm run db:seed</code> o creá uno nuevo.
        </p>
      )}
    </div>
  );
}
