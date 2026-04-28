"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AboutSection from "@/components/AboutSection";
import CategoryGrid from "@/components/CategoryGrid";
import HeroBanner from "@/components/HeroBanner";
import MobileFilterSort from "@/components/mobile-filter-sort";
import PawIcon from "@/components/paw-icon";
import ProductCard from "@/components/product-card";
import ProductGroupCard from "@/components/product-group-card";
import ShippingSection from "@/components/ShippingSection";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import SortDropdown from "@/components/sort-dropdown";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrustBar from "@/components/TrustBar";
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

const PAGE_SIZE = 12;

export default function Home() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

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
      setVisibleCount(PAGE_SIZE);
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

  const visibleListing = filteredListing.slice(0, visibleCount);
  const hasMore = visibleCount < filteredListing.length;

  return (
    <main className="min-h-screen bg-white text-[#3f3f3f]">
      <SiteHeader />

      <HeroBanner />

      <TrustBar />

      <CategoryGrid />

      {/* Grid de productos */}
      <section id="productos" className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9a9a9a]">
              Catálogo completo
            </p>
            <h2 className="inline-flex items-center gap-2">
              <PawIcon className="h-7 w-7 text-[#029f9c]" />
              <span className="text-2xl font-black uppercase tracking-wide text-[#4c4c4c] md:text-3xl">
                Nuestros productos
              </span>
            </h2>
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
            {visibleListing.map((entry) =>
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

        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-[13px] text-[#9a9a9a]">
            Mostrando {visibleListing.length} de {filteredListing.length} productos
          </p>
          {hasMore && (
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                className="rounded-full bg-[#029f9c] px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#028785]"
              >
                Mostrar más
              </button>
              <button
                type="button"
                onClick={() => setVisibleCount(filteredListing.length)}
                className="rounded-full border border-[#029f9c] px-8 py-3 text-sm font-bold uppercase tracking-wide text-[#029f9c] transition-colors hover:bg-[#029f9c] hover:text-white"
              >
                Ver todos ({filteredListing.length})
              </button>
            </div>
          )}
        </div>
      </section>

      <ShippingSection />

      <AboutSection />

      <TestimonialsSection />

      <SiteFooter />
    </main>
  );
}
