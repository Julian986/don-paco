"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { createProductGroup, deleteProductGroup, updateProductGroup } from "@/actions/product-group";
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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (props.mode === "create") {
        const res = await createProductGroup({
          displayName: displayName.trim(),
          description: description.trim() || null,
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
          <p className="mt-3 text-xs leading-relaxed text-[#71717a]">
            La dirección web de la ficha la define el equipo técnico; acá solo editás el{" "}
            <span className="font-medium text-[#52525b]">nombre</span> y el texto que ven los clientes.
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
          El sistema arma solo la URL interna a partir del nombre. Si más adelante hace falta cambiar el enlace,
          lo coordina con desarrollo.
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

      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={busy} className="rounded-xl bg-[#029f9c] font-semibold hover:bg-[#027a78]">
          {props.mode === "create" ? "Crear grupo" : "Guardar"}
        </Button>
        {props.mode === "edit" && props.variantCount === 0 ? (
          <Button type="button" variant="destructive" className="rounded-xl" disabled={busy} onClick={onDelete}>
            Eliminar grupo
          </Button>
        ) : null}
        <Button type="button" variant="ghost" className="rounded-xl" asChild>
          <Link href="/admin/products">← Volver a productos</Link>
        </Button>
      </div>
    </form>
  );
}
