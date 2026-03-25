"use client";

import { useEffect, useState } from "react";

type MenuItem = {
  label: string;
  href?: string;
  children?: Array<{ label: string; href: string }>;
};

const menuItems: MenuItem[] = [
  {
    label: "Accesorios",
    children: [
      { label: "Collares y correas", href: "#" },
      { label: "Comederos y bebederos", href: "#" },
      { label: "Juguetes", href: "#" },
      { label: "Higiene y cuidado", href: "#" },
    ],
  },
  {
    label: "Alimentos",
    children: [
      { label: "Alimento seco", href: "#" },
      { label: "Alimento humedo", href: "#" },
      { label: "Snacks y premios", href: "#" },
      { label: "Dietas veterinarias", href: "#" },
    ],
  },
  { label: "Outlet", href: "#" },
  { label: "Preguntas frecuentes", href: "#" },
  { label: "Contacto", href: "#" },
];

type HeaderMenuProps = {
  isMobileOpen: boolean;
  onRequestClose: () => void;
};

export default function HeaderMenu({ isMobileOpen, onRequestClose }: HeaderMenuProps) {
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

  useEffect(() => {
    if (!isMobileOpen) {
      setExpandedMobileItem(null);
    }
  }, [isMobileOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 md:hidden ${
          isMobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isMobileOpen}
      >
        <button
          type="button"
          aria-label="Cerrar menu"
          onClick={onRequestClose}
          className={`absolute inset-0 bg-black/35 transition-opacity duration-300 ${
            isMobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          id="mobile-main-menu"
          className={`absolute left-0 top-0 h-full w-full bg-[#029f9c] text-white transition-transform duration-300 ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-white/20 px-4 py-4">
              <p className="text-lg font-black uppercase tracking-wide">Menu</p>
              <button
                type="button"
                onClick={onRequestClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/25 text-white transition-colors hover:bg-white/10"
                aria-label="Cerrar menu"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-5 w-5">
                  <path d="m18 6-12 12M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <form role="search" className="mb-4">
                <label htmlFor="mobile-search-products" className="sr-only">
                  Buscar producto
                </label>
                <div className="flex items-center overflow-hidden rounded-md bg-white">
                  <input
                    id="mobile-search-products"
                    name="search"
                    type="search"
                    placeholder="¿Qué estás buscando?"
                    className="w-full px-3 py-2.5 text-sm text-[#555] outline-none placeholder:text-[#9f9f9f]"
                  />
                  <button
                    type="submit"
                    aria-label="Buscar"
                    className="border-l border-[#ededed] px-3 py-2.5 text-[#3f3f3f] transition-colors hover:text-[#029f9c]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      className="h-4 w-4"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-3.5-3.5" />
                    </svg>
                  </button>
                </div>
              </form>

              <div className="space-y-1">
                {menuItems.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedMobileItem((prev) => (prev === item.label ? null : item.label))
                        }
                        className="flex w-full items-center justify-between rounded-md px-2.5 py-3 text-left text-base font-medium text-white/95 transition-colors hover:bg-white/10 hover:text-[#f6d4ea]"
                        aria-expanded={expandedMobileItem === item.label}
                      >
                        <span>{item.label}</span>
                        <span className={`text-[11px] transition-transform ${expandedMobileItem === item.label ? "rotate-180" : ""}`}>
                          ▼
                        </span>
                      </button>
                    ) : (
                      <a
                        href={item.href ?? "#"}
                        onClick={onRequestClose}
                        className="flex items-center justify-between rounded-md px-2.5 py-3 text-base font-medium text-white/95 transition-colors hover:bg-white/10 hover:text-[#f6d4ea]"
                      >
                        <span>{item.label}</span>
                      </a>
                    )}

                    {item.children && expandedMobileItem === item.label ? (
                      <div className="mb-1 ml-3 space-y-1 border-l border-white/25 pl-3">
                        {item.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            onClick={onRequestClose}
                            className="block rounded-md px-2 py-1.5 text-[15px] text-white/85 transition-colors hover:bg-white/10 hover:text-[#f6d4ea]"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      <nav className="relative z-40 border-t border-white/35 bg-[#029f9c]">
        <div className="mx-auto w-full max-w-7xl px-3 md:px-6 md:pl-28">
          <div className="hidden no-scrollbar overflow-x-auto lg:pl-[284px] md:block">
            <div className="flex min-w-max items-center gap-x-7 py-2.5 text-[17px] font-medium text-white">
              {menuItems.map((item) => (
                <div key={item.label} className="relative group/menu">
                  <a
                    href={item.href ?? "#"}
                    className="inline-flex items-center gap-1 transition-colors hover:text-[#f6d4ea]"
                  >
                    {item.label}
                    {item.children ? <span className="text-[12px]">▼</span> : null}
                  </a>

                  {item.children ? (
                    <div className="invisible absolute left-0 top-[calc(100%+10px)] z-20 w-56 rounded-lg border border-[#d8d8d8] bg-white p-2 opacity-0 shadow-lg transition-all group-hover/menu:visible group-hover/menu:opacity-100">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block rounded-md px-3 py-2 text-sm font-medium text-[#5f5f5f] transition-colors hover:bg-[#f4f4f4] hover:text-[#029f9c]"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
