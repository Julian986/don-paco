export { auth as middleware } from "@/auth";

/** Incluye `/admin` solo y todo lo bajo `/admin/…` (antes `/admin/:path*` podía no matchear bien según versión). */
export const config = {
  matcher: ["/admin", "/admin/:path*", "/login", "/login/:path*"],
};
