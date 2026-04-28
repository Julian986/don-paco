"use client";

import { motion } from "framer-motion";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP ?? "5492984000000";
const ADDRESS = process.env.NEXT_PUBLIC_LOCAL_ADDRESS ?? "Roca 473, Gral. Fernández Oro — RN";

const items = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-10 w-10">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 5v4h-7V8Z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Envío a domicilio",
    desc: "Despachamos a todo el país. Recibís tu pedido en 24 a 72 horas hábiles.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-10 w-10">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    title: "Retiro en local",
    desc: `Pasá a buscarlo a ${ADDRESS}. Sin costo adicional.`,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-10 w-10">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
      </svg>
    ),
    title: "Consultá por WhatsApp",
    desc: "¿Tenés dudas sobre un producto? Escribinos y te respondemos al instante.",
    cta: true,
  },
];

export default function ShippingSection() {
  const waHref = `https://wa.me/${WA_NUMBER}?text=Hola!%20Tengo%20una%20consulta%20sobre%20un%20producto.`;

  return (
    <section className="bg-gradient-to-br from-[#029f9c] to-[#017a78]">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6 md:py-16">
        <div className="mb-10 text-center">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-white/60">Hacemos todo fácil</p>
          <h2 className="text-2xl font-black uppercase tracking-wide text-white md:text-3xl">
            Comprá como más te guste
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.12 }}
              className="flex flex-col items-start gap-4 rounded-2xl bg-white/10 p-7 text-white backdrop-blur-sm"
            >
              <span className="text-white/90">{item.icon}</span>
              <div>
                <h3 className="mb-1.5 text-[17px] font-extrabold uppercase tracking-wide">{item.title}</h3>
                <p className="text-[14px] leading-relaxed text-white/80">{item.desc}</p>
              </div>
              {item.cta && (
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide text-[#029f9c] shadow transition-all hover:scale-105"
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 8.04 0C3.674 0 .12 3.554.12 7.92c0 1.398.365 2.762 1.057 3.965L0 16l4.235-1.11a7.902 7.902 0 0 0 3.805.968h.003c4.366 0 7.92-3.554 7.92-7.92a7.9 7.9 0 0 0-2.362-5.612Z" />
                  </svg>
                  Escribinos
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
