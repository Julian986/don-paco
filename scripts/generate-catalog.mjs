/**
 * Regenera `src/lib/catalog-rows.ts` desde las tablas embebidas (listado del Excel en texto).
 * Ejecutar: `node scripts/generate-catalog.mjs`
 *
 * Arreglo de datos: Capitán Gato x10 figuraba como $2.270 en la lista; se volcó como $22.700
 * (coherente con bolsas de gato x10). Si el valor en papel era otro, corregir acá y volver a generar.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outFile = path.join(root, "src", "lib", "catalog-rows.ts");

function slugify(input) {
  return input
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** @typedef {{ marca: string; nombre: string; lista: number; cash: number | null; categoryId: string }} Row */

/** @param {string} s */
function p(s) {
  const n = Number(String(s).replace(/\$/g, "").replace(/\./g, "").replace(/,/g, ".").trim());
  if (!Number.isFinite(n)) throw new Error(`Precio invalido: ${s}`);
  return Math.round(n);
}

/** @type {Row[]} */
const rows = [];

/** @param {Omit<Row, never>} r */
function add(marca, nombre, lista, cash, categoryId) {
  rows.push({ marca, nombre, lista: p(String(lista)), cash: cash === null || cash === "—" || cash === "-" ? null : p(String(cash)), categoryId });
}

// --- SIEGER ---
add("Sieger", "Derma x12", "96600", "92900", "mascota-perro-alimento-dietas");
add("Sieger", "Senior +7 x15", "106000", "101900", "mascota-perro-alimento-seco");
add("Sieger", "Lata medicada", "8700", null, "mascota-perro-alimento-dietas");
add("Sieger", "Renal x3", "41200", null, "mascota-perro-alimento-dietas");
add("Sieger", "Gastro x3", "41200", null, "mascota-perro-alimento-dietas");
add("Sieger", "Renal gato x1,5", "29400", null, "mascota-gato-alimento-dietas");
add("Sieger", "Gastro gato x1,5", "29400", null, "mascota-gato-alimento-dietas");
add("Sieger", "Puppy mini x1", "12900", null, "mascota-perro-alimento-seco");
add("Sieger", "Puppy mini x3", "30400", null, "mascota-perro-alimento-seco");
add("Sieger", "Puppy mini x12", "92100", "88500", "mascota-perro-alimento-seco");
add("Sieger", "Puppy medium x1", "11800", null, "mascota-perro-alimento-seco");
add("Sieger", "Puppy medium x3", "28900", null, "mascota-perro-alimento-seco");
add("Sieger", "Puppy medium x15", "106000", "101900", "mascota-perro-alimento-seco");
add("Sieger", "Mini adulto x1", "11900", null, "mascota-perro-alimento-seco");
add("Sieger", "Mini adulto x3", "28400", null, "mascota-perro-alimento-seco");
add("Sieger", "Mini adulto x12", "84700", "81900", "mascota-perro-alimento-seco");
add("Sieger", "Adulto medium x3", "27600", null, "mascota-perro-alimento-seco");
add("Sieger", "Adulto medium x15", "97300", "93500", "mascota-perro-alimento-seco");
add("Sieger", "Senior x1", "12900", null, "mascota-perro-alimento-seco");
add("Sieger", "Senior x3", "29500", null, "mascota-perro-alimento-seco");
add("Sieger", "Senior mini x12", "92000", "88500", "mascota-perro-alimento-seco");
add("Sieger", "Reduced calorías x3", "28400", null, "mascota-perro-alimento-seco");
add("Sieger", "Reduced calorías x12", "83200", "79900", "mascota-perro-alimento-seco");
add("Sieger", "Derma x3", "32400", null, "mascota-perro-alimento-dietas");
add("Sieger", "Criadores x20", "106500", "93000", "mascota-perro-alimento-seco");
add("Sieger", "Kitten x1", "18000", null, "mascota-gato-alimento-seco");
add("Sieger", "Urinary x1", "18000", null, "mascota-gato-alimento-dietas");
add("Sieger", "Sterilized x1", "18000", null, "mascota-gato-alimento-seco");
add("Sieger", "Adulto gato x1", "18000", null, "mascota-gato-alimento-seco");
add("Sieger", "Gato x10", "118000", "112000", "mascota-gato-alimento-seco");
add("Sieger", "Pouch perro", "3500", null, "mascota-perro-alimento-humedo");
add("Sieger", "Pouch gato", "4000", null, "mascota-gato-alimento-humedo");
add("Sieger", "Pouch recovery", "4200", null, "mascota-perro-alimento-humedo");
add("Sieger", "Lata gato", "7400", null, "mascota-gato-alimento-humedo");
add("Sieger", "Lata recovery", "7800", null, "mascota-perro-alimento-humedo");
add("Sieger", "Lata perro", "7200", null, "mascota-perro-alimento-humedo");

// --- MAXXIUM ---
add("Maxxium", "Lata gato (grande)", "6200", null, "mascota-gato-alimento-humedo");
add("Maxxium", "Lata gato (chica)", "3000", null, "mascota-gato-alimento-humedo");
add("Maxxium", "Cachorro x3", "20500", null, "mascota-perro-alimento-seco");
add("Maxxium", "Cachorro x20", "96900", "93200", "mascota-perro-alimento-seco");
add("Maxxium", "Cordero x15", "89800", null, "mascota-perro-alimento-seco");
add("Maxxium", "Cordero x3", "25700", null, "mascota-perro-alimento-seco");
add("Maxxium", "Adulto x3", "19500", null, "mascota-perro-alimento-seco");
add("Maxxium", "Gato x1", "13600", null, "mascota-gato-alimento-seco");
add("Maxxium", "Adulto x20", "88300", "77200", "mascota-perro-alimento-seco");

// --- AGILITY (marca en Excel: AGILLITY) ---
add("Agility", "Reduced x3", "22100", null, "mascota-perro-alimento-seco");
add("Agility", "Cachorro x3", "19600", null, "mascota-perro-alimento-seco");
add("Agility", "Cachorro x20", "87400", "83900", "mascota-perro-alimento-seco");
add("Agility", "Adulto x3", "16900", null, "mascota-perro-alimento-seco");
add("Agility", "Adulto x20", "74400", "64900", "mascota-perro-alimento-seco");
add("Agility", "Cordero x3", "22100", null, "mascota-perro-alimento-seco");
add("Agility", "Cordero x15", "78400", "75400", "mascota-perro-alimento-seco");
add("Agility", "Adulto raza peq x1,5", "10600", null, "mascota-perro-alimento-seco");
add("Agility", "Adulto raza peq x15", "69900", "67200", "mascota-perro-alimento-seco");
add("Agility", "Derma x3", "20700", null, "mascota-perro-alimento-dietas");
add("Agility", "Kitten x1,5", "17300", null, "mascota-gato-alimento-seco");
add("Agility", "Kitten x10", "80300", "77200", "mascota-gato-alimento-seco");
add("Agility", "Gato adulto x1,5", "16000", null, "mascota-gato-alimento-seco");
add("Agility", "Gato adulto x10", "75000", "68300", "mascota-gato-alimento-seco");
add("Agility", "Control de peso x1,5", "18600", null, "mascota-perro-alimento-seco");
add("Agility", "Urinary x1,5", "17300", null, "mascota-gato-alimento-dietas");
add("Agility", "Urinary x10", "80300", "73000", "mascota-gato-alimento-dietas");
add("Agility", "Salmon x1,5", "18100", null, "mascota-perro-alimento-seco");
add("Agility", "Senior +7 x15", "71700", "69000", "mascota-perro-alimento-seco");
add("Agility", "Derma x15", "73100", "70300", "mascota-perro-alimento-dietas");
add("Agility", "Lata", "5500", null, "mascota-perro-alimento-humedo");

// --- 7 VIDA ---
add("7 Vida", "Adulto x1", "8700", null, "mascota-perro-alimento-seco");
add("7 Vida", "Adulto x10", "57900", null, "mascota-perro-alimento-seco");

// --- NUTRICARE ---
add("Nutricare", "Adulto x20", "49400", "44000", "mascota-perro-alimento-seco");
add("Nutricare", "Adulto x7,5", "19400", null, "mascota-perro-alimento-seco");
add("Nutricare", "Cachorro x15", "40800", null, "mascota-perro-alimento-seco");
add("Nutricare", "Adulto x3", "14000", null, "mascota-perro-alimento-seco");

// --- SMUG ---
add("Smug", "Adulto x20", "27300", "25500", "mascota-perro-alimento-seco");
add("Smug", "Adulto x10", "16000", null, "mascota-perro-alimento-seco");

// --- BOCATO ---
add("Bocato", "Adulto x20", "32700", null, "mascota-perro-alimento-seco");
add("Bocato", "Adulto x10", "18900", null, "mascota-perro-alimento-seco");
add("Bocato", "Cachorro x10", "21000", null, "mascota-perro-alimento-seco");
add("Bocato", "Gato x10", "23200", null, "mascota-gato-alimento-seco");

// --- MAXI CAT ---
add("Maxi Cat", "Gato x10", "23300", null, "mascota-gato-alimento-seco");

// --- OLD PRINCE ---
add("Old Prince", "Kitten cordero x3", "27300", null, "mascota-gato-alimento-seco");
add("Old Prince", "Gato cordero x3", "35700", null, "mascota-gato-alimento-seco");
add("Old Prince", "Gato esterilizado x3", "26200", null, "mascota-gato-alimento-seco");
add("Old Prince", "Gato urinary x3", "27300", null, "mascota-gato-alimento-dietas");
add("Old Prince", "Gato premium x3", "23800", null, "mascota-gato-alimento-seco");
add("Old Prince", "Puppy medium x3", "15700", null, "mascota-perro-alimento-seco");
add("Old Prince", "Adulto medium x3", "14800", null, "mascota-perro-alimento-seco");
add("Old Prince", "Cordero x15", "66850", null, "mascota-perro-alimento-seco");
add("Old Prince", "Cordero x3", "19400", null, "mascota-perro-alimento-seco");
add("Old Prince", "Puppy pequeña x3", "17000", null, "mascota-perro-alimento-seco");
add("Old Prince", "Adulto pequeña x3", "16000", null, "mascota-perro-alimento-seco");
add("Old Prince", "Adulto RP x7,5", "33700", null, "mascota-perro-alimento-seco");
add("Old Prince", "Cachorro RP x7,5", "34800", null, "mascota-perro-alimento-seco");

// --- OPTIMUN ---
add("Optimun", "Kitten x1", "12300", null, "mascota-gato-alimento-seco");
add("Optimun", "Gato x3", "28900", null, "mascota-gato-alimento-seco");
add("Optimun", "Castrado x3", "29900", null, "mascota-gato-alimento-seco");
add("Optimun", "Cachorro x3", "19900", null, "mascota-perro-alimento-seco");
add("Optimun", "Adulto x3", "18200", null, "mascota-perro-alimento-seco");

// --- EUKANUBA ---
add("Eukanuba", "Fit body small x3", "29900", null, "mascota-perro-alimento-seco");
add("Eukanuba", "Fit body medium x3", "29300", null, "mascota-perro-alimento-seco");
add("Eukanuba", "Senior x3", "28900", null, "mascota-perro-alimento-seco");
add("Eukanuba", "Puppy small x1", "10900", null, "mascota-perro-alimento-seco");
add("Eukanuba", "Puppy small/medium/large x3", "28000", null, "mascota-perro-alimento-seco");
add("Eukanuba", "Adulto small x1", "10400", null, "mascota-perro-alimento-seco");
add("Eukanuba", "Adulto small/medium/large x3", "27100", null, "mascota-perro-alimento-seco");
add("Eukanuba", "Gato x1,5", "20100", null, "mascota-gato-alimento-seco");
add("Eukanuba", "Kitten x1,5", "15300", null, "mascota-gato-alimento-seco");
add("Eukanuba", "Gato x3", "38300", null, "mascota-gato-alimento-seco");
add("Eukanuba", "Kitten x3", "39600", null, "mascota-gato-alimento-seco");
add("Eukanuba", "Adulto x15", "98400", "94000", "mascota-perro-alimento-seco");
add("Eukanuba", "Cachorro x15", "99300", "95000", "mascota-perro-alimento-seco");

// --- PEDIGREE ---
add("Pedigree", "Pouch", "1300", null, "mascota-perro-alimento-humedo");
add("Pedigree", "Lata", "3800", null, "mascota-perro-alimento-humedo");
add("Pedigree", "Cachorro x8", "33000", null, "mascota-perro-alimento-seco");
add("Pedigree", "Cachorro x21", "75500", null, "mascota-perro-alimento-seco");
add("Pedigree", "Adulto x8", "31400", null, "mascota-perro-alimento-seco");
add("Pedigree", "Adulto x21", "69900", null, "mascota-perro-alimento-seco");
add("Pedigree", "Adulto raz. peq. x8", "31400", null, "mascota-perro-alimento-seco");
add("Pedigree", "Adulto x15", "57200", null, "mascota-perro-alimento-seco");
add("Pedigree", "Adulto raz. peq. x15", "57200", null, "mascota-perro-alimento-seco");
add("Pedigree", "Adulto RP x21", "80600", null, "mascota-perro-alimento-seco");
add("Pedigree", "Senior x8", "29200", null, "mascota-perro-alimento-seco");
add("Pedigree", "Dentastix x1", "1500", null, "mascota-perro-alimento-snacks");
add("Pedigree", "Dentastix x3", "3600", null, "mascota-perro-alimento-snacks");
add("Pedigree", "Dentastix x7", "6900", null, "mascota-perro-alimento-snacks");
add("Pedigree", "Rodeo", "2500", null, "mascota-perro-alimento-snacks");
add("Pedigree", "Biscrok chico", "2500", null, "mascota-perro-alimento-snacks");
add("Pedigree", "Biscrok grande", "7500", null, "mascota-perro-alimento-snacks");

// --- WHISKAS ---
add("Whiskas", "Sobre", "1300", null, "mascota-gato-alimento-humedo");
add("Whiskas", "Lata", "3800", null, "mascota-gato-alimento-humedo");
add("Whiskas", "Gato x10", "55400", null, "mascota-gato-alimento-seco");
add("Whiskas", "Snack chico 40gr", "2700", null, "mascota-gato-alimento-snacks");
add("Whiskas", "Snack grande 80gr", "3200", null, "mascota-gato-alimento-snacks");

// --- PAMPA ---
add("Pampa", "Adulto RP x15", "39900", null, "mascota-perro-alimento-seco");

// --- VORAZ ---
add("Voraz", "Adulto x20", "28700", "25300", "mascota-perro-alimento-seco");
add("Voraz", "Adulto x10", "15800", null, "mascota-perro-alimento-seco");

// --- MAINTENANCE ---
add("Maintenance", "Adulto RP x15", "29700", null, "mascota-perro-alimento-seco");
add("Maintenance", "Adulto x22", "39900", "36300", "mascota-perro-alimento-seco");

// --- COMPANY ---
add("Company", "Gato x3", "16000", null, "mascota-gato-alimento-seco");
add("Company", "Kitten x3", "17000", null, "mascota-gato-alimento-seco");

// --- LIVRA ---
add("Livra", "Gato x3", "28900", null, "mascota-gato-alimento-seco");
add("Livra", "Cachorro x3", "24000", null, "mascota-perro-alimento-seco");
add("Livra", "Adulto x3", "22000", null, "mascota-perro-alimento-seco");

// --- ROYAL CANIN (extracto principal; lineas completas en Excel) ---
const rc = [
  ["Adulto XS x1", "17100", null, "mascota-perro-alimento-seco"],
  ["Baby cat x1,5", "39500", null, "mascota-gato-alimento-seco"],
  ["Urinary perro x1,5", "38900", null, "mascota-perro-alimento-dietas"],
  ["Hypoallergenic x2", "45100", null, "mascota-perro-alimento-dietas"],
  ["Kitten x1,5", "37600", null, "mascota-gato-alimento-seco"],
  ["Indoor x1,5", "35200", null, "mascota-gato-alimento-seco"],
  ["Indoor +7 x1,5", "37000", null, "mascota-gato-alimento-seco"],
  ["Active gato x1,5", "37000", null, "mascota-gato-alimento-seco"],
  ["Fit 32 x1,5", "33000", null, "mascota-gato-alimento-seco"],
  ["Urinary gato x1,5", "43800", null, "mascota-gato-alimento-dietas"],
  ["Mini starter x1", "17800", null, "mascota-perro-alimento-seco"],
  ["Mini starter x3", "48100", null, "mascota-perro-alimento-seco"],
  ["Mini puppy x1", "16500", null, "mascota-perro-alimento-seco"],
  ["Mini puppy x3", "44800", null, "mascota-perro-alimento-seco"],
  ["Mini adulto x1", "16500", null, "mascota-perro-alimento-seco"],
  ["Mini adult x3", "43000", null, "mascota-perro-alimento-seco"],
  ["Mini adulto +8 x3", "45800", null, "mascota-perro-alimento-seco"],
  ["Adulto mini +12 x3", "45800", null, "mascota-perro-alimento-seco"],
  ["Pouch puppy", "2700", null, "mascota-perro-alimento-humedo"],
  ["Pouch adulto", "2700", null, "mascota-perro-alimento-humedo"],
  ["Pouch kitten", "3800", null, "mascota-gato-alimento-humedo"],
  ["Pouch urinary", "3800", null, "mascota-gato-alimento-humedo"],
  ["Recovery", "8900", null, "mascota-perro-alimento-humedo"],
  ["Renal perro x2", "25400", null, "mascota-perro-alimento-dietas"],
  ["Mobily x2", "42400", null, "mascota-perro-alimento-dietas"],
  ["Cardiac x2", "42300", null, "mascota-perro-alimento-dietas"],
  ["Gastro x2", "36700", null, "mascota-perro-alimento-dietas"],
  ["Hepatic gato x2", "42500", null, "mascota-gato-alimento-dietas"],
  ["Renal gato x2", "49800", null, "mascota-gato-alimento-dietas"],
  ["Gastro gato x2", "54400", null, "mascota-gato-alimento-dietas"],
  ["Maxi adulto x15", "154600", "140000", "mascota-perro-alimento-seco"],
  ["Mini puppy x7,5", "90300", null, "mascota-perro-alimento-seco"],
  ["Mini adulto x7,5", "99600", null, "mascota-perro-alimento-seco"],
];
for (const [nombre, lista, cash, cat] of rc) {
  add("Royal Canin", nombre, lista, cash, cat);
}

// --- EXCELLENT ---
add("Excellent", "Gato x1", "13400", null, "mascota-gato-alimento-seco");
add("Excellent", "Steriliced x1", "15600", null, "mascota-gato-alimento-seco");
add("Excellent", "Kitten x1", "14800", null, "mascota-gato-alimento-seco");
add("Excellent", "Urinary x1", "15600", null, "mascota-gato-alimento-dietas");
add("Excellent", "Adulto perro x1", "8500", null, "mascota-perro-alimento-seco");
add("Excellent", "Puppy x1", "9400", null, "mascota-perro-alimento-seco");
add("Excellent", "Gato x3", "34500", null, "mascota-gato-alimento-seco");
add("Excellent", "Gato x7,5", "73120", null, "mascota-gato-alimento-seco");
add("Excellent", "Adulto mantenimiento x20", "72600", null, "mascota-perro-alimento-seco");
add("Excellent", "Urinary x7,5", "84300", null, "mascota-gato-alimento-dietas");
add("Excellent", "Kitten x7,5", "80900", null, "mascota-gato-alimento-seco");
add("Excellent", "Steriliced x7,5", "84300", null, "mascota-gato-alimento-seco");
add("Excellent", "Adulto small x3", "23300", null, "mascota-perro-alimento-seco");
add("Excellent", "Puppy small x3", "25400", null, "mascota-perro-alimento-seco");

// --- Otras marcas (bolsas grandes / adulto) ---
const otras = [
  ["Dog Chow", "Adulto x21", "71400", null],
  ["Dogui", "Adulto x21", "49600", null],
  ["Capitan", "Adulto x22", "29300", "22500"],
  ["Capitan", "Gato x10", "22700", null],
  ["Dog Prince", "Adulto x15", "19900", "18000"],
  ["Dog Prince", "Adulto x22", "28900", "26400"],
  ["Zimpi", "Adulto x25", "31900", null],
  ["Ganacan", "Adulto x25", "36300", null],
  ["Amici", "Gato x10", "29000", null],
  ["Zimpi", "Gato x10", "25000", null],
  ["Ganacat", "Gato x10", "28300", null],
  ["Odwalla", "Adulto x25", "47900", null],
  ["HAS", "Cachorro x10", "25100", null],
  ["HAS", "Criadores x20", "31200", null],
  ["HAS", "Premium x20", "42600", null],
  ["HAS", "Gato x10", "24800", null],
  ["Biohas", "Adulto x20", "37000", null],
  ["Chasque", "Adulto x20", "32900", null],
  ["Tigre", "Adulto x22", "32900", null],
  ["Rey Can", "Adulto x22", "42900", null],
  ["Rey Can", "RP x15", "30200", null],
  ["Rey Can", "RP x8", "17000", null],
  ["Simpli", "Adulto x22", "34400", null],
  ["Gandum", "Adulto x20", "22100", null],
  ["Puppy Food", "Adulto x20", "36600", null],
  ["Upper", "Urinary x1,5", "19900", "14900"],
  ["Upper", "Castrado x1,5", "19900", "14900"],
  ["Misterper", "Adulto x20", "49900", "45500"],
  ["Biopet", "Adulto x20", "37000", null],
  ["Estampa", "Adulto x20", "48700", null],
  ["Estampa", "Cachorro x15", "52500", null],
  ["Estampa", "Adulto RP x15", "49800", null],
  ["Gati", "x8", "32000", null],
  ["Gati", "x15", "53800", null],
  ["Total Khan", "Adulto x20", "39900", "35000"],
];
for (const [marca, nombre, lista, cash] of otras) {
  const cat = String(nombre).toLowerCase().includes("gato") ? "mascota-gato-alimento-seco" : "mascota-perro-alimento-seco";
  add(marca, nombre, lista, cash, cat);
}

// --- ACCESORIOS (sección tienda) ---
add("Accesorios", "Viruta", "4000", null, "general-accesorios-literas");
add("Accesorios", "Litera chica", "6500", null, "general-accesorios-literas");
add("Accesorios", "Litera mediana", "8300", null, "general-accesorios-literas");
add("Accesorios", "Litera grande", "15400", null, "general-accesorios-literas");
add("Accesorios", "Kit litera", "12200", null, "general-accesorios-literas");
add("Accesorios", "Bombacha higiénica negra", "14800", null, "general-accesorios-bombachas");
add("Accesorios", "Bombacha con puntilla", "16700", null, "general-accesorios-bombachas");
for (const [nombre, lista] of [
  ["Bozal rejilla talle 1", "8800"],
  ["Bozal rejilla talle 2", "8800"],
  ["Bozal rejilla talle 3", "8800"],
  ["Bozal rejilla talle 4", "10500"],
  ["Bozal rejilla talle 5", "10500"],
  ["Bozal rejilla talle 6", "15400"],
  ["Bozal rejilla talle 7", "15400"],
  ["Bozal nylon", "13000"],
  ["Bozal silicona", "42500"],
  ["Bozal cuero", "18000"],
]) {
  add("Accesorios", nombre, lista, null, "general-accesorios-bozales");
}

// Collares y correas (talles)
const collares = [
  ["Collar simple", "12", "2900"],
  ["Collar simple", "10", "3000"],
  ["Collar simple", "8", "4000"],
  ["Collar simple", "6", "5500"],
  ["Collar simple", "4", "5800"],
  ["Collar simple", "3", "6600"],
  ["Collar simple", "2", "6800"],
  ["Collar simple", "1", "7000"],
  ["Collar doble", "5", "8300"],
  ["Collar doble", "4", "10900"],
  ["Collar doble", "3", "10900"],
  ["Collar doble", "2", "11200"],
  ["Collar doble", "1", "11500"],
  ["Collar doble", "0", "12100"],
  ["Collar NATO", "30 mm", "21000"],
  ["Collar NATO", "40 mm", "22500"],
  ["Collar NATO", "60 mm", "24500"],
  ["NATO con broche", "—", "18900"],
  ["Correa sola", "chica", "9900"],
  ["Correa sola", "mediana", "13900"],
  ["Correa sola", "grande", "15400"],
];
for (const [base, talle, lista] of collares) {
  add("Collares", `${base} · talle ${talle}`, lista, null, "general-accesorios-collares-correas");
}

// Ropa (rangos talles — un item descriptivo por línea)
add("Ropa", "Polar perro · talles 1–12 (desde $6.000 a $15.700 según talle)", "6000", null, "general-ropa");
add("Ropa", "Plush con corderito · talles 25–85 (desde $13.500 a $43.900)", "13500", null, "general-ropa");
add("Ropa", "Soft Plus · talles 0–6 (desde $13.000 a $20.000)", "13000", null, "general-ropa");
add("Ropa", "Matelasé · talles 2–10 (desde $14.000 a $39.000)", "14000", null, "general-ropa");

// Dedupe slugs
const seen = new Set();
const lines = [];
lines.push(`import type { CategoryId } from "./category-tree";`);
lines.push("");
lines.push(`export type CatalogRow = {`);
lines.push(`  slug: string;`);
lines.push(`  marca: string;`);
lines.push(`  nombre: string;`);
lines.push(`  lista: number;`);
lines.push(`  cash: number | null;`);
lines.push(`  categoryId: CategoryId;`);
lines.push(`};`);
lines.push("");
lines.push(`export const catalogRows: CatalogRow[] = [`);

for (const r of rows) {
  const base = slugify(`${r.marca}-${r.nombre}`);
  let slug = base;
  let i = 2;
  while (seen.has(slug)) {
    slug = `${base}-${i}`;
    i += 1;
  }
  seen.add(slug);
  lines.push(
    `  { slug: ${JSON.stringify(slug)}, marca: ${JSON.stringify(r.marca)}, nombre: ${JSON.stringify(r.nombre)}, lista: ${r.lista}, cash: ${r.cash === null ? "null" : r.cash}, categoryId: ${JSON.stringify(r.categoryId)} },`,
  );
}

lines.push(`];`);
lines.push("");

fs.writeFileSync(outFile, lines.join("\n"), "utf8");
console.log(`Wrote ${rows.length} rows -> ${path.relative(root, outFile)}`);
