"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { createProductGroup, deleteProductGroup, updateProductGroup } from "@/actions/product-group";
import { uploadProductImage } from "@/actions/cloudinary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CreateProps = {
  mode: "create";
};

type EditProps = {
  mode: "edit";
  groupSlug: string;
  baseDisplayName: string;
  variantCount: number;
  initialDisplayName: string;
  initialDescription: string;
  /** Imagen guardada en BD para el grupo (puede estar solo en ProductGroupDisplay si el cliente Prisma está viejo). */
  initialHeroImageUrl: string | null;
  /** Imagen efectiva en la tienda si no hay una propia guardada (variantes / mapa estático). */
  fallbackStorefrontHeroUrl: string | undefined;
  isStaticCatalog: boolean;
};

type Props = CreateProps | EditProps;

export default function ProductGroupAdminForm(props: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const [displayName, setDisplayName] = useState(
    props.mode === "create" ? "" : props.initialDisplayName,
  );
  const [description, setDescription] = useState(
    props.mode === "create" ? "" : props.initialDescription,
  );
  const [heroImageUrl, setHeroImageUrl] = useState(
    props.mode === "create" ? "" : props.initialHeroImageUrl ?? "",
  );

  async function onHeroUpload(e: React.ChangeEvent<HTMLInputElement>) {
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
      setHeroImageUrl(res.url);
      toast.success("Imagen del grupo subida");
    }
    e.target.value = "";
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const hero = heroImageUrl.trim() || null;
      if (props.mode === "create") {
        const res = await createProductGroup({
          displayName: displayName.trim(),
          description: description.trim() || null,
          heroImageUrl: hero,
        });
        toast.success("Grupo creado");
        router.push(`/admin/products/groups/${encodeURIComponent(res.slug)}`);
        router.refresh();
        return;
      }
      await updateProductGroup({
        slug: props.groupSlug,
        displayName: displayName.trim(),
        description: description.trim() || null,
        heroImageUrl: hero,
      });
      toast.success("Grupo actualizado");
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  async function onDelete() {
    if (props.mode !== "edit") return;
    if (props.variantCount > 0) {
      toast.error("Sacá primero todas las variantes del grupo");
      return;
    }
    if (
      !confirm(
        "¿Eliminar este grupo del catálogo admin? La URL dejará de existir si no hay entrada en el mapa estático.",
      )
    ) {
      return;
    }
    setBusy(true);
    try {
      await deleteProductGroup(props.groupSlug);
      toast.success("Grupo eliminado");
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-2xl space-y-6">
      {props.mode === "edit" ? (
        <div className="rounded-xl border border-[#e4e4e7] bg-[#fafafa] p-4 text-sm text-[#52525b]">
          <p className="font-semibold text-[#18181b]">
            {props.isStaticCatalog ? "Grupo del catálogo base" : "Grupo creado en el panel"}
          </p>
          <p className="mt-1 text-[#71717a]">
            {props.variantCount} variante{props.variantCount === 1 ? "" : "s"} en este grupo.
          </p>
          {props.isStaticCatalog ? (
            <p className="mt-2 text-xs text-[#71717a]">
              Nombre por defecto (código):{" "}
              <span className="font-medium text-[#3f3f46]">{props.baseDisplayName}</span>
            </p>
          ) : null}
        </div>
      ) : (
        <p className="text-sm text-[#71717a]">
          El sistema arma solo la URL interna a partir del nombre. Podés subir la imagen de la card del grupo abajo.
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="pg-display-name">Nombre en tienda (card y ficha)</Label>
        <Input
          id="pg-display-name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="rounded-lg"
          required
          maxLength={300}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pg-description">Texto introductorio (opcional)</Label>
        <textarea
          id="pg-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          maxLength={8000}
          placeholder="Si lo dejás vacío, en la ficha del grupo se muestra el texto por defecto sobre formatos y precios."
          className="w-full rounded-lg border border-[#e4e4e7] bg-white px-3 py-2 text-sm text-[#3f3f46] placeholder:text-[#a1a1aa] focus:border-[#029f9c]/50 focus:outline-none"
        />
      </div>

      <div className="space-y-3 rounded-xl border border-[#e4e4e7] bg-white p-4">
        <Label className="text-base">Imagen de la card del grupo</Label>
        <p className="text-xs text-[#71717a]">
          Es la foto grande que identifica al grupo en el listado y arriba de la ficha con todas las variantes. No
          reemplaza las fotos de cada producto; esas se editan en cada variante.
        </p>
        {(() => {
          const previewSrc =
            props.mode === "edit"
              ? heroImageUrl.trim() || (props.fallbackStorefrontHeroUrl?.trim() ?? "")
              : heroImageUrl.trim();
          const usingFallback =
            props.mode === "edit" && !heroImageUrl.trim() && Boolean(props.fallbackStorefrontHeroUrl?.trim());
          return previewSrc ? (
            <>
              <div className="relative mx-auto flex h-48 max-w-md items-center justify-center rounded-lg border border-[#e4e4e7] bg-[#fafafa] p-3">
                <Image
                  src={previewSrc}
                  alt=""
                  width={400}
                  height={240}
                  className="max-h-44 w-auto max-w-full object-contain"
                  unoptimized
                />
              </div>
              <p className="text-xs text-[#71717a]">
                {usingFallback
                  ? "Vista actual en la tienda (tomada de una variante o del catálogo base). Subí una imagen abajo para fijar una foto solo para este grupo."
                  : "Esta es la imagen que se usará para la card del grupo al guardar."}
              </p>
            </>
          ) : (
            <p className="text-sm text-[#a1a1aa]">
              Todavía no hay imagen para mostrar. Subí una foto del grupo o esperá a tener variantes con imagen en la tienda.
            </p>
          );
        })()}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            asChild
            disabled={busy}
            className="h-11 cursor-pointer rounded-xl bg-[#029f9c] px-6 text-base font-semibold text-white shadow-md ring-2 ring-[#029f9c]/25 hover:bg-[#027a78] hover:ring-[#027a78]/30 disabled:pointer-events-none disabled:opacity-60"
          >
            <label className="cursor-pointer">
              Subir imagen
              <input type="file" accept="image/*" className="hidden" onChange={onHeroUpload} disabled={busy} />
            </label>
          </Button>
          {heroImageUrl.trim() ? (
            <Button type="button" variant="ghost" size="sm" onClick={() => setHeroImageUrl("")}>
              Quitar imagen
            </Button>
          ) : null}
        </div>
        <details className="rounded-lg border border-dashed border-[#e4e4e7] bg-[#fafafa] px-3 py-2 text-sm text-[#52525b]">
          <summary className="cursor-pointer select-none font-medium text-[#71717a]">
            Avanzado: pegar URL de imagen manualmente
          </summary>
          <p className="mt-2 text-xs text-[#71717a]">
            Solo si ya tenés un enlace directo (por ejemplo de otra herramienta). En lo posible usá &quot;Subir
            imagen&quot;.
          </p>
          <Input
            placeholder="https://… o /ruta bajo public"
            className="mt-2 max-w-full rounded-lg font-mono text-xs"
            value={heroImageUrl}
            onChange={(e) => setHeroImageUrl(e.target.value)}
            autoComplete="off"
          />
        </details>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={busy} className="rounded-xl bg-[#029f9c] font-semibold hover:bg-[#027a78]">
          {props.mode === "create" ? "Crear grupo" : "Guardar"}
        </Button>
        {props.mode === "edit" && props.variantCount === 0 ? (
          <Button type="button" variant="destructive" className="rounded-xl" disabled={busy} onClick={onDelete}>
            Eliminar grupo
          </Button>
        ) : null}
      </div>
    </form>
  );
}
