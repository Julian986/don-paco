import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";

export type AdminBackNavProps = {
  href: string;
  /** Texto corto: «Productos», «Panel», nombre del grupo padre, etc. */
  children: React.ReactNode;
  className?: string;
  /**
   * En pantallas chicas el vínculo queda visible al hacer scroll (debajo del encabezado «Panel»).
   * Desactivar solo si molesta en algún layout muy especial.
   */
  stickyOnMobile?: boolean;
};

/** Navegación atrás unificada del panel (misma posición en edición de producto, grupo, etc.). */
export function AdminBackNav({ href, children, className, stickyOnMobile = true }: AdminBackNavProps) {
  return (
    <>
      <nav
        aria-label="Volver atrás"
        className={cn(
          "flex justify-start",
          stickyOnMobile &&
            "fixed left-0 right-0 top-14 z-[25] border-b border-[#029f9c]/20 bg-gradient-to-b from-[#e4f7f6] to-[#ecfdfb] px-4 py-2.5 md:static md:inset-auto md:z-auto md:border-0 md:bg-transparent md:bg-none md:px-0 md:py-0",
          "mb-2 md:mb-4",
          className,
        )}
      >
        <Link
          href={href}
          className={cn(
            "inline-flex min-h-[48px] w-fit max-w-full items-center gap-2.5 rounded-xl border-2 border-[#029f9c]/40 bg-white px-3 py-2.5 text-[15px] font-semibold text-[#134e4c] shadow-[0_2px_8px_rgba(2,159,156,0.12)] transition-[transform,background-color,border-color,box-shadow] outline-none",
            "hover:border-[#029f9c]/65 hover:bg-[#f4fdfc] hover:text-[#027a78] hover:shadow-[0_3px_12px_rgba(2,159,156,0.18)]",
            "active:scale-[0.985] active:bg-[#e8faf9]",
            "focus-visible:ring-2 focus-visible:ring-[#029f9c] focus-visible:ring-offset-2",
            "md:min-h-[44px] md:px-4",
          )}
        >
          <ArrowLeft className="h-5 w-5 shrink-0 text-[#029f9c]" strokeWidth={2.5} aria-hidden />
          <span className="whitespace-nowrap">{children}</span>
        </Link>
      </nav>
      {stickyOnMobile ? (
        <div className="h-[72px] shrink-0 md:hidden" aria-hidden />
      ) : null}
    </>
  );
}
