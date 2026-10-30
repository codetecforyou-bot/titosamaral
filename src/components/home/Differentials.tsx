import { differentials } from "@/config/institutional";
import { AreaIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";

export function Differentials() {
  return (
    <section id="diferenciais" className="bg-white py-28 lg:py-36">
      <div className="container-site grid gap-16 lg:grid-cols-[0.8fr_1.6fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <span className="gold-rule" />
          <h2 className="heading-lg mt-8 text-brown">Por que confiar o seu caso ao escritório</h2>
          <p className="mt-6 text-[17px] text-muted-dark">
            Uma forma de trabalhar construída sobre técnica, ética e respeito a cada pessoa que nos procura.
          </p>
        </Reveal>
        <ul className="grid gap-px overflow-hidden border border-sand bg-sand sm:grid-cols-2">
          {differentials.map((d, i) => (
            <Reveal as="li" key={d.title} delay={(i % 2) * 120} className="group bg-white p-8 transition-colors duration-500 hover:bg-mist sm:p-10">
              <AreaIcon name={d.icon} className="size-8 text-gold-deep transition-transform duration-500 group-hover:-translate-y-1" />
              <h3 className="mt-7 text-[28px] text-brown">{d.title}</h3>
              <p className="mt-3 text-[15px] text-muted-dark">{d.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
