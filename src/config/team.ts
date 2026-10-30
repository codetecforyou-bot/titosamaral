import type { TeamMember } from "./types";

/**
 * Equipe do escritório.
 * As informações abaixo vieram do site atual do escritório e precisam ser
 * CONFIRMADAS antes da publicação. Para adicionar uma foto, coloque o arquivo
 * em /public/images/equipe/ e informe o caminho em `photo`.
 */
export const team: TeamMember[] = [
  {
    slug: "tito-souza-do-amaral",
    name: "Tito Souza do Amaral",
    role: "Advogado · [Cargo a confirmar]",
    specialties: ["Direito de Família", "Sucessões", "Direito Civil"],
    bio: "Advogado com vasta experiência na esfera pública. [Mini biografia a confirmar: trajetória, áreas de atuação e forma de trabalho.]",
    qualifications: ["Mestre em Direito Constitucional", "[Graduação e instituição]"],
    oab: "OAB/GO [número]",
  },
  {
    slug: "joao-paulo-lopes-tito",
    name: "João Paulo Lopes Tito",
    role: "Advogado · [Cargo a confirmar]",
    specialties: ["Direito de Família", "Sucessões"],
    bio: "Advogado dedicado ao Direito das Famílias. [Mini biografia a confirmar: trajetória, áreas de atuação e forma de trabalho.]",
    qualifications: [
      "Mestre em Direito Constitucional",
      "Membro do IBDFAM",
      "Membro da Comissão de Direito das Famílias da OAB/GO",
    ],
    oab: "OAB/GO [número]",
  },
];

export function getTeamMembers(slugs: string[]) {
  return slugs.map((s) => team.find((m) => m.slug === s)).filter((m): m is TeamMember => Boolean(m));
}
