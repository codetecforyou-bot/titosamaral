"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight, Check, LoaderCircle, ShieldCheck, TriangleAlert } from "lucide-react";
import { TOTAL_STEPS, getChoiceSteps, getFlow, areaStep } from "@/config/form";
import { whatsappLink } from "@/config/site";
import { contactSchema } from "@/lib/lead-schema";
import { WhatsAppIcon } from "@/components/ui/icons";

type Props = {
  initialArea?: string;
  variant?: "modal" | "inline";
  onClose?: () => void;
  onDone?: () => void;
  titleId?: string;
};

type Contact = { name: string; phone: string; email: string; message: string; consent: boolean; website: string };
type FieldErrors = Partial<Record<keyof Contact, string>>;

const emptyContact: Contact = { name: "", phone: "", email: "", message: "", consent: false, website: "" };

function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function SmartForm({ initialArea, variant = "modal", onClose, onDone, titleId }: Props) {
  const uid = useId();
  const [answers, setAnswers] = useState<Record<string, string>>(initialArea ? { area: initialArea } : {});
  const [step, setStep] = useState(initialArea ? 1 : 0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [choiceError, setChoiceError] = useState("");
  const [contact, setContact] = useState<Contact>(emptyContact);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [done, setDone] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const interacted = useRef(false);

  const steps = useMemo(() => (answers.area ? getChoiceSteps(answers.area) : [areaStep]), [answers.area]);
  const flow = answers.area ? getFlow(answers.area) : null;
  const isContactStep = step === TOTAL_STEPS - 1;
  const current = !isContactStep ? steps[step] : null;

  // Leva o foco para a nova pergunta (leitores de tela anunciam a mudança).
  useEffect(() => {
    if (interacted.current || variant === "modal") headingRef.current?.focus({ preventScroll: variant === "inline" });
  }, [step, done, variant]);

  function go(to: number) {
    interacted.current = true;
    setDirection(to > step ? "next" : "prev");
    setChoiceError("");
    setStep(to);
  }

  function select(stepId: string, value: string) {
    setChoiceError("");
    setAnswers((prev) => {
      if (stepId === "area" && prev.area !== value) return { area: value }; // nova área: novo fluxo
      return { ...prev, [stepId]: value };
    });
  }

  function next() {
    if (current && !answers[current.id]) {
      setChoiceError("Selecione uma opção para continuar.");
      return;
    }
    go(step + 1);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSubmitError("");
    const check = contactSchema.safeParse(contact);
    if (!check.success) {
      const fe = check.error.flatten().fieldErrors;
      setErrors(Object.fromEntries(Object.entries(fe).map(([k, v]) => [k, v?.[0]])) as FieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, answers, sourcePage: window.location.pathname }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; fields?: Record<string, string[]> };
      if (!res.ok) {
        if (data.fields) setErrors(Object.fromEntries(Object.entries(data.fields).map(([k, v]) => [k, v?.[0]])) as FieldErrors);
        setSubmitError(data.error ?? "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.");
        return;
      }
      interacted.current = true;
      setDone(true);
      onDone?.();
    } catch {
      setSubmitError("Sem conexão no momento. Verifique a internet ou fale conosco pelo WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  const summary = useMemo(() => {
    if (!answers.area) return "";
    return getChoiceSteps(answers.area)
      .slice(1, 3)
      .map((s) => s.options.find((o) => o.value === answers[s.id])?.label)
      .filter(Boolean)
      .join(", ");
  }, [answers]);

  const urgentMessage =
    flow?.urgent && flow.urgent.values.includes(answers[flow.urgent.stepId] ?? "") ? flow.urgent.message : null;

  const waMessage = `Olá! Meu nome é ${contact.name.trim() || "[nome]"}. Acabei de preencher o formulário no site sobre ${
    flow?.areaName ?? "o meu caso"
  }${summary ? ` (${summary})` : ""}. Gostaria de continuar o atendimento.`;

  // ───────────────────────── Tela final ─────────────────────────
  if (done) {
    return (
      <div className="flex flex-col items-center px-5 py-14 text-center sm:px-12 sm:py-16">
        <span className="flex size-20 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
          <svg viewBox="0 0 24 24" className="size-9 text-gold-deep" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path className="check-draw" d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 ref={headingRef} tabIndex={-1} id={titleId} className="mt-8 text-[32px] leading-[1.1] text-brown outline-none sm:text-5xl">
          Obrigado por compartilhar sua situação!
        </h2>
        <p className="mt-5 max-w-md text-muted-dark">
          Suas informações foram registradas. Nossa equipe poderá analisar sua solicitação e entrar em contato.
        </p>
        {urgentMessage && (
          <p role="status" className="mt-6 flex max-w-md items-start gap-3 border border-gold/50 bg-gold/10 px-4 py-3 text-left text-sm text-brown">
            <TriangleAlert className="mt-0.5 size-5 flex-none text-gold-deep" aria-hidden="true" />
            {urgentMessage}
          </p>
        )}
        <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-9 w-full sm:w-auto">
          <WhatsAppIcon className="size-5" />
          Continuar atendimento pelo WhatsApp
        </a>
        {variant === "modal" && onClose && (
          <button type="button" onClick={onClose} className="mt-3 min-h-11 px-4 text-[15px] font-medium text-muted-dark underline-offset-4 hover:text-brown hover:underline">
            Voltar ao site
          </button>
        )}
      </div>
    );
  }

  // ───────────────────────── Etapas ─────────────────────────
  const progress = ((step + 1) / TOTAL_STEPS) * 100;
  const optionsTwoCols = current?.id === "area";

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Progresso */}
      <div className="flex-none px-5 pt-6 sm:px-10 sm:pt-8">
        <div className="flex flex-col gap-1 pr-12 text-[13px] font-semibold uppercase tracking-[0.12em] text-muted-dark sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:tracking-[0.16em]">
          <span className="whitespace-nowrap">
            Etapa <span className="text-brown">{step + 1}</span> de {TOTAL_STEPS}
          </span>
          {flow && step > 0 && <span className="text-gold-deep">{flow.areaName}</span>}
        </div>
        <div
          className="mt-3 h-[3px] w-full overflow-hidden bg-sand"
          role="progressbar"
          aria-label="Progresso do formulário"
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
          aria-valuenow={step + 1}
        >
          <div className="h-full bg-gold transition-[width] duration-700 ease-[var(--ease-premium)]" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {current ? (
        <div
          key={`${current.id}-${step}`}
          className={`min-h-0 flex-1 overflow-y-auto px-5 pb-4 pt-7 sm:px-10 sm:pt-8 ${direction === "next" ? "step-next" : "step-prev"}`}
          onKeyDown={(e: KeyboardEvent) => {
            if (e.key === "Enter" && (e.target as HTMLElement).tagName === "INPUT") {
              e.preventDefault();
              next();
            }
          }}
        >
          <fieldset>
            <legend className="contents">
              <h2 ref={headingRef} tabIndex={-1} id={titleId} className="text-[28px] leading-[1.12] text-brown outline-none min-[400px]:text-[30px] sm:text-[40px]">
                {current.question}
              </h2>
            </legend>
            {current.helper && <p className="mt-3 text-sm text-muted-dark">{current.helper}</p>}
            <div className={`mt-7 grid gap-3 ${optionsTwoCols ? "sm:grid-cols-2" : ""}`}>
              {current.options.map((opt) => {
                const checked = answers[current.id] === opt.value;
                const id = `${uid}-${current.id}-${opt.value}`;
                return (
                  <label
                    key={opt.value}
                    htmlFor={id}
                    className={`group relative flex min-h-14 cursor-pointer items-center gap-4 border px-4 py-3.5 text-[15px] transition-all duration-300 sm:px-5 ${
                      checked
                        ? "border-gold bg-gold/10 text-brown shadow-[0_8px_24px_-14px_rgb(201_163_106/0.9)]"
                        : "border-sand bg-white text-ink hover:border-gold/60 hover:bg-mist"
                    }`}
                  >
                    <input
                      id={id}
                      type="radio"
                      name={`${uid}-${current.id}`}
                      value={opt.value}
                      checked={checked}
                      onChange={() => select(current.id, opt.value)}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`flex size-5 flex-none items-center justify-center rounded-full border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-gold peer-focus-visible:ring-offset-2 ${
                        checked ? "border-gold bg-gold text-brown" : "border-muted-dark/40 bg-white"
                      }`}
                    >
                      {checked && <Check className="size-3.5" strokeWidth={3} />}
                    </span>
                    <span className={checked ? "font-semibold" : ""}>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          <p role="alert" className="mt-4 min-h-5 text-sm font-medium text-red-700">
            {choiceError}
          </p>
        </div>
      ) : (
        <form
          id={`${uid}-contato`}
          noValidate
          onSubmit={submit}
          className={`min-h-0 flex-1 overflow-y-auto px-5 pb-4 pt-7 sm:px-10 sm:pt-8 ${direction === "next" ? "step-next" : "step-prev"}`}
        >
          <h2 ref={headingRef} tabIndex={-1} id={titleId} className="text-[28px] leading-[1.12] text-brown outline-none min-[400px]:text-[30px] sm:text-[40px]">
            Quem está preenchendo este formulário?
          </h2>
          <p className="mt-3 text-sm text-muted-dark">Seus dados são confidenciais e usados apenas para o retorno do escritório.</p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <Field id={`${uid}-name`} label="Nome completo" error={errors.name} className="sm:col-span-2">
              <input
                id={`${uid}-name`}
                autoComplete="name"
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                className="input"
              />
            </Field>
            <Field id={`${uid}-phone`} label="Telefone / WhatsApp" error={errors.phone}>
              <input
                id={`${uid}-phone`}
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="(62) 90000-0000"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: formatPhone(e.target.value) })}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
                className="input"
              />
            </Field>
            <Field id={`${uid}-email`} label="E-mail" error={errors.email}>
              <input
                id={`${uid}-email`}
                type="email"
                inputMode="email"
                autoComplete="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? `${uid}-email-err` : undefined}
                className="input"
              />
            </Field>
            <Field id={`${uid}-message`} label="Quer contar mais algum detalhe? (opcional)" error={errors.message} className="sm:col-span-2">
              <textarea
                id={`${uid}-message`}
                rows={3}
                maxLength={1500}
                value={contact.message}
                onChange={(e) => setContact({ ...contact, message: e.target.value })}
                className="input resize-y"
              />
            </Field>
            {/* Campo isca contra robôs: invisível para pessoas */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor={`${uid}-website`}>Não preencha este campo</label>
              <input id={`${uid}-website`} tabIndex={-1} autoComplete="off" value={contact.website} onChange={(e) => setContact({ ...contact, website: e.target.value })} />
            </div>
          </div>

          <div className="mt-6">
            <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted-dark">
              <input
                type="checkbox"
                checked={contact.consent}
                onChange={(e) => setContact({ ...contact, consent: e.target.checked })}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? `${uid}-consent-err` : undefined}
                className="mt-0.5 size-[22px] flex-none accent-[#7a5c2c]"
              />
              <span className="text-[14px]">
                Autorizo o escritório Tito S Amaral a usar os dados informados para analisar minha solicitação e entrar em contato,
                conforme a Lei Geral de Proteção de Dados (LGPD) e a{" "}
                <Link href="/politica-de-privacidade" target="_blank" className="font-semibold text-gold-deep underline underline-offset-2">
                  Política de Privacidade
                </Link>
                .
              </span>
            </label>
            {errors.consent && (
              <p id={`${uid}-consent-err`} className="mt-2 text-sm font-medium text-red-700">
                {errors.consent}
              </p>
            )}
          </div>

          {submitError && (
            <div role="alert" className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              <p>{submitError}</p>
              <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 font-semibold underline">
                <WhatsAppIcon className="size-4" /> Falar pelo WhatsApp
              </a>
            </div>
          )}
          <p className="mt-6 flex items-center gap-2 text-[13px] text-muted-dark">
            <ShieldCheck className="size-4 text-gold-deep" aria-hidden="true" />
            Conexão segura. Suas informações são protegidas pelo sigilo profissional.
          </p>
        </form>
      )}

      {/* Navegação */}
      <div className="flex flex-none items-center justify-between gap-3 border-t border-sand bg-white/70 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-10 sm:py-5">
        {step > 0 ? (
          <button type="button" onClick={() => go(step - 1)} className="btn btn-outline-dark px-4 sm:px-5" disabled={submitting}>
            <ArrowLeft className="size-4" aria-hidden="true" /> Voltar
          </button>
        ) : (
          <span />
        )}
        {isContactStep ? (
          <button key="enviar" type="submit" form={`${uid}-contato`} className="btn btn-gold min-w-36 sm:min-w-40" disabled={submitting}>
            {submitting ? (
              <>
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> Enviando
              </>
            ) : (
              <>
                Enviar <ArrowRight className="size-4" aria-hidden="true" />
              </>
            )}
          </button>
        ) : (
          <button key="continuar" type="button" onClick={next} className="btn btn-dark min-w-36 sm:min-w-40">
            Continuar <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[14px] font-semibold text-brown">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
