import "server-only";
import { site } from "@/config/site";
import type { Lead } from "./types";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Envia o aviso por e-mail via Resend, se configurado. */
async function sendEmail(lead: Lead) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_NOTIFY_EMAIL;
  if (!key || !to) return "skipped";

  const rows = lead.answers
    .map((a) => `<tr><td style="padding:6px 12px;color:#666">${escape(a.question)}</td><td style="padding:6px 12px"><b>${escape(a.answer)}</b></td></tr>`)
    .join("");
  const html = `
    <div style="font-family:Arial,sans-serif;color:#111;max-width:640px">
      <h2 style="color:#281310">Novo contato pelo site: ${escape(lead.area_name)}</h2>
      <p><b>${escape(lead.name)}</b><br>WhatsApp: ${escape(lead.phone)}<br>E-mail: ${escape(lead.email)}</p>
      <table style="border-collapse:collapse;background:#F4F3F1;width:100%">${rows}</table>
      ${lead.message ? `<p style="margin-top:16px"><b>Mensagem:</b><br>${escape(lead.message).replace(/\n/g, "<br>")}</p>` : ""}
      <p style="margin-top:24px"><a href="${site.url}/admin/leads/${lead.id}" style="color:#8a6a2e">Abrir no painel</a> ·
      <a href="https://wa.me/55${lead.phone}" style="color:#8a6a2e">Responder no WhatsApp</a></p>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEADS_FROM_EMAIL || `Site ${site.shortName} <onboarding@resend.dev>`,
      to: to.split(",").map((s) => s.trim()),
      reply_to: lead.email,
      subject: `Novo contato: ${lead.area_name} · ${lead.name}`,
      html,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return "sent";
}

/** Envia o contato para um CRM ou automação (RD Station, n8n, Zapier, Make...). */
async function sendWebhook(lead: Lead) {
  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) return "skipped";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.LEADS_WEBHOOK_SECRET ? { "X-Webhook-Secret": process.env.LEADS_WEBHOOK_SECRET } : {}),
    },
    body: JSON.stringify({ event: "lead.created", lead }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Webhook ${res.status}`);
  return "sent";
}

/** Dispara as integrações sem bloquear o envio do formulário em caso de falha. */
export async function notifyNewLead(lead: Lead) {
  const results = await Promise.allSettled([sendEmail(lead), sendWebhook(lead)]);
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[leads] Falha na integração ${i === 0 ? "e-mail" : "webhook"}:`, r.reason);
  });
}
