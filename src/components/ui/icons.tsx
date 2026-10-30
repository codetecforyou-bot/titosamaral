import {
  Briefcase,
  Building2,
  Clock,
  Compass,
  Eye,
  FileText,
  Gavel,
  Handshake,
  HeartHandshake,
  Hourglass,
  House,
  KeyRound,
  Landmark,
  Lock,
  MessageCircle,
  Scale,
  ScrollText,
  ShieldCheck,
  Target,
  Users,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/config/types";

const map = {
  scale: Scale,
  gavel: Gavel,
  shield: ShieldCheck,
  users: Users,
  landmark: Landmark,
  file: FileText,
  scroll: ScrollText,
  handshake: Handshake,
  house: House,
  building: Building2,
  heart: HeartHandshake,
  briefcase: Briefcase,
  compass: Compass,
  eye: Eye,
  target: Target,
  lock: Lock,
  hourglass: Hourglass,
  key: KeyRound,
  message: MessageCircle,
  clock: Clock,
} satisfies Record<IconName, unknown>;

export function AreaIcon({ name, ...props }: { name: IconName } & LucideProps) {
  const Icon = map[name];
  return <Icon aria-hidden="true" strokeWidth={1.3} {...props} />;
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4c-1-1.6-1.5-3.4-1.5-5.2C2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zM20.5 3.5C18.2 1.2 15.2 0 12 0 5.4 0 .1 5.3.1 11.9c0 2.1.6 4.2 1.6 6L0 24l6.3-1.6c1.8 1 3.8 1.5 5.7 1.5 6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.5z" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Stars({ value = 5, className }: { value?: number; className?: string }) {
  const id = `star-clip-${Math.round(value * 10)}`;
  const star = "M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z";
  const full = Math.floor(value);
  const part = value - full;
  return (
    <svg role="img" aria-label={`${value.toLocaleString("pt-BR")} de 5 estrelas`} viewBox="0 0 120 24" className={className}>
      <defs>
        <clipPath id={id}>
          <rect x={full * 24} y="0" width={part * 24} height="24" />
        </clipPath>
      </defs>
      {Array.from({ length: 5 }, (_, i) => (
        <path key={i} d={star} transform={`translate(${i * 24} 0)`} fill={i < full ? "#C9A36A" : "rgb(201 163 106 / 0.25)"} />
      ))}
      {part > 0 && <path d={star} transform={`translate(${full * 24} 0)`} fill="#C9A36A" clipPath={`url(#${id})`} />}
    </svg>
  );
}
