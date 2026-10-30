"use client";

import { useActionState } from "react";
import { LoaderCircle } from "lucide-react";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/leads/types";
import { updateLeadAction, type UpdateState } from "../../actions";

export function StatusForm({ id, status, notes }: { id: string; status: LeadStatus; notes: string }) {
  const [state, action, pending] = useActionState<UpdateState, FormData>(updateLeadAction, {});
  return (
    <form action={action} className="mt-5 space-y-5">
      <input type="hidden" name="id" value={id} />
      <div>
        <label htmlFor="status" className="mb-2 block text-[13px] font-semibold text-brown">Status</label>
        <select id="status" name="status" defaultValue={status} className="input">
          {LEAD_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="notes" className="mb-2 block text-[13px] font-semibold text-brown">Anotações internas</label>
        <textarea id="notes" name="notes" rows={5} defaultValue={notes} maxLength={4000} className="input resize-y" />
      </div>
      <button type="submit" disabled={pending} className="btn btn-dark w-full">
        {pending && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />} Salvar
      </button>
      <p role="status" className="min-h-5 text-sm font-medium">
        {state.ok && <span className="text-emerald-800">Atendimento atualizado.</span>}
        {state.error && <span className="text-red-700">{state.error}</span>}
      </p>
    </form>
  );
}
