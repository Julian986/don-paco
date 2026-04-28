import Link from "next/link";
import PawIcon from "@/components/paw-icon";

const ADDRESS = process.env.NEXT_PUBLIC_LOCAL_ADDRESS ?? "Roca 473, Gral. Fernández Oro — RN";
const HOURS = process.env.NEXT_PUBLIC_LOCAL_HOURS ?? "Lun-Sab 9:00-20:00";
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP ?? "5492984000000";

const storeLinks = [
  { label: "Alimentos para perros", href: "/?categoria=alimento-seco-perro" },
  { label: "Alimentos para gatos", href: "/?categoria=alimento-seco-gato" },
  { label: "Accesorios", href: "/?categoria=accesorio-collar-correa" },
  { label: "Dietas veterinarias", href: "/?categoria=dieta-veterinaria-perro" },
  { label: "Snacks y premios", href: "/?categoria=alimento-snack-perro" },
];

const supportLinks = [
  { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
  { label: "Contacto por WhatsApp", href: `https://wa.me/${WA_NUMBER}` },
  { label: "Cambios y devoluciones", href: "#" },
  { label: "Política de envíos", href: "#" },
];

export default function SiteFooter() {
  const waHref = `https://wa.me/${WA_NUMBER}?text=Hola!%20Quiero%20hacer%20una%20consulta.`;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-[#c8c8c8]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.6fr_1fr_1fr_1.2fr] md:gap-8 md:py-16">
        {/* Columna 1: Marca */}
        <div>
          <div className="mb-5 inline-flex items-center gap-2">
            <PawIcon className="h-8 w-8 text-[#029f9c]" />
            <span className="text-xl font-black uppercase tracking-wide text-white">Don Paco</span>
          </div>
          <p className="mb-6 max-w-xs text-[14px] leading-7 text-[#8a8a8a]">
            El pet shop de confianza en Fernández Oro, Río Negro. Alimentos, accesorios y
            atención personalizada para tu mascota.
          </p>
          {/* Redes sociales */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[#c8c8c8] transition-colors hover:bg-[#029f9c] hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M13.6 8.5V7.1c0-.7.5-.9.8-.9h2.1V3h-2.9c-3.2 0-3.9 2.4-3.9 4v1.5H7.8v3.5h1.9V21h3.9v-9h2.6l.4-3.5h-3z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[#c8c8c8] transition-colors hover:bg-[#e4077d] hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3Zm0 7.8A3.1 3.1 0 1 1 12 8.9a3.1 3.1 0 0 1 0 6.2Zm6-7.9a1.1 1.1 0 1 1-2.1 0 1.1 1.1 0 0 1 2.1 0Z" />
                <path d="M12 2.2h4.1c3.2 0 5.7 2.5 5.7 5.7V16c0 3.2-2.5 5.7-5.7 5.7H7.9A5.7 5.7 0 0 1 2.2 16V7.9c0-3.2 2.5-5.7 5.7-5.7H12Zm0 1.6H7.9a4.1 4.1 0 0 0-4.1 4.1V16A4.1 4.1 0 0 0 7.9 20h8.2a4.1 4.1 0 0 0 4.1-4.1V7.9a4.1 4.1 0 0 0-4.1-4.1H12Z" />
              </svg>
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[#c8c8c8] transition-colors hover:bg-[#25d366] hover:text-white"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 8.04 0C3.674 0 .12 3.554.12 7.92c0 1.398.365 2.762 1.057 3.965L0 16l4.235-1.11a7.902 7.902 0 0 0 3.805.968h.003c4.366 0 7.92-3.554 7.92-7.92a7.9 7.9 0 0 0-2.362-5.612Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Columna 2: Tienda */}
        <div>
          <h3 className="mb-5 text-[12px] font-extrabold uppercase tracking-widest text-white">Tienda</h3>
          <ul className="space-y-3 text-[14px]">
            {storeLinks.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="transition-colors hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 3: Soporte */}
        <div>
          <h3 className="mb-5 text-[12px] font-extrabold uppercase tracking-widest text-white">Soporte</h3>
          <ul className="space-y-3 text-[14px]">
            {supportLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="transition-colors hover:text-white"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 4: Contacto */}
        <div>
          <h3 className="mb-5 text-[12px] font-extrabold uppercase tracking-widest text-white">Visitanos</h3>

          <div className="mb-4 flex items-start gap-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="#029f9c" strokeWidth="2" className="mt-0.5 h-4 w-4 shrink-0">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <p className="text-[14px] leading-6">{ADDRESS}</p>
          </div>

          <div className="mb-6 flex items-start gap-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="#029f9c" strokeWidth="2" className="mt-0.5 h-4 w-4 shrink-0">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
            <p className="text-[14px]">{HOURS}</p>
          </div>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide text-white shadow transition-all hover:scale-105 hover:bg-[#1ebe5b]"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 8.04 0C3.674 0 .12 3.554.12 7.92c0 1.398.365 2.762 1.057 3.965L0 16l4.235-1.11a7.902 7.902 0 0 0 3.805.968h.003c4.366 0 7.92-3.554 7.92-7.92a7.9 7.9 0 0 0-2.362-5.612Z" />
            </svg>
            Escribinos por WhatsApp
          </a>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-5">
          <p className="text-[13px] text-[#6a6a6a]">
            © {year} Don Paco Pet Shop. Todos los derechos reservados.
          </p>
          <p className="text-[12px] text-[#555]">Fernández Oro, Río Negro</p>
        </div>
      </div>
    </footer>
  );
}
