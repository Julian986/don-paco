import { SignJWT, jwtVerify } from "jose";

function getSecret() {
  const s = process.env.ADMIN_JWT_SECRET || process.env.ADMIN_PASSWORD;
  if (!s) {
    throw new Error("Definí ADMIN_JWT_SECRET o ADMIN_PASSWORD en el entorno.");
  }
  return new TextEncoder().encode(s);
}

export async function createAdminSessionToken() {
  return new SignJWT({ sub: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getSecret());
}

export async function verifyAdminSessionToken(token: string) {
  await jwtVerify(token, getSecret());
}
