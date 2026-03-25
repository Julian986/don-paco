import Image from "next/image";
import Link from "next/link";
import HeaderCart from "@/components/header-cart";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 shadow-sm">
      <div className="bg-[#e4077d]">
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center px-3 py-1.5 md:px-4 md:pl-28">
          <div className="flex items-center gap-2 text-white">
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
          <p className="whitespace-nowrap text-center text-[10px] font-semibold uppercase tracking-widest text-white md:text-[11px]">
            Descuento adicional: 10% en efectivo o 5 % transferencias
          </p>
          <div />
        </div>
      </div>

      <div className="bg-[#029f9c] text-white">
        <div className="mx-auto w-full max-w-[1500px] px-2 py-3 md:px-4 md:pl-28">
          <div className="grid items-center gap-3 md:grid-cols-[130px_minmax(560px,760px)_260px] md:gap-8">
            <Link href="/" className="shrink-0 justify-self-start">
              <Image src="/logo.png" alt="Logo Don Paco" width={86} height={86} priority />
            </Link>

            <form className="order-3 w-full md:order-none md:justify-self-center" role="search">
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

            <div className="ml-auto flex items-center gap-11 text-center md:ml-0 md:justify-self-end">
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

      <nav className="border-t border-white/35 bg-[#029f9c]">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 md:pl-28">
          <div className="flex flex-wrap items-center justify-start gap-x-8 gap-y-2 py-2.5 text-[17px] font-medium text-white lg:pl-[284px]">
            <a href="#" className="inline-flex items-center gap-1 transition-colors hover:text-[#f6d4ea]">
              Accesorios
              <span className="text-[12px]">▼</span>
            </a>
            <a href="#" className="inline-flex items-center gap-1 transition-colors hover:text-[#f6d4ea]">
              Alimentos
              <span className="text-[12px]">▼</span>
            </a>
            <a href="#" className="transition-colors hover:text-[#f6d4ea]">
              Outlet
            </a>
            <a href="#" className="transition-colors hover:text-[#f6d4ea]">
              Preguntas frecuentes
            </a>
            <a href="#" className="transition-colors hover:text-[#f6d4ea]">
              Contacto
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
