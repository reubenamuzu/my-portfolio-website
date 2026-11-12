import { site, socials } from "@/data/site";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

/** Shows a link without the "https://www." so it reads like terminal output. */
const short = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="shell py-14 md:py-20">
      <Reveal>
        <SectionTitle id="contact-title" accent="violet">
          Contact
        </SectionTitle>
      </Reveal>

      <Reveal>
        <div className="terminal mx-auto max-w-3xl">
          <div className="terminal-bar" aria-hidden="true">
            <span className="terminal-dot accent-magenta" />
            <span className="terminal-dot accent-lime" />
            <span className="terminal-dot accent-cyan" />
            <span className="mono ml-3 normal-case text-ink-muted">amson@kumasi: ~/contact</span>
          </div>

          <div className="terminal-body">
            <p>
              <span className="prompt" aria-hidden="true">
                ${" "}
              </span>
              whoami
            </p>
            <p className="text-ink-heading">
              {site.name} · {site.role}
            </p>

            <p className="mt-4">
              <span className="prompt" aria-hidden="true">
                ${" "}
              </span>
              cat contact.txt
            </p>
            <dl className="grid grid-cols-[6.5rem_1fr] gap-x-3 sm:grid-cols-[8rem_1fr]">
              <dt className="text-ink-muted">email</dt>
              <dd>
                <a className="glitch-link accent-cyan" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </dd>
              {socials.map((social) => (
                <div key={social.id} className="contents">
                  <dt className="text-ink-muted">{social.label.toLowerCase()}</dt>
                  <dd>
                    <a
                      className="glitch-link accent-cyan"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {short(social.href)}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-4">
              <span className="prompt" aria-hidden="true">
                ${" "}
              </span>
              echo &quot;Got a project or a role in mind? Send me an email.&quot;
            </p>
            <p aria-hidden="true">
              <span className="prompt">$ </span>
              <span className="caret" />
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <a href={`mailto:${site.email}`} className="btn btn-primary accent-cyan">
            Email Me
          </a>
        </div>
      </Reveal>
    </section>
  );
}
