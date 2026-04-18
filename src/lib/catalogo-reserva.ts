/**
 * Rubros del Excel que no entran en el árbol acordado con la clienta
 * (solo ALIMENTOS + ACCESORIOS según el mapa solicitado).
 * No se listan en la tienda; quedan acá para futuras ampliaciones del sitio.
 *
 * Incluye: piedras, farmacia, peces/acuario, tierras/jardinería, sueltos,
 * bolsas especiales (polenta/arroz/fideos), alimentos sueltos por kg, etc.
 *
 * Correcciones de cifras en productos publicados: ver comentario en `scripts/generate-catalog.mjs`.
 */
export type ItemReserva = {
  rubro: string;
  nombre: string;
  precio: string;
  nota?: string;
};

export const CATALOGO_NO_PUBLICADO: ItemReserva[] = [
  { rubro: "Piedras de gato", nombre: "Monkcat", precio: "$5.900" },
  { rubro: "Piedras de gato", nombre: "Stoncat limón/lavanda", precio: "$11.400" },
  { rubro: "Piedras de gato", nombre: "Stoncat x4", precio: "$10.900" },
  { rubro: "Piedras de gato", nombre: "Stoncat x8", precio: "$19.500" },
  { rubro: "Piedras de gato", nombre: "Stoncat x16", precio: "$34.700" },
  { rubro: "Piedras de gato", nombre: "Wip Up", precio: "$17.900" },
  { rubro: "Piedras de gato", nombre: "Pipicat original", precio: "$2.800" },
  { rubro: "Piedras de gato", nombre: "Pipicat lavanda", precio: "$3.400" },
  { rubro: "Piedras de gato", nombre: "Pipicat sensitive", precio: "$2.800" },
  { rubro: "Piedras de gato", nombre: "Bidón", precio: "$8.500" },
  { rubro: "Piedras de gato", nombre: "Ecokatz", precio: "$2.900" },
  { rubro: "Piedras de gato", nombre: "The Best chica", precio: "$2.400" },
  { rubro: "Piedras de gato", nombre: "The Best grande", precio: "$4.400" },
  { rubro: "Piedras de gato", nombre: "Silicas Can Cat", precio: "$21.900" },
  { rubro: "Farmacia", nombre: "Curabichera aerosol", precio: "$18.000" },
  { rubro: "Farmacia", nombre: "Simparica / Power / Frontline / Nexgard / Fipronil / Osspret / TEA / etc.", precio: "Ver listado en Excel", nota: "Variantes por peso" },
  { rubro: "Peces y acuario", nombre: "Shulet / Azul de metileno / Anticloro (variantes)", precio: "Ver Excel" },
  { rubro: "Tierras y jardinería", nombre: "Don Reinaldo tierra x2/x5/x10/x25", precio: "Ver Excel" },
  { rubro: "Tierras y jardinería", nombre: "Ultra líquido / polvo hormiga / plagas varias", precio: "Ver Excel", nota: "Algunos sin precio en lista" },
  { rubro: "Bolsas especiales", nombre: "Polenta x10 bolsa", precio: "$11.000" },
  { rubro: "Bolsas especiales", nombre: "Arroz saborizado x15", precio: "$25.500" },
  { rubro: "Bolsas especiales", nombre: "Fideos saborizados x10", precio: "$15.700" },
  { rubro: "Suelto granja (kg)", nombre: "Maíz entero/partido, conejo, iniciador, ponedora, terminador, alpiste, mijo, girasol, polenta, arroz y fideos saborizados", precio: "Ver Excel" },
  { rubro: "Alimento gato suelto (kg)", nombre: "Maxicat, Bocato, Whiskas, Cat Chow, Gati, Amici, HAS, Ganacat, Zimpi, Sieger, Agility, Capitan, Voraz Gatito, Tigre, Biohas", precio: "Ver Excel" },
  { rubro: "Alimento perro suelto (kg)", nombre: "Bocato cachorro, Nutricare, Voraz, Ganacan, Zimpi, Maintenance RP, HAS, Chasque, Pedigree, Tigre, Ganacan cachorro, Biohas, Rey Can, SMUG, Sabrocitos, Rey Can RP, Pompi", precio: "Ver Excel", nota: "Incluye promos 2x en varias líneas" },
  { rubro: "Ropa (sin precio en lista)", nombre: "Camiseta Argentina · talles 25–65", precio: "A confirmar en local" },
  { rubro: "Accesorios (sin precio)", nombre: "Correa extensible", precio: "Sin precio en Excel" },
  { rubro: "Accesorios (sin precio)", nombre: "Pegatrap chicos/grandes, jeringas cucaracha/hormiga", precio: "Sin precio en Excel" },
];
