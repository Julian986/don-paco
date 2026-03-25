import PawIcon from "@/components/paw-icon";

const footerColumns = [
  {
    title: "Tienda",
    links: ["Perros", "Gatos", "Accesorios", "Alimentos", "Ofertas"],
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

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[#dfdfdf] bg-[#f3f3f3]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] md:gap-8">
        <div>
          <div className="mb-6 inline-flex items-center gap-2">
            <PawIcon className="h-8 w-8 text-[#029f9c]" />
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
                <path d="M17.53 4.53a4.9 4.9 0 0 1-2.88-1.72V2h-2.9v11.02a2.97 2.97 0 1 1-2.97-2.97c.21 0 .41.02.61.06V7.18a5.86 5.86 0 1 0 5.26 5.84V7.86c.9.4 1.88.6 2.88.6V4.53Z" />
              </svg>
            </a>
            <a href="#" aria-label="WhatsApp" className="transition-colors hover:text-[#029f9c]">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .18 5.32.18 11.88c0 2.1.55 4.14 1.59 5.94L0 24l6.32-1.66a11.83 11.83 0 0 0 5.74 1.47h.01c6.56 0 11.88-5.32 11.88-11.88 0-3.17-1.23-6.15-3.43-8.35Zm-8.46 18.32a9.95 9.95 0 0 1-5.07-1.39l-.36-.21-3.75.98 1-3.65-.23-.37a9.9 9.9 0 0 1-1.53-5.28c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.91 7c0 5.48-4.45 9.93-9.9 9.94Zm5.45-7.4c-.3-.15-1.77-.88-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.18.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.67-2.1-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.08-.8.37-.27.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.13 3.25 5.15 4.56.72.31 1.28.5 1.71.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
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
        <p className="text-sm text-[#6b6b6b]">© 2026 Don Paco Pet Shop. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
