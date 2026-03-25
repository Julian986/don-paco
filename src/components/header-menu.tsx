"use client";

const menuItems = [
  { label: "Accesorios", hasDropdown: true },
  { label: "Alimentos", hasDropdown: true },
  { label: "Outlet", hasDropdown: false },
  { label: "Preguntas frecuentes", hasDropdown: false },
  { label: "Contacto", hasDropdown: false },
];

type HeaderMenuProps = {
  isMobileOpen: boolean;
  onRequestClose: () => void;
};

export default function HeaderMenu({ isMobileOpen, onRequestClose }: HeaderMenuProps) {
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
                  <a
                    key={item.label}
                    href="#"
                    onClick={onRequestClose}
                    className="flex items-center justify-between rounded-md px-2.5 py-3 text-base font-medium text-white/95 transition-colors hover:bg-white/10 hover:text-[#f6d4ea]"
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown ? <span className="text-[11px]">▼</span> : null}
                  </a>
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
                <a
                  key={item.label}
                  href="#"
                  className="inline-flex items-center gap-1 transition-colors hover:text-[#f6d4ea]"
                >
                  {item.label}
                  {item.hasDropdown ? <span className="text-[12px]">▼</span> : null}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
