import { ArrowRight } from "lucide-react";
import { whatsappLink } from "@/config/site";
import { OpenFormButton } from "@/components/SmartForm/OpenFormButton";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBand({
  title = "Cada caso merece atenção individual.",
  text = "Conte a sua situação em poucos passos. Nossa equipe analisa e retorna o contato com os próximos passos.",
  area,
  whatsappMessage,
}: {
  title?: string;
  text?: string;
  area?: string;
  whatsappMessage?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gold py-24 text-brown lg:py-28">
      <div aria-hidden="true" className="absolute -right-40 -top-40 size-[520px] rounded-full border border-brown/10" />
      <div aria-hidden="true" className="absolute -right-20 -top-20 size-[360px] rounded-full border border-brown/10" />
      <div className="container-site relative grid items-end gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <Reveal>
          <h2 className="text-[44px] leading-[1.02] sm:text-6xl lg:text-[72px]">{title}</h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-[17px] text-brown/80">{text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <OpenFormButton area={area} className="btn btn-dark">
              Avaliar meu caso <ArrowRight className="size-4" aria-hidden="true" />
            </OpenFormButton>
            <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn border border-brown/30 text-brown hover:bg-brown hover:text-gold">
              <WhatsAppIcon className="size-4" /> WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
