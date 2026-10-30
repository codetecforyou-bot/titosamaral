import { LEAD_STATUSES, type LeadStatus } from "@/lib/leads/types";

const styles: Record<LeadStatus, string> = {
  novo: "bg-gold/20 text-brown border-gold/50",
  em_atendimento: "bg-sky-50 text-sky-900 border-sky-200",
  convertido: "bg-emerald-50 text-emerald-900 border-emerald-200",
  arquivado: "bg-mist text-muted-dark border-sand",
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  const label = LEAD_STATUSES.find((s) => s.value === status)?.label ?? status;
  return <span className={`inline-block whitespace-nowrap border px-2.5 py-1 text-xs font-semibold ${styles[status]}`}>{label}</span>;
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo" }).format(new Date(iso));
}
