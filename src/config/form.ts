import { practiceAreas } from "./practice-areas";
import type { AreaFormFlow, ChoiceStep } from "./types";

/**
 * Arquitetura do formulário inteligente:
 *   1. Área do Direito (escolha)
 *   2. Situação        (específica da área)
 *   3. Momento atual   (específica da área)
 *   4. Contexto        (específica da área)
 *   5. Objetivo        (comum a todas)
 *   6. Contato         (comum a todas)
 */

export const OTHER_AREA = { slug: "outra-area", name: "Outra área" } as const;

export const areaStep: ChoiceStep = {
  id: "area",
  question: "Em qual área do Direito você precisa de ajuda?",
  helper: "Escolha a opção mais próxima. Você poderá detalhar o caso no final.",
  options: [
    ...practiceAreas.map((a) => ({ value: a.slug, label: a.name })),
    { value: OTHER_AREA.slug, label: OTHER_AREA.name },
  ],
};

export const objectiveStep: ChoiceStep = {
  id: "objetivo",
  question: "O que você gostaria de resolver?",
  options: [
    { value: "orientacao", label: "Quero orientação jurídica" },
    { value: "iniciar-acao", label: "Quero iniciar uma ação" },
    { value: "processo-existente", label: "Preciso resolver um processo existente" },
    { value: "avaliar", label: "Quero avaliar minhas possibilidades" },
    { value: "duvida", label: "Quero apenas esclarecer uma dúvida" },
  ],
};

const otherAreaFlow: AreaFormFlow = {
  situation: {
    id: "situacao",
    question: "Sobre qual assunto é o seu caso?",
    options: [
      { value: "trabalhista", label: "Questão trabalhista" },
      { value: "consumidor", label: "Direito do consumidor" },
      { value: "previdenciario", label: "Questão previdenciária" },
      { value: "empresarial", label: "Questão empresarial" },
      { value: "tributario", label: "Questão tributária" },
      { value: "outro", label: "Outro assunto" },
    ],
  },
  status: {
    id: "momento",
    question: "O que está acontecendo atualmente?",
    options: [
      { value: "sem-processo", label: "Ainda não há processo" },
      { value: "notificacao", label: "Recebi notificação, intimação ou citação" },
      { value: "processo-andamento", label: "Já existe processo em andamento" },
      { value: "prevenir", label: "Quero prevenir um problema" },
    ],
  },
  context: {
    id: "local",
    question: "Onde o caso acontece?",
    options: [
      { value: "goiania", label: "Goiânia" },
      { value: "regiao-metropolitana", label: "Região metropolitana de Goiânia" },
      { value: "interior-go", label: "Outra cidade de Goiás" },
      { value: "outro-estado", label: "Outro estado" },
    ],
  },
};

export function getFlow(areaSlug: string): AreaFormFlow & { areaName: string } {
  const area = practiceAreas.find((a) => a.slug === areaSlug);
  if (area) return { ...area.form, areaName: area.name };
  return { ...otherAreaFlow, areaName: OTHER_AREA.name };
}

/** Lista ordenada das perguntas de múltipla escolha para uma área. */
export function getChoiceSteps(areaSlug: string): ChoiceStep[] {
  const flow = getFlow(areaSlug);
  return [areaStep, flow.situation, flow.status, flow.context, objectiveStep];
}

export const TOTAL_STEPS = 6;
