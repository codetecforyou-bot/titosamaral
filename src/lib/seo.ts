import { site } from "@/config/site";
import type { PracticeArea } from "@/config/types";

/** Base do Open Graph: o Next substitui o bloco inteiro quando a página define o seu. */
export const ogBase = {
  type: "website" as const,
  locale: "pt_BR",
  siteName: site.name,
  images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: site.name }],
};

export function legalServiceSchema() {
  const weekday = site.hours.find((h) => "schema" in h && h.schema);
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${site.url}/#escritorio`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/images/logo-tsa.png`,
    image: `${site.url}/images/og-image.jpg`,
    description: site.description,
    telephone: `+${site.whatsapp.number}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "BR",
    },
    areaServed: [{ "@type": "City", name: "Goiânia" }, { "@type": "Country", name: "Brasil" }],
    openingHoursSpecification:
      weekday && "schema" in weekday && weekday.schema
        ? [{ "@type": "OpeningHoursSpecification", dayOfWeek: weekday.schema.days, opens: weekday.schema.opens, closes: weekday.schema.closes }]
        : undefined,
    sameAs: [site.social.instagram.url],
  };
}

export function areaSchemas(area: PracticeArea) {
  const url = `${site.url}/areas/${area.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: area.name,
      serviceType: area.name,
      description: area.seo.description,
      url,
      areaServed: { "@type": "City", name: "Goiânia" },
      provider: { "@id": `${site.url}/#escritorio` },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: area.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: site.url },
        { "@type": "ListItem", position: 2, name: "Áreas de Atuação", item: `${site.url}/#areas` },
        { "@type": "ListItem", position: 3, name: area.name, item: url },
      ],
    },
  ];
}
