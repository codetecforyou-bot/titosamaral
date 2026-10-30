import type { Metadata } from "next";
import Link from "next/link";
import { getChoiceSteps, OTHER_AREA } from "@/config/form";
import { practiceAreas } from "@/config/practice-areas";
import { requireAdmin } from "@/lib/auth/server";
import { listLeads } from "@/lib/leads/repository";
import { isLeadStatus, LEAD_STATUSES } from "@/lib/leads/types";
import { AdminShell } from "./AdminShell";
import { StatusBadge, formatDate } from "./ui";

export const metadata: Metadata = { title: "Contatos" };
export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ status?: string; area?: string }> };

export default async function AdminLeadsPage({ searchParams }: Props) {
  const session = await requireAdmin();
  const sp = await searchParams;
  const status = isLeadStatus(sp.status) ? sp.status : undefined;
  const area = sp.area && [...practiceAreas.map((a) => a.slug), OTHER_AREA.slug].includes(sp.area) ? sp.area : undefined;

  let error = "";
  let leads: Awaited<ReturnType<typeof listLeads>> = [];
  let all: typeof leads = [];
  try {
    [leads, all] = await Promise.all([listLeads({ status, area }), listLeads()]);
  } catch (err) {
    console.error(err);
    error = "Não foi possível carregar os contatos. Verifique a conexão com o banco de dados.";
  }

  const counts = Object.fromEntries(LEAD_STATUSES.map((s) => [s.value, all.filter((l) => l.status === s.value).length]));
  const areaOptions = [...practiceAreas.map((a) => ({ slug: a.slug, name: a.name })), { slug: OTHER_AREA.slug, name: OTHER_AREA.name }];
  const link = (p: { status?: string; area?: string }) => {
    const q = new URLSearchParams();
    if (p.status) q.set("status", p.status);
    if (p.area) q.set("area", p.area);
    const s = q.toString();
    return s ? `/admin?${s}` : "/admin";
  };

  return (
    <AdminShell email={session.email} active="leads">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl text-brown">Contatos recebidos</h1>
          <p className="mt-2 text-sm text-muted-dark">{all.length} contato(s) no total.</p>
        </div>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {LEAD_STATUSES.map((s) => (
          <li key={s.value}>
            <Link
              href={link({ status: status === s.value ? undefined : s.value, area })}
              aria-current={status === s.value ? "true" : undefined}
              className={`block border p-5 transition-colors ${status === s.value ? "border-gold bg-white" : "border-sand bg-white/60 hover:border-gold/50"}`}
            >
              <span className="block font-serif text-4xl font-semibold text-brown">{counts[s.value]}</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-dark">{s.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <form className="mt-8 flex flex-wrap items-end gap-3" action="/admin">
        {status && <input type="hidden" name="status" value={status} />}
        <div>
          <label htmlFor="area" className="mb-1 block text-xs font-semibold text-brown">Especialidade</label>
          <select id="area" name="area" defaultValue={area ?? ""} className="input min-w-64">
            <option value="">Todas as especialidades</option>
            {areaOptions.map((a) => (
              <option key={a.slug} value={a.slug}>{a.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-dark min-h-12 px-5">Filtrar</button>
        {(status || area) && (
          <Link href="/admin" className="text-sm font-semibold text-gold-deep underline">Limpar filtros</Link>
        )}
      </form>

      {error && <p role="alert" className="mt-8 border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>}

      <div className="mt-8 overflow-x-auto border border-sand bg-white">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="border-b border-sand bg-mist text-xs uppercase tracking-wider text-muted-dark">
            <tr>
              <th scope="col" className="px-5 py-4">Data</th>
              <th scope="col" className="px-5 py-4">Nome</th>
              <th scope="col" className="px-5 py-4">Especialidade</th>
              <th scope="col" className="px-5 py-4">Situação</th>
              <th scope="col" className="px-5 py-4">Status</th>
              <th scope="col" className="px-5 py-4"><span className="sr-only">Abrir</span></th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-14 text-center text-muted-dark">Nenhum contato encontrado.</td>
              </tr>
            )}
            {leads.map((l) => {
              const situationStep = getChoiceSteps(l.area_slug)[1];
              const situation = l.answers.find((a) => a.stepId === situationStep?.id)?.answer ?? "";
              return (
                <tr key={l.id} className="border-b border-sand last:border-0 hover:bg-mist/60">
                  <td className="whitespace-nowrap px-5 py-4 text-muted-dark">{formatDate(l.created_at)}</td>
                  <td className="px-5 py-4 font-semibold text-brown">{l.name}</td>
                  <td className="px-5 py-4">{l.area_name}</td>
                  <td className="px-5 py-4 text-muted-dark">{situation}</td>
                  <td className="px-5 py-4"><StatusBadge status={l.status} /></td>
                  <td className="px-5 py-4 text-right">
                    <Link href={`/admin/leads/${l.id}`} className="font-semibold text-gold-deep underline underline-offset-2">Ver detalhes</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
