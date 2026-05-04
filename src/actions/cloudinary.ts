"use server";

import { Readable } from "node:stream";
import { v2 as cloudinary } from "cloudinary";

import { auth } from "@/auth";

function trimEnv(v: string | undefined): string | undefined {
  if (v == null) return undefined;
  const t = v.trim();
  return t.length ? t : undefined;
}

function ensureConfigured() {
  const raw = trimEnv(process.env.CLOUDINARY_CLOUD_NAME);
  /** Cloudinary usa cloud names en minúsculas; mezclar mayúsculas rompe la firma. */
  const cloud_name = raw?.toLowerCase();
  const api_key = trimEnv(process.env.CLOUDINARY_API_KEY);
  const api_secret = trimEnv(process.env.CLOUDINARY_API_SECRET);
  if (!cloud_name || !api_key || !api_secret) {
    throw new Error("CLOUDINARY_NOT_CONFIGURED");
  }
  cloudinary.config({ cloud_name, api_key, api_secret });
}

type CloudinaryApiError = {
  message?: string;
  http_code?: number;
  name?: string;
};

function extractCloudinaryMessage(err: unknown): string {
  if (err && typeof err === "object" && "message" in err) {
    return String((err as CloudinaryApiError).message ?? "");
  }
  if (err instanceof Error) return err.message;
  return String(err);
}

function userFacingUploadError(err: unknown, dev: boolean): string {
  const raw = extractCloudinaryMessage(err);
  const lower = raw.toLowerCase();
  console.error("[uploadProductImage] Cloudinary:", raw, err);

  if (lower.includes("invalid cloud_name")) {
    return dev
      ? `${raw}. Abrí cloudinary.com/console → arriba a la derecha «Account details» (o el menú del entorno) y copiá «Cloud name», «API Key» y «API Secret» del mismo bloque. No es el nombre de tu negocio ni una carpeta; si no coincide con lo que ves en el panel, creaste otra cuenta o otro entorno.`
      : "CLOUDINARY_CLOUD_NAME no coincide con tu cuenta Cloudinary: copiá los tres valores del mismo bloque en la consola.";
  }
  if (
    lower.includes("401") ||
    lower.includes("403") ||
    (lower.includes("invalid") && (lower.includes("key") || lower.includes("signature") || lower.includes("credentials")))
  ) {
    return dev
      ? `Cloudinary rechazó la petición (${raw}). Revisá CLOUDINARY_CLOUD_NAME, API_KEY y API_SECRET.`
      : "Credenciales de Cloudinary inválidas. Revisá CLOUDINARY_* en .env.local (sin comillas y sin espacios al final).";
  }
  if (lower.includes("timeout") || (err as CloudinaryApiError)?.http_code === 499) {
    return dev ? `Timeout: ${raw}` : "La subida tardó demasiado. Probá con una imagen más chica o revisá la red.";
  }
  if (lower.includes("file size") || lower.includes("too large") || lower.includes("max")) {
    return dev ? raw : "El archivo supera el límite permitido por Cloudinary.";
  }
  if (dev && raw) return `No se pudo subir: ${raw}`;
  return "No se pudo subir la imagen a Cloudinary.";
}

function uploadBufferStream(
  buffer: Buffer,
  options: { folder: string; resource_type: "image" },
): Promise<{ secure_url: string }> {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      options,
      (error: unknown, result: { secure_url?: string } | undefined) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result?.secure_url) {
          reject(new Error("Respuesta de Cloudinary sin secure_url"));
          return;
        }
        resolve({ secure_url: result.secure_url });
      },
    );
    upload.on("error", reject);
    Readable.from(buffer).pipe(upload);
  });
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

  const dev = process.env.NODE_ENV === "development";

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const res = await uploadBufferStream(buffer, {
      folder: "don-paco/products",
      resource_type: "image",
    });
    return { url: res.secure_url };
  } catch (err: unknown) {
    return { error: userFacingUploadError(err, dev) };
  }
}
