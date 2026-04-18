export const CATEGORY_IDS = [
  "mascota-perro-alimento-seco",
  "mascota-perro-alimento-humedo",
  "mascota-perro-alimento-snacks",
  "mascota-perro-alimento-dietas",
  "mascota-perro-farmacia",
  "mascota-perro-pulgas-garrapatas",
  "mascota-gato-alimento-seco",
  "mascota-gato-alimento-humedo",
  "mascota-gato-alimento-snacks",
  "mascota-gato-alimento-dietas",
  "mascota-gato-piedras-arenas",
  "mascota-gato-farmacia",
  "mascota-gato-pulgas-garrapatas",
  "mascota-peces-alimentos-productos",
  "general-accesorios-collares-correas",
  "general-accesorios-bozales",
  "general-accesorios-literas",
  "general-accesorios-bombachas",
  "general-accesorios-comederos",
  "general-accesorios-juguetes",
  "general-higiene-shampoo",
  "general-higiene-perfumes",
  "general-ropa",
] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

export type NavNode =
  | { kind: "branch"; label: string; children: readonly NavNode[] }
  | { kind: "leaf"; id: CategoryId; label: string };

/**
 * Por mascota (perro/gato/peces) + categorías generales.
 * Farmacia en perros y en gatos (mismo criterio que comentamos).
 */
export const navRoot: readonly NavNode[] = [
  {
    kind: "branch",
    label: "Por mascota",
    children: [
      {
        kind: "branch",
        label: "Perros",
        children: [
          {
            kind: "branch",
            label: "Alimentos",
            children: [
              { kind: "leaf", id: "mascota-perro-alimento-seco", label: "Seco" },
              { kind: "leaf", id: "mascota-perro-alimento-humedo", label: "Húmedo" },
              { kind: "leaf", id: "mascota-perro-alimento-snacks", label: "Snacks y premios" },
              { kind: "leaf", id: "mascota-perro-alimento-dietas", label: "Dietas veterinarias" },
            ],
          },
          { kind: "leaf", id: "mascota-perro-farmacia", label: "Farmacia" },
          { kind: "leaf", id: "mascota-perro-pulgas-garrapatas", label: "Pulgas y garrapatas" },
        ],
      },
      {
        kind: "branch",
        label: "Gatos",
        children: [
          {
            kind: "branch",
            label: "Alimentos",
            children: [
              { kind: "leaf", id: "mascota-gato-alimento-seco", label: "Seco" },
              { kind: "leaf", id: "mascota-gato-alimento-humedo", label: "Húmedo" },
              { kind: "leaf", id: "mascota-gato-alimento-snacks", label: "Snacks y premios" },
              { kind: "leaf", id: "mascota-gato-alimento-dietas", label: "Dietas veterinarias" },
            ],
          },
          { kind: "leaf", id: "mascota-gato-piedras-arenas", label: "Piedras / arenas" },
          { kind: "leaf", id: "mascota-gato-farmacia", label: "Farmacia" },
          { kind: "leaf", id: "mascota-gato-pulgas-garrapatas", label: "Pulgas y garrapatas" },
        ],
      },
      {
        kind: "branch",
        label: "Peces",
        children: [
          { kind: "leaf", id: "mascota-peces-alimentos-productos", label: "Alimentos / productos" },
        ],
      },
    ],
  },
  {
    kind: "branch",
    label: "Categorías generales",
    children: [
      {
        kind: "branch",
        label: "Accesorios",
        children: [
          { kind: "leaf", id: "general-accesorios-collares-correas", label: "Collares y correas" },
          { kind: "leaf", id: "general-accesorios-bozales", label: "Bozales" },
          { kind: "leaf", id: "general-accesorios-literas", label: "Literas" },
          { kind: "leaf", id: "general-accesorios-bombachas", label: "Bombachas higiénicas" },
          { kind: "leaf", id: "general-accesorios-comederos", label: "Comederos / bebederos" },
          { kind: "leaf", id: "general-accesorios-juguetes", label: "Juguetes" },
        ],
      },
      {
        kind: "branch",
        label: "Higiene",
        children: [
          { kind: "leaf", id: "general-higiene-shampoo", label: "Shampoo" },
          { kind: "leaf", id: "general-higiene-perfumes", label: "Perfumes" },
        ],
      },
      { kind: "leaf", id: "general-ropa", label: "Ropa" },
    ],
  },
] as const;

function walkLeaves(
  nodes: readonly NavNode[],
  parts: string[],
  out: { id: CategoryId; label: string }[],
) {
  for (const node of nodes) {
    if (node.kind === "leaf") {
      out.push({ id: node.id, label: [...parts, node.label].join(" · ") });
    } else {
      walkLeaves(node.children, [...parts, node.label], out);
    }
  }
}

const leafList: { id: CategoryId; label: string }[] = [];
walkLeaves(navRoot, [], leafList);

export function categoryBadgeLabel(id: CategoryId): string {
  const hit = leafList.find((item) => item.id === id);
  return hit?.label ?? id;
}

/** Para el listado "Todas": indica mascota (o general) sin depender del nombre del producto. */
export function petAudienceShortLabel(id: CategoryId): string {
  if (id.startsWith("mascota-perro-")) return "Perro";
  if (id.startsWith("mascota-gato-")) return "Gato";
  if (id.startsWith("mascota-peces-")) return "Pez";
  if (id.startsWith("general-")) return "General";
  return "Producto";
}

export const allLeafCategoryIds: CategoryId[] = leafList.map((item) => item.id);

export function isCategoryId(value: string): value is CategoryId {
  return (allLeafCategoryIds as string[]).includes(value);
}

export const flatCategoryButtons: { id: CategoryId | "Todas"; label: string }[] = [
  { id: "Todas", label: "Todas" },
  ...leafList.map((item) => ({ id: item.id, label: item.label })),
];

/** Menú superior: dos bloques con enlaces planos a `?categoria=`. */
export const shopMenuGroups: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Por mascota",
    links: leafList
      .filter((item) => String(item.id).startsWith("mascota-"))
      .map((item) => ({ label: item.label, href: `/?categoria=${item.id}` })),
  },
  {
    title: "Categorías generales",
    links: leafList
      .filter((item) => String(item.id).startsWith("general-"))
      .map((item) => ({ label: item.label, href: `/?categoria=${item.id}` })),
  },
];
