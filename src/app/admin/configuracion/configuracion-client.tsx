"use client";

import { useEffect, useState } from "react";

import type { SiteSettings } from "@/types/site-settings";

export default function ConfiguracionClient() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [cur, setCur] = useState("");
  const [next, setNext] = useState("");
  const [next2, setNext2] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pwdBusy, setPwdBusy] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/admin/site-settings");
        const data = (await res.json()) as SiteSettings & { error?: string };
        if (!res.ok) throw new Error(data.error || "Error");
        setSettings({
          storeName: data.storeName,
          address: data.address,
          cashDiscountLabel: data.cashDiscountLabel,
          bannerTitle: data.bannerTitle,
          bannerSubtitle: data.bannerSubtitle,
          bannerLead: data.bannerLead,
        });
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function saveSettings(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;
    setMsg(null);
    setErr(null);
    setSaving(true);
    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || "No se pudo guardar");
      setMsg("Cambios guardados. La página de inicio se actualizará al recargar.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error");
    } finally {
      setSaving(false);
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    if (next !== next2) {
      setErr("La nueva contraseña y la repetición no coinciden.");
      return;
    }
    setPwdBusy(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current: cur, next }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || "No se pudo cambiar");
      setCur("");
      setNext("");
      setNext2("");
      setMsg("Contraseña actualizada. La próxima vez usá la nueva contraseña para entrar.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error");
    } finally {
      setPwdBusy(false);
    }
  }

  if (loading || !settings) {
    return <p className="text-sm text-[#71717a]">Cargando…</p>;
  }

  return (
    <div className="mx-auto max-w-xl space-y-10">
      <div>
        <h2 className="text-2xl font-black text-[#18181b]">Configuración</h2>
        <p className="text-sm text-[#71717a]">Datos visibles en la tienda y seguridad del panel.</p>
      </div>

      {msg && <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900">{msg}</p>}
      {err && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{err}</p>}

      <form className="space-y-4 rounded-xl border border-[#e4e4e7] bg-white p-6 shadow-sm" onSubmit={saveSettings}>
        <h3 className="text-lg font-bold text-[#18181b]">Tienda</h3>
        <div>
          <label className="mb-1 block text-sm font-semibold">Nombre de la tienda</label>
          <input
            value={settings.storeName}
            onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
            className="w-full rounded-lg border border-[#e4e4e7] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold">Dirección (texto)</label>
          <input
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            className="w-full rounded-lg border border-[#e4e4e7] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold">Mensaje de descuento en efectivo</label>
          <input
            value={settings.cashDiscountLabel}
            onChange={(e) => setSettings({ ...settings, cashDiscountLabel: e.target.value })}
            className="w-full rounded-lg border border-[#e4e4e7] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold">Título del banner (desktop)</label>
          <input
            value={settings.bannerTitle}
            onChange={(e) => setSettings({ ...settings, bannerTitle: e.target.value })}
            className="w-full rounded-lg border border-[#e4e4e7] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold">Subtítulo del banner</label>
          <input
            value={settings.bannerSubtitle}
            onChange={(e) => setSettings({ ...settings, bannerSubtitle: e.target.value })}
            className="w-full rounded-lg border border-[#e4e4e7] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold">Texto principal del banner</label>
          <textarea
            value={settings.bannerLead}
            onChange={(e) => setSettings({ ...settings, bannerLead: e.target.value })}
            rows={3}
            className="w-full rounded-lg border border-[#e4e4e7] px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-[#029f9c] px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
        >
          {saving ? "Guardando…" : "Guardar datos de la tienda"}
        </button>
      </form>

      <form className="space-y-4 rounded-xl border border-[#e4e4e7] bg-white p-6 shadow-sm" onSubmit={changePassword}>
        <h3 className="text-lg font-bold text-[#18181b]">Contraseña del administrador</h3>
        <p className="text-xs text-[#71717a]">
          Si cambiás la contraseña, se guarda en el servidor (archivo en <code className="rounded bg-[#f4f4f5] px-1">data/</code>
          ). La variable <code className="rounded bg-[#f4f4f5] px-1">ADMIN_PASSWORD</code> deja de usarse salvo que borres ese archivo.
        </p>
        <div>
          <label className="mb-1 block text-sm font-semibold">Contraseña actual</label>
          <input
            type="password"
            value={cur}
            onChange={(e) => setCur(e.target.value)}
            className="w-full rounded-lg border border-[#e4e4e7] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold">Nueva contraseña</label>
          <input
            type="password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            className="w-full rounded-lg border border-[#e4e4e7] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold">Repetir nueva contraseña</label>
          <input
            type="password"
            value={next2}
            onChange={(e) => setNext2(e.target.value)}
            className="w-full rounded-lg border border-[#e4e4e7] px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={pwdBusy}
          className="rounded-lg border border-[#e4e4e7] bg-[#fafafa] px-4 py-2 text-sm font-bold text-[#18181b] disabled:opacity-60"
        >
          {pwdBusy ? "Actualizando…" : "Cambiar contraseña"}
        </button>
      </form>
    </div>
  );
}
