export type IconName =
  | "scale"
  | "gavel"
  | "shield"
  | "users"
  | "landmark"
  | "file"
  | "scroll"
  | "handshake"
  | "house"
  | "building"
  | "heart"
  | "briefcase"
  | "compass"
  | "eye"
  | "target"
  | "lock"
  | "hourglass"
  | "key"
  | "message"
  | "clock";

export type FormOption = { value: string; label: string };

/** Uma pergunta de múltipla escolha do formulário inteligente. */
export type ChoiceStep = {
  id: string;
  question: string;
  helper?: string;
  options: FormOption[];
};

/** Fluxo de perguntas específico de uma especialidade. */
export type AreaFormFlow = {
  situation: ChoiceStep;
  status: ChoiceStep;
  context: ChoiceStep;
  /** Respostas que indicam urgência: a tela final destaca o WhatsApp. */
  urgent?: { stepId: string; values: string[]; message: string };
};

export type PracticeArea = {
  slug: string;
  name: string;
  /** Texto curto exibido no card da página inicial. */
  summary: string;
  icon: IconName;
  /** Áreas principais aparecem em destaque na página inicial. */
  featured?: boolean;
  seo: { title: string; description: string };
  hero: { title: string; subtitle: string };
  intro: { heading: string; paragraphs: string[] };
  situations: { title: string; description: string }[];
  howWeHelp: { title: string; description: string }[];
  differentials: { title: string; description: string; icon: IconName }[];
  /** Slugs da equipe responsável. Deixe vazio até confirmar. */
  responsible: string[];
  faq: { question: string; answer: string }[];
  cta: { title: string; text: string };
  form: AreaFormFlow;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  photo?: string;
  specialties: string[];
  bio: string;
  qualifications: string[];
  oab?: string;
};
