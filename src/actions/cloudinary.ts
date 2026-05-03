"use server";

import { v2 as cloudinary } from "cloudinary";

import { auth } from "@/auth";

function ensureConfigured() {
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud_name || !api_key || !api_secret) {
    throw new Error("CLOUDINARY_NOT_CONFIGURED");
  }
  cloudinary.config({ cloud_name, api_key, api_secret });
}

export async function uploadProductImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  const session = await auth();
  if (!session?.user) return { error: "No autorizado" };

  try {
    ensureConfigured();
  } catch {
    return { error: "Cloudinary no está configurado (CLOUDINARY_* en .env)." };
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File) || file.size === 0) {
    return { error: "Archivo inválido" };
  }

  const max = 5 * 1024 * 1024;
  if (file.size > max) return { error: "El archivo supera los 5 MB" };

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowed.includes(file.type)) {
    return { error: "Formato no permitido (JPG, PNG, WebP, GIF)" };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const b64 = `data:${file.type};base64,${buffer.toString("base64")}`;
    const res = await cloudinary.uploader.upload(b64, {
      folder: "don-paco/products",
      resource_type: "image",
    });
    return { url: res.secure_url };
  } catch {
    return { error: "No se pudo subir la imagen a Cloudinary" };
  }
}
