import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { getSiteSettings, writeSiteSettings } from "@/lib/site-settings";
import type { SiteSettings } from "@/types/site-settings";

function parseBody(body: unknown): SiteSettings | { error: string } {
  if (!body || typeof body !== "object") return { error: "Cuerpo inválido" };
  const o = body as Record<string, unknown>;
  const storeName = typeof o.storeName === "string" ? o.storeName.trim() : "";
  const address = typeof o.address === "string" ? o.address.trim() : "";
  const cashDiscountLabel = typeof o.cashDiscountLabel === "string" ? o.cashDiscountLabel.trim() : "";
  const bannerTitle = typeof o.bannerTitle === "string" ? o.bannerTitle.trim() : "";
  const bannerSubtitle = typeof o.bannerSubtitle === "string" ? o.bannerSubtitle.trim() : "";
  const bannerLead = typeof o.bannerLead === "string" ? o.bannerLead.trim() : "";
  if (!storeName || !address) return { error: "Nombre y dirección son obligatorios" };
  return {
    storeName,
    address,
    cashDiscountLabel,
    bannerTitle: bannerTitle || storeName,
    bannerSubtitle,
    bannerLead,
  };
}

export async function GET() {
  return NextResponse.json(getSiteSettings());
}

export async function PUT(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const next = parseBody(raw);
  if ("error" in next) {
    return NextResponse.json({ error: next.error }, { status: 400 });
  }
  writeSiteSettings(next);
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
