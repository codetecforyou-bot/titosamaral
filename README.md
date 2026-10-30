# Tito S Amaral Sociedade de Advogados · Site institucional

Site institucional com landing pages por área de atuação, formulário inteligente de qualificação de clientes e painel administrativo.

**Tecnologias:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Lucide Icons · Supabase (banco de dados) · Resend (e-mail, opcional).

---

## Rodar no computador

Requisitos: Node.js 20 ou superior.

```bash
npm install
cp .env.example .env.local     # preencha o que for usar
npm run dev                    # http://localhost:3000
```

Em desenvolvimento, sem Supabase configurado, os contatos são gravados em `.data/leads.json` para você testar o fluxo completo.

## Publicar (recomendado: Vercel + Supabase)

1. **Banco de dados:** crie um projeto em [supabase.com](https://supabase.com), abra o *SQL Editor* e rode `supabase/schema.sql`. Em *Project Settings > API*, copie a `URL` e a `service_role key`.
2. **Senha do painel:** gere o hash com `npm run hash-password -- "uma-senha-forte"` e gere o segredo da sessão com
   `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`.
3. **Hospedagem:** importe o projeto na [Vercel](https://vercel.com) e cadastre as variáveis de ambiente:

| Variável | Obrigatória | Para quê |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | sim | Domínio final, ex.: `https://titosamaral.adv.br` |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | sim | Gravar e ler os contatos |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD_HASH` / `AUTH_SECRET` | sim | Acesso ao painel `/admin` |
| `RESEND_API_KEY` / `LEADS_NOTIFY_EMAIL` / `LEADS_FROM_EMAIL` | não | Aviso por e-mail a cada novo contato |
| `LEADS_WEBHOOK_URL` / `LEADS_WEBHOOK_SECRET` | não | Enviar cada contato a um CRM ou automação (RD Station, HubSpot via Zapier/Make, n8n...) |

4. Aponte o domínio para a Vercel. O sitemap fica em `/sitemap.xml`; cadastre-o no Google Search Console.

> Em produção, sem Supabase, o formulário **não finge** que enviou: ele mostra um aviso e oferece o WhatsApp. Em servidor próprio (VPS) com disco persistente, é possível usar `LEADS_STORAGE=local`.

## Onde editar cada coisa

| O quê | Arquivo |
|---|---|
| Nome, WhatsApp, telefone, e-mail, endereço, horários, Instagram, nota do Google | `src/config/site.ts` |
| **Áreas de atuação:** conteúdo das landing pages e perguntas do formulário | `src/config/practice-areas.ts` |
| Perguntas comuns do formulário (área, objetivo) e fluxo de "Outra área" | `src/config/form.ts` |
| Equipe | `src/config/team.ts` (fotos em `public/images/equipe/`) |
| Sobre, missão, valores, diferenciais e avaliações | `src/config/institutional.ts` |
| Política de privacidade | `src/app/(site)/politica-de-privacidade/page.tsx` |
| Cores e tipografia | `src/app/globals.css` (bloco `@theme`) |

### Adicionar uma especialidade
Copie um bloco em `src/config/practice-areas.ts`, troque o `slug` (vira a URL `/areas/<slug>`) e escreva o conteúdo e as perguntas. A landing page, o card da página inicial, o rodapé, o sitemap, os dados estruturados e o formulário são atualizados automaticamente.

## Formulário inteligente

Seis etapas: **área → situação → momento atual → contexto → objetivo → contato**. As etapas 2 a 4 mudam conforme a área escolhida. Cada área pode marcar respostas como urgentes (ex.: "Alguém está preso agora"); nesse caso, a tela final destaca o WhatsApp.

Ao enviar, o servidor:
1. valida os dados (e confere se cada resposta existe na configuração);
2. bloqueia robôs (campo isca), outras origens e excesso de envios (5 a cada 10 minutos por IP);
3. grava no banco com a data do consentimento LGPD;
4. dispara o e-mail e o webhook, se configurados.

## Painel administrativo (`/admin`)

- Lista de contatos com contagem por status e filtro por especialidade.
- Detalhe de cada contato: respostas, mensagem, consentimento, página de origem, atalhos para WhatsApp e e-mail.
- Atualização de status (Novo, Em atendimento, Convertido, Arquivado) e anotações internas.
- Lista das especialidades com as perguntas de cada fluxo.

**Segurança:** sessão assinada (JWT HS256) em cookie `httpOnly`, `secure` e `sameSite=strict`, com validade de 8 horas; senha com hash `scrypt`; limite de tentativas de login; verificação no middleware e em cada página e ação. No Supabase, a tabela tem RLS ativo e nenhuma política pública: só o servidor, com a service role key, acessa os dados.

**Próxima etapa sugerida:** editar especialidades e textos pelo painel, migrando o conteúdo de `src/config` para o banco.

## SEO

Títulos e descrições individuais, URL canônica, Open Graph com imagem, `sitemap.xml`, `robots.txt` (bloqueia `/admin` e `/api`), dados estruturados `LegalService`, `Service`, `FAQPage` e `BreadcrumbList`, páginas das áreas geradas como HTML estático, imagens otimizadas (AVIF/WebP) com carregamento sob demanda e o mapa do Google carregado apenas com permissão.
