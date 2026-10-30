import "server-only";
import { scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "./session";

/** Confere e-mail e senha com ADMIN_EMAIL e ADMIN_PASSWORD_HASH (scrypt). */
export function checkCredentials(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const stored = process.env.ADMIN_PASSWORD_HASH;
  if (!expectedEmail || !stored) return false;
  const [scheme, salt, hashHex] = stored.split(":");
  if (scheme !== "scrypt" || !salt || !hashHex) return false;

  const expected = Buffer.from(hashHex, "hex");
  const actual = scryptSync(password, salt, expected.length);
  const passwordOk = timingSafeEqual(actual, expected);
  const emailOk = email.trim().toLowerCase() === expectedEmail;
  return passwordOk && emailOk;
}

/** Usado em todas as páginas e ações do painel (além do middleware). */
export async function requireAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  if (!session) redirect("/admin/login");
  return session;
}
