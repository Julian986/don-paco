"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/productos", label: "Productos" },
  { href: "/admin/categorias", label: "Categorías" },
  { href: "/admin/configuracion", label: "Configuración" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#f4f4f5] text-[#1a1a1a]">
      <div className="flex min-h-screen">
        <aside className="hidden w-56 shrink-0 border-r border-[#e4e4e7] bg-white md:flex md:flex-col">
          <div className="border-b border-[#e4e4e7] px-4 py-5">
            <p className="text-xs font-bold uppercase tracking-widest text-[#71717a]">Don Paco</p>
            <p className="text-lg font-black text-[#029f9c]">Administración</p>
          </div>
          <nav className="flex flex-1 flex-col gap-0.5 p-3">
            {nav.map((item) => {
              const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    active ? "bg-[#029f9c]/10 text-[#029f9c]" : "text-[#52525b] hover:bg-[#f4f4f5]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[#e4e4e7] bg-white px-4 py-3 md:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                className="rounded-md border border-[#e4e4e7] px-2 py-1 text-xs font-semibold text-[#52525b] md:hidden"
                onClick={() => router.push("/admin")}
                aria-label="Menú"
              >
                Menú
              </button>
              <h1 className="truncate text-sm font-bold text-[#3f3f46] md:text-base">Panel Don Paco</h1>
            </div>
            <button
              type="button"
              onClick={() => void logout()}
              className="shrink-0 rounded-lg border border-[#e4e4e7] bg-white px-3 py-1.5 text-sm font-semibold text-[#52525b] hover:border-[#029f9c] hover:text-[#029f9c]"
            >
              Salir
            </button>
          </header>

          <div className="border-b border-[#e4e4e7] bg-white px-3 py-2 md:hidden">
            <nav className="flex flex-wrap gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md bg-[#f4f4f5] px-2 py-1 text-xs font-semibold text-[#3f3f46]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
