import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Plus } from "lucide-react";
import { practiceAreas } from "@/config/practice-areas";
import { whatsappLink } from "@/config/site";
import { getTeamMembers } from "@/config/team";
import type { PracticeArea } from "@/config/types";
import { CtaBand } from "@/components/home/CtaBand";
import { StickyAreaCta } from "./StickyAreaCta";
import { TeamCard } from "@/components/home/Team";
import { SmartForm } from "@/components/SmartForm/SmartForm";
import { OpenFormButton } from "@/components/SmartForm/OpenFormButton";
import { AreaIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import fachada from "@/assets/images/fachada.jpg";

export function PracticeAreaLandingPage({ area }: { area: PracticeArea }) {
  const responsible = getTeamMembers(area.responsible);
  const others = practiceAreas.filter((a) => a.slug !== area.slug);
  const waMessage = `Olá! Gostaria de falar sobre ${area.name} com o escritório Tito S Amaral.`;

  return (
    <>
      {/* 1. Hero exclusivo */}
      <section data-wa-hide className="relative isolate overflow-hidden bg-brown pb-20 pt-32 text-white sm:pb-24 sm:pt-40 lg:pb-32 lg:pt-48">
        <Image src={fachada} alt="" fill priority sizes="100vw" placeholder="blur" className="hero-zoom -z-20 object-cover object-[60%_55%] opacity-35" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,#281310_25%,rgb(40_19_16/0.85)_55%,rgb(40_19_16/0.6)_100%)]" />
        <AreaIcon name={area.icon} aria-hidden="true" className="pointer-events-none absolute -right-16 top-24 -z-10 hidden size-[420px] text-gold/[0.07] lg:block" strokeWidth={0.6} />
        <div className="container-site">
          <nav aria-label="Você está em" className="hero-text">
            <ol className="flex flex-wrap items-center gap-x-2 text-[13px] text-muted">
              <li className="flex items-center gap-2">
                <Link href="/" className="-ml-2 flex min-h-11 min-w-11 items-center justify-center px-2 hover:text-gold">Início</Link>
                <ChevronRight className="size-3.5 text-gold/60" aria-hidden="true" />
              </li>
              <li className="flex items-center gap-2">
                <Link href="/#areas" className="flex min-h-11 items-center hover:text-gold">Áreas de Atuação</Link>
                <ChevronRight className="size-3.5 text-gold/60" aria-hidden="true" />
              </li>
              <li aria-current="page" className="flex min-h-11 items-center text-white">{area.name}</li>
            </ol>
          </nav>
          <div className="hero-text mt-6 max-w-4xl sm:mt-10">
            <span className="flex size-16 items-center justify-center rounded-full border border-gold/40 text-gold">
              <AreaIcon name={area.icon} className="size-7" />
            </span>
            <h1 className="mt-7 text-[34px] leading-[1.08] min-[400px]:text-[38px] sm:text-6xl lg:text-[68px]">{area.hero.title}</h1>
            <p className="lead-text mt-7 max-w-2xl text-white/80">{area.hero.subtitle}</p>
            <div id="area-hero-cta" className="mt-10 flex flex-col gap-3 sm:flex-row">
              <OpenFormButton area={area.slug} className="btn btn-gold">
                Avaliar meu caso <ArrowRight className="size-4" aria-hidden="true" />
              </OpenFormButton>
              <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
                <WhatsAppIcon className="size-4" /> Falar pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2 e 3. Explicação da área */}
      <section className="bg-mist py-24 lg:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <span className="gold-rule" />
            <h2 className="mt-8 text-[36px] text-brown sm:text-5xl">{area.intro.heading}</h2>
          </Reveal>
          <Reveal delay={120} className="space-y-6 text-[17px] leading-relaxed text-muted-dark">
            {area.intro.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "font-serif text-[24px] leading-snug text-brown sm:text-[26px]" : ""}>
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 4. Situações atendidas */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-site">
          <Reveal className="max-w-2xl">
            <span className="gold-rule" />
            <h2 className="mt-8 text-[36px] text-brown sm:text-5xl">Principais situações atendidas</h2>
          </Reveal>
          <ul className="mt-14 grid gap-px overflow-hidden border border-sand bg-sand sm:grid-cols-2 lg:grid-cols-3">
            {area.situations.map((s, i) => (
              <Reveal as="li" key={s.title} delay={(i % 3) * 100} className="group bg-white p-8 transition-colors duration-500 hover:bg-mist sm:p-10">
                <span className="font-serif text-lg text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-[26px] text-brown">{s.title}</h3>
                <p className="mt-3 text-[15px] text-muted-dark">{s.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Como o escritório pode auxiliar */}
      <section className="grain bg-brown py-24 text-white lg:py-32">
        <div className="container-site">
          <Reveal className="max-w-2xl">
            <span className="gold-rule" />
            <h2 className="mt-8 text-[36px] sm:text-5xl">Como podemos ajudar</h2>
          </Reveal>
          <ol className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {area.howWeHelp.map((h, i) => (
              <Reveal as="li" key={h.title} delay={i * 110} className="relative border-t border-gold/30 pt-8">
                <span aria-hidden="true" className="absolute -top-[5px] left-0 size-[9px] rotate-45 bg-gold" />
                <span className="font-serif text-5xl font-semibold text-gold">{i + 1}</span>
                <h3 className="mt-5 text-[26px]">{h.title}</h3>
                <p className="mt-3 text-[15px] text-muted">{h.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Diferenciais */}
      <section className="bg-mist py-24 lg:py-32">
        <div className="container-site grid gap-6 md:grid-cols-3">
          {area.differentials.map((d, i) => (
            <Reveal key={d.title} delay={i * 110} className="border border-sand bg-white p-9">
              <AreaIcon name={d.icon} className="size-8 text-gold-deep" />
              <h3 className="mt-7 text-[28px] text-brown">{d.title}</h3>
              <p className="mt-3 text-[15px] text-muted-dark">{d.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7. Equipe responsável (só aparece quando confirmada no cadastro) */}
      {responsible.length > 0 && (
        <section className="bg-white py-24 lg:py-32">
          <div className="container-site">
            <Reveal className="max-w-2xl">
              <span className="gold-rule" />
              <h2 className="mt-8 text-[36px] text-brown sm:text-5xl">Quem conduz o seu caso</h2>
            </Reveal>
            <ul className="mt-14 grid gap-8 lg:grid-cols-2">
              {responsible.map((m, i) => (
                <Reveal as="li" key={m.slug} delay={i * 120}>
                  <TeamCard member={m} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 8. Perguntas frequentes */}
      <section data-wa-hide className={`py-24 lg:py-32 ${responsible.length > 0 ? "bg-mist" : "bg-white"}`}>
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
          <Reveal>
            <span className="gold-rule" />
            <h2 className="mt-8 text-[36px] text-brown sm:text-5xl">Perguntas frequentes</h2>
            <p className="mt-5 text-[15px] text-muted-dark">
              Respostas gerais e informativas. Cada caso tem particularidades e merece uma análise individual.
            </p>
          </Reveal>
          <Reveal delay={120} className="border-t border-sand">
            {area.faq.map((f) => (
              <details key={f.question} className="group border-b border-sand">
                <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-4 py-5 font-serif text-[22px] font-semibold leading-snug text-brown transition-colors hover:text-gold-deep sm:gap-6 sm:py-6 sm:text-[26px]">
                  {f.question}
                  <Plus className="size-5 flex-none text-gold-deep transition-transform duration-300 group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="pb-7 text-[15px] leading-relaxed text-muted-dark sm:pr-10">{f.answer}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 9. Chamada para atendimento */}
      <CtaBand title={area.cta.title} text={area.cta.text} area={area.slug} whatsappMessage={waMessage} />

      {/* 10. Formulário inteligente */}
      <section id="formulario" data-wa-hide className="grain bg-brown py-24 text-white lg:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.3fr] lg:gap-20">
          <Reveal>
            <span className="gold-rule" />
            <h2 className="mt-8 text-[36px] sm:text-5xl">Conte o seu caso</h2>
            <p className="mt-5 text-[17px] text-muted">
              Algumas perguntas rápidas ajudam a equipe a entender a sua situação antes do primeiro contato.
            </p>
          </Reveal>
          <Reveal delay={120} className="-mx-5 overflow-hidden border-y border-gold/30 bg-mist text-ink sm:mx-0 sm:border">
            <SmartForm initialArea={area.slug} variant="inline" />
          </Reveal>
        </div>
      </section>

      {/* Outras áreas */}
      <section data-wa-hide className="bg-[#1c0d0b] py-20 text-white">
        <div className="container-site">
          <h2 className="font-sans text-[13px] font-semibold uppercase tracking-[0.16em] text-gold">Outras áreas de atuação</h2>
          <ul className="mt-8 grid gap-px overflow-hidden border border-gold/10 bg-gold/10 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.slug} className="bg-[#1c0d0b]">
                <Link href={`/areas/${o.slug}`} className="group flex h-full items-center justify-between gap-4 p-6 transition-colors hover:bg-white/[0.04]">
                  <span className="flex items-center gap-4">
                    <AreaIcon name={o.icon} className="size-6 text-gold" />
                    <span className="font-serif text-[22px]">{o.name}</span>
                  </span>
                  <ArrowRight className="size-4 text-gold transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <StickyAreaCta area={area.slug} />
    </>
  );
}
