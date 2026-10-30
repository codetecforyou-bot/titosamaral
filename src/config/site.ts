/**
 * Dados institucionais do escritório.
 * Tudo que estiver entre [colchetes] precisa ser confirmado antes da publicação.
 */
export const site = {
  name: "Tito S Amaral Sociedade de Advogados",
  shortName: "Tito S Amaral",
  legalName: "Tito Souza do Amaral Sociedade de Advogados",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://titosamaral.adv.br",
  description:
    "Escritório de advocacia em Goiânia com atuação estratégica e personalizada em Direito de Família, Sucessões, Direito Criminal e Direito Civil.",
  oab: "[Registro da sociedade na OAB/GO]",
  whatsapp: {
    number: "5562981129762",
    display: "(62) 98112-9762",
    defaultMessage: "Olá, gostaria de agendar um atendimento com o escritório Tito S Amaral.",
  },
  phone: { number: "+55[telefone fixo]", display: "[Telefone fixo]" },
  email: "[contato@titosamaral.adv.br]",
  address: {
    street: "[Rua / Avenida], 573",
    district: "[Setor]",
    city: "Goiânia",
    state: "GO",
    zip: "[CEP]",
    mapsQuery: "Tito S Amaral Sociedade de Advogados Goiânia",
  },
  hours: [
    { days: "Segunda a sexta", time: "08h30 às 18h00", schema: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "18:00" } },
    { days: "Sábado", time: "Com agendamento" },
    { days: "Domingo e feriados", time: "Fechado" },
  ],
  social: {
    instagram: { url: "https://www.instagram.com/titosamaral/", handle: "@titosamaral" },
  },
  google: {
    rating: 4.8,
    reviewsUrl: "https://www.google.com/maps/search/?api=1&query=Tito%20S%20Amaral%20Sociedade%20de%20Advogados%20Goi%C3%A2nia",
  },
} as const;

export const nav = [
  { label: "Início", href: "/" },
  { label: "O Escritório", href: "/#escritorio" },
  { label: "Áreas de Atuação", href: "/#areas" },
  { label: "Nossa Equipe", href: "/#equipe" },
  { label: "Contato", href: "/#contato" },
] as const;

export function whatsappLink(message: string = site.whatsapp.defaultMessage) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function mapsLink() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapsQuery)}`;
}
