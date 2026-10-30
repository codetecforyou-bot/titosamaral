import { CookieNotice } from "@/components/layout/CookieNotice";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SmartFormProvider } from "@/components/SmartForm/SmartFormProvider";
import { JsonLd } from "@/components/ui/JsonLd";
import { legalServiceSchema } from "@/lib/seo";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmartFormProvider>
      <a href="#conteudo" className="sr-only z-[200] bg-gold px-4 py-3 text-brown focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
      <WhatsAppButton />
      <CookieNotice />
      <JsonLd data={legalServiceSchema()} />
    </SmartFormProvider>
  );
}
