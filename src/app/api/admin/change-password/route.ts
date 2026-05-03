import { NextResponse } from "next/server";

import { setAdminPassword, verifyAdminPassword } from "@/lib/admin-password";

export async function POST(req: Request) {
  let body: { current?: string; next?: string };
  try {
    body = (await req.json()) as { current?: string; next?: string };
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const current = body.current?.trim() ?? "";
  const next = body.next?.trim() ?? "";

  if (!current || !next) {
    return NextResponse.json({ error: "Completá contraseña actual y nueva" }, { status: 400 });
  }
  if (next.length < 6) {
    return NextResponse.json({ error: "La nueva contraseña debe tener al menos 6 caracteres" }, { status: 400 });
  }

  if (!verifyAdminPassword(current)) {
    return NextResponse.json({ error: "La contraseña actual no es correcta" }, { status: 401 });
  }

  setAdminPassword(next);
  return NextResponse.json({ ok: true });
}
