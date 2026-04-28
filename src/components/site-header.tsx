"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import HeaderCart from "@/components/header-cart";
import HeaderMenu from "@/components/header-menu";
import PawIcon from "@/components/paw-icon";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/body-scroll-lock";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP ?? "5492984000000";
const ADDRESS = process.env.NEXT_PUBLIC_LOCAL_ADDRESS ?? "Fernández Oro — RN";
const HOURS = process.env.NEXT_PUBLIC_LOCAL_HOURS ?? "Lun-Sab 9:00-20:00";

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDesktopLogo, setShowDesktopLogo] = useState(false);
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateViewport = () => setIsDesktopViewport(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) lockBodyScroll();
    return () => {
      if (isMobileMenuOpen) unlockBodyScroll();
    };
  }, [isMobileMenuOpen]);

  const waHref = `https://wa.me/${WA_NUMBER}`;

  return (
    <header className="sticky top-0 z-20 shadow-sm">
      {/* Barra superior de contacto */}
      <div className="bg-[#e4077d] text-white">
        <div className="mx-auto flex w-full max-w-[1500px] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-1.5 md:px-6">
          {/* Dirección + horario */}
          <div className="hidden items-center gap-5 text-[11px] font-medium md:flex">
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 shrink-0">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              {ADDRESS}
            </span>
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 shrink-0">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
              {HOURS}
            </span>
          </div>

          {/* Descuento — centro en mobile, visible siempre */}
         {/*  <p className="flex-1 text-center text-[10px] font-bold uppercase tracking-widest md:text-[11px]">
            10% OFF en efectivo · 5% en transferencia
          </p> */}

          {/* WhatsApp desktop */}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 text-[11px] font-semibold transition-opacity hover:opacity-80 md:flex"
            aria-label="Contactar por WhatsApp"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 8.04 0C3.674 0 .12 3.554.12 7.92c0 1.398.365 2.762 1.057 3.965L0 16l4.235-1.11a7.902 7.902 0 0 0 3.805.968h.003c4.366 0 7.92-3.554 7.92-7.92a7.9 7.9 0 0 0-2.362-5.612Zm-5.56 12.21a6.57 6.57 0 0 1-3.345-.915l-.24-.144-2.515.66.672-2.453-.156-.252a6.56 6.56 0 0 1-1.004-3.514c0-3.626 2.95-6.576 6.577-6.576 1.747 0 3.389.68 4.624 1.915a6.53 6.53 0 0 1 1.92 4.64c-.001 3.627-2.95 6.577-6.576 6.577Z" />
              <path d="M11.78 9.812c-.148-.074-.87-.428-1.004-.476-.134-.05-.232-.074-.33.074-.098.148-.379.476-.464.574-.086.099-.173.111-.32.037-.148-.074-.625-.23-1.19-.733-.44-.392-.737-.876-.824-1.024-.086-.148-.009-.228.065-.302.067-.067.148-.173.222-.259.074-.086.099-.148.148-.247.05-.099.025-.185-.012-.259-.037-.074-.33-.797-.453-1.092-.12-.289-.242-.25-.33-.255l-.282-.005a.54.54 0 0 0-.39.185c-.135.148-.514.501-.514 1.22 0 .718.526 1.412.6 1.51.074.099 1.037 1.584 2.515 2.221.351.151.625.241.838.308.352.112.672.096.925.058.282-.042.87-.355.992-.699.123-.343.123-.637.086-.699-.037-.062-.136-.099-.284-.173Z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>

      {/* Barra principal */}
      <div className="bg-[#029f9c] text-white">
        <div className="mx-auto w-full max-w-[1500px] px-2 py-3 md:px-4 md:pl-16 min-[1810px]:md:pl-28">
          <div className="flex items-center justify-between gap-2 md:grid md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-4 min-[1810px]:md:grid-cols-[130px_minmax(560px,760px)_260px] min-[1810px]:md:gap-8">
            {/* Botón hamburguesa mobile */}
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

            {/* Logo mobile */}
            <Link href="/" className="inline-flex items-center gap-1.5 md:hidden">
              <PawIcon className="h-6 w-6 text-white" />
              <span className="text-lg font-black uppercase tracking-wide text-white">Don Paco</span>
            </Link>

            {!isDesktopViewport ? (
              <div className="md:hidden">
                <HeaderCart />
              </div>
            ) : null}

            {/* Logo desktop */}
            <button
              type="button"
              onClick={() => setShowDesktopLogo((previous) => !previous)}
              className="hidden shrink-0 items-center justify-self-start md:inline-flex"
              aria-label="Alternar entre marca y logo"
              title="Alternar logo"
            >
              {showDesktopLogo ? (
                <Image
                  src="/logo.png"
                  alt="Don Paco logo"
                  width={230}
                  height={76}
                  className="h-12 w-auto origin-left scale-110 object-contain min-[1810px]:scale-125"
                  priority
                />
              ) : (
                <span className="inline-flex items-center gap-2">
                  <PawIcon className="h-7 w-7 text-white" />
                  <span className="text-lg font-black uppercase tracking-wide text-white min-[1810px]:text-xl">
                    Don Paco
                  </span>
                </span>
              )}
            </button>

            {/* Búsqueda */}
            <form
              className="order-3 hidden w-full md:order-none md:block md:w-full md:max-w-[560px] md:justify-self-center min-[1810px]:md:max-w-[760px]"
              role="search"
            >
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
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-5 w-5">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Derecha desktop: WhatsApp + carrito */}
            <div className="hidden shrink-0 items-center gap-4 text-center md:flex md:justify-self-end min-[1100px]:gap-6">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden flex-col items-center text-xs font-semibold transition-opacity hover:opacity-80 min-[1100px]:flex"
                aria-label="Contactar por WhatsApp"
              >
                <svg viewBox="0 0 16 16" className="mb-0.5 h-8 w-8 fill-current">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 8.04 0C3.674 0 .12 3.554.12 7.92c0 1.398.365 2.762 1.057 3.965L0 16l4.235-1.11a7.902 7.902 0 0 0 3.805.968h.003c4.366 0 7.92-3.554 7.92-7.92a7.9 7.9 0 0 0-2.362-5.612Zm-5.56 12.21a6.57 6.57 0 0 1-3.345-.915l-.24-.144-2.515.66.672-2.453-.156-.252a6.56 6.56 0 0 1-1.004-3.514c0-3.626 2.95-6.576 6.577-6.576 1.747 0 3.389.68 4.624 1.915a6.53 6.53 0 0 1 1.92 4.64c-.001 3.627-2.95 6.577-6.576 6.577Z" />
                  <path d="M11.78 9.812c-.148-.074-.87-.428-1.004-.476-.134-.05-.232-.074-.33.074-.098.148-.379.476-.464.574-.086.099-.173.111-.32.037-.148-.074-.625-.23-1.19-.733-.44-.392-.737-.876-.824-1.024-.086-.148-.009-.228.065-.302.067-.067.148-.173.222-.259.074-.086.099-.148.148-.247.05-.099.025-.185-.012-.259-.037-.074-.33-.797-.453-1.092-.12-.289-.242-.25-.33-.255l-.282-.005a.54.54 0 0 0-.39.185c-.135.148-.514.501-.514 1.22 0 .718.526 1.412.6 1.51.074.099 1.037 1.584 2.515 2.221.351.151.625.241.838.308.352.112.672.096.925.058.282-.042.87-.355.992-.699.123-.343.123-.637.086-.699-.037-.062-.136-.099-.284-.173Z" />
                </svg>
                WhatsApp
              </a>
              {isDesktopViewport ? <HeaderCart /> : null}
            </div>
          </div>
        </div>
      </div>

      <HeaderMenu isMobileOpen={isMobileMenuOpen} onRequestClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}
