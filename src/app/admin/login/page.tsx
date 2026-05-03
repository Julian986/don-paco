"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const err = searchParams.get("err");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "No se pudo iniciar sesión");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f4f5] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#e4e4e7] bg-white p-8 shadow-sm">
        <h1 className="text-center text-2xl font-black text-[#029f9c]">Don Paco</h1>
        <p className="mt-1 text-center text-sm text-[#71717a]">Ingreso al panel de administración</p>

        {err === "config" && (
          <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
            Falta configurar <code className="rounded bg-amber-100 px-1">ADMIN_PASSWORD</code> o{" "}
            <code className="rounded bg-amber-100 px-1">ADMIN_JWT_SECRET</code> en el servidor.
          </p>
        )}

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label htmlFor="pw" className="mb-1 block text-sm font-semibold text-[#3f3f46]">
              Contraseña
            </label>
            <input
              id="pw"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[#e4e4e7] px-3 py-2 text-sm outline-none ring-[#029f9c] focus:ring-2"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm font-medium text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#029f9c] py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
