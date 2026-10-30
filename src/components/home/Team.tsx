import Image from "next/image";
import { Check } from "lucide-react";
import { team } from "@/config/team";
import type { TeamMember } from "@/config/types";
import { Reveal } from "@/components/ui/Reveal";

export function Team({ members = team, title = "Nossa equipe", intro, id = "equipe", tone = "light" }: {
  members?: TeamMember[];
  title?: string;
  intro?: string;
  id?: string;
  tone?: "light" | "white";
}) {
  return (
    <section id={id} className={`py-28 lg:py-36 ${tone === "light" ? "bg-mist" : "bg-white"}`}>
      <div className="container-site">
        <Reveal className="max-w-2xl">
          <span className="gold-rule" />
          <h2 className="heading-lg mt-8 text-brown">{title}</h2>
          <p className="mt-6 text-[17px] text-muted-dark">
            {intro ?? "Profissionais que acompanham cada caso de perto, com preparo técnico e atenção às pessoas."}
          </p>
        </Reveal>
        <ul className="mt-16 grid gap-8 lg:grid-cols-2">
          {members.map((m, i) => (
            <Reveal as="li" key={m.slug} delay={i * 120}>
              <TeamCard member={m} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function TeamCard({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(" ")
    .filter((p) => p.length > 2)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <article className="group grid h-full overflow-hidden border border-sand bg-white sm:grid-cols-[220px_1fr]">
      <div className="relative aspect-[4/5] overflow-hidden bg-brown sm:aspect-auto">
        {member.photo ? (
          <Image src={member.photo} alt={`Foto de ${member.name}`} fill sizes="(min-width: 640px) 220px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="grain flex h-full min-h-56 flex-col items-center justify-center gap-3">
            <span className="font-serif text-6xl font-semibold text-gold">{initials}</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted/60">[Foto profissional]</span>
          </div>
        )}
      </div>
      <div className="flex flex-col p-7 sm:p-9">
        <h3 className="text-[30px] text-brown">{member.name}</h3>
        <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.12em] text-gold-deep">{member.role}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Especialidades">
          {member.specialties.map((s) => (
            <li key={s} className="border border-sand bg-mist px-3 py-1 text-xs font-medium text-brown">
              {s}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[15px] text-muted-dark">{member.bio}</p>
        <ul className="mt-5 space-y-2 text-sm text-ink">
          {member.qualifications.map((q) => (
            <li key={q} className="flex gap-2.5">
              <Check className="mt-0.5 size-4 flex-none text-gold-deep" aria-hidden="true" />
              {q}
            </li>
          ))}
        </ul>
        {member.oab && <p className="mt-auto pt-6 text-xs tracking-wide text-muted-dark">{member.oab}</p>}
      </div>
    </article>
  );
}
