-- Tabela de contatos (leads) do site Tito S Amaral
-- Rode este script no SQL Editor do Supabase.

create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  area_slug     text not null,
  area_name     text not null,
  answers       jsonb not null default '[]'::jsonb,
  name          text not null,
  phone         text not null,
  email         text not null,
  message       text,
  consent_at    timestamptz not null,
  source_page   text,
  status        text not null default 'novo'
                check (status in ('novo', 'em_atendimento', 'convertido', 'arquivado')),
  notes         text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_area_idx on public.leads (area_slug);

-- Segurança: RLS ligado e NENHUMA política pública.
-- Assim, a chave anônima não consegue ler nem gravar nada.
-- Apenas o servidor do site (com a service role key) acessa a tabela.
alter table public.leads enable row level security;
revoke all on public.leads from anon, authenticated;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists leads_updated_at on public.leads;
create trigger leads_updated_at before update on public.leads
for each row execute function public.set_updated_at();
