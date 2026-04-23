import { catalogRows } from "@/lib/catalog-rows";
import { categoryBadgeLabel, type CategoryId, isCategoryId } from "@/lib/category-tree";
import { CATALOGO_NO_PUBLICADO } from "@/lib/catalogo-reserva";
import {
  getGroupSlugForVariantSlug,
  getProductGroupDefinition,
  listGroupSlugs,
} from "@/lib/product-groups";
import { precioEfectivoTransfer, precioTarjetaDesdeLista } from "@/lib/pricing";

void CATALOGO_NO_PUBLICADO;

/** Rutas bajo `public/` por slug de producto (variante). */
const productImageBySlug: Partial<Record<string, string>> = {
  "sieger-senior-7-x15": "/Perros/alimentos-secos/sieger-senior-7-x15.webp",
  "sieger-derma-x12": "/Perros/alimentos-secos/sieger-derma.webp",
  "sieger-derma-x3": "/Perros/alimentos-secos/sieger-derma.webp",
  "sieger-lata-medicada": "/Perros/alimentos-secos/sieger-lata-medicada.png",
  "sieger-renal-x3": "/Perros/alimentos-secos/sieger-renal.png",
  "sieger-gastro-x3": "/Perros/alimentos-secos/sieger-gastro.png",
  "sieger-renal-gato-x1-5": "/Gatos/alimentos-secos/sieger-renal.webp",
  "sieger-gastro-gato-x1-5": "/Gatos/alimentos-secos/sieger-gastro.webp",
  "sieger-puppy-mini-x1": "/Perros/alimentos-secos/sieger-puppy-mini.webp",
  "sieger-puppy-mini-x3": "/Perros/alimentos-secos/sieger-puppy-mini.webp",
  "sieger-puppy-mini-x12": "/Perros/alimentos-secos/sieger-puppy-mini.webp",
  "sieger-mini-adulto-x1": "/Perros/alimentos-secos/Sieger-Mini-adulto.webp",
  "sieger-mini-adulto-x3": "/Perros/alimentos-secos/Sieger-Mini-adulto.webp",
  "sieger-mini-adulto-x12": "/Perros/alimentos-secos/Sieger-Mini-adulto.webp",
  "sieger-adulto-medium-x3": "/Perros/alimentos-secos/Sieger-Adulto-medium.webp",
  "sieger-adulto-medium-x15": "/Perros/alimentos-secos/Sieger-Adulto-medium.webp",
  "sieger-senior-mini-x12": "/Perros/alimentos-secos/sieger-senior-mini.webp",
  "sieger-reduced-calorias-x3": "/Perros/alimentos-secos/sieger-reduced-calorias.webp",
  "sieger-reduced-calorias-x12": "/Perros/alimentos-secos/sieger-reduced-calorias.webp",
  "sieger-criadores-x20": "/Perros/alimentos-secos/sieger-criadores.webp",
  "maxxium-cachorro-x3": "/Perros/alimentos-secos/maxxium-cachorro.webp",
  "maxxium-cachorro-x20": "/Perros/alimentos-secos/maxxium-cachorro.webp",
  "maxxium-cordero-x3": "/Perros/alimentos-secos/maxxium-cordero.png",
  "maxxium-cordero-x15": "/Perros/alimentos-secos/maxxium-cordero.png",
  "maxxium-adulto-x3": "/Perros/alimentos-secos/maxxium-adulto.png",
  "maxxium-adulto-x20": "/Perros/alimentos-secos/maxxium-adulto.png",
  "agility-reduced-x3": "/Perros/alimentos-secos/agility-reduced.webp",
  "agility-cachorro-x3": "/Perros/alimentos-secos/agility-cachorro.webp",
  "agility-cachorro-x20": "/Perros/alimentos-secos/agility-cachorro.webp",
  "agility-cordero-x3": "/Perros/alimentos-secos/agility-cordero.webp",
  "agility-cordero-x15": "/Perros/alimentos-secos/agility-cordero.webp",
  "agility-adulto-x3": "/Perros/alimentos-secos/agility-adulto.png",
  "agility-adulto-x20": "/Perros/alimentos-secos/agility-adulto.png",
  "agility-adulto-raza-peq-x1-5": "/Perros/alimentos-secos/agility-adulto-raza-peq.png",
  "agility-adulto-raza-peq-x15": "/Perros/alimentos-secos/agility-adulto-raza-peq.png",
  "agility-control-de-peso-x1-5": "/Perros/alimentos-secos/agility-control-de-peso.png",
  "agility-senior-7-x15": "/Perros/alimentos-secos/agility-senior.webp",
  "nutricare-adulto-x3": "/Perros/alimentos-secos/nutricare-adulto.webp",
  "nutricare-adulto-x7-5": "/Perros/alimentos-secos/nutricare-adulto.webp",
  "nutricare-adulto-x20": "/Perros/alimentos-secos/nutricare-adulto.webp",
  "nutricare-cachorro-x15": "/Perros/alimentos-secos/nutricare-cachorro.webp",
  "smug-adulto-x10": "/Perros/alimentos-secos/smug-adulto.webp",
  "smug-adulto-x20": "/Perros/alimentos-secos/smug-adulto.webp",
  "bocato-adulto-x10": "/Perros/alimentos-secos/bocatto-adulto.webp",
  "bocato-adulto-x20": "/Perros/alimentos-secos/bocatto-adulto.webp",
  "bocato-cachorro-x10": "/Perros/alimentos-secos/bocatto-cachorro.png",
  "old-prince-puppy-medium-x3": "/Perros/alimentos-secos/old-prince-puppy-medium.webp",
  "old-prince-adulto-medium-x3": "/Perros/alimentos-secos/old-prince-adulto-medium.jpg",
  "old-prince-cordero-x3": "/Perros/alimentos-secos/old-prince-cordero.webp",
  "old-prince-cordero-x15": "/Perros/alimentos-secos/old-prince-cordero.webp",
  "old-prince-puppy-pequena-x3": "/Perros/alimentos-secos/old-prince-puppy-pequeña.webp",
  "old-prince-cachorro-rp-x7-5": "/Perros/alimentos-secos/old-prince-cachorro.webp",
  "old-prince-adulto-pequena-x3": "/Perros/alimentos-secos/old-prince-adulto-pequeña.webp",
  "old-prince-adulto-rp-x7-5": "/Perros/alimentos-secos/old-prince-adulto-pequeña.webp",
  "optimun-cachorro-x3": "/Perros/alimentos-secos/optimun-cachorro.webp",
  "optimun-adulto-x3": "/Perros/alimentos-secos/optimun-adulto.png",
  "eukanuba-fit-body-small-x3": "/Perros/alimentos-secos/eukanuba-fit-body-small.png",
  "eukanuba-fit-body-medium-x3": "/Perros/alimentos-secos/eukanuba-fit-body-medium.avif",
  "eukanuba-senior-x3": "/Perros/alimentos-secos/eukanuba-senior.webp",
  "eukanuba-puppy-small-x1": "/Perros/alimentos-secos/eukanuba-puppy.webp",
  "eukanuba-puppy-small-medium-large-x3": "/Perros/alimentos-secos/eukanuba-puppy.webp",
  "eukanuba-cachorro-x15": "/Perros/alimentos-secos/eukanuba-cachorro.webp",
  "pedigree-cachorro-x8": "/Perros/alimentos-secos/pedigree-cachorro.webp",
  "pedigree-cachorro-x21": "/Perros/alimentos-secos/pedigree-cachorro.webp",
  "pedigree-adulto-x8": "/Perros/alimentos-secos/pedigree-adulto.webp",
  "pedigree-adulto-x21": "/Perros/alimentos-secos/pedigree-adulto.webp",
  "pedigree-adulto-x15": "/Perros/alimentos-secos/pedigree-adulto.webp",
  "pedigree-adulto-rp-x21": "/Perros/alimentos-secos/pedigree-adulto.webp",
  "pedigree-adulto-raz-peq-x8": "/Perros/alimentos-secos/pedigree-adulto-raz-peq.webp",
  "pedigree-adulto-raz-peq-x15": "/Perros/alimentos-secos/pedigree-adulto-raz-peq.webp",
  "pedigree-senior-x8": "/Perros/alimentos-secos/pedigree-senior.webp",
  "pampa-adulto-rp-x15": "/Perros/alimentos-secos/pampa-adulto-raz-peq.webp",
  "voraz-adulto-x20": "/Perros/alimentos-secos/voraz-adulto.webp",
  "voraz-adulto-x10": "/Perros/alimentos-secos/voraz-adulto.webp",
  "maintenance-adulto-rp-x15": "/Perros/alimentos-secos/maintenance-adulto-rp.webp",
  "maintenance-adulto-x22": "/Perros/alimentos-secos/maintenance-adulto-rp.webp",
  "livra-cachorro-x3": "/Perros/alimentos-secos/livra-cachorro.webp",
  "livra-adulto-x3": "/Perros/alimentos-secos/livra-adulto.webp",
  "royal-canin-mini-starter-x1": "/Perros/alimentos-secos/royal-canin-starter.png",
  "royal-canin-mini-starter-x3": "/Perros/alimentos-secos/royal-canin-starter.png",
  "royal-canin-mini-puppy-x1": "/Perros/alimentos-secos/royal-canin-mini-puppy.webp",
  "royal-canin-mini-puppy-x3": "/Perros/alimentos-secos/royal-canin-mini-puppy.webp",
  "royal-canin-mini-puppy-x7-5": "/Perros/alimentos-secos/royal-canin-mini-puppy.webp",
  "royal-canin-mini-adulto-x1": "/Perros/alimentos-secos/royal-canin-mini-adulto.webp",
  "royal-canin-mini-adult-x3": "/Perros/alimentos-secos/royal-canin-mini-adulto.webp",
  "royal-canin-mini-adulto-8-x3": "/Perros/alimentos-secos/royal-canin-mini-adulto.webp",
  "royal-canin-adulto-mini-12-x3": "/Perros/alimentos-secos/royal-canin-mini-adulto.webp",
  "royal-canin-mini-adulto-x7-5": "/Perros/alimentos-secos/royal-canin-mini-adulto.webp",
  "royal-canin-maxi-adulto-x15": "/Perros/alimentos-secos/royal-canin-maxi-adulto.webp",
  "excellent-adulto-perro-x1": "/Perros/alimentos-secos/excellent-adulto.webp",
  "excellent-puppy-x1": "/Perros/alimentos-secos/excellent-puppy.avif",
  "excellent-adulto-mantenimiento-x20": "/Perros/alimentos-secos/excellent-adulto-mantenimiento.webp",
  "excellent-adulto-small-x3": "/Perros/alimentos-secos/excellent-adulto-small.webp",
  "excellent-puppy-small-x3": "/Perros/alimentos-secos/excellent-puppy-small.webp",
  "dog-chow-adulto-x21": "/Perros/alimentos-secos/dog-chow-adulto.webp",
  "dogui-adulto-x21": "/Perros/alimentos-secos/dogui-adulto.webp",
  "capitan-adulto-x22": "/Perros/alimentos-secos/capitan-adulto.webp",
  "dog-prince-adulto-x15": "/Perros/alimentos-secos/prince-adulto.webp",
  "dog-prince-adulto-x22": "/Perros/alimentos-secos/prince-adulto.webp",
  "zimpi-adulto-x25": "/Perros/alimentos-secos/zimpi-adulto.webp",
  "ganacan-adulto-x25": "/Perros/alimentos-secos/ganacan-adulto.png",
  "odwalla-adulto-x25": "/Perros/alimentos-secos/odwalla-adulto.png",
  "has-cachorro-x10": "/Perros/alimentos-secos/has-cachorro.webp",
  "biohas-adulto-x20": "/Perros/alimentos-secos/biohas-adulto.webp",
  "chasque-adulto-x20": "/Perros/alimentos-secos/chasque-adulto.webp",
  "tigre-adulto-x22": "/Perros/alimentos-secos/tigre-adulto.webp",
  "rey-can-adulto-x22": "/Perros/alimentos-secos/rey-can-adulto.webp",
  "rey-can-rp-x15": "/Perros/alimentos-secos/rey-can-rp.jpg",
  "rey-can-rp-x8": "/Perros/alimentos-secos/rey-can-rp.jpg",
  "simpli-adulto-x22": "/Perros/alimentos-secos/simpli-adulto.webp",
  "gandum-adulto-x20": "/Perros/alimentos-secos/gandum-adulto.webp",
  "puppy-food-adulto-x20": "/Perros/alimentos-secos/pupy-food-adulto.png",
  "upper-urinary-x1-5": "/Perros/alimentos-secos/upper-urinary.jpg",
  "misterper-adulto-x20": "/Perros/alimentos-secos/misterper-adulto.webp",
  "biopet-adulto-x20": "/Perros/alimentos-secos/biopet-adulto.webp",
  "estampa-adulto-x20": "/Perros/alimentos-secos/estampa-adulto.jpg",
  "estampa-cachorro-x15": "/Perros/alimentos-secos/estampa-cachorro.webp",
  "estampa-adulto-rp-x15": "/Perros/alimentos-secos/estampa-adulto-rp.png",
  "total-khan-adulto-x20": "/Perros/alimentos-secos/total-khan-adulto.webp",
  "sieger-pouch-perro": "/Perros/alimentos-humedos/sieger-pouch-perro.webp",
  "sieger-pouch-recovery": "/Perros/alimentos-humedos/sieger-pouch-recovery.webp",
  "sieger-lata-recovery": "/Perros/alimentos-humedos/sieger-lata-recovery.avif",
  "sieger-lata-perro": "/Perros/alimentos-humedos/sieger-lata-perro.avif",
  "agility-lata": "/Perros/alimentos-humedos/agiligy-lata.webp",
  "pedigree-pouch": "/Perros/alimentos-humedos/pedigree-pouch.jpg",
  "pedigree-lata": "/Perros/alimentos-humedos/pedigree-lata.webp",
  "royal-canin-pouch-puppy": "/Perros/alimentos-humedos/royal-canin-pouch-puppy.avif",
  "royal-canin-pouch-adulto": "/Perros/alimentos-humedos/royal-canin-pouch-adulto.avif",
  "royal-canin-recovery": "/Perros/alimentos-humedos/royal-canin-recovery.jpg",
  "pedigree-dentastix-x1": "/Perros/snacks-premios/pedigree-dentastix.webp",
  "pedigree-dentastix-x3": "/Perros/snacks-premios/pedigree-dentastix.webp",
  "pedigree-dentastix-x7": "/Perros/snacks-premios/pedigree-dentastix.webp",
  "pedigree-rodeo": "/Perros/snacks-premios/pedigree-rodeo.jpg",
  "pedigree-biscrok-chico": "/Perros/snacks-premios/pedigree-biscrok.jpg",
  "pedigree-biscrok-grande": "/Perros/snacks-premios/pedigree-biscrok.jpg",
  "agility-derma-x3": "/Perros/dietas-veterinarias/agility-derma.webp",
  "agility-derma-x15": "/Perros/dietas-veterinarias/agility-derma.webp",
  "royal-canin-urinary-perro-x1-5": "/Perros/dietas-veterinarias/royal-canin-urinary.webp",
  "royal-canin-hypoallergenic-x2": "/Perros/dietas-veterinarias/royal-canin-hypoallergenic.webp",
  "royal-canin-renal-perro-x2": "/Perros/dietas-veterinarias/royal-canin-renal.webp",
  "royal-canin-mobily-x2": "/Perros/dietas-veterinarias/royal-canin-mobily.webp",
  "royal-canin-cardiac-x2": "/Perros/dietas-veterinarias/royal-canin-cardiac.webp",
  "royal-canin-gastro-x2": "/Perros/dietas-veterinarias/royal-canin-gastro.webp",
  "sieger-kitten-x1": "/Gatos/alimentos-secos/sieger-kitten.webp",
  "sieger-sterilized-x1": "/Gatos/alimentos-secos/sieger-sterilized.webp",
  "sieger-adulto-gato-x1": "/Gatos/alimentos-secos/sieger-adulto.webp",
  "sieger-gato-x10": "/Gatos/alimentos-secos/sieger.webp",
  "maxxium-gato-x1": "/Gatos/alimentos-secos/maxxium.webp",
  "agility-kitten-x1-5": "/Gatos/alimentos-secos/agiligy-kitten.webp",
  "agility-kitten-x10": "/Gatos/alimentos-secos/agiligy-kitten.webp",
  "agility-gato-adulto-x1-5": "/Gatos/alimentos-secos/agiligy-adulto.webp",
  "agility-gato-adulto-x10": "/Gatos/alimentos-secos/agiligy-adulto.webp",
  "bocato-gato-x10": "/Gatos/alimentos-secos/bocato.webp",
  "maxi-cat-gato-x10": "/Gatos/alimentos-secos/maxicat.jpg",
  "old-prince-kitten-cordero-x3": "/Gatos/alimentos-secos/oldprince-cordero.png",
  "old-prince-gato-cordero-x3": "/Gatos/alimentos-secos/oldprince-cordero.png",
  "old-prince-gato-esterilizado-x3": "/Gatos/alimentos-secos/oldprince-esterelizado.webp",
  "old-prince-gato-premium-x3": "/Gatos/alimentos-secos/oldprince-premium.webp",
  "optimun-kitten-x1": "/Gatos/alimentos-secos/optimun.webp",
  "optimun-gato-x3": "/Gatos/alimentos-secos/optimun.webp",
  "optimun-castrado-x3": "/Gatos/alimentos-secos/optimun-castrado.webp",
  "eukanuba-gato-x1-5": "/Gatos/alimentos-secos/eukanuba.webp",
  "eukanuba-gato-x3": "/Gatos/alimentos-secos/eukanuba.webp",
  "eukanuba-kitten-x1-5": "/Gatos/alimentos-secos/eukanuba-kitten.webp",
  "eukanuba-kitten-x3": "/Gatos/alimentos-secos/eukanuba-kitten.webp",
  "whiskas-gato-x10": "/Gatos/alimentos-secos/whiskas.jpg",
  "company-gato-x3": "/Gatos/alimentos-secos/company.webp",
  "company-kitten-x3": "/Gatos/alimentos-secos/company-kitten.webp",
  "livra-gato-x3": "/Gatos/alimentos-secos/livra.webp",
  "royal-canin-baby-cat-x1-5": "/Gatos/alimentos-secos/royal-canin-babycat.webp",
  "royal-canin-kitten-x1-5": "/Gatos/alimentos-secos/royal-canin-kitten.webp",
  "royal-canin-indoor-x1-5": "/Gatos/alimentos-secos/royal-canin-indoor.webp",
  "royal-canin-indoor-7-x1-5": "/Gatos/alimentos-secos/royal-canin-indoor.webp",
  "royal-canin-active-gato-x1-5": "/Gatos/alimentos-secos/royal-canin-active.webp",
  "royal-canin-fit-32-x1-5": "/Gatos/alimentos-secos/royal-canin-fit.webp",
  "excellent-gato-x1": "/Gatos/alimentos-secos/excellent-gato.webp",
  "excellent-gato-x3": "/Gatos/alimentos-secos/excellent-gato.webp",
  "excellent-gato-x7-5": "/Gatos/alimentos-secos/excellent-gato.webp",
  "excellent-steriliced-x1": "/Gatos/alimentos-secos/excellent-steriliced.webp",
  "excellent-steriliced-x7-5": "/Gatos/alimentos-secos/excellent-steriliced.webp",
  "excellent-kitten-x1": "/Gatos/alimentos-secos/excellent-kitten.webp",
  "excellent-kitten-x7-5": "/Gatos/alimentos-secos/excellent-kitten.webp",
  "capitan-gato-x10": "/Gatos/alimentos-secos/capitan.jpg",
  "amici-gato-x10": "/Gatos/alimentos-secos/amici.png",
  "zimpi-gato-x10": "/Gatos/alimentos-secos/zimpi.png",
  "ganacat-gato-x10": "/Gatos/alimentos-secos/ganacat.webp",
  "has-gato-x10": "/Gatos/alimentos-secos/has.webp",
};

/** Imagen de la ficha/card agrupada (clave = `groupSlug`). */
const productGroupImageByGroupSlug: Partial<Record<string, string>> = {
  "sieger-puppy-mini": "/Perros/alimentos-secos/sieger-puppy-mini.webp",
  "sieger-derma": "/Perros/alimentos-secos/sieger-derma.webp",
  "sieger-lata-medicada": "/Perros/alimentos-secos/sieger-lata-medicada.png",
  "sieger-renal": "/Perros/alimentos-secos/sieger-renal.png",
  "sieger-gastro": "/Perros/alimentos-secos/sieger-gastro.png",
  "sieger-renal-gato": "/Gatos/alimentos-secos/sieger-renal.webp",
  "sieger-gastro-gato": "/Gatos/alimentos-secos/sieger-gastro.webp",
  "sieger-puppy-medium": "/Perros/alimentos-secos/Sieger-Puppy-Medium-Large.png",
  "sieger-mini-adulto": "/Perros/alimentos-secos/Sieger-Mini-adulto.webp",
  "sieger-adulto-medium": "/Perros/alimentos-secos/Sieger-Adulto-medium.webp",
  "sieger-senior": "/Perros/alimentos-secos/sieger-senior-7-x15.webp",
  "sieger-senior-mini": "/Perros/alimentos-secos/sieger-senior-mini.webp",
  "sieger-reduced-calorias": "/Perros/alimentos-secos/sieger-reduced-calorias.webp",
  "sieger-criadores": "/Perros/alimentos-secos/sieger-criadores.webp",
  "maxxium-cachorro": "/Perros/alimentos-secos/maxxium-cachorro.webp",
  "maxxium-cordero": "/Perros/alimentos-secos/maxxium-cordero.png",
  "maxxium-adulto": "/Perros/alimentos-secos/maxxium-adulto.png",
  "agility-reduced": "/Perros/alimentos-secos/agility-reduced.webp",
  "agility-cachorro": "/Perros/alimentos-secos/agility-cachorro.webp",
  "agility-cordero": "/Perros/alimentos-secos/agility-cordero.webp",
  "agility-adulto": "/Perros/alimentos-secos/agility-adulto.png",
  "agility-adulto-raza-peq": "/Perros/alimentos-secos/agility-adulto-raza-peq.png",
  "agility-control-de-peso": "/Perros/alimentos-secos/agility-control-de-peso.png",
  "agility-senior": "/Perros/alimentos-secos/agility-senior.webp",
  "nutricare-adulto": "/Perros/alimentos-secos/nutricare-adulto.webp",
  "nutricare-cachorro": "/Perros/alimentos-secos/nutricare-cachorro.webp",
  "smug-adulto": "/Perros/alimentos-secos/smug-adulto.webp",
  "bocatto-adulto": "/Perros/alimentos-secos/bocatto-adulto.webp",
  "bocatto-cachorro": "/Perros/alimentos-secos/bocatto-cachorro.png",
  "old-prince-puppy-medium": "/Perros/alimentos-secos/old-prince-puppy-medium.webp",
  "old-prince-adulto-medium": "/Perros/alimentos-secos/old-prince-adulto-medium.jpg",
  "old-prince-cordero": "/Perros/alimentos-secos/old-prince-cordero.webp",
  "old-prince-puppy-pequena": "/Perros/alimentos-secos/old-prince-puppy-pequeña.webp",
  "old-prince-cachorro": "/Perros/alimentos-secos/old-prince-cachorro.webp",
  "old-prince-adulto-pequena": "/Perros/alimentos-secos/old-prince-adulto-pequeña.webp",
  "optimun-cachorro": "/Perros/alimentos-secos/optimun-cachorro.webp",
  "optimun-adulto": "/Perros/alimentos-secos/optimun-adulto.png",
  "eukanuba-fit-body-small": "/Perros/alimentos-secos/eukanuba-fit-body-small.png",
  "eukanuba-fit-body-medium": "/Perros/alimentos-secos/eukanuba-fit-body-medium.avif",
  "eukanuba-senior": "/Perros/alimentos-secos/eukanuba-senior.webp",
  "eukanuba-puppy": "/Perros/alimentos-secos/eukanuba-puppy.webp",
  "eukanuba-cachorro": "/Perros/alimentos-secos/eukanuba-cachorro.webp",
  "pedigree-cachorro": "/Perros/alimentos-secos/pedigree-cachorro.webp",
  "pedigree-adulto": "/Perros/alimentos-secos/pedigree-adulto.webp",
  "pedigree-adulto-raz-peq": "/Perros/alimentos-secos/pedigree-adulto-raz-peq.webp",
  "pedigree-senior": "/Perros/alimentos-secos/pedigree-senior.webp",
  "pampa-adulto-raz-peq": "/Perros/alimentos-secos/pampa-adulto-raz-peq.webp",
  "voraz-adulto": "/Perros/alimentos-secos/voraz-adulto.webp",
  "maintenance-adulto-rp": "/Perros/alimentos-secos/maintenance-adulto-rp.webp",
  "livra-cachorro": "/Perros/alimentos-secos/livra-cachorro.webp",
  "livra-adulto": "/Perros/alimentos-secos/livra-adulto.webp",
  "royal-canin-starter": "/Perros/alimentos-secos/royal-canin-starter.png",
  "royal-canin-mini-puppy": "/Perros/alimentos-secos/royal-canin-mini-puppy.webp",
  "royal-canin-mini-adulto": "/Perros/alimentos-secos/royal-canin-mini-adulto.webp",
  "royal-canin-maxi-adulto": "/Perros/alimentos-secos/royal-canin-maxi-adulto.webp",
  "excellent-adulto": "/Perros/alimentos-secos/excellent-adulto.webp",
  "excellent-puppy": "/Perros/alimentos-secos/excellent-puppy.avif",
  "excellent-adulto-mantenimiento": "/Perros/alimentos-secos/excellent-adulto-mantenimiento.webp",
  "excellent-adulto-small": "/Perros/alimentos-secos/excellent-adulto-small.webp",
  "excellent-puppy-small": "/Perros/alimentos-secos/excellent-puppy-small.webp",
  "dog-chow-adulto": "/Perros/alimentos-secos/dog-chow-adulto.webp",
  "dogui-adulto": "/Perros/alimentos-secos/dogui-adulto.webp",
  "capitan-adulto": "/Perros/alimentos-secos/capitan-adulto.webp",
  "prince-adulto": "/Perros/alimentos-secos/prince-adulto.webp",
  "zimpi-adulto": "/Perros/alimentos-secos/zimpi-adulto.webp",
  "ganacan-adulto": "/Perros/alimentos-secos/ganacan-adulto.png",
  "odwalla-adulto": "/Perros/alimentos-secos/odwalla-adulto.png",
  "has-cachorro": "/Perros/alimentos-secos/has-cachorro.webp",
  "biohas-adulto": "/Perros/alimentos-secos/biohas-adulto.webp",
  "chasque-adulto": "/Perros/alimentos-secos/chasque-adulto.webp",
  "tigre-adulto": "/Perros/alimentos-secos/tigre-adulto.webp",
  "rey-can-adulto": "/Perros/alimentos-secos/rey-can-adulto.webp",
  "rey-can-rp": "/Perros/alimentos-secos/rey-can-rp.jpg",
  "simpli-adulto": "/Perros/alimentos-secos/simpli-adulto.webp",
  "gandum-adulto": "/Perros/alimentos-secos/gandum-adulto.webp",
  "pupy-food-adulto": "/Perros/alimentos-secos/pupy-food-adulto.png",
  "upper-urinary": "/Perros/alimentos-secos/upper-urinary.jpg",
  "misterper-adulto": "/Perros/alimentos-secos/misterper-adulto.webp",
  "biopet-adulto": "/Perros/alimentos-secos/biopet-adulto.webp",
  "estampa-adulto": "/Perros/alimentos-secos/estampa-adulto.jpg",
  "estampa-cachorro": "/Perros/alimentos-secos/estampa-cachorro.webp",
  "estampa-adulto-rp": "/Perros/alimentos-secos/estampa-adulto-rp.png",
  "total-khan-adulto": "/Perros/alimentos-secos/total-khan-adulto.webp",
  "pedigree-dentastix": "/Perros/snacks-premios/pedigree-dentastix.webp",
  "pedigree-rodeo": "/Perros/snacks-premios/pedigree-rodeo.jpg",
  "pedigree-biscrok": "/Perros/snacks-premios/pedigree-biscrok.jpg",
  "agility-derma": "/Perros/dietas-veterinarias/agility-derma.webp",
  "royal-canin-urinary-perro": "/Perros/dietas-veterinarias/royal-canin-urinary.webp",
  "royal-canin-hypoallergenic": "/Perros/dietas-veterinarias/royal-canin-hypoallergenic.webp",
  "royal-canin-renal-perro": "/Perros/dietas-veterinarias/royal-canin-renal.webp",
  "royal-canin-mobily": "/Perros/dietas-veterinarias/royal-canin-mobily.webp",
  "royal-canin-cardiac": "/Perros/dietas-veterinarias/royal-canin-cardiac.webp",
  "royal-canin-gastro": "/Perros/dietas-veterinarias/royal-canin-gastro.webp",
  "sieger-gato-kitten": "/Gatos/alimentos-secos/sieger-kitten.webp",
  "sieger-gato-sterilized": "/Gatos/alimentos-secos/sieger-sterilized.webp",
  "sieger-gato-adulto": "/Gatos/alimentos-secos/sieger-adulto.webp",
  "sieger-gato": "/Gatos/alimentos-secos/sieger.webp",
  "maxxium-gato": "/Gatos/alimentos-secos/maxxium.webp",
  "agility-gato-kitten": "/Gatos/alimentos-secos/agiligy-kitten.webp",
  "agility-gato-adulto": "/Gatos/alimentos-secos/agiligy-adulto.webp",
  "bocato-gato": "/Gatos/alimentos-secos/bocato.webp",
  "maxi-cat-gato": "/Gatos/alimentos-secos/maxicat.jpg",
  "old-prince-gato-cordero": "/Gatos/alimentos-secos/oldprince-cordero.png",
  "old-prince-gato-esterilizado": "/Gatos/alimentos-secos/oldprince-esterelizado.webp",
  "old-prince-gato-premium": "/Gatos/alimentos-secos/oldprince-premium.webp",
  "optimun-gato": "/Gatos/alimentos-secos/optimun.webp",
  "optimun-gato-castrado": "/Gatos/alimentos-secos/optimun-castrado.webp",
  "eukanuba-gato": "/Gatos/alimentos-secos/eukanuba.webp",
  "eukanuba-kitten": "/Gatos/alimentos-secos/eukanuba-kitten.webp",
  "whiskas-gato": "/Gatos/alimentos-secos/whiskas.jpg",
  "company-gato": "/Gatos/alimentos-secos/company.webp",
  "company-kitten": "/Gatos/alimentos-secos/company-kitten.webp",
  "livra-gato": "/Gatos/alimentos-secos/livra.webp",
  "royal-canin-baby-cat": "/Gatos/alimentos-secos/royal-canin-babycat.webp",
  "royal-canin-kitten": "/Gatos/alimentos-secos/royal-canin-kitten.webp",
  "royal-canin-indoor": "/Gatos/alimentos-secos/royal-canin-indoor.webp",
  "royal-canin-active-gato": "/Gatos/alimentos-secos/royal-canin-active.webp",
  "royal-canin-fit-32": "/Gatos/alimentos-secos/royal-canin-fit.webp",
  "excellent-gato": "/Gatos/alimentos-secos/excellent-gato.webp",
  "excellent-steriliced": "/Gatos/alimentos-secos/excellent-steriliced.webp",
  "excellent-kitten": "/Gatos/alimentos-secos/excellent-kitten.webp",
  "capitan-gato": "/Gatos/alimentos-secos/capitan.jpg",
  "amici-gato": "/Gatos/alimentos-secos/amici.png",
  "zimpi-gato": "/Gatos/alimentos-secos/zimpi.png",
  "ganacat-gato": "/Gatos/alimentos-secos/ganacat.webp",
  "has-gato": "/Gatos/alimentos-secos/has.webp",
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  cashPrice: number;
  categoryId: CategoryId;
  category: string;
  brand: string;
  shortDescription: string;
  description: string;
  colors: string[];
  sizes: string[];
  stock: number;
  /** Precio de lista del Excel (sin recargo tarjeta) */
  precioLista: number;
  /** Imagen principal en `/public` o URL absoluta. */
  imageSrc?: string;
};

export type ListingEntry =
  | { type: "product"; product: Product }
  | {
      type: "group";
      groupSlug: string;
      displayName: string;
      imageSrc?: string;
      categoryId: CategoryId;
      fromPrice: number;
      fromCashPrice: number;
      variants: Product[];
    };

export function formatArs(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

function buildDescription(row: (typeof catalogRows)[number]) {
  const listaTxt = formatArs(row.lista);
  const tarjetaTxt = formatArs(precioTarjetaDesdeLista(row.lista));
  const efectivoTxt = formatArs(precioEfectivoTransfer(row.lista, row.cash));
  return `Precio de lista ${listaTxt}. Con tarjeta de crédito (lista +10%): ${tarjetaTxt}. Efectivo o transferencia: ${efectivoTxt}. Consultá promociones 2x1 en latas y pouches según disponibilidad en el local.`;
}

export const products: Product[] = catalogRows.map((row) => ({
  slug: row.slug,
  name: `${row.marca} — ${row.nombre}`.trim(),
  brand: row.marca,
  precioLista: row.lista,
  price: precioTarjetaDesdeLista(row.lista),
  cashPrice: precioEfectivoTransfer(row.lista, row.cash),
  categoryId: row.categoryId,
  category: categoryBadgeLabel(row.categoryId),
  shortDescription: `Lista ${formatArs(row.lista)} · ${row.marca}`,
  description: buildDescription(row),
  colors: [],
  sizes: [],
  stock: 5,
  imageSrc: productImageBySlug[row.slug],
}));

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

/** Slugs que deben existir como página: variantes + fichas agrupadas. */
export function listAllProductPageSlugs() {
  const slugs = new Set<string>();
  for (const p of products) {
    slugs.add(p.slug);
  }
  for (const g of listGroupSlugs()) {
    slugs.add(g);
  }
  return [...slugs];
}

export function getDetailHrefForProductSlug(productSlug: string) {
  return getGroupSlugForVariantSlug(productSlug) ?? productSlug;
}

export function buildListingEntries(): ListingEntry[] {
  const seenGroups = new Set<string>();
  const out: ListingEntry[] = [];

  for (const p of products) {
    const gSlug = getGroupSlugForVariantSlug(p.slug);
    if (gSlug) {
      if (seenGroups.has(gSlug)) continue;
      seenGroups.add(gSlug);
      const def = getProductGroupDefinition(gSlug);
      if (!def) continue;
      const variants = def.variantSlugs
        .map((s) => products.find((x) => x.slug === s))
        .filter((x): x is Product => !!x);
      if (variants.length === 0) continue;
      const fromPrice = Math.min(...variants.map((v) => v.price));
      const fromCashPrice = Math.min(...variants.map((v) => v.cashPrice));
      out.push({
        type: "group",
        groupSlug: gSlug,
        displayName: def.displayName,
        imageSrc: productGroupImageByGroupSlug[gSlug] ?? variants.find((v) => v.imageSrc)?.imageSrc,
        categoryId: variants[0]!.categoryId,
        fromPrice,
        fromCashPrice,
        variants,
      });
      continue;
    }
    out.push({ type: "product", product: p });
  }
  return out;
}

export function getGroupListingIfExists(groupSlug: string): (ListingEntry & { type: "group" }) | undefined {
  const def = getProductGroupDefinition(groupSlug);
  if (!def) return undefined;
  const variants = def.variantSlugs
    .map((s) => products.find((x) => x.slug === s))
    .filter((x): x is Product => !!x);
  if (variants.length === 0) return undefined;
  const fromPrice = Math.min(...variants.map((v) => v.price));
  const fromCashPrice = Math.min(...variants.map((v) => v.cashPrice));
  return {
    type: "group",
    groupSlug,
    displayName: def.displayName,
    imageSrc: productGroupImageByGroupSlug[groupSlug] ?? variants.find((v) => v.imageSrc)?.imageSrc,
    categoryId: variants[0]!.categoryId,
    fromPrice,
    fromCashPrice,
    variants,
  };
}

export { isCategoryId };
