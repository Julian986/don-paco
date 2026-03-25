import Image from "next/image";

const categoryLinks = [
  "Contacto",
  "Moises",
  "Colchonetas",
  "Mantas",
  "Catres",
];

const filterGroups = [
  {
    title: "Color",
    options: ["Gris (31)", "Fucsia (3)", "Beige (16)", "Verde (17)", "Negro (21)"],
  },
  {
    title: "Tamaño",
    options: ["Chico (14)", "Mediano (11)", "Grande (16)"],
  },
  {
    title: "Precio",
    options: ["$10.000 - $30.000", "$30.000 - $60.000", "$60.000+"],
  },
];

const products = [
  { name: "Manta Refrigerante Clasicas", price: "$33.900", cash: "$30.510" },
  { name: "Mantita Polar", price: "$11.900", cash: "$10.710" },
  { name: "Colchoneta Chipre", price: "$32.670", cash: "$29.403" },
  { name: "Rascador Alfombra de Gato", price: "$13.000", cash: "$11.700" },
  { name: "Colchoneta Fuji Chica", price: "$29.290", cash: "$26.361" },
  { name: "Moises Coqueton Jean Chico", price: "$57.100", cash: "$51.390" },
  { name: "Moises Coqueton Jean Grande", price: "$74.990", cash: "$67.491" },
  { name: "Moises Tulum Grande", price: "$80.850", cash: "$72.765" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#3f3f3f]">
      <header className="sticky top-0 z-20 shadow-sm">
        <div className="bg-[#e4077d]">
          <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center px-3 py-1.5 md:px-4">
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
          <div className="flex w-full flex-wrap items-center gap-3 px-2 py-3 md:flex-nowrap md:gap-10 md:px-4">
            <a href="/" className="shrink-0">
              <Image
                src="/logo.png"
                alt="Logo Don Paco"
                width={86}
                height={86}
                priority
              />
            </a>

            <form className="order-3 w-full md:order-none md:flex-1" role="search">
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

            <div className="ml-auto flex items-center gap-10 text-center">
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
              <a href="#" className="relative text-xs font-semibold">
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e4077d] px-1 text-[10px] font-bold text-white">
                  0
                </span>
                <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-8 w-8">
                    <circle cx="9" cy="20" r="1.4" />
                    <circle cx="18" cy="20" r="1.4" />
                    <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.5L21 8H7" />
                  </svg>
                </div>
                Mi carrito
              </a>
            </div>
          </div>
        </div>

        <nav className="border-t border-white/35 bg-[#029f9c]">
          <div className="flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-2.5 text-[15px] font-semibold text-white md:px-6">
            <a href="#" className="inline-flex items-center gap-1 transition-colors hover:text-[#f6d4ea]">
              Accesorios
              <span className="text-[10px]">▼</span>
            </a>
            <a href="#" className="inline-flex items-center gap-1 transition-colors hover:text-[#f6d4ea]">
              Alimentos
              <span className="text-[10px]">▼</span>
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
        </nav>
      </header>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9a9a9a]">
              Productos
            </p>
            <h1 className="text-2xl font-black uppercase tracking-wide text-[#029f9c] md:text-3xl">
              Moises y Colchonetas
            </h1>
          </div>
          <select
            className="rounded-md border border-[#d8d8d8] bg-white px-3 py-2 text-sm text-[#666]"
            defaultValue="destacado"
            aria-label="Ordenar productos"
          >
            <option value="destacado">Destacado</option>
            <option value="precio-menor">Precio: menor a mayor</option>
            <option value="precio-mayor">Precio: mayor a menor</option>
            <option value="nuevos">Mas nuevo al mas viejo</option>
          </select>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-xl border border-[#e6e6e6] bg-white p-5">
            <h2 className="mb-4 text-sm font-extrabold uppercase tracking-widest text-[#029f9c]">
              Categorias
            </h2>
            <ul className="mb-6 space-y-2 text-sm">
              {categoryLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#666] transition-colors hover:text-[#e4077d]">
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-widest text-[#029f9c]">
              Filtrar por
            </h3>
            <div className="space-y-5">
              {filterGroups.map((group) => (
                <div key={group.title}>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#9a9a9a]">
                    {group.title}
                  </p>
                  <ul className="space-y-1 text-sm text-[#666]">
                    {group.options.map((option) => (
                      <li key={option}>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="accent-[#029f9c]" />
                          <span>{option}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.name}
                className="group rounded-xl border border-[#e2e2e2] bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative mb-3 overflow-hidden rounded-lg border border-[#e9e9e9] bg-gradient-to-br from-[#f5f5f5] to-[#ececec] p-3">
                  <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase">
                    <span className="rounded-full bg-[#e4077d] px-2 py-1 text-white">2x1</span>
                    <span className="rounded-full bg-[#029f9c] px-2 py-1 text-white">
                      Envio gratis
                    </span>
                  </div>
                  <div className="flex h-44 items-center justify-center rounded bg-white/80 text-6xl">
                    🐾
                  </div>
                </div>
                <h4 className="mb-2 text-base font-extrabold uppercase leading-tight text-[#777]">
                  {product.name}
                </h4>
                <p className="text-xl font-black text-[#029f9c]">{product.price}</p>
                <p className="mb-4 text-sm text-[#888]">{product.cash} con Efectivo</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex-1 rounded-md bg-[#029f9c] px-3 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#028785]"
                  >
                    Comprar
                  </button>
                  <button
                    type="button"
                    className="rounded-md border border-[#e4077d] px-3 py-2 text-xs font-bold uppercase tracking-wide text-[#e4077d] transition-colors hover:bg-[#e4077d] hover:text-white"
                  >
                    Ver
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="rounded-full border border-[#029f9c] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#029f9c] transition-colors hover:bg-[#029f9c] hover:text-white"
          >
            Mostrar mas productos
          </button>
        </div>
      </section>
    </main>
  );
}
