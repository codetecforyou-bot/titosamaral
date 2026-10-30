import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { practiceAreas } from "@/config/practice-areas";
import { requireAdmin } from "@/lib/auth/server";
import { AreaIcon } from "@/components/ui/icons";
import { AdminShell } from "../AdminShell";

export const metadata: Metadata = { title: "Especialidades" };

export default async function AreasAdminPage() {
  const session = await requireAdmin();
  return (
    <AdminShell email={session.email} active="areas">
      <h1 className="text-5xl text-brown">Especialidades</h1>
      <p className="mt-3 max-w-3xl text-sm text-muted-dark">
        As especialidades, o conteúdo das landing pages e o fluxo de perguntas de cada área ficam em{" "}
        <code className="bg-white px-1.5 py-0.5 text-brown">src/config/practice-areas.ts</code>. Para adicionar uma nova área,
        copie um bloco existente e altere o <code className="bg-white px-1.5 py-0.5 text-brown">slug</code>: a página, o card, o
        sitemap e o formulário são criados automaticamente. A edição direta por esta tela está preparada para uma próxima etapa,
        com o conteúdo migrado para o banco de dados.
      </p>

      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {practiceAreas.map((a) => (
          <li key={a.slug} className="flex gap-5 border border-sand bg-white p-6">
            <span className="flex size-12 flex-none items-center justify-center rounded-full border border-gold/40 text-gold-deep">
              <AreaIcon name={a.icon} className="size-6" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl text-brown">{a.name}</h2>
              <p className="mt-1 text-xs text-muted-dark">/areas/{a.slug}</p>
              <dl className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
                <div className="bg-mist p-2"><dt className="text-muted-dark">Situações</dt><dd className="text-lg font-semibold text-brown">{a.situations.length}</dd></div>
                <div className="bg-mist p-2"><dt className="text-muted-dark">FAQ</dt><dd className="text-lg font-semibold text-brown">{a.faq.length}</dd></div>
                <div className="bg-mist p-2"><dt className="text-muted-dark">Equipe</dt><dd className="text-lg font-semibold text-brown">{a.responsible.length || "A definir"}</dd></div>
              </dl>
              <details className="mt-4 text-sm">
                <summary className="cursor-pointer font-semibold text-gold-deep">Ver perguntas do formulário</summary>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted-dark">
                  {[a.form.situation, a.form.status, a.form.context].map((s) => (
                    <li key={s.id}>
                      <span className="font-semibold text-brown">{s.question}</span>
                      <span className="block text-xs">{s.options.map((o) => o.label).join(" · ")}</span>
                    </li>
                  ))}
                </ol>
              </details>
              <Link href={`/areas/${a.slug}`} target="_blank" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep underline">
                Abrir landing page <ExternalLink className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
