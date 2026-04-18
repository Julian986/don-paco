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

  const goToDetail = () => {
    router.push(href);
  };

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
        <div className="pointer-events-none absolute left-2 right-2 top-2 z-10 flex items-start justify-between gap-1.5 sm:left-2.5 sm:right-2.5 sm:top-2.5">
          <span className="rounded-full bg-[#e4077d] px-1.5 py-0.5 text-[9px] font-bold uppercase text-white shadow-sm sm:px-2 sm:py-1 sm:text-[11px]">
            2x1
          </span>
          <span className="rounded-full bg-[#029f9c] px-1.5 py-0.5 text-[9px] font-bold uppercase text-white shadow-sm sm:px-2 sm:py-1 sm:text-[11px]">
            Envio gratis
          </span>
        </div>
        {entry.imageSrc ? (
          <Image
            src={entry.imageSrc}
            alt={entry.displayName}
            fill
            className="object-cover"
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
        <h4 className="mb-1 min-h-[2.4rem] text-[13px] font-extrabold uppercase leading-tight text-[#777] sm:mb-2 sm:min-h-[3rem] sm:text-base">
          <Link href={href} className="transition-colors hover:text-[#029f9c]">
            {entry.displayName}
          </Link>
        </h4>
        <p className="text-base font-black text-[#029f9c] sm:text-xl">Desde {formatArs(entry.fromPrice)}</p>
        <p className="mb-3 text-[11px] text-[#888] sm:mb-4 sm:text-sm">
          Desde {formatArs(entry.fromCashPrice)} efectivo o transferencia
        </p>
        <div className="mt-auto flex flex-col gap-1.5 sm:flex-row sm:gap-2">
          <Link
            href={href}
            className="flex-1 rounded-md bg-[#029f9c] px-3 py-2 text-center text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#028785] sm:text-xs"
          >
            Elegir formato
          </Link>
          <Link
            href={href}
            className="rounded-md border border-[#e4077d] px-3 py-2 text-center text-[11px] font-bold uppercase tracking-wide text-[#e4077d] transition-colors hover:bg-[#e4077d] hover:text-white sm:text-xs"
          >
            Ver
          </Link>
        </div>
      </div>
    </article>
  );
}
