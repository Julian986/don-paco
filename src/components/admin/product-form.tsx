"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Product as DbProduct } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createProduct, updateProduct } from "@/actions/product";
import { uploadProductImage } from "@/actions/cloudinary";
import { listCategorySelectOptions } from "@/lib/admin-category-select";
import { formatArs } from "@/lib/product-format";
import { precioTarjetaDesdeLista } from "@/lib/pricing";
import { productPayloadSchema } from "@/lib/validations/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formSchema = productPayloadSchema;
export type ProductFormValues = z.infer<typeof formSchema>;

type Props = {
  mode: "create" | "edit";
  productId?: string;
  defaultValues: ProductFormValues;
};

export default function ProductForm({ mode, productId, defaultValues }: Props) {
  const router = useRouter();
  const categories = listCategorySelectOptions();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const lista = form.watch("lista");
  const images = form.watch("images") ?? [];

  function appendImage(url: string) {
    form.setValue("images", [...images, url], { shouldValidate: true });
  }

  function removeImageAt(i: number) {
    form.setValue(
      "images",
      images.filter((_, idx) => idx !== i),
      { shouldValidate: true },
    );
  }

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.set("file", file);
    const res = await uploadProductImage(fd);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    if (res.url) {
      appendImage(res.url);
      toast.success("Imagen subida");
    }
    e.target.value = "";
  }

  async function onSubmit(data: ProductFormValues) {
    if (mode === "create" && (!data.images || data.images.length === 0)) {
      toast.error("Agregá al menos una imagen (URL o subida a Cloudinary)");
      return;
    }
    try {
      if (mode === "create") {
        await createProduct(data);
        toast.success("Producto creado");
      } else if (productId) {
        await updateProduct(productId, data);
        toast.success("Producto actualizado");
      }
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error";
      if (msg === "SLUG_EXISTS") toast.error("Ese slug ya existe");
      else if (msg === "NOT_FOUND") toast.error("Producto no encontrado");
      else if (msg.includes("ZodError")) toast.error("Revisá los datos del formulario");
      else toast.error(msg);
    }
  }

  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
        <CardTitle>{mode === "create" ? "Nuevo producto" : "Editar producto"}</CardTitle>
        {mode === "edit" && defaultValues.slug ? (
          <Link
            href={`/productos/${encodeURIComponent(defaultValues.slug)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#029f9c] hover:underline"
          >
            Ver en tienda ↗
          </Link>
        ) : null}
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="name">Nombre completo (titular)</Label>
              <Input id="name" {...form.register("name")} />
              {form.formState.errors.name && (
                <p className="text-xs text-red-600">{form.formState.errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="marca">Marca</Label>
              <Input id="marca" {...form.register("marca")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nombre">Presentación / variante</Label>
              <Input id="nombre" {...form.register("nombre")} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input id="slug" {...form.register("slug")} />
              {form.formState.errors.slug && (
                <p className="text-xs text-red-600">{form.formState.errors.slug.message}</p>
              )}
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="categoryId">Categoría</Label>
              <select
                id="categoryId"
                className="flex h-9 w-full rounded-md border border-[#e4e4e7] bg-white px-3 text-sm"
                {...form.register("categoryId")}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lista">Precio de lista (ARS)</Label>
              <Input id="lista" type="number" step="1" {...form.register("lista", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>Precio con tarjeta (+10%)</Label>
              <p className="flex h-9 items-center rounded-md border border-dashed border-[#e4e4e7] bg-[#fafafa] px-3 text-sm font-bold">
                {formatArs(precioTarjetaDesdeLista(Number(lista) || 0))}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cash">Efectivo / transferencia (vacío = usa lista)</Label>
              <Input id="cash" type="number" step="1" placeholder="Opcional" {...form.register("cash")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" type="number" {...form.register("stock", { valueAsNumber: true })} />
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <input id="destacado" type="checkbox" {...form.register("destacado")} />
              <Label htmlFor="destacado">Destacado</Label>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description">Descripción</Label>
              <textarea
                id="description"
                rows={4}
                className="flex w-full rounded-md border border-[#e4e4e7] bg-white px-3 py-2 text-sm"
                {...form.register("description")}
              />
            </div>

            <div className="space-y-3 sm:col-span-2">
              <Label>Imágenes</Label>
              <p className="text-xs text-[#71717a]">Subí archivos a Cloudinary o agregá una URL manual.</p>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" size="sm" asChild>
                  <label className="cursor-pointer">
                    Subir imagen
                    <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
                  </label>
                </Button>
                <Input
                  placeholder="https://… o /ruta/local.webp"
                  className="max-w-md"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const v = (e.target as HTMLInputElement).value.trim();
                      if (v) {
                        appendImage(v);
                        (e.target as HTMLInputElement).value = "";
                      }
                    }
                  }}
                />
              </div>
              <ul className="space-y-2">
                {images.map((url, i) => (
                  <li key={`${url}-${i}`} className="flex items-center gap-2 text-sm">
                    <span className="truncate rounded bg-[#f4f4f5] px-2 py-1 font-mono text-xs">{url}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeImageAt(i)}>
                      Quitar
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="submit">{mode === "create" ? "Crear" : "Guardar"}</Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function productToFormValues(p: DbProduct): ProductFormValues {
  return {
    slug: p.slug,
    name: p.name,
    marca: p.marca,
    nombre: p.nombre,
    description: p.description ?? "",
    lista: p.lista,
    cash: p.cash ?? null,
    categoryId: p.categoryId as ProductFormValues["categoryId"],
    stock: p.stock,
    images: [...p.images],
    destacado: p.destacado,
  };
}
