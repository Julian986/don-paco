/**
 * Tras login, solo permitimos ir a rutas internas bajo `/admin` (evita open-redirect).
 * `candidate` puede ser path relativo o URL absoluta del mismo origen.
 */
export function safeAdminRedirectAfterLogin(
  candidate: string | null | undefined,
  origin: string,
  fallback = "/admin/dashboard",
): string {
  if (!candidate?.trim()) return fallback;
  const t = candidate.trim();
  if (t.startsWith("/")) {
    if (t.startsWith("/admin")) return t;
    return fallback;
  }
  try {
    const u = new URL(t, origin);
    if (u.origin !== origin) return fallback;
    const p = `${u.pathname}${u.search}`;
    if (!p.startsWith("/admin")) return fallback;
    return p;
  } catch {
    return fallback;
  }
}
