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
      <div className="bg-[#e4077d] px-4 py-2 text-center text-xs font-semibold tracking-wide text-white">
        Envio gratis en compras seleccionadas
      </div>

      <header className="sticky top-0 z-20 border-b border-[#e5e5e5] bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#9a9a9a] md:px-6">
          <p>Don Paco Pet Shop - Rio Negro</p>
          <p className="hidden sm:block">Atencion personalizada y envios</p>
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-3 px-4 py-3 md:flex-nowrap md:gap-5 md:px-6">
          <a href="/" className="shrink-0">
            <Image
              src="/logo.png"
              alt="Logo Don Paco"
              width={118}
              height={118}
              priority
            />
          </a>

          <form className="order-3 w-full md:order-none md:flex-1" role="search">
            <label htmlFor="search-products" className="sr-only">
              Buscar producto
            </label>
            <div className="flex items-center overflow-hidden rounded-full border border-[#d9d9d9] bg-white focus-within:border-[#029f9c]">
              <input
                id="search-products"
                name="search"
                type="search"
                placeholder="Buscar productos, camas, colchonetas..."
                className="w-full px-4 py-2.5 text-sm text-[#555] outline-none placeholder:text-[#aaaaaa]"
              />
              <button
                type="submit"
                aria-label="Buscar"
                className="h-full px-4 py-2.5 text-[#029f9c] transition-colors hover:text-[#e4077d]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  className="h-6 w-6"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </button>
            </div>
          </form>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-[#e4077d] px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#c5066b]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="18" cy="20" r="1.5" />
                <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.5L21 8H7" />
              </svg>
              Mi carrito (0)
            </button>
          </div>
        </div>

        <nav className="border-t border-[#ececec] bg-white">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-3 text-sm font-bold uppercase tracking-wider text-[#8d8d8d] md:px-6">
            <a href="#" className="transition-colors hover:text-[#029f9c]">
              Productos
            </a>
            <a href="#" className="transition-colors hover:text-[#029f9c]">
              Perros
            </a>
            <a href="#" className="transition-colors hover:text-[#029f9c]">
              Gatos
            </a>
            <a href="#" className="transition-colors hover:text-[#029f9c]">
              Ofertas
            </a>
            <a href="#" className="transition-colors hover:text-[#029f9c]">
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
