"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  {
    label: "Perros",
    sub: "Alimentos, snacks y accesorios",
    href: "/?categoria=alimento-seco-perro",
    color: "#e8f4f8",
    accent: "#029f9c",
    image: "/Perros/alimentos-secos/sieger-senior.webp",
    emoji: "🐶",
  },
  {
    label: "Gatos",
    sub: "Todo para tu felino",
    href: "/?categoria=alimento-seco-gato",
    color: "#fef3fb",
    accent: "#e4077d",
    image: "/Gatos/alimentos-secos/sieger-kitten.webp",
    emoji: "🐱",
  },
  {
    label: "Accesorios",
    sub: "Collares, ropa y más",
    href: "/?categoria=accesorio-collar-correa",
    color: "#f4f9f0",
    accent: "#5d9e3a",
    image: "/Accesorios/collares-correas/collar-simple.webp",
    emoji: "🎀",
  },
  {
    label: "Dietas Vet.",
    sub: "Líneas veterinarias especializadas",
    href: "/?categoria=dieta-veterinaria-perro",
    color: "#fdf4ec",
    accent: "#d97706",
    image: "/Perros/dietas-veterinarias/royal-canin-urinary.webp",
    emoji: "💊",
  },
];

export default function CategoryGrid() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 md:py-12">
      <div className="mb-7 text-center">
        <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-[#029f9c]">Explorá por categoría</p>
        <h2 className="text-2xl font-black uppercase tracking-wide text-[#3f3f3f] md:text-3xl">
          ¿Qué estás buscando?
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
          >
            <Link
              href={cat.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#e6e6e6] bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
            >
              {/* Imagen */}
              <div
                className="relative flex h-40 w-full items-center justify-center overflow-hidden md:h-48"
                style={{ backgroundColor: cat.color }}
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  width={180}
                  height={180}
                  className="h-32 w-auto object-contain p-3 transition-transform duration-300 group-hover:scale-105 md:h-40"
                />
              </div>

              {/* Texto */}
              <div className="p-4">
                <p
                  className="text-[15px] font-extrabold uppercase tracking-wide"
                  style={{ color: cat.accent }}
                >
                  {cat.label}
                </p>
                <p className="mt-0.5 text-[12px] text-[#888]">{cat.sub}</p>
                <p className="mt-2 flex items-center gap-1 text-[12px] font-semibold" style={{ color: cat.accent }}>
                  Ver todos
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z" clipRule="evenodd" />
                  </svg>
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
