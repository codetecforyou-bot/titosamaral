import Image from "next/image";
import { reviews } from "@/config/institutional";
import { site } from "@/config/site";
import { Stars } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import flavio from "@/assets/images/avaliacao-flavio.png";
import fabio from "@/assets/images/avaliacao-fabio.png";

const photos = { flavio, fabio };

export function Reviews() {
  const [main, ...rest] = reviews;
  return (
    <section id="avaliacoes" className="grain bg-ink py-28 text-white lg:py-36">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <Reveal className="max-w-xl">
            <span className="gold-rule" />
            <h2 className="heading-lg mt-8">O que dizem nossos clientes</h2>
          </Reveal>
          <Reveal delay={120}>
            <a
              href={site.google.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 border border-gold/40 px-7 py-5 transition-colors hover:border-gold hover:bg-white/[0.03]"
            >
              <span className="font-serif text-6xl font-semibold leading-none text-gold">{site.google.rating.toLocaleString("pt-BR")}</span>
              <span className="flex flex-col gap-1.5">
                <Stars value={site.google.rating} className="h-4 w-24" />
                <span className="text-sm font-medium">de avaliação no Google</span>
                <span className="text-[13px] text-gold underline underline-offset-2">Ver todas as avaliações</span>
              </span>
            </a>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-5">
          <Reveal as="figure" className="flex flex-col justify-between gap-12 bg-mist p-7 text-brown sm:p-14 lg:col-span-3 lg:row-span-2">
            <span aria-hidden="true" className="font-serif text-[120px] leading-[0.5] text-gold">“</span>
            <blockquote className="font-serif text-[34px] font-semibold leading-[1.1] sm:text-[56px]">{main.text}</blockquote>
            <ReviewAuthor review={main} light={false} />
          </Reveal>
          {rest.map((r, i) => (
            <Reveal as="figure" key={r.name} delay={150 + i * 120} className="flex flex-col justify-between gap-10 border border-white/10 bg-white/[0.03] p-8 sm:p-10 lg:col-span-2">
              <blockquote className="font-serif text-[30px] font-semibold leading-tight">{r.text}</blockquote>
              <ReviewAuthor review={r} light />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewAuthor({ review, light }: { review: (typeof reviews)[number]; light: boolean }) {
  return (
    <figcaption className={`flex items-center gap-4 border-t pt-6 ${light ? "border-white/10" : "border-sand"}`}>
      {review.photo ? (
        <Image src={photos[review.photo]} alt={`Foto de ${review.name}`} className="size-12 flex-none rounded-full object-cover" />
      ) : (
        <span aria-hidden="true" className="flex size-12 flex-none items-center justify-center rounded-full bg-[#E0457B] text-lg font-semibold text-white">
          {review.name[0]}
        </span>
      )}
      <span className="flex flex-col gap-1">
        <span className={`font-semibold ${light ? "text-white" : "text-brown"}`}>{review.name}</span>
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted-dark">
          <Stars value={5} className="h-3 w-[60px]" />
          <span className={light ? "text-muted/70" : ""}>Avaliação no Google</span>
        </span>
      </span>
    </figcaption>
  );
}
