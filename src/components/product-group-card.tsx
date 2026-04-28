"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { petAudienceShortLabel } from "@/lib/category-tree";
import { formatArs, type ListingEntry } from "@/lib/products";

type ProductGroupCardProps = {
  entry: Extract<ListingEntry, { type: "group" }>;
  showPetAudience?: boolean;
};

export default function ProductGroupCard({ entry, showPetAudience }: ProductGroupCardProps) {
  const router = useRouter();
  const href = `/productos/${entry.groupSlug}`;
  const zoomOutGroupSlugs = new Set(["sieger-gato-kitten"]);
  const zoomInGroupSlugs = new Set(["agility-adulto", "agility-cordero", "agility-adulto-raza-peq"]);
  const imageFitClass = zoomOutGroupSlugs.has(entry.groupSlug)
    ? "object-contain p-6"
    : zoomInGroupSlugs.has(entry.groupSlug)
      ? "object-contain p-2"
      : "object-contain p-4";

  const goToDetail = () => router.push(href);

  const handleCardClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("button, a, input, select, textarea")) return;
    goToDetail();
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    goToDetail();
  };

  return (
    <article
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-[#e2e2e2] bg-white shadow-sm transition-shadow hover:shadow-md"
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      tabIndex={0}
      role="link"
      aria-label={`${showPetAudience ? `${petAudienceShortLabel(entry.categoryId)} · ` : ""}Ver opciones de ${entry.displayName}`}
    >
      <div className="relative aspect-[5/6] w-full shrink-0 bg-white sm:aspect-[4/5]">
        {entry.imageSrc ? (
          <Image
            src={entry.imageSrc}
            alt={entry.displayName}
            fill
            className={imageFitClass}
            sizes="(max-width: 640px) 50vw, 280px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#f4f4f4] text-sm font-semibold text-[#888]">
            Sin imagen
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-2.5 sm:p-4">
        {showPetAudience ? (
          <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wide text-[#9a9a9a]">
            {petAudienceShortLabel(entry.categoryId)}
          </p>
        ) : null}
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-[#029f9c]">
          Varias presentaciones
        </p>
        <h4 className="mb-2 min-h-[2.4rem] text-[13px] font-extrabold uppercase leading-tight text-[#777] sm:min-h-[3rem] sm:text-base">
          <Link href={href} className="transition-colors hover:text-[#029f9c]">
            {entry.displayName}
          </Link>
        </h4>

        {/* Precios */}
        <div className="mb-3">
          <p className="text-base font-black text-[#029f9c] sm:text-xl">Desde {formatArs(entry.fromPrice)}</p>
          <p className="text-[11px] text-[#888] sm:text-sm">
            Desde {formatArs(entry.fromCashPrice)} efectivo o transferencia
          </p>
        </div>

        {/* CTA único */}
        <div className="mt-auto">
          <Link
            href={href}
            className="flex w-full items-center justify-center gap-1.5 rounded-md bg-[#029f9c] px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#028785] sm:text-xs"
          >
            Ver opciones
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
