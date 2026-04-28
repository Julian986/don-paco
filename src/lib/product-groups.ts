/**
 * Productos que comparten imagen y ficha: una card en el listado, varias presentaciones en el detalle.
 * Para sumar líneas nuevas, agregar una entrada con `groupSlug` (URL) y los `variantSlugs` del catálogo.
 */
export type ProductGroupDefinition = {
  groupSlug: string;
  displayName: string;
  variantSlugs: readonly string[];
};

export const PRODUCT_GROUPS: readonly ProductGroupDefinition[] = [
  {
    groupSlug: "sieger-puppy-mini",
    displayName: "Sieger — Puppy mini",
    variantSlugs: ["sieger-puppy-mini-x1", "sieger-puppy-mini-x3", "sieger-puppy-mini-x12"],
  },
  {
    groupSlug: "sieger-puppy-medium",
    displayName: "Sieger — Puppy medium",
    variantSlugs: ["sieger-puppy-medium-x1", "sieger-puppy-medium-x3", "sieger-puppy-medium-x15"],
  },
  {
    groupSlug: "sieger-mini-adulto",
    displayName: "Sieger — Mini adulto",
    variantSlugs: ["sieger-mini-adulto-x1", "sieger-mini-adulto-x3", "sieger-mini-adulto-x12"],
  },
  {
    groupSlug: "sieger-adulto-medium",
    displayName: "Sieger — Adulto medium",
    variantSlugs: ["sieger-adulto-medium-x3", "sieger-adulto-medium-x15"],
  },
  {
    groupSlug: "sieger-senior",
    displayName: "Sieger — Senior",
    variantSlugs: ["sieger-senior-7-x15", "sieger-senior-x1", "sieger-senior-x3"],
  },
  {
    groupSlug: "sieger-senior-mini",
    displayName: "Sieger — Senior mini",
    variantSlugs: ["sieger-senior-mini-x12"],
  },
  {
    groupSlug: "sieger-reduced-calorias",
    displayName: "Sieger — Reduced calorías",
    variantSlugs: ["sieger-reduced-calorias-x3", "sieger-reduced-calorias-x12"],
  },
  {
    groupSlug: "sieger-criadores",
    displayName: "Sieger — Criadores",
    variantSlugs: ["sieger-criadores-x20"],
  },
  {
    groupSlug: "sieger-derma",
    displayName: "Sieger — Derma",
    variantSlugs: ["sieger-derma-x12", "sieger-derma-x3"],
  },
  {
    groupSlug: "sieger-lata-medicada",
    displayName: "Sieger — Lata medicada",
    variantSlugs: ["sieger-lata-medicada"],
  },
  {
    groupSlug: "sieger-renal",
    displayName: "Sieger — Renal",
    variantSlugs: ["sieger-renal-x3"],
  },
  {
    groupSlug: "sieger-gastro",
    displayName: "Sieger — Gastro",
    variantSlugs: ["sieger-gastro-x3"],
  },
  {
    groupSlug: "sieger-renal-gato",
    displayName: "Sieger — Renal gato",
    variantSlugs: ["sieger-renal-gato-x1-5"],
  },
  {
    groupSlug: "sieger-gastro-gato",
    displayName: "Sieger — Gastro gato",
    variantSlugs: ["sieger-gastro-gato-x1-5"],
  },
  {
    groupSlug: "maxxium-cachorro",
    displayName: "Maxxium — Cachorro",
    variantSlugs: ["maxxium-cachorro-x3", "maxxium-cachorro-x20"],
  },
  {
    groupSlug: "maxxium-cordero",
    displayName: "Maxxium — Cordero",
    variantSlugs: ["maxxium-cordero-x3", "maxxium-cordero-x15"],
  },
  {
    groupSlug: "maxxium-adulto",
    displayName: "Maxxium — Adulto",
    variantSlugs: ["maxxium-adulto-x3", "maxxium-adulto-x20"],
  },
  {
    groupSlug: "agility-reduced",
    displayName: "Agility — Reduced",
    variantSlugs: ["agility-reduced-x3"],
  },
  {
    groupSlug: "agility-cachorro",
    displayName: "Agility — Cachorro",
    variantSlugs: ["agility-cachorro-x3", "agility-cachorro-x20"],
  },
  {
    groupSlug: "agility-cordero",
    displayName: "Agility — Cordero",
    variantSlugs: ["agility-cordero-x3", "agility-cordero-x15"],
  },
  {
    groupSlug: "agility-adulto",
    displayName: "Agility — Adulto",
    variantSlugs: ["agility-adulto-x3", "agility-adulto-x20"],
  },
  {
    groupSlug: "agility-adulto-raza-peq",
    displayName: "Agility — Adulto raza pequeña",
    variantSlugs: ["agility-adulto-raza-peq-x1-5", "agility-adulto-raza-peq-x15"],
  },
  {
    groupSlug: "agility-control-de-peso",
    displayName: "Agility — Control de peso",
    variantSlugs: ["agility-control-de-peso-x1-5"],
  },
  {
    groupSlug: "agility-senior",
    displayName: "Agility — Senior",
    variantSlugs: ["agility-senior-7-x15"],
  },
  {
    groupSlug: "nutricare-adulto",
    displayName: "Nutricare — Adulto",
    variantSlugs: ["nutricare-adulto-x3", "nutricare-adulto-x7-5", "nutricare-adulto-x20"],
  },
  {
    groupSlug: "nutricare-cachorro",
    displayName: "Nutricare — Cachorro",
    variantSlugs: ["nutricare-cachorro-x15"],
  },
  {
    groupSlug: "smug-adulto",
    displayName: "Smug — Adulto",
    variantSlugs: ["smug-adulto-x10", "smug-adulto-x20"],
  },
  {
    groupSlug: "bocatto-adulto",
    displayName: "Bocato — Adulto",
    variantSlugs: ["bocato-adulto-x10", "bocato-adulto-x20"],
  },
  {
    groupSlug: "bocatto-cachorro",
    displayName: "Bocato — Cachorro",
    variantSlugs: ["bocato-cachorro-x10"],
  },
  {
    groupSlug: "old-prince-puppy-medium",
    displayName: "Old Prince — Puppy medium",
    variantSlugs: ["old-prince-puppy-medium-x3"],
  },
  {
    groupSlug: "old-prince-adulto-medium",
    displayName: "Old Prince — Adulto medium",
    variantSlugs: ["old-prince-adulto-medium-x3"],
  },
  {
    groupSlug: "old-prince-cordero",
    displayName: "Old Prince — Cordero",
    variantSlugs: ["old-prince-cordero-x3", "old-prince-cordero-x15"],
  },
  {
    groupSlug: "old-prince-puppy-pequena",
    displayName: "Old Prince — Puppy pequeña",
    variantSlugs: ["old-prince-puppy-pequena-x3"],
  },
  {
    groupSlug: "old-prince-cachorro",
    displayName: "Old Prince — Cachorro",
    variantSlugs: ["old-prince-cachorro-rp-x7-5"],
  },
  {
    groupSlug: "old-prince-adulto-pequena",
    displayName: "Old Prince — Adulto pequeña / RP",
    variantSlugs: ["old-prince-adulto-pequena-x3", "old-prince-adulto-rp-x7-5"],
  },
  {
    groupSlug: "7-vida-adulto",
    displayName: "7 Vida — Adulto",
    variantSlugs: ["7-vida-adulto-x1", "7-vida-adulto-x10"],
  },
  {
    groupSlug: "optimun-cachorro",
    displayName: "Optimun — Cachorro",
    variantSlugs: ["optimun-cachorro-x3"],
  },
  {
    groupSlug: "optimun-adulto",
    displayName: "Optimun — Adulto",
    variantSlugs: ["optimun-adulto-x3"],
  },
  {
    groupSlug: "eukanuba-fit-body-small",
    displayName: "Eukanuba — Fit body small",
    variantSlugs: ["eukanuba-fit-body-small-x3"],
  },
  {
    groupSlug: "eukanuba-fit-body-medium",
    displayName: "Eukanuba — Fit body medium",
    variantSlugs: ["eukanuba-fit-body-medium-x3"],
  },
  {
    groupSlug: "eukanuba-senior",
    displayName: "Eukanuba — Senior",
    variantSlugs: ["eukanuba-senior-x3"],
  },
  {
    groupSlug: "eukanuba-puppy",
    displayName: "Eukanuba — Puppy (small / S·M·L)",
    variantSlugs: ["eukanuba-puppy-small-x1", "eukanuba-puppy-small-medium-large-x3"],
  },
  {
    groupSlug: "eukanuba-cachorro",
    displayName: "Eukanuba — Cachorro",
    variantSlugs: ["eukanuba-cachorro-x15"],
  },
  {
    groupSlug: "pedigree-cachorro",
    displayName: "Pedigree — Cachorro",
    variantSlugs: ["pedigree-cachorro-x8", "pedigree-cachorro-x21"],
  },
  {
    groupSlug: "pedigree-adulto",
    displayName: "Pedigree — Adulto",
    variantSlugs: [
      "pedigree-adulto-x8",
      "pedigree-adulto-x21",
      "pedigree-adulto-x15",
      "pedigree-adulto-rp-x21",
    ],
  },
  {
    groupSlug: "pedigree-adulto-raz-peq",
    displayName: "Pedigree — Adulto raz. peq.",
    variantSlugs: ["pedigree-adulto-raz-peq-x8", "pedigree-adulto-raz-peq-x15"],
  },
  {
    groupSlug: "pedigree-senior",
    displayName: "Pedigree — Senior",
    variantSlugs: ["pedigree-senior-x8"],
  },
  {
    groupSlug: "pedigree-dentastix",
    displayName: "Pedigree — Dentastix",
    variantSlugs: ["pedigree-dentastix-x1", "pedigree-dentastix-x3", "pedigree-dentastix-x7"],
  },
  {
    groupSlug: "pedigree-rodeo",
    displayName: "Pedigree — Rodeo",
    variantSlugs: ["pedigree-rodeo"],
  },
  {
    groupSlug: "pedigree-biscrok",
    displayName: "Pedigree — Biscrok",
    variantSlugs: ["pedigree-biscrok-chico", "pedigree-biscrok-grande"],
  },
  {
    groupSlug: "agility-derma",
    displayName: "Agility — Derma",
    variantSlugs: ["agility-derma-x3", "agility-derma-x15"],
  },
  {
    groupSlug: "royal-canin-urinary-perro",
    displayName: "Royal Canin — Urinary perro",
    variantSlugs: ["royal-canin-urinary-perro-x1-5"],
  },
  {
    groupSlug: "royal-canin-hypoallergenic",
    displayName: "Royal Canin — Hypoallergenic",
    variantSlugs: ["royal-canin-hypoallergenic-x2"],
  },
  {
    groupSlug: "royal-canin-renal-perro",
    displayName: "Royal Canin — Renal perro",
    variantSlugs: ["royal-canin-renal-perro-x2"],
  },
  {
    groupSlug: "royal-canin-mobily",
    displayName: "Royal Canin — Mobily",
    variantSlugs: ["royal-canin-mobily-x2"],
  },
  {
    groupSlug: "royal-canin-cardiac",
    displayName: "Royal Canin — Cardiac",
    variantSlugs: ["royal-canin-cardiac-x2"],
  },
  {
    groupSlug: "royal-canin-gastro",
    displayName: "Royal Canin — Gastro",
    variantSlugs: ["royal-canin-gastro-x2"],
  },
  {
    groupSlug: "pampa-adulto-raz-peq",
    displayName: "Pampa — Adulto (raza pequeña)",
    variantSlugs: ["pampa-adulto-rp-x15"],
  },
  {
    groupSlug: "voraz-adulto",
    displayName: "Voraz — Adulto",
    variantSlugs: ["voraz-adulto-x20", "voraz-adulto-x10"],
  },
  {
    groupSlug: "maintenance-adulto-rp",
    displayName: "Maintenance — Adulto / raza pequeña",
    variantSlugs: ["maintenance-adulto-rp-x15", "maintenance-adulto-x22"],
  },
  {
    groupSlug: "livra-cachorro",
    displayName: "Livra — Cachorro",
    variantSlugs: ["livra-cachorro-x3"],
  },
  {
    groupSlug: "livra-adulto",
    displayName: "Livra — Adulto",
    variantSlugs: ["livra-adulto-x3"],
  },
  {
    groupSlug: "royal-canin-starter",
    displayName: "Royal Canin — Mini starter",
    variantSlugs: ["royal-canin-mini-starter-x1", "royal-canin-mini-starter-x3"],
  },
  {
    groupSlug: "royal-canin-mini-puppy",
    displayName: "Royal Canin — Mini puppy",
    variantSlugs: ["royal-canin-mini-puppy-x1", "royal-canin-mini-puppy-x3", "royal-canin-mini-puppy-x7-5"],
  },
  {
    groupSlug: "royal-canin-mini-adulto",
    displayName: "Royal Canin — Mini adulto",
    variantSlugs: [
      "royal-canin-mini-adulto-x1",
      "royal-canin-mini-adult-x3",
      "royal-canin-mini-adulto-8-x3",
      "royal-canin-adulto-mini-12-x3",
      "royal-canin-mini-adulto-x7-5",
    ],
  },
  {
    groupSlug: "royal-canin-maxi-adulto",
    displayName: "Royal Canin — Maxi adulto",
    variantSlugs: ["royal-canin-maxi-adulto-x15"],
  },
  {
    groupSlug: "excellent-adulto",
    displayName: "Excellent — Adulto",
    variantSlugs: ["excellent-adulto-perro-x1"],
  },
  {
    groupSlug: "excellent-puppy",
    displayName: "Excellent — Puppy",
    variantSlugs: ["excellent-puppy-x1"],
  },
  {
    groupSlug: "excellent-adulto-mantenimiento",
    displayName: "Excellent — Adulto mantenimiento",
    variantSlugs: ["excellent-adulto-mantenimiento-x20"],
  },
  {
    groupSlug: "excellent-adulto-small",
    displayName: "Excellent — Adulto small",
    variantSlugs: ["excellent-adulto-small-x3"],
  },
  {
    groupSlug: "excellent-puppy-small",
    displayName: "Excellent — Puppy small",
    variantSlugs: ["excellent-puppy-small-x3"],
  },
  {
    groupSlug: "dog-chow-adulto",
    displayName: "Dog Chow — Adulto",
    variantSlugs: ["dog-chow-adulto-x21"],
  },
  {
    groupSlug: "dogui-adulto",
    displayName: "Dogui — Adulto",
    variantSlugs: ["dogui-adulto-x21"],
  },
  {
    groupSlug: "capitan-adulto",
    displayName: "Capitan — Adulto",
    variantSlugs: ["capitan-adulto-x22"],
  },
  {
    groupSlug: "prince-adulto",
    displayName: "Dog Prince — Adulto",
    variantSlugs: ["dog-prince-adulto-x15", "dog-prince-adulto-x22"],
  },
  {
    groupSlug: "zimpi-adulto",
    displayName: "Zimpi — Adulto",
    variantSlugs: ["zimpi-adulto-x25"],
  },
  {
    groupSlug: "ganacan-adulto",
    displayName: "Ganacan — Adulto",
    variantSlugs: ["ganacan-adulto-x25"],
  },
  {
    groupSlug: "odwalla-adulto",
    displayName: "Odwalla — Adulto",
    variantSlugs: ["odwalla-adulto-x25"],
  },
  {
    groupSlug: "has-cachorro",
    displayName: "HAS — Cachorro",
    variantSlugs: ["has-cachorro-x10"],
  },
  {
    groupSlug: "biohas-adulto",
    displayName: "Biohas — Adulto",
    variantSlugs: ["biohas-adulto-x20"],
  },
  {
    groupSlug: "chasque-adulto",
    displayName: "Chasque — Adulto",
    variantSlugs: ["chasque-adulto-x20"],
  },
  {
    groupSlug: "tigre-adulto",
    displayName: "Tigre — Adulto",
    variantSlugs: ["tigre-adulto-x22"],
  },
  {
    groupSlug: "rey-can-adulto",
    displayName: "Rey Can — Adulto",
    variantSlugs: ["rey-can-adulto-x22"],
  },
  {
    groupSlug: "rey-can-rp",
    displayName: "Rey Can — Raza pequeña",
    variantSlugs: ["rey-can-rp-x15", "rey-can-rp-x8"],
  },
  {
    groupSlug: "simpli-adulto",
    displayName: "Simpli — Adulto",
    variantSlugs: ["simpli-adulto-x22"],
  },
  {
    groupSlug: "gandum-adulto",
    displayName: "Gandum — Adulto",
    variantSlugs: ["gandum-adulto-x20"],
  },
  {
    groupSlug: "pupy-food-adulto",
    displayName: "Puppy Food — Adulto",
    variantSlugs: ["puppy-food-adulto-x20"],
  },
  {
    groupSlug: "upper-urinary",
    displayName: "Upper — Urinary",
    variantSlugs: ["upper-urinary-x1-5"],
  },
  {
    groupSlug: "misterper-adulto",
    displayName: "Misterper — Adulto",
    variantSlugs: ["misterper-adulto-x20"],
  },
  {
    groupSlug: "biopet-adulto",
    displayName: "Biopet — Adulto",
    variantSlugs: ["biopet-adulto-x20"],
  },
  {
    groupSlug: "estampa-adulto",
    displayName: "Estampa — Adulto",
    variantSlugs: ["estampa-adulto-x20"],
  },
  {
    groupSlug: "estampa-cachorro",
    displayName: "Estampa — Cachorro",
    variantSlugs: ["estampa-cachorro-x15"],
  },
  {
    groupSlug: "estampa-adulto-rp",
    displayName: "Estampa — Adulto (raza pequeña)",
    variantSlugs: ["estampa-adulto-rp-x15"],
  },
  {
    groupSlug: "total-khan-adulto",
    displayName: "Total Khan — Adulto",
    variantSlugs: ["total-khan-adulto-x20"],
  },
  {
    groupSlug: "sieger-gato-kitten",
    displayName: "Sieger — Kitten gato",
    variantSlugs: ["sieger-kitten-x1"],
  },
  {
    groupSlug: "sieger-gato-sterilized",
    displayName: "Sieger — Sterilized gato",
    variantSlugs: ["sieger-sterilized-x1"],
  },
  {
    groupSlug: "sieger-gato-adulto",
    displayName: "Sieger — Adulto gato",
    variantSlugs: ["sieger-adulto-gato-x1"],
  },
  {
    groupSlug: "sieger-gato",
    displayName: "Sieger — Gato (bolsa grande)",
    variantSlugs: ["sieger-gato-x10"],
  },
  {
    groupSlug: "maxxium-gato",
    displayName: "Maxxium — Gato",
    variantSlugs: ["maxxium-gato-x1"],
  },
  {
    groupSlug: "agility-gato-kitten",
    displayName: "Agility — Kitten gato",
    variantSlugs: ["agility-kitten-x1-5", "agility-kitten-x10"],
  },
  {
    groupSlug: "agility-gato-adulto",
    displayName: "Agility — Adulto gato",
    variantSlugs: ["agility-gato-adulto-x1-5", "agility-gato-adulto-x10"],
  },
  {
    groupSlug: "bocato-gato",
    displayName: "Bocato — Gato",
    variantSlugs: ["bocato-gato-x10"],
  },
  {
    groupSlug: "maxi-cat-gato",
    displayName: "Maxi Cat — Gato",
    variantSlugs: ["maxi-cat-gato-x10"],
  },
  {
    groupSlug: "old-prince-gato-cordero",
    displayName: "Old Prince — Cordero (kitten / adulto)",
    variantSlugs: ["old-prince-kitten-cordero-x3", "old-prince-gato-cordero-x3"],
  },
  {
    groupSlug: "old-prince-gato-esterilizado",
    displayName: "Old Prince — Esterilizado",
    variantSlugs: ["old-prince-gato-esterilizado-x3"],
  },
  {
    groupSlug: "old-prince-gato-premium",
    displayName: "Old Prince — Premium",
    variantSlugs: ["old-prince-gato-premium-x3"],
  },
  {
    groupSlug: "optimun-gato",
    displayName: "Optimun — Gato",
    variantSlugs: ["optimun-kitten-x1", "optimun-gato-x3"],
  },
  {
    groupSlug: "optimun-gato-castrado",
    displayName: "Optimun — Castrado",
    variantSlugs: ["optimun-castrado-x3"],
  },
  {
    groupSlug: "eukanuba-gato",
    displayName: "Eukanuba — Gato",
    variantSlugs: ["eukanuba-gato-x1-5", "eukanuba-gato-x3"],
  },
  {
    groupSlug: "eukanuba-kitten",
    displayName: "Eukanuba — Kitten",
    variantSlugs: ["eukanuba-kitten-x1-5", "eukanuba-kitten-x3"],
  },
  {
    groupSlug: "whiskas-gato",
    displayName: "Whiskas — Gato",
    variantSlugs: ["whiskas-gato-x10"],
  },
  {
    groupSlug: "company-gato",
    displayName: "Company — Gato",
    variantSlugs: ["company-gato-x3"],
  },
  {
    groupSlug: "company-kitten",
    displayName: "Company — Kitten",
    variantSlugs: ["company-kitten-x3"],
  },
  {
    groupSlug: "livra-gato",
    displayName: "Livra — Gato",
    variantSlugs: ["livra-gato-x3"],
  },
  {
    groupSlug: "royal-canin-baby-cat",
    displayName: "Royal Canin — Baby cat",
    variantSlugs: ["royal-canin-baby-cat-x1-5"],
  },
  {
    groupSlug: "royal-canin-kitten",
    displayName: "Royal Canin — Kitten",
    variantSlugs: ["royal-canin-kitten-x1-5"],
  },
  {
    groupSlug: "royal-canin-indoor",
    displayName: "Royal Canin — Indoor",
    variantSlugs: ["royal-canin-indoor-x1-5", "royal-canin-indoor-7-x1-5"],
  },
  {
    groupSlug: "royal-canin-active-gato",
    displayName: "Royal Canin — Active gato",
    variantSlugs: ["royal-canin-active-gato-x1-5"],
  },
  {
    groupSlug: "royal-canin-fit-32",
    displayName: "Royal Canin — Fit 32",
    variantSlugs: ["royal-canin-fit-32-x1-5"],
  },
  {
    groupSlug: "excellent-gato",
    displayName: "Excellent — Gato",
    variantSlugs: ["excellent-gato-x1", "excellent-gato-x3", "excellent-gato-x7-5"],
  },
  {
    groupSlug: "excellent-steriliced",
    displayName: "Excellent — Steriliced",
    variantSlugs: ["excellent-steriliced-x1", "excellent-steriliced-x7-5"],
  },
  {
    groupSlug: "excellent-kitten",
    displayName: "Excellent — Kitten",
    variantSlugs: ["excellent-kitten-x1", "excellent-kitten-x7-5"],
  },
  {
    groupSlug: "capitan-gato",
    displayName: "Capitan — Gato",
    variantSlugs: ["capitan-gato-x10"],
  },
  {
    groupSlug: "amici-gato",
    displayName: "Amici — Gato",
    variantSlugs: ["amici-gato-x10"],
  },
  {
    groupSlug: "zimpi-gato",
    displayName: "Zimpi — Gato",
    variantSlugs: ["zimpi-gato-x10"],
  },
  {
    groupSlug: "ganacat-gato",
    displayName: "Ganacat — Gato",
    variantSlugs: ["ganacat-gato-x10"],
  },
  {
    groupSlug: "has-gato",
    displayName: "HAS — Gato",
    variantSlugs: ["has-gato-x10"],
  },
  {
    groupSlug: "maxxium-lata-gato",
    displayName: "Maxxium — Lata gato",
    variantSlugs: ["maxxium-lata-gato-grande", "maxxium-lata-gato-chica"],
  },
  {
    groupSlug: "whiskas-snacks",
    displayName: "Whiskas — Snacks",
    variantSlugs: ["whiskas-snack-chico-40gr", "whiskas-snack-grande-80gr"],
  },
  {
    groupSlug: "sieger-gato-urinary",
    displayName: "Sieger — Urinary gato",
    variantSlugs: ["sieger-urinary-x1"],
  },
  {
    groupSlug: "agility-gato-urinary",
    displayName: "Agility — Urinary gato",
    variantSlugs: ["agility-urinary-x1-5", "agility-urinary-x10"],
  },
  {
    groupSlug: "old-prince-gato-urinary",
    displayName: "Old Prince — Urinary gato",
    variantSlugs: ["old-prince-gato-urinary-x3"],
  },
  {
    groupSlug: "royal-canin-urinary-gato",
    displayName: "Royal Canin — Urinary gato",
    variantSlugs: ["royal-canin-urinary-gato-x1-5"],
  },
  {
    groupSlug: "royal-canin-hepatic-gato",
    displayName: "Royal Canin — Hepatic gato",
    variantSlugs: ["royal-canin-hepatic-gato-x2"],
  },
  {
    groupSlug: "royal-canin-renal-gato",
    displayName: "Royal Canin — Renal gato",
    variantSlugs: ["royal-canin-renal-gato-x2"],
  },
  {
    groupSlug: "royal-canin-gastro-gato",
    displayName: "Royal Canin — Gastro gato",
    variantSlugs: ["royal-canin-gastro-gato-x2"],
  },
  {
    groupSlug: "excellent-urinary",
    displayName: "Excellent — Urinary",
    variantSlugs: ["excellent-urinary-x1", "excellent-urinary-x7-5"],
  },
  {
    groupSlug: "collar-simple",
    displayName: "Collares — Collar simple",
    variantSlugs: [
      "collares-collar-simple-talle-12",
      "collares-collar-simple-talle-10",
      "collares-collar-simple-talle-8",
      "collares-collar-simple-talle-6",
      "collares-collar-simple-talle-4",
      "collares-collar-simple-talle-3",
      "collares-collar-simple-talle-2",
      "collares-collar-simple-talle-1",
    ],
  },
  {
    groupSlug: "collar-doble",
    displayName: "Collares — Collar doble",
    variantSlugs: [
      "collares-collar-doble-talle-5",
      "collares-collar-doble-talle-4",
      "collares-collar-doble-talle-3",
      "collares-collar-doble-talle-2",
      "collares-collar-doble-talle-1",
      "collares-collar-doble-talle-0",
    ],
  },
  {
    groupSlug: "collar-nato",
    displayName: "Collares — Collar NATO",
    variantSlugs: [
      "collares-collar-nato-talle-30-mm",
      "collares-collar-nato-talle-40-mm",
      "collares-collar-nato-talle-60-mm",
      "collares-nato-con-broche-talle",
    ],
  },
  {
    groupSlug: "correa-sola",
    displayName: "Collares — Correa sola",
    variantSlugs: [
      "collares-correa-sola-talle-chica",
      "collares-correa-sola-talle-mediana",
      "collares-correa-sola-talle-grande",
    ],
  },
  {
    groupSlug: "bozal-rejilla",
    displayName: "Accesorios — Bozal rejilla",
    variantSlugs: [
      "accesorios-bozal-rejilla-talle-1",
      "accesorios-bozal-rejilla-talle-2",
      "accesorios-bozal-rejilla-talle-3",
      "accesorios-bozal-rejilla-talle-4",
      "accesorios-bozal-rejilla-talle-5",
      "accesorios-bozal-rejilla-talle-6",
      "accesorios-bozal-rejilla-talle-7",
    ],
  },
  {
    groupSlug: "bozal-nylon",
    displayName: "Accesorios — Bozal nylon",
    variantSlugs: ["accesorios-bozal-nylon"],
  },
  {
    groupSlug: "bozal-silicona",
    displayName: "Accesorios — Bozal silicona",
    variantSlugs: ["accesorios-bozal-silicona"],
  },
  {
    groupSlug: "bozal-cuero",
    displayName: "Accesorios — Bozal cuero",
    variantSlugs: ["accesorios-bozal-cuero"],
  },
  {
    groupSlug: "viruta",
    displayName: "Accesorios — Viruta",
    variantSlugs: ["accesorios-viruta"],
  },
  {
    groupSlug: "litera",
    displayName: "Accesorios — Litera",
    variantSlugs: ["accesorios-litera-chica", "accesorios-litera-mediana", "accesorios-litera-grande"],
  },
  {
    groupSlug: "kit-litera",
    displayName: "Accesorios — Kit litera",
    variantSlugs: ["accesorios-kit-litera"],
  },
  {
    groupSlug: "bombacha-higienica-negra",
    displayName: "Accesorios — Bombacha higiénica negra",
    variantSlugs: ["accesorios-bombacha-higienica-negra"],
  },
  {
    groupSlug: "bombacha-con-puntilla",
    displayName: "Accesorios — Bombacha con puntilla",
    variantSlugs: ["accesorios-bombacha-con-puntilla"],
  },
  {
    groupSlug: "polar-perro-talles1-12",
    displayName: "Ropa — Polar perro talles 1-12",
    variantSlugs: ["ropa-polar-perro-talles-1-12-desde-6-000-a-15-700-segun-talle"],
  },
  {
    groupSlug: "plush-con-corderito",
    displayName: "Ropa — Plush con corderito",
    variantSlugs: ["ropa-plush-con-corderito-talles-25-85-desde-13-500-a-43-900"],
  },
  {
    groupSlug: "soft-plus",
    displayName: "Ropa — Soft Plus",
    variantSlugs: ["ropa-soft-plus-talles-0-6-desde-13-000-a-20-000"],
  },
  {
    groupSlug: "matelase",
    displayName: "Ropa — Matelase",
    variantSlugs: ["ropa-matelase-talles-2-10-desde-14-000-a-39-000"],
  },
];

const groupBySlug = new Map(PRODUCT_GROUPS.map((g) => [g.groupSlug, g] as const));

const variantSlugToGroupSlug = new Map<string, string>();
for (const g of PRODUCT_GROUPS) {
  for (const slug of g.variantSlugs) {
    variantSlugToGroupSlug.set(slug, g.groupSlug);
  }
}

export function getProductGroupDefinition(groupSlug: string) {
  return groupBySlug.get(groupSlug);
}

/** Si el slug de un producto pertenece a un grupo, devuelve el `groupSlug` de la ficha agrupada. */
export function getGroupSlugForVariantSlug(productSlug: string) {
  return variantSlugToGroupSlug.get(productSlug);
}

export function isGroupedVariantSlug(productSlug: string) {
  return variantSlugToGroupSlug.has(productSlug);
}

export function listGroupSlugs() {
  return PRODUCT_GROUPS.map((g) => g.groupSlug);
}

export function allVariantSlugsInGroups(): Set<string> {
  return new Set(variantSlugToGroupSlug.keys());
}
