import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como o escritório Tito S Amaral coleta, usa e protege os seus dados pessoais, conforme a LGPD.",
  alternates: { canonical: "/politica-de-privacidade" },
};

// Modelo base. Recomenda-se a revisão final pelo próprio escritório.
export default function PrivacyPage() {
  return (
    <>
      <section className="grain bg-brown pb-20 pt-40 text-white lg:pt-48">
        <div className="container-site max-w-4xl">
          <span className="gold-rule" />
          <h1 className="heading-lg mt-8">Política de Privacidade</h1>
          <p className="mt-6 text-muted">Última atualização: [data da publicação]</p>
        </div>
      </section>
      <article className="bg-mist py-20">
        <div className="container-site max-w-3xl space-y-10 text-[16px] leading-relaxed text-muted-dark [&_h2]:mb-4 [&_h2]:text-[32px] [&_h2]:text-brown [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          <section>
            <h2>1. Quem somos</h2>
            <p>
              Este site pertence a {site.legalName}, {site.oab}, com sede em {site.address.street}, {site.address.district},{" "}
              {site.address.city}, {site.address.state}. Para os fins da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), o
              escritório é o controlador dos dados pessoais tratados por meio deste site.
            </p>
          </section>
          <section>
            <h2>2. Quais dados coletamos</h2>
            <ul>
              <li>Dados de contato informados no formulário: nome, telefone ou WhatsApp e e-mail.</li>
              <li>Respostas sobre a sua necessidade jurídica (área, situação, momento e objetivo) e a descrição opcional.</li>
              <li>Data e hora do envio e a página do site em que o formulário foi preenchido.</li>
            </ul>
            <p className="mt-4">Recomendamos não enviar documentos ou detalhes sensíveis pelo formulário. Essas informações podem ser tratadas no atendimento.</p>
          </section>
          <section>
            <h2>3. Para que usamos os dados</h2>
            <p>
              Usamos os dados apenas para analisar a sua solicitação, entrar em contato e prestar o atendimento jurídico solicitado.
              O tratamento se baseia no seu consentimento e em procedimentos preliminares à contratação (art. 7º, I e V, da LGPD).
              Não vendemos nem compartilhamos dados para fins de publicidade.
            </p>
          </section>
          <section>
            <h2>4. Com quem compartilhamos</h2>
            <p>
              Os dados são armazenados em provedores de tecnologia contratados pelo escritório (hospedagem, banco de dados e envio de
              e-mails), que atuam como operadores e seguem obrigações de segurança e confidencialidade. [Listar os provedores
              utilizados, por exemplo: Vercel, Supabase e Resend.]
            </p>
          </section>
          <section>
            <h2>5. Por quanto tempo guardamos</h2>
            <p>
              Mantemos os dados pelo tempo necessário ao atendimento e ao cumprimento de obrigações legais e éticas da advocacia.
              Contatos que não resultarem em contratação são excluídos em até [prazo definido pelo escritório].
            </p>
          </section>
          <section>
            <h2>6. Seus direitos</h2>
            <p>
              Você pode, a qualquer momento, solicitar a confirmação do tratamento, o acesso, a correção, a exclusão dos dados ou a
              revogação do consentimento, conforme o art. 18 da LGPD, pelo e-mail{" "}
              <a href={`mailto:${site.email}`} className="text-gold-deep underline">
                {site.email}
              </a>
              . Encarregado de dados: [nome do encarregado].
            </p>
          </section>
          <section id="cookies">
            <h2>7. Cookies</h2>
            <p>
              O site usa apenas recursos essenciais ao seu funcionamento, como a lembrança de que você já viu o aviso de cookies e o
              acesso seguro à área administrativa. Não utilizamos cookies de publicidade. O mapa do Google só é carregado quando você
              clica em “Carregar mapa”; a partir daí, o Google pode coletar dados conforme a política de privacidade dele.
            </p>
          </section>
          <section>
            <h2>8. Segurança</h2>
            <p>
              Adotamos medidas técnicas e administrativas para proteger os dados, como conexão criptografada (HTTPS), acesso restrito
              à área administrativa e armazenamento em banco de dados protegido.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
