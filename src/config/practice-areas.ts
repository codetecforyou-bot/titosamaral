import type { ChoiceStep, PracticeArea } from "./types";

/**
 * Cadastro central das áreas de atuação.
 *
 * Para ADICIONAR uma especialidade: copie um bloco, troque o `slug`
 * (vira a URL /areas/<slug>) e escreva o conteúdo e o fluxo do formulário.
 * Para REMOVER: apague o bloco. Página, card, sitemap, rodapé e formulário
 * são atualizados automaticamente.
 */

const locationStep = (id: string, question = "Onde o caso acontece ou deve tramitar?"): ChoiceStep => ({
  id,
  question,
  helper: "Atendemos presencialmente em Goiânia e on-line em todo o Brasil.",
  options: [
    { value: "goiania", label: "Goiânia" },
    { value: "regiao-metropolitana", label: "Região metropolitana de Goiânia" },
    { value: "interior-go", label: "Outra cidade de Goiás" },
    { value: "outro-estado", label: "Outro estado" },
    { value: "nao-sei", label: "Ainda não sei" },
  ],
});

export const practiceAreas: PracticeArea[] = [
  // ───────────────────────────── FAMÍLIA ─────────────────────────────
  {
    slug: "direito-de-familia",
    name: "Direito de Família",
    summary:
      "Divórcio, guarda, pensão alimentícia, partilha de bens e união estável, conduzidos com técnica, discrição e cuidado com as pessoas envolvidas.",
    icon: "users",
    featured: true,
    seo: {
      title: "Advogado de Direito de Família em Goiânia",
      description:
        "Divórcio, guarda, pensão alimentícia, partilha de bens, união estável, interdição e curatela. Atendimento jurídico humanizado e sigiloso em Goiânia.",
    },
    hero: {
      title: "Direito de Família: decisões delicadas pedem orientação segura e humana.",
      subtitle:
        "Conduzimos questões familiares com sigilo, sensibilidade e firmeza técnica, buscando soluções que preservem o que mais importa para você.",
    },
    intro: {
      heading: "Quando a família muda, os seus direitos precisam estar protegidos",
      paragraphs: [
        "O Direito de Família trata das relações mais próximas da vida de uma pessoa: casamento, união estável, filhos, alimentos e patrimônio construído em conjunto. São situações em que a emoção e a técnica jurídica caminham lado a lado.",
        "Nosso papel é traduzir a lei em decisões claras. Avaliamos cada caso de forma individual, explicamos os caminhos possíveis, consensuais ou judiciais, e priorizamos soluções que reduzam o desgaste, especialmente quando há filhos envolvidos.",
        "Sempre que possível, buscamos o acordo. Quando ele não é viável, atuamos com firmeza para defender os seus interesses perante o Judiciário.",
      ],
    },
    situations: [
      { title: "Divórcio e separação", description: "Consensual ou litigioso, em cartório ou na Justiça, com definição de partilha, guarda e alimentos." },
      { title: "Guarda e convivência", description: "Guarda compartilhada ou unilateral e regulamentação do convívio, sempre com foco no melhor interesse da criança." },
      { title: "Pensão alimentícia", description: "Fixação, revisão, exoneração e execução de alimentos, para quem paga e para quem recebe." },
      { title: "Partilha de bens", description: "Levantamento e divisão do patrimônio conforme o regime de bens e a realidade de cada família." },
      { title: "União estável", description: "Reconhecimento, formalização e dissolução de união estável, com proteção dos direitos patrimoniais." },
      { title: "Interdição e curatela", description: "Proteção jurídica de pessoas que não conseguem, sozinhas, praticar atos da vida civil." },
    ],
    howWeHelp: [
      { title: "Escuta e diagnóstico", description: "Entendemos a sua história, os documentos disponíveis e o que é prioridade para você." },
      { title: "Estratégia clara", description: "Apresentamos os caminhos possíveis, com riscos, prazos e custos explicados sem juridiquês." },
      { title: "Busca de acordo", description: "Quando há espaço para diálogo, conduzimos a negociação para uma solução mais rápida e menos desgastante." },
      { title: "Atuação judicial", description: "Se necessário, representamos você no processo, com acompanhamento próximo em cada etapa." },
    ],
    differentials: [
      { title: "Sigilo absoluto", description: "Questões familiares são tratadas com total discrição, do primeiro contato ao fim do caso.", icon: "lock" },
      { title: "Olhar humano", description: "Entendemos que por trás de cada processo existe uma família e uma história.", icon: "heart" },
      { title: "Foco nos filhos", description: "Quando há crianças envolvidas, o bem-estar delas orienta as nossas decisões.", icon: "shield" },
    ],
    responsible: ["tito-souza-do-amaral", "joao-paulo-lopes-tito"],
    faq: [
      { question: "O divórcio pode ser feito em cartório?", answer: "Em muitos casos, sim. Quando há consenso entre o casal e os requisitos legais são atendidos, o divórcio pode ser feito por escritura pública em cartório, com a assistência obrigatória de advogado. Avaliamos o seu caso para indicar o caminho mais adequado." },
      { question: "Como funciona a guarda compartilhada?", answer: "Na guarda compartilhada, os pais dividem as responsabilidades e decisões sobre a vida dos filhos. Ela é a regra no Brasil, mas cada caso é analisado considerando o melhor interesse da criança." },
      { question: "É possível revisar o valor da pensão alimentícia?", answer: "Sim. Se houver mudança na necessidade de quem recebe ou na possibilidade de quem paga, é possível pedir a revisão do valor, para mais ou para menos." },
      { question: "Preciso ser casado no papel para ter direitos na partilha?", answer: "Não necessariamente. A união estável também gera direitos patrimoniais. Para isso, pode ser necessário comprovar a existência da união e o período de convivência." },
    ],
    cta: {
      title: "Converse com quem entende de Direito de Família",
      text: "Conte a sua situação de forma reservada. Vamos entender o seu caso e indicar os próximos passos.",
    },
    form: {
      situation: {
        id: "situacao",
        question: "Qual situação melhor descreve o seu caso?",
        options: [
          { value: "divorcio", label: "Divórcio ou separação" },
          { value: "guarda", label: "Guarda e regulamentação de visitas" },
          { value: "pensao", label: "Pensão alimentícia" },
          { value: "partilha", label: "Partilha de bens" },
          { value: "uniao-estavel", label: "União estável (reconhecimento ou dissolução)" },
          { value: "curatela", label: "Interdição e curatela" },
          { value: "outra", label: "Outra questão de família" },
        ],
      },
      status: {
        id: "momento",
        question: "O que está acontecendo atualmente?",
        options: [
          { value: "sem-processo", label: "Ainda não há processo, estou buscando orientação" },
          { value: "acordo", label: "Existe diálogo ou possibilidade de acordo" },
          { value: "conflito", label: "Há conflito e não existe acordo" },
          { value: "processo-andamento", label: "Já existe um processo em andamento" },
          { value: "intimacao", label: "Recebi uma intimação ou citação" },
          { value: "decisao", label: "Há uma decisão que precisa ser cumprida ou revista" },
        ],
      },
      context: locationStep("local"),
      urgent: {
        stepId: "momento",
        values: ["intimacao"],
        message: "Intimações e citações costumam ter prazos curtos. Recomendamos continuar o atendimento pelo WhatsApp agora.",
      },
    },
  },

  // ───────────────────────────── CRIMINAL ─────────────────────────────
  {
    slug: "direito-criminal",
    name: "Direito Criminal",
    summary:
      "Defesa técnica em investigações, prisões, audiências e processos criminais, com acompanhamento próximo desde o primeiro contato.",
    icon: "gavel",
    featured: true,
    seo: {
      title: "Advogado Criminalista em Goiânia",
      description:
        "Defesa criminal em inquéritos, prisões em flagrante, audiências de custódia, processos criminais, Tribunal do Júri e execução penal em Goiânia.",
    },
    hero: {
      title: "Direito Criminal: defesa técnica e firme quando a sua liberdade está em jogo.",
      subtitle:
        "Atuação estratégica em todas as fases da persecução penal, do inquérito ao julgamento, com sigilo e atenção a cada detalhe.",
    },
    intro: {
      heading: "Uma acusação criminal muda a vida. A defesa precisa começar cedo",
      paragraphs: [
        "Ser investigado, intimado ou acusado de um crime gera insegurança e medo. Nesse momento, decisões tomadas sem orientação podem comprometer toda a defesa.",
        "A Constituição garante a todos o direito à ampla defesa, ao contraditório e à presunção de inocência. Nosso trabalho é assegurar que esses direitos sejam respeitados em cada ato, da delegacia aos tribunais.",
        "Analisamos as provas, identificamos falhas no procedimento e construímos uma estratégia de defesa individualizada, sempre com transparência sobre os riscos e as possibilidades do caso.",
      ],
    },
    situations: [
      { title: "Prisão em flagrante e preventiva", description: "Atuação imediata em audiência de custódia, pedidos de liberdade provisória e habeas corpus." },
      { title: "Inquérito policial", description: "Acompanhamento de depoimentos e defesa desde a fase de investigação." },
      { title: "Processo criminal", description: "Defesa técnica completa, da resposta à acusação até as alegações finais e a sentença." },
      { title: "Tribunal do Júri", description: "Atuação em crimes dolosos contra a vida, com preparação estratégica para o plenário." },
      { title: "Recursos", description: "Recursos e ações nos tribunais para revisar decisões e corrigir ilegalidades." },
      { title: "Execução penal", description: "Progressão de regime, livramento condicional, remição e demais direitos de quem cumpre pena." },
    ],
    howWeHelp: [
      { title: "Atendimento ágil", description: "Situações criminais exigem resposta rápida. Priorizamos o primeiro contato e as medidas urgentes." },
      { title: "Análise do caso", description: "Estudamos o inquérito, as provas e o procedimento para identificar a melhor linha de defesa." },
      { title: "Estratégia de defesa", description: "Definimos com você, de forma transparente, os caminhos e as medidas cabíveis." },
      { title: "Acompanhamento integral", description: "Estamos presentes em depoimentos, audiências e julgamentos, mantendo você informado." },
    ],
    differentials: [
      { title: "Sigilo total", description: "Tudo o que você compartilha com o advogado é protegido pelo sigilo profissional.", icon: "lock" },
      { title: "Agilidade", description: "Prazos penais são curtos. Atuamos com rapidez nas medidas que exigem urgência.", icon: "clock" },
      { title: "Defesa técnica", description: "Atenção às garantias constitucionais e às nulidades do processo.", icon: "scale" },
    ],
    responsible: [],
    faq: [
      { question: "Recebi uma intimação para depor na delegacia. O que fazer?", answer: "Procure um advogado antes de comparecer. Ele pode acompanhar o depoimento e orientar você sobre como se manifestar, inclusive sobre o direito de permanecer em silêncio." },
      { question: "O que é audiência de custódia?", answer: "É a audiência em que a pessoa presa em flagrante é apresentada a um juiz, geralmente em até 24 horas. Nela o juiz avalia a legalidade da prisão e se a pessoa pode responder ao processo em liberdade." },
      { question: "Um familiar foi preso. Como posso ajudar?", answer: "Entre em contato com um advogado o quanto antes. Com as informações básicas, como nome, local e motivo da prisão, é possível adotar as primeiras medidas de defesa." },
      { question: "O advogado pode acompanhar o caso desde o inquérito?", answer: "Sim, e é recomendável. A atuação na fase de investigação permite acompanhar a produção das provas e evitar prejuízos à defesa." },
    ],
    cta: {
      title: "Precisa de um advogado criminalista agora?",
      text: "Fale com o escritório de forma reservada. Em casos urgentes, continue o atendimento pelo WhatsApp.",
    },
    form: {
      situation: {
        id: "situacao",
        question: "Qual situação melhor descreve o seu caso?",
        options: [
          { value: "prisao", label: "Prisão em flagrante ou preventiva" },
          { value: "inquerito", label: "Investigação ou inquérito policial" },
          { value: "processo", label: "Processo criminal em andamento" },
          { value: "depoimento", label: "Intimação para depor" },
          { value: "juri", label: "Tribunal do Júri" },
          { value: "execucao", label: "Execução penal (cumprimento de pena)" },
          { value: "vitima", label: "Sou vítima de um crime" },
          { value: "outra", label: "Outra situação criminal" },
        ],
      },
      status: {
        id: "urgencia",
        question: "Qual é a urgência neste momento?",
        options: [
          { value: "preso-agora", label: "Alguém está preso agora" },
          { value: "audiencia-marcada", label: "Há audiência ou depoimento marcado" },
          { value: "intimacao-recente", label: "Recebi intimação ou citação recentemente" },
          { value: "andamento", label: "O caso está em andamento, sem urgência imediata" },
          { value: "preventiva", label: "Quero orientação preventiva" },
        ],
      },
      context: locationStep("local", "Onde o caso está tramitando?"),
      urgent: {
        stepId: "urgencia",
        values: ["preso-agora", "audiencia-marcada", "intimacao-recente"],
        message: "Pelo que você informou, o caso pode exigir medidas imediatas. Continue o atendimento agora pelo WhatsApp.",
      },
    },
  },

  // ───────────────────────────── INVENTÁRIO ─────────────────────────────
  {
    slug: "inventario-e-heranca",
    name: "Inventário e Herança",
    summary:
      "Inventário judicial ou em cartório, partilha entre herdeiros e testamentos, com agilidade e redução de conflitos familiares.",
    icon: "scroll",
    featured: true,
    seo: {
      title: "Advogado de Inventário e Herança em Goiânia",
      description:
        "Inventário judicial e extrajudicial, partilha de herança, testamentos e regularização de bens. Atuação ágil e cuidadosa em Goiânia e em todo o Brasil.",
    },
    hero: {
      title: "Inventário e Herança: conduzimos a partilha com agilidade, clareza e respeito.",
      subtitle:
        "Cuidamos de toda a parte jurídica para que a sua família possa atravessar esse momento com mais tranquilidade.",
    },
    intro: {
      heading: "Organizar a herança é também cuidar da família",
      paragraphs: [
        "Após o falecimento de alguém, os bens, direitos e dívidas deixados precisam ser formalmente transferidos aos herdeiros por meio do inventário. Sem ele, imóveis não podem ser vendidos ou regularizados e valores podem ficar bloqueados.",
        "O inventário pode ser feito em cartório, de forma mais rápida, quando os requisitos legais são atendidos, ou na Justiça, quando há divergências ou outras situações que exigem a via judicial.",
        "Avaliamos a sua situação, indicamos o caminho mais eficiente e conduzimos todas as etapas: levantamento de bens, cálculo e recolhimento do ITCMD, partilha e registro.",
      ],
    },
    situations: [
      { title: "Inventário em cartório", description: "Procedimento extrajudicial, mais ágil, quando os herdeiros estão de acordo e os requisitos legais são atendidos." },
      { title: "Inventário judicial", description: "Condução do processo na Justiça quando há conflito, testamento ou outras exigências legais." },
      { title: "Conflito entre herdeiros", description: "Mediação e atuação técnica para resolver divergências sobre a divisão dos bens." },
      { title: "Testamentos", description: "Cumprimento, interpretação e questionamento de testamentos." },
      { title: "Inventário parado", description: "Retomada e destravamento de inventários que estão sem andamento." },
      { title: "Venda de bens do espólio", description: "Autorização e regularização para vender imóveis e outros bens durante ou após o inventário." },
    ],
    howWeHelp: [
      { title: "Levantamento", description: "Identificamos bens, dívidas, herdeiros e documentos necessários." },
      { title: "Melhor caminho", description: "Indicamos se o inventário pode ser feito em cartório ou se precisa ser judicial." },
      { title: "Impostos e custos", description: "Orientamos sobre o ITCMD e as despesas do procedimento, com transparência." },
      { title: "Partilha e registro", description: "Conduzimos a partilha até a transferência efetiva dos bens aos herdeiros." },
    ],
    differentials: [
      { title: "Agilidade", description: "Priorizamos o caminho mais rápido e seguro para cada família.", icon: "hourglass" },
      { title: "Mediação de conflitos", description: "Buscamos o consenso entre herdeiros sempre que possível.", icon: "handshake" },
      { title: "Visão patrimonial", description: "Cuidado técnico com imóveis, empresas e investimentos do espólio.", icon: "landmark" },
    ],
    responsible: ["tito-souza-do-amaral", "joao-paulo-lopes-tito"],
    faq: [
      { question: "Existe prazo para abrir o inventário?", answer: "Sim. A lei prevê a abertura em até dois meses após o falecimento. O atraso pode gerar multa sobre o imposto de transmissão (ITCMD), conforme a legislação de cada estado." },
      { question: "Quando o inventário pode ser feito em cartório?", answer: "Em regra, quando todos os herdeiros estão de acordo com a partilha e os demais requisitos legais são atendidos. As regras foram ampliadas nos últimos anos, por isso vale avaliar cada caso." },
      { question: "Quanto tempo demora um inventário?", answer: "Depende do tipo de procedimento, da documentação e do consenso entre os herdeiros. Inventários em cartório costumam ser mais rápidos que os judiciais." },
      { question: "Os herdeiros respondem pelas dívidas de quem faleceu?", answer: "As dívidas são pagas com os bens deixados, até o limite da herança. Os herdeiros não respondem com o próprio patrimônio além do que receberam." },
    ],
    cta: {
      title: "Vamos organizar o inventário da sua família",
      text: "Conte o que aconteceu e quais bens estão envolvidos. Indicaremos o caminho mais adequado.",
    },
    form: {
      situation: {
        id: "situacao",
        question: "Qual situação melhor descreve o seu caso?",
        options: [
          { value: "abrir-inventario", label: "Falecimento recente, preciso abrir o inventário" },
          { value: "inventario-parado", label: "Inventário já aberto, mas parado ou demorado" },
          { value: "conflito-herdeiros", label: "Há conflito entre os herdeiros" },
          { value: "testamento", label: "Dúvidas sobre testamento" },
          { value: "venda-bens", label: "Venda ou regularização de bens do espólio" },
          { value: "direitos-herdeiro", label: "Sou herdeiro e quero entender meus direitos" },
        ],
      },
      status: {
        id: "momento",
        question: "Como está a relação entre os herdeiros?",
        options: [
          { value: "nada-iniciado", label: "Ainda não iniciamos nada" },
          { value: "consenso", label: "Os herdeiros estão de acordo" },
          { value: "divergencia", label: "Há divergência entre os herdeiros" },
          { value: "judicial-existente", label: "Já existe inventário na Justiça" },
          { value: "cartorio-existente", label: "Já existe inventário em cartório" },
        ],
      },
      context: {
        id: "bens",
        question: "Onde estão os bens deixados?",
        helper: "Isso ajuda a definir o procedimento e os impostos envolvidos.",
        options: [
          { value: "goiania", label: "Em Goiânia" },
          { value: "goias", label: "Em outras cidades de Goiás" },
          { value: "varios-estados", label: "Em mais de um estado" },
          { value: "exterior", label: "Há bens no exterior" },
          { value: "nao-sei", label: "Ainda não sei" },
        ],
      },
    },
  },

  // ───────────────────────────── PLANEJAMENTO ─────────────────────────────
  {
    slug: "planejamento-sucessorio",
    name: "Planejamento Sucessório",
    summary:
      "Testamentos, doações e holding familiar para organizar a transmissão do patrimônio e prevenir disputas futuras.",
    icon: "landmark",
    seo: {
      title: "Planejamento Sucessório e Holding Familiar em Goiânia",
      description:
        "Testamento, doação em vida, holding familiar e organização patrimonial para proteger a família e evitar conflitos na sucessão. Atendimento em Goiânia.",
    },
    hero: {
      title: "Planejamento Sucessório: proteja o seu patrimônio e a harmonia da sua família.",
      subtitle:
        "Organize hoje a transmissão dos seus bens com segurança jurídica, eficiência e respeito à sua vontade.",
    },
    intro: {
      heading: "Planejar a sucessão é um ato de cuidado com quem você ama",
      paragraphs: [
        "O planejamento sucessório reúne instrumentos jurídicos que permitem organizar, ainda em vida, como o patrimônio será transmitido. É uma forma de evitar disputas, reduzir a burocracia e dar mais previsibilidade aos herdeiros.",
        "Não existe um modelo único. Testamento, doação com reserva de usufruto, holding familiar e acordos societários são algumas das ferramentas, e a escolha depende do perfil do patrimônio e dos objetivos de cada família.",
        "Construímos um plano personalizado, dentro dos limites da lei, considerando também os impactos tributários de cada alternativa.",
      ],
    },
    situations: [
      { title: "Testamento", description: "Elaboração de testamento para registrar a sua vontade com segurança jurídica." },
      { title: "Doação em vida", description: "Doações com reserva de usufruto e cláusulas de proteção do patrimônio." },
      { title: "Holding familiar", description: "Avaliação e estruturação de holding para organizar bens e a sucessão." },
      { title: "Empresa familiar", description: "Planejamento da sucessão na gestão e na participação societária." },
      { title: "Proteção patrimonial", description: "Cláusulas de incomunicabilidade, impenhorabilidade e inalienabilidade, quando cabíveis." },
      { title: "Revisão de planejamento", description: "Atualização de planos existentes diante de mudanças na família ou na lei." },
    ],
    howWeHelp: [
      { title: "Mapeamento", description: "Entendemos a composição do patrimônio, a estrutura familiar e os seus objetivos." },
      { title: "Alternativas", description: "Comparamos os instrumentos possíveis, com vantagens, custos e impactos tributários." },
      { title: "Estruturação", description: "Elaboramos os documentos e conduzimos os registros necessários." },
      { title: "Acompanhamento", description: "Revisamos o planejamento quando a família ou o patrimônio mudam." },
    ],
    differentials: [
      { title: "Plano sob medida", description: "Cada família recebe uma estrutura pensada para a sua realidade.", icon: "compass" },
      { title: "Visão preventiva", description: "Antecipamos conflitos para que eles não cheguem ao Judiciário.", icon: "eye" },
      { title: "Discrição", description: "Informações patrimoniais tratadas com sigilo absoluto.", icon: "lock" },
    ],
    responsible: ["tito-souza-do-amaral", "joao-paulo-lopes-tito"],
    faq: [
      { question: "Planejamento sucessório é só para grandes patrimônios?", answer: "Não. Famílias com um único imóvel também podem se beneficiar, especialmente para evitar conflitos e reduzir custos e prazos do inventário." },
      { question: "Posso deixar todos os meus bens para quem eu quiser?", answer: "Quem tem herdeiros necessários (filhos, pais ou cônjuge, por exemplo) pode dispor livremente de até metade do patrimônio. A outra metade é reservada por lei a esses herdeiros." },
      { question: "A holding familiar sempre compensa?", answer: "Não necessariamente. Ela pode trazer benefícios em alguns casos, mas também envolve custos e obrigações. Por isso, a decisão deve ser tomada após uma análise individual." },
      { question: "O testamento pode ser alterado depois?", answer: "Sim. O testamento pode ser revogado ou modificado a qualquer tempo pelo próprio testador, observadas as formalidades legais." },
    ],
    cta: {
      title: "Comece a planejar o futuro do seu patrimônio",
      text: "Uma conversa inicial ajuda a entender quais instrumentos fazem sentido para a sua família.",
    },
    form: {
      situation: {
        id: "objetivo-planejamento",
        question: "Qual situação melhor descreve o seu caso?",
        options: [
          { value: "organizar-sucessao", label: "Quero organizar a sucessão do meu patrimônio" },
          { value: "testamento", label: "Quero fazer um testamento" },
          { value: "holding", label: "Quero avaliar uma holding familiar" },
          { value: "doacao", label: "Quero doar bens em vida" },
          { value: "empresa-familiar", label: "Sucessão em empresa familiar" },
          { value: "entender", label: "Quero entender as alternativas" },
        ],
      },
      status: {
        id: "momento",
        question: "Qual é o seu momento atual?",
        options: [
          { value: "pesquisando", label: "Estou começando a pesquisar sobre o tema" },
          { value: "familia-alinhada", label: "Já conversei com a família sobre o assunto" },
          { value: "revisar", label: "Já tenho um planejamento e quero revisá-lo" },
          { value: "urgencia-saude", label: "Há urgência por motivo de saúde ou idade" },
        ],
      },
      context: {
        id: "patrimonio",
        question: "Qual é o perfil principal do patrimônio?",
        options: [
          { value: "imoveis", label: "Imóveis urbanos" },
          { value: "rurais", label: "Imóveis rurais" },
          { value: "empresas", label: "Empresas ou participações societárias" },
          { value: "investimentos", label: "Investimentos financeiros" },
          { value: "diversificado", label: "Patrimônio diversificado" },
        ],
      },
    },
  },

  // ───────────────────────────── CIVIL ─────────────────────────────
  {
    slug: "direito-civil",
    name: "Direito Civil",
    summary:
      "Contratos, cobranças, indenizações e questões imobiliárias, com atuação preventiva e contenciosa.",
    icon: "file",
    seo: {
      title: "Advogado de Direito Civil em Goiânia",
      description:
        "Elaboração e revisão de contratos, cobranças, indenizações por danos morais e materiais e questões imobiliárias. Advocacia cível em Goiânia.",
    },
    hero: {
      title: "Direito Civil: segurança jurídica para os seus contratos, bens e relações.",
      subtitle:
        "Atuação preventiva para evitar problemas e atuação firme quando é preciso defender os seus direitos.",
    },
    intro: {
      heading: "Boa parte dos conflitos pode ser evitada com orientação no momento certo",
      paragraphs: [
        "O Direito Civil está presente no dia a dia: na compra de um imóvel, na assinatura de um contrato, em uma dívida não paga ou em um dano sofrido. Conhecer os seus direitos e deveres faz toda a diferença.",
        "Atuamos de forma preventiva, revisando e elaborando documentos para reduzir riscos, e de forma contenciosa, representando você em negociações e processos judiciais.",
        "Cada caso é analisado com atenção aos documentos, aos prazos e às provas disponíveis, para que você tome decisões com segurança.",
      ],
    },
    situations: [
      { title: "Contratos", description: "Elaboração, revisão e negociação de contratos civis e de prestação de serviços." },
      { title: "Descumprimento contratual", description: "Medidas para exigir o cumprimento ou a reparação por quebra de contrato." },
      { title: "Cobranças", description: "Cobrança extrajudicial e judicial de valores devidos." },
      { title: "Indenizações", description: "Ações por danos materiais e morais, para quem sofreu ou para quem foi acusado do dano." },
      { title: "Questões imobiliárias", description: "Compra e venda, locação, usucapião e regularização de imóveis." },
      { title: "Defesa em ações cíveis", description: "Representação de quem foi processado, com análise técnica da defesa." },
    ],
    howWeHelp: [
      { title: "Análise documental", description: "Revisamos contratos, comprovantes e comunicações relacionadas ao caso." },
      { title: "Avaliação de riscos", description: "Explicamos as chances, os custos e os prazos de cada caminho." },
      { title: "Negociação", description: "Buscamos soluções extrajudiciais quando elas atendem aos seus interesses." },
      { title: "Processo judicial", description: "Representamos você perante o Judiciário quando a via judicial é necessária." },
    ],
    differentials: [
      { title: "Atuação preventiva", description: "Contratos bem feitos evitam processos longos e caros.", icon: "shield" },
      { title: "Comunicação clara", description: "Você entende cada etapa e cada decisão do caso.", icon: "message" },
      { title: "Visão estratégica", description: "Avaliamos o melhor custo-benefício antes de agir.", icon: "target" },
    ],
    responsible: [],
    faq: [
      { question: "Vale a pena revisar um contrato antes de assinar?", answer: "Sim. A revisão prévia ajuda a identificar cláusulas abusivas, riscos e lacunas que poderiam gerar conflitos no futuro." },
      { question: "Existe prazo para entrar com uma ação de indenização?", answer: "Sim. Os prazos de prescrição variam conforme o tipo de situação. Por isso é importante buscar orientação assim que o problema acontecer." },
      { question: "Fui citado em um processo. O que fazer?", answer: "A citação abre prazo para apresentar defesa. Procure um advogado o quanto antes, levando o documento recebido e as informações do caso." },
      { question: "É possível resolver sem entrar na Justiça?", answer: "Muitas vezes, sim. Notificações, negociações e acordos podem resolver o conflito de forma mais rápida e econômica." },
    ],
    cta: {
      title: "Proteja os seus direitos com orientação especializada",
      text: "Conte o que está acontecendo e receba uma avaliação do melhor caminho para o seu caso.",
    },
    form: {
      situation: {
        id: "situacao",
        question: "Qual situação melhor descreve o seu caso?",
        options: [
          { value: "contrato", label: "Elaboração ou revisão de contrato" },
          { value: "descumprimento", label: "Descumprimento de contrato" },
          { value: "cobranca", label: "Cobrança de valores" },
          { value: "indenizacao", label: "Indenização por danos materiais ou morais" },
          { value: "imovel", label: "Questão com imóvel (compra, venda, locação)" },
          { value: "fui-processado", label: "Fui processado em uma ação cível" },
          { value: "outra", label: "Outra questão cível" },
        ],
      },
      status: {
        id: "momento",
        question: "O que está acontecendo atualmente?",
        options: [
          { value: "prevenir", label: "Quero prevenir um problema" },
          { value: "sem-processo", label: "Ainda não há processo" },
          { value: "tentativa-amigavel", label: "Tentei resolver de forma amigável, sem sucesso" },
          { value: "citacao", label: "Recebi notificação ou citação" },
          { value: "processo-andamento", label: "Já existe processo em andamento" },
        ],
      },
      context: {
        id: "valor",
        question: "Qual é o valor aproximado envolvido?",
        helper: "Uma estimativa já ajuda. Você pode preferir não informar.",
        options: [
          { value: "ate-20mil", label: "Até R$ 20 mil" },
          { value: "20-100mil", label: "De R$ 20 mil a R$ 100 mil" },
          { value: "100-500mil", label: "De R$ 100 mil a R$ 500 mil" },
          { value: "acima-500mil", label: "Acima de R$ 500 mil" },
          { value: "nao-informar", label: "Prefiro não informar ou não sei" },
        ],
      },
      urgent: {
        stepId: "momento",
        values: ["citacao"],
        message: "Citações abrem prazo para defesa. Recomendamos continuar o atendimento pelo WhatsApp agora.",
      },
    },
  },
];

export function getArea(slug: string) {
  return practiceAreas.find((a) => a.slug === slug);
}
