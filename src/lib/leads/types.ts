import type { LeadAnswer } from "@/lib/lead-schema";

export const LEAD_STATUSES = [
  { value: "novo", label: "Novo" },
  { value: "em_atendimento", label: "Em atendimento" },
  { value: "convertido", label: "Convertido em cliente" },
  { value: "arquivado", label: "Arquivado" },
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number]["value"];

export function isLeadStatus(v: unknown): v is LeadStatus {
  return LEAD_STATUSES.some((s) => s.value === v);
}

export type Lead = {
  id: string;
  created_at: string;
  updated_at: string;
  area_slug: string;
  area_name: string;
  answers: LeadAnswer[];
  name: string;
  phone: string;
  email: string;
  message: string | null;
  consent_at: string;
  source_page: string | null;
  status: LeadStatus;
  notes: string | null;
};

export type NewLead = Omit<Lead, "id" | "created_at" | "updated_at" | "status" | "notes">;

export type LeadFilters = { status?: LeadStatus; area?: string };
