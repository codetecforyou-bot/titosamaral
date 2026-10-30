import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { mapsLink, site, whatsappLink } from "@/config/site";
import { OpenFormButton } from "@/components/SmartForm/OpenFormButton";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { MapEmbed } from "./MapEmbed";

export function Contact() {
  const items = [
    { icon: <WhatsAppIcon className="size-5" />, label: "WhatsApp", value: site.whatsapp.display, href: whatsappLink(), external: true },
    { icon: <Phone className="size-5" aria-hidden="true" />, label: "Telefone", value: site.phone.display, href: `tel:${site.phone.number}` },
    { icon: <Mail className="size-5" aria-hidden="true" />, label: "E-mail", value: site.email, href: `mailto:${site.email}` },
    {
      icon: <MapPin className="size-5" aria-hidden="true" />,
      label: "Endereço",
      value: `${site.address.street}, ${site.address.district}, ${site.address.city}, ${site.address.state}, ${site.address.zip}`,
      href: mapsLink(),
      external: true,
    },
    { icon: <InstagramIcon className="size-5" />, label: "Instagram", value: site.social.instagram.handle, href: site.social.instagram.url, external: true },
  ];

  return (
    <section id="contato" className="bg-mist py-28 lg:py-36">
      <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <Reveal>
            <span className="gold-rule" />
            <h2 className="heading-lg mt-8 text-brown">Fale com o escritório</h2>
            <p className="mt-6 max-w-md text-[17px] text-muted-dark">Atendimento presencial em Goiânia e on-line para todo o Brasil.</p>
          </Reveal>

          <ul className="mt-12 divide-y divide-sand border-y border-sand">
            {items.map((item, i) => (
              <Reveal as="li" key={item.label} delay={i * 60}>
                <a
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-5 py-5 transition-colors"
                >
                  <span className="flex size-11 flex-none items-center justify-center rounded-full border border-gold/40 text-gold-deep transition-colors group-hover:bg-brown group-hover:text-gold">
                    {item.icon}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-dark">{item.label}</span>
                    <span className="text-[15px] font-medium text-brown group-hover:text-gold-deep">{item.value}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-10 flex gap-5">
            <Clock className="mt-1 size-5 flex-none text-gold-deep" aria-hidden="true" />
            <div className="flex-1">
              <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-dark">Horário de atendimento</h3>
              <dl className="mt-3 text-[15px]">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 border-b border-sand py-2.5 last:border-0">
                    <dt className="text-muted-dark">{h.days}</dt>
                    <dd className="font-semibold text-brown">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              <WhatsAppIcon className="size-4" /> Chamar no WhatsApp
            </a>
            <OpenFormButton className="btn btn-outline-dark">Enviar meu caso</OpenFormButton>
          </div>
        </div>

        <Reveal variant="image" className="min-h-[440px] lg:min-h-full">
          <MapEmbed />
        </Reveal>
      </div>
    </section>
  );
}
