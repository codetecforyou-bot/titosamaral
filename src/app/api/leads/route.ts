import { NextResponse, after } from "next/server";
import { getFlow } from "@/config/form";
import { leadPayloadSchema, resolveAnswers } from "@/lib/lead-schema";
import { createLead, StorageNotConfiguredError } from "@/lib/leads/repository";
import { notifyNewLead } from "@/lib/leads/notify";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BODY = 16_000;

export async function POST(req: Request) {
  // Só aceita envios vindos do próprio site.
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ error: "Origem não permitida." }, { status: 403 });
  }

  if (!rateLimit(`lead:${clientIp(req.headers)}`, 5, 10 * 60_000)) {
    return NextResponse.json({ error: "Muitos envios em pouco tempo. Tente novamente em alguns minutos." }, { status: 429 });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY) return NextResponse.json({ error: "Envio muito grande." }, { status: 413 });

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Formato inválido." }, { status: 400 });
  }

  const parsed = leadPayloadSchema.safeParse(json);
  if (!parsed.success) {
    // Campo isca preenchido: responde como sucesso, mas não grava nada.
    if (parsed.error.issues.some((i) => i.path[0] === "website")) return NextResponse.json({ ok: true });
    return NextResponse.json(
      { error: "Revise os dados informados.", fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const resolved = resolveAnswers(data.answers);
  if (!resolved) return NextResponse.json({ error: "Respostas do formulário inválidas." }, { status: 400 });

  try {
    const lead = await createLead({
      area_slug: resolved.areaSlug,
      area_name: getFlow(resolved.areaSlug).areaName,
      answers: resolved.answers,
      name: data.name,
      phone: data.phone,
      email: data.email,
      message: data.message || null,
      consent_at: new Date().toISOString(),
      source_page: data.sourcePage ?? null,
    });
    after(() => notifyNewLead(lead));
    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (err) {
    if (err instanceof StorageNotConfiguredError) {
      console.error("[leads] Armazenamento não configurado. Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.");
      return NextResponse.json(
        { error: "Não foi possível registrar o contato agora. Fale conosco pelo WhatsApp." },
        { status: 503 },
      );
    }
    console.error("[leads] Erro ao gravar contato:", err);
    return NextResponse.json({ error: "Não foi possível registrar o contato agora. Fale conosco pelo WhatsApp." }, { status: 500 });
  }
}
