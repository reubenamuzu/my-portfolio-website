import Image from "next/image";
import type { IconType } from "react-icons";
import { LuCreditCard, LuDatabaseZap, LuLibrary } from "react-icons/lu";
import {
  SiClaude,
  SiClerk,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiTypescript,
} from "react-icons/si";
import { accentFor } from "@/data/projects";
import {
  bio,
  certifications,
  education,
  leadership,
  site,
  stack,
  type StackIcon,
} from "@/data/site";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

const ICONS: Record<StackIcon, IconType> = {
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  nodejs: SiNodedotjs,
  nestjs: SiNestjs,
  postgresql: SiPostgresql,
  prisma: SiPrisma,
  clerk: SiClerk,
  paystack: LuCreditCard,
  claude: SiClaude,
  rag: LuLibrary,
  pgvector: LuDatabaseZap,
  python: SiPython,
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="shell py-14 md:py-20">
      <Reveal>
        <SectionTitle id="about-title" accent="lime">
          About
        </SectionTitle>
      </Reveal>

      {/* Bio + portrait */}
      <Reveal>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_18rem]">
          <div className="max-w-2xl space-y-5 text-base sm:text-lg">
            {bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="mono text-ink-muted">
              <span className="text-lime">LOC</span> {site.location}
            </p>
          </div>

          <div className="accent-lime relative mx-auto w-full max-w-[18rem] border border-line bg-surface-1 p-2">
            <span className="bracket bracket-tl" aria-hidden="true" />
            <span className="bracket bracket-br" aria-hidden="true" />
            <Image
              src="/images/portrait.png"
              alt={`Portrait of ${site.name}`}
              width={800}
              height={1076}
              sizes="(min-width: 1024px) 272px, 272px"
              className="h-auto w-full"
            />
          </div>
        </div>
      </Reveal>

      {/* Stack */}
      <Reveal className="mt-14">
        <h3 className="mb-5 text-sm font-bold tracking-[0.2em]">Stack</h3>
        <ul className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {stack.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.name} className={`stack-item accent-${accentFor(i)}`}>
                <span className="stack-icon">
                  <Icon aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-ink-heading">
                    {item.name}
                  </span>
                  <span className="mono block text-[0.65rem] text-ink-muted">{item.note}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </Reveal>

      {/* Leadership + credentials as HUD stat panels */}
      <Reveal className="mt-14">
        <h3 className="mb-5 text-sm font-bold tracking-[0.2em]">Leadership</h3>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((item, i) => (
            <li key={item.role} className={`panel accent-${accentFor(i)}`}>
              <p className="panel-label mono">LDR-{pad(i + 1)}</p>
              <p className="mt-2 font-display text-sm font-bold uppercase tracking-[0.08em] text-ink-heading">
                {item.role}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{item.org}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-10">
        <h3 className="mb-5 text-sm font-bold tracking-[0.2em]">Education &amp; Certifications</h3>
        <ul className="grid gap-4 sm:grid-cols-2">
          <li className="panel accent-violet">
            <p className="panel-label mono">EDU-01</p>
            <p className="mt-2 font-display text-sm font-bold uppercase tracking-[0.08em] text-ink-heading">
              {education.degree}
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              {education.school} · {education.note}
            </p>
          </li>
          {certifications.map((cert, i) => (
            <li key={cert.name} className="panel accent-cyan">
              <p className="panel-label mono">CERT-{pad(i + 1)}</p>
              <p className="mt-2 font-display text-sm font-bold uppercase tracking-[0.08em] text-ink-heading">
                {cert.name}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{cert.issuer}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
