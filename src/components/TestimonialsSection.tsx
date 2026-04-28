"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Valeria M.",
    pet: "Tiene 2 labradores",
    text: "Excelente atención. Me ayudaron a elegir el alimento ideal para mis perros según su edad y tamaño. El envío llegó rapidísimo.",
    stars: 5,
  },
  {
    name: "Rodrigo L.",
    pet: "Dueño de un gato persa",
    text: "El precio es muy bueno comparado con otras tiendas. Y el 10% de descuento en efectivo marca la diferencia. Ya es mi tienda fija.",
    stars: 5,
  },
  {
    name: "Caro S.",
    pet: "Tiene una beagle",
    text: "Me consultaron por WhatsApp antes de enviarlo y se aseguraron de que fuera el producto correcto. Súper recomendado, atención de primera.",
    stars: 5,
  },
  {
    name: "Martín D.",
    pet: "Dueño de dos gatos",
    text: "Encontré las dietas veterinarias que me recomendó el vet a un precio mucho mejor que en otros lados. Muy buen stock de marcas.",
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} estrellas`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="#e4077d" className="h-4 w-4">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="bg-[#f7f7f7]">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="mb-10 text-center">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-[#e4077d]">Lo que dicen nuestros clientes</p>
          <h2 className="text-2xl font-black uppercase tracking-wide text-[#3f3f3f] md:text-3xl">
            Opiniones reales
          </h2>
        </div>

        {/* Grid: 1 col mobile → 2 col tablet → 4 col desktop */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex flex-col rounded-2xl border border-[#e6e6e6] bg-white p-5 shadow-sm sm:p-6"
            >
              <Stars count={t.stars} />
              <p className="mt-4 flex-1 text-[14px] leading-7 text-[#555]">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3 border-t border-[#f0f0f0] pt-4">
                {/* Avatar inicial */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#029f9c]/15 text-[13px] font-black text-[#029f9c]">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-[14px] font-extrabold text-[#3f3f3f]">{t.name}</p>
                  <p className="text-[12px] text-[#9a9a9a]">{t.pet}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
