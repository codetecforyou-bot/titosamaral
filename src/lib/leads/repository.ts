import "server-only";
import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Lead, LeadFilters, LeadStatus, NewLead } from "./types";

/**
 * Onde os contatos são gravados:
 * - "supabase": produção (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY).
 * - "local": arquivo .data/leads.json. Padrão em desenvolvimento; em produção
 *   só com LEADS_STORAGE=local (servidor próprio com disco persistente).
 * - "none": nada configurado. O formulário avisa e oferece o WhatsApp.
 */
export type StorageMode = "supabase" | "local" | "none";

export function storageMode(): StorageMode {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) return "supabase";
  if (process.env.LEADS_STORAGE === "local" || process.env.NODE_ENV !== "production") return "local";
  return "none";
}

export class StorageNotConfiguredError extends Error {
  constructor() {
    super("Armazenamento de contatos não configurado.");
  }
}

// ───────────────────────── Supabase ─────────────────────────
let supabase: SupabaseClient | null = null;
function db() {
  if (!supabase) {
    supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return supabase.from("leads");
}

// ───────────────────────── Arquivo local ─────────────────────────
const LOCAL_FILE = path.join(process.cwd(), ".data", "leads.json");
let queue: Promise<unknown> = Promise.resolve();

async function readLocal(): Promise<Lead[]> {
  try {
    return JSON.parse(await fs.readFile(LOCAL_FILE, "utf8")) as Lead[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

function writeLocal(mutate: (leads: Lead[]) => Lead[]) {
  const run = queue.then(async () => {
    const leads = mutate(await readLocal());
    await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
    const tmp = `${LOCAL_FILE}.${process.pid}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(leads, null, 2), { mode: 0o600 });
    await fs.rename(tmp, LOCAL_FILE);
    return leads;
  });
  queue = run.catch(() => undefined);
  return run;
}

// ───────────────────────── API pública ─────────────────────────
export async function createLead(input: NewLead): Promise<Lead> {
  const mode = storageMode();
  if (mode === "supabase") {
    const { data, error } = await db().insert(input).select().single();
    if (error) throw new Error(`Supabase insert: ${error.message}`);
    return data as Lead;
  }
  if (mode === "local") {
    const now = new Date().toISOString();
    const lead: Lead = { ...input, id: randomUUID(), created_at: now, updated_at: now, status: "novo", notes: null };
    await writeLocal((leads) => [lead, ...leads]);
    return lead;
  }
  throw new StorageNotConfiguredError();
}

export async function listLeads(filters: LeadFilters = {}): Promise<Lead[]> {
  const mode = storageMode();
  if (mode === "supabase") {
    let q = db().select("*").order("created_at", { ascending: false }).limit(500);
    if (filters.status) q = q.eq("status", filters.status);
    if (filters.area) q = q.eq("area_slug", filters.area);
    const { data, error } = await q;
    if (error) throw new Error(`Supabase select: ${error.message}`);
    return data as Lead[];
  }
  if (mode === "local") {
    return (await readLocal()).filter(
      (l) => (!filters.status || l.status === filters.status) && (!filters.area || l.area_slug === filters.area),
    );
  }
  return [];
}

export async function getLead(id: string): Promise<Lead | null> {
  const mode = storageMode();
  if (mode === "supabase") {
    const { data, error } = await db().select("*").eq("id", id).maybeSingle();
    if (error) throw new Error(`Supabase select: ${error.message}`);
    return (data as Lead) ?? null;
  }
  if (mode === "local") return (await readLocal()).find((l) => l.id === id) ?? null;
  return null;
}

export async function updateLead(id: string, patch: { status?: LeadStatus; notes?: string | null }) {
  const mode = storageMode();
  if (mode === "supabase") {
    const { error } = await db().update(patch).eq("id", id);
    if (error) throw new Error(`Supabase update: ${error.message}`);
    return;
  }
  if (mode === "local") {
    const now = new Date().toISOString();
    await writeLocal((leads) => leads.map((l) => (l.id === id ? { ...l, ...patch, updated_at: now } : l)));
    return;
  }
  throw new StorageNotConfiguredError();
}
