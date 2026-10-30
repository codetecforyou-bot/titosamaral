import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PracticeAreaLandingPage } from "@/components/area/PracticeAreaLandingPage";
import { JsonLd } from "@/components/ui/JsonLd";
import { getArea, practiceAreas } from "@/config/practice-areas";
import { areaSchemas, ogBase } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return practiceAreas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const area = getArea((await params).slug);
  if (!area) return {};
  const url = `/areas/${area.slug}`;
  return {
    title: area.seo.title,
    description: area.seo.description,
    alternates: { canonical: url },
    openGraph: { ...ogBase, url, title: area.seo.title, description: area.seo.description },
  };
}

export default async function AreaPage({ params }: Params) {
  const area = getArea((await params).slug);
  if (!area) notFound();
  return (
    <>
      <PracticeAreaLandingPage area={area} />
      {areaSchemas(area).map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
    </>
  );
}
