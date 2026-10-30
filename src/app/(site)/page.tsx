import type { Metadata } from "next";
import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { CtaBand } from "@/components/home/CtaBand";
import { Differentials } from "@/components/home/Differentials";
import { Hero } from "@/components/home/Hero";
import { PracticeAreas } from "@/components/home/PracticeAreas";
import { Reviews } from "@/components/home/Reviews";
import { Team } from "@/components/home/Team";
import { site } from "@/config/site";
import { ogBase } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Advocacia em Goiânia` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { ...ogBase, url: "/", title: `${site.name} | Advocacia em Goiânia`, description: site.description },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <PracticeAreas />
      <Differentials />
      <Team />
      <Reviews />
      <CtaBand />
      <Contact />
    </>
  );
}
