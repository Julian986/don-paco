import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 5 * 1024 * 1024;

export async function POST(req: Request) {
  const ct = req.headers.get("content-type") || "";
  if (!ct.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Usá multipart/form-data" }, { status: 400 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Falta el archivo (campo file)" }, { status: 400 });
  }

  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Solo se permiten imágenes JPG, PNG, WebP o GIF" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "El archivo supera los 5 MB" }, { status: 400 });
  }

  const ext =
    file.type === "image/jpeg"
      ? ".jpg"
      : file.type === "image/png"
        ? ".png"
        : file.type === "image/webp"
          ? ".webp"
          : ".gif";

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  const name = `${randomUUID()}${ext}`;
  const diskPath = path.join(uploadsDir, name);

  await writeFile(diskPath, Buffer.from(await file.arrayBuffer()));

  const publicPath = `/uploads/${name}`;
  return NextResponse.json({ path: publicPath });
}
