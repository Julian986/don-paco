"use client";

import { motion } from "framer-motion";

const items = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
        <path d="M5 12H3l9-9 9 9h-2" />
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
        <path d="M10 22v-6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6" />
      </svg>
    ),
    title: "Envío a domicilio",
    desc: "Recibí tu pedido en 24/72 hs.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Z" />
        <path d="M15 9a3 3 0 1 1-3 3" />
        <path d="M12 6v2m0 8v2m-4-6H6m12 0h-2" />
      </svg>
    ),
    title: "10% OFF en efectivo",
    desc: "5% en transferencia bancaria.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Atención personalizada",
    desc: "Te asesoramos para tu mascota.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <path d="M6 15h4" />
        <path d="M14 15h4" />
      </svg>
    ),
    title: "Pagos seguros",
    desc: "Efectivo, transferencia y tarjetas.",
  },
];

export default function TrustBar() {
  return (
    <div className="border-b border-[#d4eded] bg-[#f0fafa]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-0 divide-x divide-[#d4eded] px-0 md:grid-cols-4">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex flex-col items-center gap-2 px-4 py-5 text-center sm:flex-row sm:text-left md:py-6 md:px-6"
          >
            <span className="shrink-0 text-[#029f9c]">{item.icon}</span>
            <div>
              <p className="text-[13px] font-extrabold uppercase tracking-wide text-[#3f3f3f]">{item.title}</p>
              <p className="mt-0.5 text-[12px] text-[#7a7a7a]">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
