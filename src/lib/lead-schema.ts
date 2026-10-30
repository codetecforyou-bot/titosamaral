import { z } from "zod";
import { getChoiceSteps } from "@/config/form";

/** Mantém apenas dígitos e valida celular/telefone brasileiro (DDD + número). */
export function normalizePhone(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("55") && digits.length > 11) digits = digits.slice(2);
  return digits;
}

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Informe o seu nome completo.")
    .max(120, "Nome muito longo.")
    .refine((v) => v.split(/\s+/).length >= 2, "Informe nome e sobrenome."),
  phone: z
    .string()
    .trim()
    .transform(normalizePhone)
    .refine((v) => /^[1-9]{2}9?\d{8}$/.test(v), "Informe um telefone válido com DDD."),
  email: z.string().trim().toLowerCase().email("Informe um e-mail válido.").max(160),
  message: z.string().trim().max(1500, "Use no máximo 1500 caracteres.").optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "É preciso autorizar o uso dos dados para enviarmos o contato." }) }),
});

export const leadPayloadSchema = contactSchema.extend({
  /** Respostas de múltipla escolha: { [stepId]: optionValue } */
  answers: z.record(z.string().max(60), z.string().max(60)),
  sourcePage: z.string().max(200).optional(),
  /** Campo isca: robôs preenchem, pessoas não veem. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type LeadPayload = z.infer<typeof leadPayloadSchema>;

export type LeadAnswer = { stepId: string; question: string; value: string; answer: string };

/**
 * Confere as respostas contra a configuração do formulário (evita valores
 * inventados) e devolve as perguntas e respostas por extenso.
 */
export function resolveAnswers(answers: Record<string, string>): { areaSlug: string; answers: LeadAnswer[] } | null {
  const areaSlug = answers["area"];
  if (!areaSlug) return null;
  const steps = getChoiceSteps(areaSlug);
  const resolved: LeadAnswer[] = [];
  for (const step of steps) {
    const value = answers[step.id];
    const option = step.options.find((o) => o.value === value);
    if (!option) return null;
    resolved.push({ stepId: step.id, question: step.question, value, answer: option.label });
  }
  return { areaSlug, answers: resolved };
}
