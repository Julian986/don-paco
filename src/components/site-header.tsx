"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderCart from "@/components/header-cart";
import HeaderMenu from "@/components/header-menu";
import PawIcon from "@/components/paw-icon";

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-20 shadow-sm">
      <div className="bg-[#e4077d]">
        <div className="grid w-full grid-cols-1 items-center px-3 py-1.5 md:grid-cols-[1fr_auto_1fr] md:px-4 md:pl-28">
          <div className="hidden items-center gap-2 text-white md:flex">
            <a href="#" aria-label="Facebook" className="opacity-90 transition-opacity hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                <path d="M13.6 8.5V7.1c0-.7.5-.9.8-.9h2.1V3h-2.9c-3.2 0-3.9 2.4-3.9 4v1.5H7.8v3.5h1.9V21h3.9v-9h2.6l.4-3.5h-3z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="opacity-90 transition-opacity hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                <path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3Zm0 7.8A3.1 3.1 0 1 1 12 8.9a3.1 3.1 0 0 1 0 6.2Zm6-7.9a1.1 1.1 0 1 1-2.1 0 1.1 1.1 0 0 1 2.1 0Z" />
                <path d="M12 2.2h4.1c3.2 0 5.7 2.5 5.7 5.7V16c0 3.2-2.5 5.7-5.7 5.7H7.9A5.7 5.7 0 0 1 2.2 16V7.9c0-3.2 2.5-5.7 5.7-5.7H12Zm0 1.6H7.9a4.1 4.1 0 0 0-4.1 4.1V16A4.1 4.1 0 0 0 7.9 20h8.2a4.1 4.1 0 0 0 4.1-4.1V7.9a4.1 4.1 0 0 0-4.1-4.1H12Z" />
              </svg>
            </a>
            <a href="#" aria-label="TikTok" className="opacity-90 transition-opacity hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                <path d="M14.8 3v9.4a3.4 3.4 0 1 1-2.4-3.2V6.8a6.7 6.7 0 1 0 4.8 6.4V8.8a6.7 6.7 0 0 0 3.9 1.3V7.7a4.3 4.3 0 0 1-4-4.7h-2.3Z" />
              </svg>
            </a>
          </div>
          <p className="text-center text-[9px] font-semibold uppercase tracking-wide text-white md:whitespace-nowrap md:text-[11px] md:tracking-widest">
            Descuento adicional: 10% en efectivo o 5 % transferencias
          </p>
          <div className="hidden md:block" />
        </div>
      </div>

      <div className="bg-[#029f9c] text-white">
        <div className="mx-auto w-full max-w-[1500px] px-2 py-3 md:px-4 md:pl-28">
          <div className="flex items-center justify-between gap-2 md:grid md:grid-cols-[130px_minmax(560px,760px)_260px] md:gap-8">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/25 text-white transition-colors hover:bg-white/10 md:hidden"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-main-menu"
              aria-label="Abrir o cerrar menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-5 w-5">
                {isMobileMenuOpen ? <path d="m18 6-12 12M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>

            <Link href="/" className="inline-flex items-center gap-1.5 md:hidden">
              <PawIcon className="h-6 w-6 text-[#029f9c]" />
              <span className="text-lg font-black uppercase tracking-wide text-white">PET´S SHOP</span>
            </Link>

            <div className="md:hidden">
              <HeaderCart />
            </div>

            <Link href="/" className="hidden items-center gap-2 justify-self-start md:inline-flex">
              <PawIcon className="h-7 w-7 text-white" />
              <span className="text-xl font-black uppercase tracking-wide text-white">PET´S SHOP</span>
            </Link>

            <form className="order-3 hidden w-full md:order-none md:block md:justify-self-center" role="search">
              <label htmlFor="search-products" className="sr-only">
                Buscar producto
              </label>
              <div className="flex items-center overflow-hidden rounded-md bg-white">
                <input
                  id="search-products"
                  name="search"
                  type="search"
                  placeholder="¿Qué estás buscando?"
                  className="w-full px-4 py-3 text-sm text-[#555] outline-none placeholder:text-[#9f9f9f]"
                />
                <button
                  type="submit"
                  aria-label="Buscar"
                  className="border-l border-[#ededed] px-3 py-3 text-[#3f3f3f] transition-colors hover:text-[#029f9c]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    className="h-5 w-5"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </button>
              </div>
            </form>

            <div className="ml-auto hidden items-center gap-11 text-center md:ml-0 md:flex md:justify-self-end">
              <a href="#" className="hidden text-xs font-semibold md:block">
                <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-8 w-8">
                    <path d="M12 3 3 8.2v7.6L12 21l9-5.2V8.2L12 3Z" />
                    <path d="M12 21V11.5" />
                  </svg>
                </div>
                Ayuda
              </a>
              <a href="#" className="hidden text-xs font-semibold md:block">
                <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-8 w-8">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c1.8-4 5-6 8-6s6.2 2 8 6" />
                  </svg>
                </div>
                Mi cuenta
              </a>
              <HeaderCart />
            </div>
          </div>
        </div>
      </div>

      <HeaderMenu isMobileOpen={isMobileMenuOpen} onRequestClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}
