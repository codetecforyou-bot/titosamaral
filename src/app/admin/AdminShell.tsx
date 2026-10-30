import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { logoutAction } from "./actions";
import { storageMode } from "@/lib/leads/repository";
import logo from "@/assets/images/logo-tsa.png";

export function AdminShell({ email, active, children }: { email: string; active: "leads" | "areas"; children: React.ReactNode }) {
  const mode = storageMode();
  const tabs = [
    { key: "leads", label: "Contatos", href: "/admin" },
    { key: "areas", label: "Especialidades", href: "/admin/especialidades" },
  ];
  return (
    <>
      <header className="bg-brown text-white">
        <div className="container-site flex flex-wrap items-center justify-between gap-4 py-4">
          <Link href="/admin" className="flex items-center gap-4">
            <Image src={logo} alt="Tito S Amaral" className="h-9 w-auto" />
            <span className="hidden border-l border-gold/30 pl-4 text-xs uppercase tracking-[0.18em] text-gold sm:inline">Painel</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden text-muted md:inline">{email}</span>
            <form action={logoutAction}>
              <button type="submit" className="flex min-h-10 items-center gap-2 border border-white/20 px-4 text-xs font-semibold uppercase tracking-wider hover:border-gold hover:text-gold">
                <LogOut className="size-4" aria-hidden="true" /> Sair
              </button>
            </form>
          </div>
        </div>
        <nav aria-label="Painel" className="container-site flex gap-1">
          {tabs.map((t) => (
            <Link
              key={t.key}
              href={t.href}
              aria-current={active === t.key ? "page" : undefined}
              className={`border-b-2 px-4 py-3 text-sm font-semibold ${active === t.key ? "border-gold text-white" : "border-transparent text-muted hover:text-white"}`}
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </header>
      {mode !== "supabase" && (
        <div role="status" className="border-b border-gold/40 bg-gold/15">
          <p className="container-site py-3 text-sm text-brown">
            {mode === "local"
              ? "Modo local: os contatos estão sendo gravados em .data/leads.json neste servidor. Para produção, configure o Supabase."
              : "Banco de dados não configurado: o formulário não consegue gravar contatos. Configure o Supabase (veja o README)."}
          </p>
        </div>
      )}
      <main className="container-site py-10">{children}</main>
    </>
  );
}
