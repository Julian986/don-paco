/**
 * Convierte un título legible en un fragmento de URL (kebab-case, sin tildes).
 * Para generar slugs en servidor sin input manual del operador del panel.
 */
export function slugifyLabel(input: string): string {
  const s = input
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s.length > 0 ? s.slice(0, 180) : "grupo";
}
