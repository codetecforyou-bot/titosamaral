import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { practiceAreas } from "@/config/practice-areas";
import { OpenFormButton } from "@/components/SmartForm/OpenFormButton";
import { AreaIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";

export function PracticeAreas() {
  const featured = practiceAreas.filter((a) => a.featured);
  const others = practiceAreas.filter((a) => !a.featured);

  return (
    <section id="areas" className="grain relative bg-brown py-28 text-white lg:py-36">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal className="max-w-2xl">
            <span className="gold-rule" />
            <h2 className="heading-lg mt-8">Áreas de atuação</h2>
          </Reveal>
          <Reveal delay={120} className="max-w-md">
            <p className="text-[17px] text-muted">
              Conheça as especialidades do escritório. Cada área tem uma página com detalhes sobre como podemos ajudar.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((area, i) => (
            <Reveal as="li" key={area.slug} delay={i * 90} className={i === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""}>
              <AreaCard area={area} large={i === 0} />
            </Reveal>
          ))}
          {others.map((area, i) => (
            <Reveal as="li" key={area.slug} delay={(featured.length + i) * 90}>
              <AreaCard area={area} />
            </Reveal>
          ))}
          <Reveal as="li" delay={(featured.length + others.length) * 90} className="md:col-span-2 lg:col-span-3">
            <div data-wa-hide className="h-full">
            <div className="flex h-full flex-col justify-between gap-8 bg-gold p-8 text-brown sm:p-12 lg:flex-row lg:items-center">
              <h3 className="max-w-xl text-[32px] leading-tight sm:text-[40px]">Não sabe qual área corresponde ao seu caso?</h3>
              <div className="max-w-md">
                <p className="text-[15px] text-brown/80">Responda algumas perguntas rápidas e encaminhamos você ao atendimento certo.</p>
                <OpenFormButton className="btn btn-dark mt-6">Encontrar a solução ideal</OpenFormButton>
              </div>
            </div>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}

function AreaCard({ area, large = false }: { area: (typeof practiceAreas)[number]; large?: boolean }) {
  return (
    <article
      className={`group relative flex h-full flex-col justify-between overflow-hidden border border-gold/15 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-500 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-gold/50 hover:bg-white/[0.06] sm:p-10 ${
        large ? "min-h-[420px] lg:min-h-full" : "min-h-[340px]"
      }`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-gold/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-4">
        <span className={`flex items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-brown ${large ? "size-16 sm:size-20" : "size-16"}`}>
          <AreaIcon name={area.icon} className={large ? "size-7 sm:size-9" : "size-7"} />
        </span>
        {area.featured && <span className="whitespace-nowrap border border-gold/30 px-3 py-1 text-[13px] font-semibold uppercase tracking-[0.1em] text-gold sm:tracking-[0.16em]">Área principal</span>}
      </div>
      <div className="mt-10">
        <h3 className={large ? "text-[40px] sm:text-5xl" : "text-[32px]"}>{area.name}</h3>
        <p className={`mt-4 text-muted ${large ? "text-[17px]" : "text-[15px]"}`}>{area.summary}</p>
        {large && (
          <ul className="mt-8 grid gap-x-6 border-t border-gold/15 sm:grid-cols-2">
            {area.situations.map((s) => (
              <li key={s.title} className="flex items-center gap-3 border-b border-gold/15 py-3 text-[14px] text-white/85">
                <span aria-hidden="true" className="size-1.5 flex-none rotate-45 bg-gold" />
                {s.title}
              </li>
            ))}
          </ul>
        )}
        <Link
          href={`/areas/${area.slug}`}
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.12em] text-gold transition-colors after:absolute after:inset-0 hover:text-gold-light"
        >
          Saiba mais <span className="sr-only">sobre {area.name}</span>
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
