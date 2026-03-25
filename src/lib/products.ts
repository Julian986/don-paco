export type Product = {
  slug: string;
  name: string;
  price: number;
  cashPrice: number;
  category: string;
  shortDescription: string;
  description: string;
  colors: string[];
  sizes: string[];
  stock: number;
};

export const products: Product[] = [
  {
    slug: "manta-refrigerante-clasicas",
    name: "Manta Refrigerante Clasicas",
    price: 33900,
    cashPrice: 30510,
    category: "Mantas",
    shortDescription: "Ideal para refrescar a tu mascota en dias calurosos.",
    description:
      "Manta refrigerante de uso diario, fresca al contacto y comoda para perros y gatos. Facil de limpiar y perfecta para hogar o viaje.",
    colors: ["Gris", "Verde", "Celeste"],
    sizes: ["M", "L"],
    stock: 14,
  },
  {
    slug: "mantita-polar",
    name: "Mantita Polar",
    price: 11900,
    cashPrice: 10710,
    category: "Mantas",
    shortDescription: "Manta suave y liviana para descanso diario.",
    description:
      "Mantita polar de textura suave y abrigada, ideal para usar sobre camitas, sillones o transportadoras.",
    colors: ["Gris", "Beige", "Rosa"],
    sizes: ["Unico"],
    stock: 22,
  },
  {
    slug: "colchoneta-chipre",
    name: "Colchoneta Chipre",
    price: 32670,
    cashPrice: 29403,
    category: "Colchonetas",
    shortDescription: "Colchoneta acolchada con gran soporte.",
    description:
      "Colchoneta firme y confortable para uso interior. Relleno de alta recuperacion y funda resistente para facilitar la limpieza.",
    colors: ["Gris", "Beige", "Verde"],
    sizes: ["Chica", "Grande"],
    stock: 9,
  },
  {
    slug: "rascador-alfombra-de-gato",
    name: "Rascador Alfombra de Gato",
    price: 13000,
    cashPrice: 11700,
    category: "Catres",
    shortDescription: "Superficie ideal para afilar uñas y jugar.",
    description:
      "Rascador tipo alfombra para gatos, pensado para proteger muebles y estimular el juego. Material duradero y base antideslizante.",
    colors: ["Gris", "Beige"],
    sizes: ["Chico", "Grande"],
    stock: 18,
  },
  {
    slug: "colchoneta-fuji-chica",
    name: "Colchoneta Fuji Chica",
    price: 29290,
    cashPrice: 26361,
    category: "Colchonetas",
    shortDescription: "Compacta, comoda y de facil lavado.",
    description:
      "Colchoneta de formato chico para mascotas pequenas y medianas. Costuras reforzadas y tela suave de alta resistencia.",
    colors: ["Marron", "Negro", "Beige"],
    sizes: ["Chica"],
    stock: 11,
  },
  {
    slug: "moises-coqueton-jean-chico",
    name: "Moises Coqueton Jean Chico",
    price: 57100,
    cashPrice: 51390,
    category: "Moises",
    shortDescription: "Moises chico con estilo urbano y base mullida.",
    description:
      "Moises confeccionado en tela tipo jean con interior acolchado. Perfecto para mascotas que buscan abrigo y contencion.",
    colors: ["Azul", "Rojo", "Gris", "Verde"],
    sizes: ["Chico"],
    stock: 7,
  },
  {
    slug: "moises-coqueton-jean-grande",
    name: "Moises Coqueton Jean Grande",
    price: 74990,
    cashPrice: 67491,
    category: "Moises",
    shortDescription: "Version grande con maxima comodidad.",
    description:
      "Moises de gran tamano, ideal para perros medianos y grandes. Interior acolchado, firmeza estructural y tela resistente.",
    colors: ["Azul", "Fucsia", "Turquesa", "Verde"],
    sizes: ["Grande"],
    stock: 6,
  },
  {
    slug: "moises-tulum-grande",
    name: "Moises Tulum Grande",
    price: 80850,
    cashPrice: 72765,
    category: "Moises",
    shortDescription: "Diseno premium para descanso profundo.",
    description:
      "Moises tulum de formato grande con relleno de alta densidad y bordes envolventes. Una opcion premium para mascotas exigentes.",
    colors: ["Azul", "Gris", "Mostaza", "Verde", "Beige"],
    sizes: ["Grande"],
    stock: 5,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatArs(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}
