import { jwtVerify } from "jose";
import { type NextRequest, NextResponse } from "next/server";

function getSecretBytes() {
  const s = process.env.ADMIN_JWT_SECRET || process.env.ADMIN_PASSWORD;
  if (!s) return null;
  return new TextEncoder().encode(s);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAdminApi = pathname.startsWith("/api/admin");
  const isAdminPage = pathname.startsWith("/admin");

  if (!isAdminApi && !isAdminPage) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin/login") || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const secret = getSecretBytes();
  if (!secret) {
    if (isAdminApi) {
      return NextResponse.json(
        { error: "El servidor no tiene configurada la contraseña o ADMIN_JWT_SECRET." },
        { status: 503 },
      );
    }
    return NextResponse.redirect(new URL("/admin/login?err=config", req.url));
  }

  const token = req.cookies.get("dp_admin")?.value;
  if (!token) {
    if (isAdminApi) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    if (isAdminApi) {
      return NextResponse.json({ error: "Sesión inválida" }, { status: 401 });
    }
    const res = NextResponse.redirect(new URL("/admin/login", req.url));
    res.cookies.delete("dp_admin");
    return res;
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
