"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import HeroBanner from "@/components/HeroBanner";
import MobileFilterSort from "@/components/mobile-filter-sort";
import PawIcon from "@/components/paw-icon";
import ProductCard from "@/components/product-card";
import ProductGroupCard from "@/components/product-group-card";
import SiteHeader from "@/components/site-header";
import SortDropdown from "@/components/sort-dropdown";
import { isCategoryId, navRoot, type NavNode } from "@/lib/category-tree";
import { buildListingEntries } from "@/lib/products";

function CategoryNav({
  nodes,
  depth,
  selectedCategory,
  onSelect,
}: {
  nodes: readonly NavNode[];
  depth: number;
  selectedCategory: string;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className={depth === 0 ? "space-y-2" : "ml-0.5 space-y-1 border-l border-[#e8e8e8] pl-2.5"}>
      {nodes.map((node, idx) =>
        node.kind === "leaf" ? (
          <li key={node.id}>
            <button
              type="button"
              onClick={() => onSelect(node.id)}
              className={`w-full cursor-pointer rounded-md px-2 py-1 text-left text-[14px] transition-colors ${
                selectedCategory === node.id
                  ? "bg-[#029f9c]/10 font-semibold text-[#029f9c]"
                  : "text-[#666] hover:bg-[#f6f6f6] hover:text-[#e4077d]"
              }`}
            >
              {node.label}
            </button>
          </li>
        ) : (
          <li key={`${node.label}-${idx}`} className={depth > 0 ? "pt-1" : ""}>
            <p
              className={`mb-1 px-2 font-semibold text-[#555] ${
                depth === 0
                  ? "text-[11px] font-black uppercase tracking-wider text-[#9a9a9a]"
                  : "text-[13px] text-[#666]"
              }`}
            >
              {node.label}
            </p>
            <CategoryNav nodes={node.children} depth={depth + 1} selectedCategory={selectedCategory} onSelect={onSelect} />
          </li>
        ),
      )}
    </ul>
  );
}

const filterGroups = [
  {
    title: "Precio",
    options: ["Menos de $20.000", "$20.000 - $50.000", "$50.000 - $100.000", "Más de $100.000"],
  },
];

const footerColumns = [
  {
    title: "Tienda",
    links: ["Alimentos", "Accesorios", "Preguntas frecuentes"],
  },
  {
    title: "Soporte",
    links: ["Contacto", "Seguimiento", "Cambios y devoluciones", "Preguntas frecuentes"],
  },
  {
    title: "Empresa",
    links: ["Sobre Don Paco", "Nuestro local en Rio Negro", "Blog", "Trabaja con nosotros"],
  },
  {
    title: "Legal",
    links: ["Terminos y condiciones", "Privacidad", "Defensa del consumidor"],
  },
];

export default function Home() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("categoria");
    if (c && isCategoryId(c)) {
      setSelectedCategory(c);
    }
  }, []);

  const selectCategory = useCallback(
    (id: string) => {
      setSelectedCategory(id);
      if (id === "Todas") {
        router.replace("/", { scroll: false });
      } else {
        router.replace(`/?categoria=${id}`, { scroll: false });
      }
    },
    [router],
  );

  const filteredListing = useMemo(() => {
    const entries = buildListingEntries();
    if (selectedCategory === "Todas") return entries;
    return entries.filter((entry) => {
      if (entry.type === "product") {
        return entry.product.categoryId === selectedCategory;
      }
      return (
        entry.categoryId === selectedCategory ||
        entry.variants.some((v) => v.categoryId === selectedCategory)
      );
    });
  }, [selectedCategory]);

  return (
    <main className="min-h-screen bg-white text-[#3f3f3f]">
      <SiteHeader />

      <HeroBanner />

      <section className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9a9a9a]">
              Productos
            </p>
            <h1 className="inline-flex items-center gap-2">
              <PawIcon className="h-7 w-7 text-[#029f9c]" />
              <span className="text-2xl font-black uppercase tracking-wide text-[#4c4c4c] md:text-3xl">
                Don Paco
              </span>
            </h1>
          </div>
          <div className="hidden lg:block">
            <SortDropdown />
          </div>
        </div>

        <MobileFilterSort
          navRoot={navRoot}
          filterGroups={filterGroups}
          selectedCategory={selectedCategory}
          onChangeCategory={selectCategory}
        />

        <div className="grid gap-6 lg:items-start lg:grid-cols-[280px_1fr]">
          <aside className="hidden h-fit rounded-xl border border-[#e6e6e6] bg-white p-5 lg:block">
            <h2 className="mb-4 text-sm font-extrabold uppercase tracking-widest text-[#029f9c]">
              Categorías
            </h2>
            <ul className="mb-6 space-y-1 text-[15px]">
              <li>
                <button
                  type="button"
                  onClick={() => selectCategory("Todas")}
                  className={`w-full cursor-pointer rounded-md px-2 py-1.5 text-left transition-colors ${
                    selectedCategory === "Todas"
                      ? "bg-[#029f9c]/10 font-semibold text-[#029f9c]"
                      : "text-[#666] hover:bg-[#f6f6f6] hover:text-[#e4077d]"
                  }`}
                >
                  Todas
                </button>
              </li>
              <li className="pt-1">
                <CategoryNav
                  nodes={navRoot}
                  depth={0}
                  selectedCategory={selectedCategory}
                  onSelect={selectCategory}
                />
              </li>
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
                  <ul className="space-y-1.5 text-base text-[#666] md:text-[17px]">
                    {group.options.map((option) => (
                      <li key={option}>
                        <label className="flex cursor-pointer items-center gap-2">
                          <input type="checkbox" className="cursor-pointer accent-[#029f9c]" />
                          <span>{option}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>

          <div className="order-1 grid grid-cols-2 gap-3 sm:gap-5 2xl:grid-cols-3 lg:order-2">
            {filteredListing.map((entry) =>
              entry.type === "group" ? (
                <ProductGroupCard
                  key={entry.groupSlug}
                  entry={entry}
                  showPetAudience={selectedCategory === "Todas"}
                />
              ) : (
                <ProductCard
                  key={entry.product.slug}
                  product={entry.product}
                  showPetAudience={selectedCategory === "Todas"}
                />
              ),
            )}
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

      <footer className="mt-16 border-t border-[#dfdfdf] bg-[#f3f3f3]">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] md:gap-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2">
              <PawIcon className="h-7 w-7 text-[#029f9c]" />
              <span className="text-lg font-black uppercase tracking-wide text-[#4c4c4c]">Don Paco</span>
            </div>
            <p className="mb-8 max-w-xs text-[15px] leading-7 text-[#6a6a6a]">
              El pet shop de Rio Negro para consentir a tu mascota con productos de calidad y
              atencion personalizada.
            </p>
            <div className="flex items-center gap-4 text-[#656565]">
              <a href="#" aria-label="Facebook" className="transition-colors hover:text-[#029f9c]">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M13.6 8.5V7.1c0-.7.5-.9.8-.9h2.1V3h-2.9c-3.2 0-3.9 2.4-3.9 4v1.5H7.8v3.5h1.9V21h3.9v-9h2.6l.4-3.5h-3z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="transition-colors hover:text-[#029f9c]">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3Zm0 7.8A3.1 3.1 0 1 1 12 8.9a3.1 3.1 0 0 1 0 6.2Zm6-7.9a1.1 1.1 0 1 1-2.1 0 1.1 1.1 0 0 1 2.1 0Z" />
                  <path d="M12 2.2h4.1c3.2 0 5.7 2.5 5.7 5.7V16c0 3.2-2.5 5.7-5.7 5.7H7.9A5.7 5.7 0 0 1 2.2 16V7.9c0-3.2 2.5-5.7 5.7-5.7H12Zm0 1.6H7.9a4.1 4.1 0 0 0-4.1 4.1V16A4.1 4.1 0 0 0 7.9 20h8.2a4.1 4.1 0 0 0 4.1-4.1V7.9a4.1 4.1 0 0 0-4.1-4.1H12Z" />
                </svg>
              </a>
              <a href="#" aria-label="TikTok" className="transition-colors hover:text-[#029f9c]">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M14.8 3v9.4a3.4 3.4 0 1 1-2.4-3.2V6.8a6.7 6.7 0 1 0 4.8 6.4V8.8a6.7 6.7 0 0 0 3.9 1.3V7.7a4.3 4.3 0 0 1-4-4.7h-2.3Z" />
                </svg>
              </a>
              <a href="#" aria-label="WhatsApp" className="transition-colors hover:text-[#029f9c]">
                <svg viewBox="0 0 16 16" className="h-5 w-5 fill-current">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 8.04 0C3.674 0 .12 3.554.12 7.92c0 1.398.365 2.762 1.057 3.965L0 16l4.235-1.11a7.902 7.902 0 0 0 3.805.968h.003c4.366 0 7.92-3.554 7.92-7.92a7.9 7.9 0 0 0-2.362-5.612Zm-5.56 12.21a6.57 6.57 0 0 1-3.345-.915l-.24-.144-2.515.66.672-2.453-.156-.252a6.56 6.56 0 0 1-1.004-3.514c0-3.626 2.95-6.576 6.577-6.576 1.747 0 3.389.68 4.624 1.915a6.53 6.53 0 0 1 1.92 4.64c-.001 3.627-2.95 6.577-6.576 6.577Z" />
                  <path d="M11.78 9.812c-.148-.074-.87-.428-1.004-.476-.134-.05-.232-.074-.33.074-.098.148-.379.476-.464.574-.086.099-.173.111-.32.037-.148-.074-.625-.23-1.19-.733-.44-.392-.737-.876-.824-1.024-.086-.148-.009-.228.065-.302.067-.067.148-.173.222-.259.074-.086.099-.148.148-.247.05-.099.025-.185-.012-.259-.037-.074-.33-.797-.453-1.092-.12-.289-.242-.25-.33-.255l-.282-.005a.54.54 0 0 0-.39.185c-.135.148-.514.501-.514 1.22 0 .718.526 1.412.6 1.51.074.099 1.037 1.584 2.515 2.221.351.151.625.241.838.308.352.112.672.096.925.058.282-.042.87-.355.992-.699.123-.343.123-.637.086-.699-.037-.062-.136-.099-.284-.173Z" />
                </svg>
              </a>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-[#4f4f4f]">
                {column.title}
              </h3>
              <ul className="space-y-3 text-[15px] text-[#676767]">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors hover:text-[#e4077d]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mx-auto w-full max-w-7xl border-t border-[#d8d8d8] px-6 py-6">
          <p className="text-sm text-[#6b6b6b]">
            © 2026 Don Paco Pet Shop. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
