import Image from "next/image";
import Link from "next/link";
import { practiceAreas } from "@/config/practice-areas";
import { mapsLink, nav, site, whatsappLink } from "@/config/site";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import logo from "@/assets/images/logo-tsa.png";

export function Footer() {
  return (
    <footer data-wa-hide className="grain bg-[#1c0d0b] text-muted">
      <div className="container-site grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.1fr_1.2fr]">
        <div>
          <Image src={logo} alt={site.name} width={284} height={56} sizes="284px" className="h-14 w-auto" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted/80">
            Advocacia estratégica e personalizada em Goiânia, com atendimento presencial e on-line em todo o Brasil.
          </p>
          <a
            href={site.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2.5 text-sm text-white transition-colors hover:text-gold"
          >
            <InstagramIcon className="size-5 text-gold" />
            {site.social.instagram.handle}
          </a>
        </div>

        <FooterCol title="Navegação">
          {nav.map((n) => (
            <FooterLink key={n.href} href={n.href}>
              {n.label}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Áreas de Atuação">
          {practiceAreas.map((a) => (
            <FooterLink key={a.slug} href={`/areas/${a.slug}`}>
              {a.name}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Contato">
          <li>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-2 hover:text-gold">
              <WhatsAppIcon className="size-4 text-gold" /> {site.whatsapp.display}
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="flex min-h-11 items-center break-all hover:text-gold">
              {site.email}
            </a>
          </li>
          <li>
            <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="block py-2.5 hover:text-gold">
              {site.address.street}, {site.address.district}
              <br />
              {site.address.city}, {site.address.state}
            </a>
          </li>
          <li className="py-2.5 text-muted/80">
            {site.hours[0].days}: {site.hours[0].time}
          </li>
        </FooterCol>
      </div>

      <div className="border-t border-gold/10">
        <div className="container-site flex flex-col gap-4 py-7 pb-10 text-[13px] text-muted/75 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. {site.oab}.
          </p>
          <div className="flex flex-wrap items-center gap-x-6">
            <Link href="/politica-de-privacidade" className="flex min-h-11 items-center hover:text-gold">
              Política de Privacidade
            </Link>
            <Link href="/politica-de-privacidade#cookies" className="flex min-h-11 items-center hover:text-gold">
              Cookies
            </Link>
            <span>Conteúdo informativo, em conformidade com o Provimento nº 205/2021 da OAB.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-sans text-[13px] font-semibold uppercase tracking-[0.16em] text-gold">{title}</h2>
      <ul className="mt-4 text-[15px]">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="flex min-h-11 items-center transition-colors hover:text-gold">
        {children}
      </Link>
    </li>
  );
}
