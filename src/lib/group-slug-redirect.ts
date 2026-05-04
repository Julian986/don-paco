import "server-only";

import { prisma } from "@/lib/prisma";

/** Sigue la cadena de redirecciones (slug antiguo → actual). */
export async function resolveGroupSlugRedirect(fromSlug: string): Promise<string> {
  if (!process.env.DATABASE_URL?.trim()) return fromSlug;
  let current = fromSlug;
  for (let i = 0; i < 12; i++) {
    try {
      const r = await prisma.groupSlugRedirect.findUnique({ where: { fromSlug: current } });
      if (!r) return current;
      current = r.toSlug;
    } catch {
      return fromSlug;
    }
  }
  return current;
}
