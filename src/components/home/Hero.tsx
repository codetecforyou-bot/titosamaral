import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { site } from "@/config/site";
import { OpenFormButton } from "@/components/SmartForm/OpenFormButton";
import { Stars } from "@/components/ui/icons";
import fachada from "@/assets/images/fachada.jpg";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-brown text-white lg:items-center">
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          src={fachada}
          alt="Fachada da sede do escritório Tito S Amaral em Goiânia"
          priority
          placeholder="blur"
          sizes="(max-width: 1024px) 1217px, 100vw"
          className="hero-zoom h-full w-full object-cover object-[60%_55%]"
        />
      </div>
      {/* Tratamento cinematográfico da foto */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#281310_0%,rgb(40_19_16/0.92)_32%,rgb(40_19_16/0.55)_62%,rgb(17_17_17/0.35)_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,#281310_0%,transparent_45%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 mix-blend-color bg-brown/40" />

      <div className="container-site pb-24 pt-36 lg:py-40">
        <div className="hero-text max-w-[760px]">
          <span className="gold-rule" />
          <h1 className="heading-xl mt-8 text-white">
            Excelência jurídica, estratégia e <em className="font-medium text-gold-light">compromisso</em> com seus direitos.
          </h1>
          <p className="lead-text mt-7 max-w-xl text-white/80">
            Atuação jurídica estratégica, personalizada e comprometida com a proteção dos seus interesses.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <OpenFormButton className="btn btn-gold">
              Encontre a solução jurídica ideal <ArrowRight className="size-4" aria-hidden="true" />
            </OpenFormButton>
            <Link href="/#escritorio" className="btn btn-outline-light">
              Conheça o escritório
            </Link>
          </div>
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/15 pt-7 text-sm text-white/75">
            <a href={site.google.reviewsUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-3 hover:text-white">
              <span className="font-serif text-3xl font-semibold text-gold">{site.google.rating.toLocaleString("pt-BR")}</span>
              <span className="flex flex-col gap-1">
                <Stars value={site.google.rating} className="h-3.5 w-[72px]" />
                <span className="text-[13px]">de avaliação no Google</span>
              </span>
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-gold" aria-hidden="true" />
              Goiânia, GO · atendimento em todo o Brasil
            </span>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="h-10 w-px overflow-hidden bg-white/15">
          <span className="scroll-cue block h-4 w-px bg-gold" />
        </span>
      </div>
    </section>
  );
}
