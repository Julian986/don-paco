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
