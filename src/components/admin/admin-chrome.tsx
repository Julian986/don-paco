"use client";

import { Menu, Package, LayoutDashboard, LogOut, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Productos", icon: Package },
  { href: "/admin/orders", label: "Pedidos", icon: ShoppingCart },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1">
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
              active ? "bg-[#029f9c]/10 text-[#029f9c]" : "text-[#52525b] hover:bg-[#f4f4f5]",
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminChrome({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#18181b]">
      <div className="flex min-h-screen">
        <aside className="hidden w-56 shrink-0 border-r border-[#e4e4e7] bg-white md:flex md:flex-col">
          <div className="border-b border-[#e4e4e7] px-4 py-5">
            <p className="text-xs font-bold uppercase tracking-widest text-[#71717a]">Don Paco</p>
            <p className="text-lg font-black text-[#029f9c]">Admin</p>
          </div>
          <div className="flex flex-1 flex-col p-3">
            <NavLinks />
          </div>
          <div className="border-t border-[#e4e4e7] p-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <LogOut className="h-4 w-4" />
              Salir
            </Button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-[#e4e4e7] bg-white px-4 md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Abrir menú">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <DialogTitle className="mb-4 text-left text-lg font-black text-[#029f9c]">Menú</DialogTitle>
                <NavLinks onNavigate={() => setOpen(false)} />
                <div className="mt-auto pt-6">
                  <Button variant="outline" className="w-full" onClick={() => signOut({ callbackUrl: "/login" })}>
                    Salir
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <span className="text-sm font-bold text-[#3f3f46]">Panel</span>
            <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/login" })}>
              Salir
            </Button>
          </header>

          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
