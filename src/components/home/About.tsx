import Image from "next/image";
import { about } from "@/config/institutional";
import { Reveal } from "@/components/ui/Reveal";
import fachada from "@/assets/images/fachada.jpg";
import sala from "@/assets/images/interior-sala-reuniao.jpg";

export function About() {
  return (
    <section id="escritorio" className="relative overflow-hidden bg-mist py-28 lg:py-36">
      <div className="container-site grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
        {/* Composição de imagens */}
        <div className="relative mx-auto w-full max-w-[560px] pb-14 pl-0 pr-12 sm:pb-20 sm:pr-20">
          <div aria-hidden="true" className="absolute -bottom-0 right-0 h-[72%] w-[64%] bg-brown" />
          <div aria-hidden="true" className="absolute -left-5 -top-5 h-40 w-40 border-l border-t border-gold/60" />
          <Reveal variant="image" className="relative aspect-[4/5] overflow-hidden shadow-[0_40px_80px_-30px_rgb(40_19_16/0.5)]">
            <Image src={fachada} alt="Sede do escritório Tito S Amaral" fill sizes="(min-width: 1024px) 480px, 90vw" placeholder="blur" className="object-cover object-[50%_50%]" />
          </Reveal>
          <Reveal variant="image" delay={250} className="absolute bottom-0 right-0 w-[42%] overflow-hidden border-[6px] border-mist shadow-[0_30px_60px_-24px_rgb(40_19_16/0.55)]">
            <Image src={sala} alt="Sala de atendimento do escritório" sizes="240px" placeholder="blur" className="aspect-[3/4] h-auto w-full object-cover" />
          </Reveal>
        </div>

        <div>
          <Reveal>
            <span className="gold-rule" />
            <h2 className="heading-lg mt-8 text-brown">{about.heading}</h2>
          </Reveal>
          <Reveal delay={120} className="mt-8 space-y-5 text-[17px] text-muted-dark">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <dl className="mt-12 border-t border-sand">
            {about.pillars.map((p, i) => (
              <Reveal key={p.title} delay={200 + i * 100} className="grid gap-2 border-b border-sand py-6 sm:grid-cols-[150px_1fr] sm:gap-8">
                <dt className="font-serif text-[26px] font-semibold leading-none text-brown">{p.title}</dt>
                <dd className="text-[15px] leading-relaxed text-muted-dark">{p.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
