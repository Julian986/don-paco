"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { deleteProductGroupDisplay, upsertProductGroupDisplay } from "@/actions/product-group-display";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  groupSlug: string;
  /** Nombre por defecto desde `product-groups.ts`. */
  baseDisplayName: string;
  variantCount: number;
  initialDisplayName: string;
  initialDescription: string;
  hasCustomRow: boolean;
};

export default function ProductGroupDisplayForm({
  groupSlug,
  baseDisplayName,
  variantCount,
  initialDisplayName,
  initialDescription,
  hasCustomRow,
}: Props) {
  const router = useRouter();
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [description, setDescription] = useState(initialDescription);
  const [busy, setBusy] = useState(false);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await upsertProductGroupDisplay({
        groupSlug,
        displayName: displayName.trim(),
        description: description.trim() || null,
      });
      toast.success("Ficha del grupo guardada");
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  async function onReset() {
    if (!hasCustomRow) {
      toast.message("No hay personalización guardada para borrar.");
      return;
    }
    if (!confirm("¿Quitar el nombre y texto personalizados de este grupo? La tienda volverá a usar los valores por defecto del código.")) {
      return;
    }
    setBusy(true);
    try {
      await deleteProductGroupDisplay(groupSlug);
      setDisplayName(baseDisplayName);
      setDescription("");
      toast.success("Se restauró el texto por defecto");
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSave} className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-xl border border-[#e4e4e7] bg-[#fafafa] p-4 text-sm text-[#52525b]">
        <p className="font-semibold text-[#18181b]">Grupo: {groupSlug}</p>
        <p className="mt-1 text-[#71717a]">
          {variantCount} presentación{variantCount === 1 ? "" : "es"} enlazadas en código. La membresía del grupo no se edita acá.
        </p>
        <p className="mt-2 text-xs text-[#71717a]">
          Nombre por defecto (código): <span className="font-medium text-[#3f3f46]">{baseDisplayName}</span>
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="group-display-name">Nombre en tienda (card y ficha)</Label>
        <Input
          id="group-display-name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="rounded-lg"
          required
          maxLength={300}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="group-description">Texto introductorio (opcional)</Label>
        <textarea
          id="group-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          maxLength={8000}
          placeholder="Si lo dejás vacío, en la ficha del grupo se muestra el texto fijo por defecto sobre formatos y precios."
          className="w-full rounded-lg border border-[#e4e4e7] bg-white px-3 py-2 text-sm text-[#3f3f46] placeholder:text-[#a1a1aa] focus:border-[#029f9c]/50 focus:outline-none"
        />
        <p className="text-xs text-[#71717a]">Se respeta el salto de línea (texto sin formato).</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={busy} className="rounded-xl bg-[#029f9c] font-semibold hover:bg-[#027a78]">
          Guardar
        </Button>
        <Button type="button" variant="outline" className="rounded-xl" disabled={busy} onClick={onReset}>
          Restaurar por defecto
        </Button>
        <Button type="button" variant="ghost" className="rounded-xl" asChild>
          <Link href="/admin/products">← Volver a productos</Link>
        </Button>
      </div>
    </form>
  );
}
