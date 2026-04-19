"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navRoot, shopMenuGroups, type NavNode } from "@/lib/category-tree";

function categoryBranchChildren(sectionTitle: string): readonly NavNode[] {
  const hit = navRoot.find((n): n is Extract<NavNode, { kind: "branch" }> => n.kind === "branch" && n.label === sectionTitle);
  return hit?.children ?? [];
}

function MenuNavTree({
  nodes,
  depth,
  variant,
  onNavigate,
}: {
  nodes: readonly NavNode[];
  depth: number;
  variant: "mobile" | "desktop";
  onNavigate?: () => void;
}) {
  const isMobile = variant === "mobile";
  const ulClass = isMobile
    ? depth === 0
      ? "space-y-0.5"
      : "ml-2 mt-0.5 space-y-0.5 border-l border-white/30 pl-2.5"
    : depth === 0
      ? "space-y-0.5 p-1"
      : "ml-2 mt-0.5 space-y-0.5 border-l border-[#e8e8e8] pl-2.5";

  const branchClass = isMobile
    ? "mb-0.5 px-2 pt-1.5 text-[11px] font-black uppercase tracking-wider text-white/55"
    : "mb-0.5 px-2 pt-1.5 text-[11px] font-bold uppercase tracking-wide text-[#9a9a9a]";

  const leafClass = isMobile
    ? "block rounded-md px-2 py-1.5 text-left text-[14px] leading-snug text-white/90 transition-colors hover:bg-white/10 hover:text-[#f6d4ea]"
    : "block rounded-md px-3 py-2 text-left text-[13px] font-medium leading-snug text-[#5f5f5f] transition-colors hover:bg-[#f4f4f4] hover:text-[#029f9c]";

  return (
    <ul className={ulClass}>
      {nodes.map((node, idx) =>
        node.kind === "leaf" ? (
          <li key={node.id}>
            <Link href={`/?categoria=${node.id}`} onClick={onNavigate} className={leafClass}>
              {node.label}
            </Link>
          </li>
        ) : (
          <li key={`${node.label}-${idx}`}>
            <p className={branchClass}>{node.label}</p>
            <MenuNavTree nodes={node.children} depth={depth + 1} variant={variant} onNavigate={onNavigate} />
          </li>
        ),
      )}
    </ul>
  );
}

type MenuItem = {
  label: string;
  href?: string;
  children?: Array<{ label: string; href: string }>;
};

const menuItems: MenuItem[] = [
  ...shopMenuGroups.map((group) => ({
    label: group.title,
    children: group.links.map((link) => ({ label: link.label, href: link.href })),
  })),
  { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
  { label: "Contacto", href: "#" },
];

type HeaderMenuProps = {
  isMobileOpen: boolean;
  onRequestClose: () => void;
};

function isInternalHref(href: string) {
  return href.startsWith("/");
}

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
                    ) : item.href?.startsWith("/") ? (
                      <Link
                        href={item.href}
                        onClick={onRequestClose}
                        className="flex items-center justify-between rounded-md px-2.5 py-3 text-base font-medium text-white/95 transition-colors hover:bg-white/10 hover:text-[#f6d4ea]"
                      >
                        <span>{item.label}</span>
                      </Link>
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
                      <div className="mb-1 ml-3 max-h-[55vh] overflow-y-auto border-l border-white/25 pl-3">
                        {item.label === "Por mascota" || item.label === "Categorías generales" ? (
                          <MenuNavTree
                            nodes={categoryBranchChildren(item.label)}
                            depth={0}
                            variant="mobile"
                            onNavigate={onRequestClose}
                          />
                        ) : (
                          <div className="space-y-0.5">
                            {item.children.map((child) =>
                              isInternalHref(child.href) ? (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  onClick={onRequestClose}
                                  className="block rounded-md px-2 py-1.5 text-[13px] leading-snug text-white/85 transition-colors hover:bg-white/10 hover:text-[#f6d4ea]"
                                >
                                  {child.label}
                                </Link>
                              ) : (
                                <a
                                  key={child.label}
                                  href={child.href}
                                  onClick={onRequestClose}
                                  className="block rounded-md px-2 py-1.5 text-[13px] leading-snug text-white/85 transition-colors hover:bg-white/10 hover:text-[#f6d4ea]"
                                >
                                  {child.label}
                                </a>
                              ),
                            )}
                          </div>
                        )}
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
        <div className="mx-auto w-full max-w-7xl px-3 md:px-6 md:pl-16 min-[1810px]:md:pl-28">
          <div className="hidden no-scrollbar overflow-x-auto md:block min-[1810px]:lg:pl-[284px]">
            <div className="flex min-w-max items-center gap-x-7 py-2.5 text-[17px] font-medium text-white">
              {menuItems.map((item) => (
                <div key={item.label} className="group/menu relative">
                  {item.href?.startsWith("/") && !item.children ? (
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 transition-colors hover:text-[#f6d4ea]"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href ?? "#"}
                      className="inline-flex items-center gap-1 transition-colors hover:text-[#f6d4ea]"
                    >
                      {item.label}
                      {item.children ? <span className="text-[12px]">▼</span> : null}
                    </a>
                  )}

                  {item.children ? (
                    <div className="invisible absolute left-0 top-[calc(100%+10px)] z-20 max-h-[70vh] w-[min(100vw-2rem,22rem)] overflow-y-auto rounded-lg border border-[#d8d8d8] bg-white py-2 opacity-0 shadow-lg transition-all group-hover/menu:visible group-hover/menu:opacity-100">
                      {item.label === "Por mascota" || item.label === "Categorías generales" ? (
                        <MenuNavTree
                          nodes={categoryBranchChildren(item.label)}
                          depth={0}
                          variant="desktop"
                        />
                      ) : (
                        item.children.map((child) =>
                          isInternalHref(child.href) ? (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block rounded-md px-3 py-2 text-left text-[13px] font-medium leading-snug text-[#5f5f5f] transition-colors hover:bg-[#f4f4f4] hover:text-[#029f9c]"
                            >
                              {child.label}
                            </Link>
                          ) : (
                            <a
                              key={child.label}
                              href={child.href}
                              className="block rounded-md px-3 py-2 text-left text-[13px] font-medium leading-snug text-[#5f5f5f] transition-colors hover:bg-[#f4f4f4] hover:text-[#029f9c]"
                            >
                              {child.label}
                            </a>
                          ),
                        )
                      )}
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
