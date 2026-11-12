import Reveal from "../Reveal";
import SectionTitle from "../SectionTitle";
import AskTerminalLazy from "./AskTerminalLazy";

/** The "Ask Amson" section on the home page. The terminal itself loads lazily. */
export default function AskSection() {
  return (
    <section id="ask" aria-labelledby="ask-title" className="shell py-14 md:py-20">
      <Reveal>
        <SectionTitle id="ask-title" accent="cyan">
          Ask Amson
        </SectionTitle>
        <p className="mb-8 max-w-2xl text-base sm:text-lg">
          An AI assistant that answers questions about my work. I built it on the Claude API with
          the same guardrails as my LLM Guardrails Proxy: input validation, rate limiting and
          prompt-injection checks.
        </p>
      </Reveal>

      <Reveal>
        <div className="mx-auto max-w-3xl">
          <AskTerminalLazy />
        </div>
      </Reveal>
    </section>
  );
}
