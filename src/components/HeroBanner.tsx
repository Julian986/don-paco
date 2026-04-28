"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP ?? "5492984000000";
const ADDRESS = process.env.NEXT_PUBLIC_LOCAL_ADDRESS ?? "Roca 473, Gral. Fernández Oro — RN";

export default function HeroBanner() {
  const waHref = `https://wa.me/${WA_NUMBER}?text=Hola!%20Vi%20su%20tienda%20online%20y%20me%20gustar%C3%ADa%20consultar%20sobre%20un%20producto.`;

  return (
    <section
      className="relative w-full overflow-hidden bg-[#029f9c]"
      aria-label="Bienvenidos a Don Paco Pet Shop"
    >
      {/* Mobile: imagen arriba, texto abajo */}
      <div className="md:hidden">
        <div className="relative h-56 w-full">
          <Image
            src="/banner.jpg"
            alt="Don Paco Pet Shop"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#029f9c]/70 to-transparent" />
        </div>
        <div className="px-5 py-7">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-white/70">
            Tu mascota merece lo mejor
          </p>
          <h1 className="mb-3 text-3xl font-black leading-tight text-white">
            El pet shop de<br />confianza en Río Negro
          </h1>
          <p className="mb-6 text-sm leading-relaxed text-white/80">
            {ADDRESS} — Encontrá alimentos, accesorios y todo lo que tu mascota necesita.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/#productos"
              className="rounded-full bg-white px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-[#029f9c] shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              Ver productos
            </Link>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-white px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-[#029f9c]"
            >
              Escribinos por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Desktop: dos paneles */}
      <div className="hidden md:flex md:min-h-[420px] md:max-h-[520px]">
        {/* Panel izquierdo — texto */}
        <div className="relative z-10 flex w-[55%] flex-col justify-center px-12 py-12 lg:px-16 xl:px-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-3 text-[12px] font-bold uppercase tracking-[0.2em] text-white/70"
          >
            Fernández Oro, Río Negro
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mb-4 text-5xl font-black leading-tight tracking-tight text-white xl:text-6xl"
          >
            Tu mascota<br />merece lo mejor
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mb-8 max-w-md text-[16px] leading-relaxed text-white/85"
          >
            Alimentos, accesorios y atención personalizada para perros y gatos.
            Visitanos en {ADDRESS}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.48 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/#productos"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-[#029f9c] shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
            >
              Ver productos
            </Link>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-all hover:border-white hover:bg-white/10"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 8.04 0C3.674 0 .12 3.554.12 7.92c0 1.398.365 2.762 1.057 3.965L0 16l4.235-1.11a7.902 7.902 0 0 0 3.805.968h.003c4.366 0 7.92-3.554 7.92-7.92a7.9 7.9 0 0 0-2.362-5.612Zm-5.56 12.21a6.57 6.57 0 0 1-3.345-.915l-.24-.144-2.515.66.672-2.453-.156-.252a6.56 6.56 0 0 1-1.004-3.514c0-3.626 2.95-6.576 6.577-6.576 1.747 0 3.389.68 4.624 1.915a6.53 6.53 0 0 1 1.92 4.64c-.001 3.627-2.95 6.577-6.576 6.577Z" />
              </svg>
              Escribinos
            </a>
          </motion.div>
        </div>

        {/* Panel derecho — imagen */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative w-[45%] overflow-hidden"
        >
          <Image
            src="/banner.jpg"
            alt="Don Paco Pet Shop"
            fill
            className="object-cover object-top"
            priority
            sizes="45vw"
          />
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#029f9c] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
