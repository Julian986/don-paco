"use client";

import { useEffect, useMemo, useState } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import PawIcon from "@/components/paw-icon";
import { Button } from "@/components/ui/button";
import { CategoryFilterPicker } from "@/components/admin/category-filter-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { GroupSelectOption } from "@/lib/admin/product-form-values";
import type { ProductFormValues } from "@/lib/admin/product-form-values";
import { categoryBadgeLabel, isCategoryId, type CategoryId } from "@/lib/category-tree";
import { formatArs } from "@/lib/product-format";
import { listaDesdePrecioTarjeta, precioEfectivoTransfer, precioTarjetaDesdeLista } from "@/lib/pricing";
import { cn } from "@/lib/utils";

type Props = {
  mode?: "create" | "edit";
  form: UseFormReturn<ProductFormValues>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  groupSelectOptions: GroupSelectOption[];
};

function normalizeGalleryImages(images: string[] | undefined | null): string[] {
  return images?.map((u) => u?.trim()).filter((u): u is string => Boolean(u)) ?? [];
}

export function ProductFormStorefront({
  mode = "edit",
  form,
  onSubmit,
  onUpload,
  groupSelectOptions,
}: Props) {
  const router = useRouter();
  const isCreate = mode === "create";
  const { register, watch, setValue, control, formState } = form;
  const v = watch();
  const images = v.images ?? [];
  const gallery = useMemo(() => normalizeGalleryImages(images), [images]);
  /** URL mostrada arriba; al tocar una miniatura se fuerza; si deja de existir en la galería se corrige en el effect. */
  const [heroUrl, setHeroUrl] = useState<string | null>(null);

  useEffect(() => {
    if (gallery.length === 0) {
      setHeroUrl(null);
      return;
    }
    setHeroUrl((prev) => (prev && gallery.includes(prev) ? prev : gallery[0]!));
  }, [gallery]);

  const mainImg = useMemo(() => {
    if (gallery.length === 0) return undefined;
    if (heroUrl && gallery.includes(heroUrl)) return heroUrl;
    return gallery[0];
  }, [gallery, heroUrl]);
  const lista = Number(v.lista) || 0;
  const cr = v.cash;
  const cash =
    cr === null || cr === undefined || (typeof cr === "number" && Number.isNaN(cr))
      ? null
      : typeof cr === "number"
        ? cr
        : null;
  const price = precioTarjetaDesdeLista(lista);
  const cashPrice = precioEfectivoTransfer(lista, cash);
  const catId = v.categoryId;
  const catLabel = isCategoryId(catId) ? categoryBadgeLabel(catId) : "Sin categoría";
  const slugWatch = (v.slug || "").trim();
  const shortLine = `${formatArs(price)} con tarjeta · ${v.marca || "—"}`.trim();
  return (
    <form onSubmit={onSubmit} className="pb-28 md:pb-0">
      <section className="mx-auto w-full max-w-7xl">
        {isCreate ? (
          <div className="mb-4 rounded-xl border border-[#e4e4e7] bg-white px-4 py-3 shadow-sm">
            <h1 className="text-xl font-black tracking-tight text-[#18181b] md:text-2xl">Nuevo producto</h1>
            <p className="mt-1 text-sm text-[#71717a]">
              Misma vista que al editar: completá la ficha, definí el slug y subí al menos una imagen.
            </p>
          </div>
        ) : null}

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {!isCreate && slugWatch ? (
              <Button type="button" variant="outline" size="sm" className="rounded-xl" asChild>
                <Link href={`/productos/${encodeURIComponent(slugWatch)}`} target="_blank" rel="noopener noreferrer">
                  Ver en tienda ↗
                </Link>
              </Button>
            ) : null}
          </div>
          <div className="hidden gap-2 md:flex">
            <Button type="button" variant="outline" className="rounded-xl" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button type="submit" className="rounded-xl bg-[#029f9c] font-semibold hover:bg-[#027a78]">
              {isCreate ? "Crear producto" : "Guardar cambios"}
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Columna imagen — misma jerarquía que la tienda */}
          <div>
            <div className="mb-4 rounded-2xl border border-[#e6e6e6] bg-gradient-to-br from-[#f6f6f6] to-[#ececec] p-4 sm:p-6">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-[#a1a1aa]">
                Vista principal{gallery.length > 1 ? " — tocá una miniatura abajo para elegir" : ""}
              </p>
              <div className="relative flex h-56 items-center justify-center rounded-xl bg-white/80 sm:h-72 md:h-[320px]">
                {mainImg ? (
                  <Image
                    key={mainImg}
                    src={mainImg}
                    alt={v.name || "Producto"}
                    width={720}
                    height={720}
                    className="max-h-full w-auto max-w-full object-contain p-4 sm:p-6"
                    unoptimized
                    priority
                  />
                ) : (
                  <PawIcon className="h-20 w-20 text-[#029f9c] md:h-24 md:w-24" />
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wide text-[#71717a]">Galería del producto</Label>
                <p className="mt-1 text-xs leading-snug text-[#a1a1aa]">
                  Imágenes de esta variante en la ficha. La imagen común del grupo (card con varios formatos) se edita en
                  Productos → grupo, no en esta pantalla.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" size="sm" className="rounded-xl" asChild>
                  <label className="cursor-pointer">
                    Subir imagen
                    <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
                  </label>
                </Button>
                <Input
                  placeholder="Pegá URL y Enter"
                  className="max-w-xs rounded-xl"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const el = e.target as HTMLInputElement;
                      const url = el.value.trim();
                      if (!url) return;
                      const imgs = images;
                      setValue("images", [...imgs, url], { shouldValidate: true });
                      el.value = "";
                    }
                  }}
                />
              </div>
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {images.map((url, i) => {
                  const trimmed = url?.trim() ?? "";
                  const isHero = Boolean(trimmed && mainImg === trimmed);
                  return (
                    <li
                      key={`${trimmed}-${i}`}
                      className={cn(
                        "relative flex aspect-square cursor-pointer list-none items-center justify-center overflow-hidden rounded-xl border bg-white transition-shadow",
                        isHero
                          ? "border-[#029f9c] ring-2 ring-[#029f9c]/35 shadow-md"
                          : "border-[#e2e2e2] hover:border-[#029f9c]/50",
                      )}
                      tabIndex={0}
                      onClick={() => {
                        if (trimmed) setHeroUrl(trimmed);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          if (trimmed) setHeroUrl(trimmed);
                        }
                      }}
                    >
                      {trimmed ? (
                        <Image src={trimmed} alt="" fill className="object-contain p-1" unoptimized />
                      ) : null}
                      <button
                        type="button"
                        className="absolute right-1 top-1 z-10 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white hover:bg-black/80"
                        onClick={(e) => {
                          e.stopPropagation();
                          setValue(
                            "images",
                            images.filter((_, idx) => idx !== i),
                            { shouldValidate: true },
                          );
                        }}
                      >
                        ✕
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Columna ficha — precios y título editables */}
          <div className="rounded-2xl border border-[#e6e6e6] bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase">
              <span className="rounded-full bg-[#029f9c]/15 px-2.5 py-1 text-[#029f9c]">{catLabel}</span>
              <span className="rounded-full bg-[#f0f0f0] px-2.5 py-1 text-[#777]">
                Stock:{" "}
                <input
                  type="number"
                  className="w-14 border-0 bg-transparent p-0 text-center text-[11px] font-bold text-[#555] focus:outline-none"
                  {...register("stock", { valueAsNumber: true })}
                />
              </span>
            </div>

            <div className="mb-2 space-y-2">
              <Label htmlFor="storefront-name" className="sr-only">
                Nombre en tienda
              </Label>
              <textarea
                id="storefront-name"
                rows={2}
                {...register("name")}
                className={cn(
                  "w-full resize-none border-0 border-b-2 border-transparent bg-transparent text-xl font-black uppercase leading-tight text-[#555] placeholder:text-[#b4b4b4] focus:border-[#029f9c]/40 focus:outline-none md:text-2xl",
                )}
                placeholder="Nombre del producto"
              />
              {formState.errors.name && (
                <p className="text-xs text-red-600">{formState.errors.name.message}</p>
              )}
            </div>

            <p className="mb-5 text-[15px] leading-7 text-[#707070]">{shortLine}</p>

            <div className="mb-6 rounded-xl bg-[#f7f7f7] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8a8a8a]">Vista previa (como en la tienda)</p>
              <p className="mt-1 text-3xl font-black text-[#029f9c]">{formatArs(price)}</p>
              <p className="mt-1 text-sm text-[#7a7a7a]">{formatArs(cashPrice)} efectivo o transferencia</p>
              <p className="mt-2 text-xs leading-snug text-[#9ca3af]">
                Precio común de referencia (sin recargo tarjeta): <strong className="font-semibold text-[#6b7280]">{formatArs(lista)}</strong>
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label htmlFor="storefront-precio-tarjeta" className="text-xs font-semibold text-[#52525b]">
                    Precio con tarjeta (ARS)
                  </Label>
                  <p className="text-[11px] leading-snug text-[#a1a1aa]">
                    Es el monto grande que ve el comprador en la ficha; coincide con la vista previa de arriba.
                  </p>
                  <Controller
                    name="lista"
                    control={control}
                    render={({ field }) => {
                      const tarjetaMostrada =
                        field.value === undefined || field.value === null || Number(field.value) === 0
                          ? ""
                          : String(precioTarjetaDesdeLista(Number(field.value)));
                      return (
                        <Input
                          id="storefront-precio-tarjeta"
                          type="number"
                          step="1"
                          min={0}
                          inputMode="numeric"
                          className="rounded-lg border-[#e4e4e4] bg-white"
                          value={tarjetaMostrada}
                          onChange={(e) => {
                            const raw = e.target.value;
                            if (raw === "") {
                              field.onChange(0);
                              return;
                            }
                            const n = Number(raw);
                            if (!Number.isFinite(n)) return;
                            field.onChange(listaDesdePrecioTarjeta(n));
                          }}
                          onBlur={field.onBlur}
                          ref={field.ref}
                        />
                      );
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="storefront-cash" className="text-xs font-semibold text-[#52525b]">
                    Efectivo / transferencia (opcional)
                  </Label>
                  <p className="text-[11px] leading-snug text-[#a1a1aa]">
                    Si lo dejás vacío, en la tienda se usa el precio común ({formatArs(lista)}).
                  </p>
                  <Input
                    id="storefront-cash"
                    type="number"
                    step="1"
                    placeholder={lista > 0 ? `Vacío = ${formatArs(lista)}` : "Vacío = precio común"}
                    className="rounded-lg border-[#e4e4e4] bg-white"
                    {...register("cash")}
                  />
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#6b7280]">
                <strong className="text-[#52525b]">Lo que ingresás en precio con tarjeta</strong> es el monto final que
                ve el comprador (el 10% ya queda incorporado en ese valor). El precio común es referencia (ese monto ÷
                1,10). El efectivo puede ser otro si lo completás.
              </p>
            </div>

            <p className="mb-4 rounded-lg border border-dashed border-[#e4e4e4] bg-[#fafafa] px-3 py-2 text-xs text-[#8a8a8a]">
              En la tienda el cliente ve <strong className="text-[#555]">Agregar al carrito</strong> acá. Desde el admin
              solo editás datos.
            </p>

            <div className="grid gap-3 text-sm text-[#666] sm:grid-cols-2">
              <div className="rounded-lg border border-[#e4e4e4] bg-[#fafafa] p-3">
                <p className="font-semibold text-[#555]">Envíos a todo el país</p>
                <p className="mt-1 text-xs text-[#7d7d7d]">Texto fijo de la tienda.</p>
              </div>
              <div className="rounded-lg border border-[#e4e4e4] bg-[#fafafa] p-3">
                <p className="font-semibold text-[#555]">Cambios garantizados</p>
                <p className="mt-1 text-xs text-[#7d7d7d]">Texto fijo de la tienda.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_330px]">
          <section className="rounded-2xl border border-[#e6e6e6] bg-white p-5 sm:p-6">
            <h2 className="mb-3 text-lg font-extrabold uppercase tracking-wide text-[#029f9c]">
              Descripción del producto
            </h2>
            <Label htmlFor="storefront-description" className="sr-only">
              Descripción
            </Label>
            <textarea
              id="storefront-description"
              rows={8}
              {...register("description")}
              className="w-full rounded-xl border border-[#e4e4e4] bg-[#fafafa] px-3 py-3 text-[15px] leading-7 text-[#666] focus:border-[#029f9c]/50 focus:outline-none"
              placeholder="Texto que ve el cliente en la ficha…"
            />
          </section>

          <aside className="rounded-2xl border border-[#e6e6e6] bg-[#f9f9f9] p-5 sm:p-6">
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-[#029f9c]">Datos y URL</h3>
            <dl className="space-y-4 text-sm">
              <div className="space-y-1 border-b border-[#e5e5e5] pb-3">
                <dt className="text-[#8a8a8a]">Categoría</dt>
                <dd className="pt-1">
                  <CategoryFilterPicker
                    variant="required"
                    hideLabel
                    value={v.categoryId}
                    onChange={(id) => {
                      if (!id || !isCategoryId(id)) return;
                      setValue("categoryId", id, { shouldValidate: true });
                    }}
                  />
                </dd>
              </div>
              <div className="space-y-1 border-b border-[#e5e5e5] pb-3">
                <dt className="text-[#8a8a8a]">Grupo (opcional)</dt>
                <dd>
                  <select
                    className="mt-1 flex h-10 w-full rounded-lg border border-[#e4e4e4] bg-white px-3 text-sm"
                    {...register("groupSlug")}
                  >
                    <option value="">— Sin grupo —</option>
                    {groupSelectOptions.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                  {formState.errors.groupSlug && (
                    <p className="mt-1 text-xs text-red-600">{formState.errors.groupSlug.message}</p>
                  )}
                  <p className="mt-1 text-xs text-[#8a8a8a]">
                    Misma card en el listado que otras presentaciones (ej. distintos talles).
                  </p>
                </dd>
              </div>
              <div className="space-y-1 border-b border-[#e5e5e5] pb-3">
                <dt className="text-[#8a8a8a]">Slug (URL)</dt>
                <dd>
                  <Input
                    readOnly={!isCreate}
                    placeholder={isCreate ? "ej. collar-rojo-mediano" : undefined}
                    className={cn(
                      "mt-1 rounded-lg font-mono text-xs",
                      !isCreate && "cursor-not-allowed bg-[#fafafa]",
                    )}
                    {...register("slug")}
                  />
                  <p className="mt-1 text-xs text-[#8a8a8a]">
                    {isCreate
                      ? "Solo minúsculas, números y guiones. Será la dirección pública del producto."
                      : "La URL es fija tras crear el producto; cambios coordinados con desarrollo."}
                  </p>
                  {formState.errors.slug && (
                    <p className="mt-1 text-xs text-red-600">{formState.errors.slug.message}</p>
                  )}
                </dd>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <dt className="text-[#8a8a8a]">Marca</dt>
                  <dd>
                    <Input className="mt-1 rounded-lg" {...register("marca")} />
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-[#8a8a8a]">Presentación</dt>
                  <dd>
                    <Input className="mt-1 rounded-lg" {...register("nombre")} />
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input id="storefront-destacado" type="checkbox" className="h-4 w-4 accent-[#029f9c]" {...register("destacado")} />
                <Label htmlFor="storefront-destacado" className="font-medium text-[#555]">
                  Destacado en catálogo
                </Label>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#e4e4e7] bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl gap-2">
          <Button type="button" variant="outline" className="h-11 min-h-[44px] flex-1 rounded-xl" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" className="h-11 min-h-[44px] flex-[2] rounded-xl bg-[#029f9c] font-semibold hover:bg-[#027a78]">
            {isCreate ? "Crear" : "Guardar"}
          </Button>
        </div>
      </div>
    </form>
  );
}
