"use client";

import { motion } from "framer-motion";

const ADDRESS = process.env.NEXT_PUBLIC_LOCAL_ADDRESS ?? "Roca 473, Gral. Fernández Oro — RN";
const HOURS = process.env.NEXT_PUBLIC_LOCAL_HOURS ?? "Lun-Sab 9:00-20:00";
const GMAPS = process.env.NEXT_PUBLIC_GMAPS_URL ?? "https://maps.google.com/";
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP ?? "5492984000000";

export default function AboutSection() {
  const waHref = `https://wa.me/${WA_NUMBER}?text=Hola!%20Quiero%20saber%20m%C3%A1s%20sobre%20el%20local.`;

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#e4077d]">Nuestra historia</p>
            <h2 className="mb-5 text-3xl font-black uppercase leading-tight tracking-wide text-[#3f3f3f] md:text-4xl">
              Somos amantes<br className="hidden sm:block" /> de los animales
            </h2>
            <p className="mb-4 text-[16px] leading-8 text-[#666]">
              Don Paco nació del amor por las mascotas y el deseo de brindarles lo mejor.
              Somos un pet shop local en Fernández Oro, Río Negro, atendido por personas que
              conocen y aman a los animales.
            </p>
            <p className="mb-8 text-[16px] leading-8 text-[#666]">
              Trabajamos con las mejores marcas del mercado y te asesoramos
              para encontrar el producto ideal para tu perro, gato o mascota,
              sin importar su raza, tamaño o necesidad.
            </p>

            {/* Info local */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-[#ebebeb] bg-[#fafafa] p-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="#029f9c" strokeWidth="2" className="mt-0.5 h-5 w-5 shrink-0">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-wide text-[#9a9a9a]">Dirección</p>
                  <p className="mt-0.5 text-[14px] text-[#555]">{ADDRESS}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-[#ebebeb] bg-[#fafafa] p-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="#029f9c" strokeWidth="2" className="mt-0.5 h-5 w-5 shrink-0">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-wide text-[#9a9a9a]">Horarios</p>
                  <p className="mt-0.5 text-[14px] text-[#555]">{HOURS}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={GMAPS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#029f9c] px-6 py-3 text-[13px] font-bold uppercase tracking-wide text-white shadow transition-all hover:scale-105 hover:bg-[#028785]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                Cómo llegar
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#029f9c] px-6 py-3 text-[13px] font-bold uppercase tracking-wide text-[#029f9c] transition-all hover:bg-[#029f9c] hover:text-white"
              >
                Consultar
              </a>
            </div>
          </motion.div>

          {/* Placeholder de video */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative"
          >
            <div className="group relative aspect-video w-full overflow-hidden rounded-3xl bg-[#1a1a1a] shadow-xl">
              {/* Fondo con patrón sutil */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#029f9c]/20 to-[#017a78]/40" />
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #fff 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              {/* Contenido central */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                {/* Botón play */}
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                  <svg
                    viewBox="0 0 24 24"
                    fill="white"
                    className="h-9 w-9 translate-x-0.5"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-[13px] font-bold uppercase tracking-widest text-white/50">
                    Próximamente
                  </p>
                  <p className="mt-1 text-lg font-extrabold uppercase tracking-wide text-white">
                    Conocé nuestro local
                  </p>
                </div>
              </div>

              {/* Etiqueta video */}
              <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#e4077d]" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-white/80">
                  Video
                </span>
              </div>
            </div>

            {/* Burbuja de confianza */}
            <div className="absolute -bottom-5 -right-5 hidden rounded-2xl bg-[#e4077d] px-5 py-4 text-white shadow-xl lg:block">
              <p className="text-2xl font-black">+500</p>
              <p className="text-[12px] font-semibold uppercase tracking-wide text-white/80">clientes felices</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
