import "server-only";

import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const CREDS_PATH = path.join(process.cwd(), "data", "admin-password.json");

type StoredCreds = {
  salt: string;
  hash: string;
};

function readStored(): StoredCreds | null {
  try {
    return JSON.parse(fs.readFileSync(CREDS_PATH, "utf8")) as StoredCreds;
  } catch {
    return null;
  }
}

export function verifyAdminPassword(plain: string): boolean {
  const stored = readStored();
  if (!stored) {
    const env = process.env.ADMIN_PASSWORD;
    if (!env) return false;
    return plain === env;
  }
  const salt = Buffer.from(stored.salt, "hex");
  const expected = Buffer.from(stored.hash, "hex");
  const actual = scryptSync(plain, salt, 64);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function setAdminPassword(plain: string) {
  const salt = randomBytes(16);
  const hash = scryptSync(plain, salt, 64);
  const payload: StoredCreds = {
    salt: salt.toString("hex"),
    hash: hash.toString("hex"),
  };
  fs.mkdirSync(path.dirname(CREDS_PATH), { recursive: true });
  fs.writeFileSync(CREDS_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}
