import { Prisma } from "@prisma/client";

/** Cliente Prisma generado antes de `heroImageUrl` en el schema. */
export function isUnknownHeroImageUrlError(e: unknown): boolean {
  return (
    e instanceof Prisma.PrismaClientValidationError &&
    (String(e.message).includes("heroImageUrl") || String(e.message).includes("Unknown argument"))
  );
}
