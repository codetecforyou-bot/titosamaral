import { SignJWT, jwtVerify } from "jose";

/** Funções de sessão compatíveis com o middleware (Edge) e com o servidor. */

export const SESSION_COOKIE = "tsa_admin";
export const SESSION_HOURS = 8;

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) return null;
  return new TextEncoder().encode(s);
}

export function authConfigured() {
  return Boolean(secret() && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD_HASH);
}

export async function createSessionToken(email: string) {
  const key = secret();
  if (!key) throw new Error("AUTH_SECRET ausente ou curto demais.");
  return new SignJWT({ sub: email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_HOURS}h`)
    .sign(key);
}

export async function verifySessionToken(token: string | undefined) {
  const key = secret();
  if (!token || !key) return null;
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
    if (payload.role !== "admin" || payload.sub !== process.env.ADMIN_EMAIL) return null;
    return { email: payload.sub as string };
  } catch {
    return null;
  }
}
