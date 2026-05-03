import { NextResponse } from "next/server";

import { createAdminSessionToken } from "@/lib/admin-jwt";
import { verifyAdminPassword } from "@/lib/admin-password";

export async function POST(req: Request) {
  let body: { password?: string };
  try {
    body = (await req.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const password = body.password?.trim() ?? "";
  if (!password) {
    return NextResponse.json({ error: "Ingresá la contraseña" }, { status: 400 });
  }

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }

  const token = await createAdminSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set("dp_admin", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
