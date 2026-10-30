import type { IconName } from "./types";

/**
 * Textos institucionais. Os trechos marcados como SUGESTÃO devem ser
 * revisados pelo escritório; os entre [colchetes] precisam ser preenchidos.
 */
export const about = {
  heading: "Tradição, ética e proximidade com cada cliente",
  paragraphs: [
    "O escritório Tito Souza do Amaral Sociedade de Advogados atua em Direito de Família e Sucessões, na solução de conflitos familiares e patrimoniais, em causas cíveis em geral e em Direito Criminal.",
    "[História do escritório: ano de fundação, trajetória e momentos marcantes. Preencher com informações confirmadas.]",
  ],
  // SUGESTÃO para revisão
  pillars: [
    {
      title: "Missão",
      text: "Oferecer advocacia técnica, ética e próxima, que traduza o Direito em decisões claras e proteja os interesses de cada cliente.",
    },
    {
      title: "Valores",
      text: "Ética, sigilo, transparência, respeito às pessoas e compromisso com a excelência técnica em cada caso.",
    },
    {
      title: "Compromisso",
      text: "Atender cada cliente de forma individual, com comunicação clara sobre riscos, prazos e caminhos possíveis.",
    },
  ],
};

export const differentials: { title: string; text: string; icon: IconName }[] = [
  { title: "Atendimento personalizado", text: "Cada caso é analisado de forma individual, a partir da sua história e dos seus objetivos.", icon: "compass" },
  { title: "Sigilo e ética", text: "Todas as informações são tratadas com discrição e protegidas pelo sigilo profissional.", icon: "lock" },
  { title: "Comunicação clara", text: "Explicamos riscos, prazos e custos sem juridiquês, para você decidir com segurança.", icon: "message" },
  { title: "Atuação estratégica", text: "Avaliamos os caminhos consensuais e judiciais antes de agir, buscando a solução mais adequada.", icon: "target" },
  { title: "Acompanhamento próximo", text: "Você é informado sobre cada etapa importante do seu caso.", icon: "eye" },
  { title: "Presencial e on-line", text: "Sede própria em Goiânia e atendimento on-line para clientes de todo o Brasil.", icon: "building" },
];

/** Avaliações reais publicadas no Google. */
export const reviews = [
  { name: "Flavio Bueno", text: "A melhor equipe jurídica de Goiânia", photo: "flavio" as const },
  { name: "Fabio Prado", text: "Ótimo atendimento!", photo: "fabio" as const },
  { name: "Wesley De Souza Barbosa", text: "Dr Caio. O Melhor advogado de Goiás", photo: null },
];
