import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";
import { requireAdmin } from "@/lib/auth/server";
import { getLead } from "@/lib/leads/repository";
import { WhatsAppIcon } from "@/components/ui/icons";
import { AdminShell } from "../../AdminShell";
import { StatusBadge, formatDate } from "../../ui";
import { StatusForm } from "./StatusForm";

export const metadata: Metadata = { title: "Contato" };
export const dynamic = "force-dynamic";

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const lead = await getLead(id);
  if (!lead) notFound();

  const phoneDisplay = lead.phone.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");

  return (
    <AdminShell email={session.email} active="leads">
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-gold-deep">
        <ArrowLeft className="size-4" aria-hidden="true" /> Voltar para a lista
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-dark">{lead.area_name}</p>
          <h1 className="mt-2 text-5xl text-brown">{lead.name}</h1>
          <p className="mt-2 text-sm text-muted-dark">Recebido em {formatDate(lead.created_at)}</p>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <section className="border border-sand bg-white p-7">
            <h2 className="text-3xl text-brown">Respostas do formulário</h2>
            <dl className="mt-5 divide-y divide-sand">
              {lead.answers.map((a) => (
                <div key={a.stepId} className="grid gap-1 py-4 sm:grid-cols-[1fr_1.2fr] sm:gap-6">
                  <dt className="text-sm text-muted-dark">{a.question}</dt>
                  <dd className="font-semibold text-brown">{a.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="border border-sand bg-white p-7">
            <h2 className="text-3xl text-brown">Mensagem</h2>
            <p className="mt-4 whitespace-pre-line text-[15px] text-ink">{lead.message || "Nenhuma mensagem adicional."}</p>
          </section>
        </div>

        <div className="space-y-8">
          <section className="border border-sand bg-white p-7">
            <h2 className="text-3xl text-brown">Contato</h2>
            <div className="mt-5 flex flex-col gap-3">
              <a href={`https://wa.me/55${lead.phone}`} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                <WhatsAppIcon className="size-4" /> {phoneDisplay}
              </a>
              <a href={`mailto:${lead.email}`} className="btn btn-outline-dark normal-case tracking-normal">
                <Mail className="size-4" aria-hidden="true" /> {lead.email}
              </a>
            </div>
            <dl className="mt-6 space-y-2 text-xs text-muted-dark">
              <div><dt className="inline font-semibold">Consentimento LGPD: </dt><dd className="inline">{formatDate(lead.consent_at)}</dd></div>
              {lead.source_page && <div><dt className="inline font-semibold">Página de origem: </dt><dd className="inline">{lead.source_page}</dd></div>}
              <div><dt className="inline font-semibold">Última atualização: </dt><dd className="inline">{formatDate(lead.updated_at)}</dd></div>
            </dl>
          </section>
          <section className="border border-sand bg-white p-7">
            <h2 className="text-3xl text-brown">Atendimento</h2>
            <StatusForm id={lead.id} status={lead.status} notes={lead.notes ?? ""} />
          </section>
        </div>
      </div>
    </AdminShell>
  );
}
