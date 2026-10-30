"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkCredentials, requireAdmin } from "@/lib/auth/server";
import { authConfigured, createSessionToken, SESSION_COOKIE, SESSION_HOURS } from "@/lib/auth/session";
import { updateLead } from "@/lib/leads/repository";
import { isLeadStatus } from "@/lib/leads/types";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export type LoginState = { error?: string; email?: string };

export async function loginAction(_prev: LoginState, form: FormData): Promise<LoginState> {
  if (!authConfigured()) return { error: "O acesso ao painel ainda não foi configurado no servidor." };

  const ip = clientIp(await headers());
  if (!rateLimit(`login:${ip}`, 8, 15 * 60_000)) {
    return { error: "Muitas tentativas. Aguarde 15 minutos e tente novamente.", email: String(form.get("email") ?? "") };
  }

  const email = String(form.get("email") ?? "");
  const password = String(form.get("password") ?? "");
  if (!checkCredentials(email, password)) return { error: "E-mail ou senha incorretos.", email };

  const token = await createSessionToken(process.env.ADMIN_EMAIL!);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_HOURS * 3600,
  });
  redirect("/admin");
}

export async function logoutAction() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export type UpdateState = { ok?: boolean; error?: string };

export async function updateLeadAction(_prev: UpdateState, form: FormData): Promise<UpdateState> {
  await requireAdmin();
  const id = String(form.get("id") ?? "");
  const status = form.get("status");
  const notes = String(form.get("notes") ?? "").slice(0, 4000);
  if (!/^[0-9a-f-]{36}$/i.test(id) || !isLeadStatus(status)) return { error: "Dados inválidos." };
  try {
    await updateLead(id, { status, notes: notes || null });
    revalidatePath("/admin");
    revalidatePath(`/admin/leads/${id}`);
    return { ok: true };
  } catch (err) {
    console.error("[admin] Falha ao atualizar contato:", err);
    return { error: "Não foi possível salvar. Tente novamente." };
  }
}
