import { site } from "@/data/profile";
import TileWall from "./TileWall";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="shell pt-8 md:pt-12">
      <div className="hero-panel accent-cyan grid lg:grid-cols-[1.05fr_0.95fr]">
        <span className="bracket bracket-tl" aria-hidden="true" />
        <span className="bracket bracket-tr" aria-hidden="true" />
        <span className="bracket bracket-bl" aria-hidden="true" />
        <span className="bracket bracket-br" aria-hidden="true" />

        <p className="hero-label mono z-10 px-6 pt-7 text-cyan sm:px-10 lg:absolute lg:right-8 lg:top-6 lg:px-3 lg:py-1.5">
          &gt; Now building: {site.nowBuilding}
        </p>

        <div className="flex flex-col justify-center gap-6 px-6 pb-9 pt-6 sm:px-10 sm:pb-12 lg:py-16 lg:pl-14 lg:pr-6">
          <span className="hero-bar" aria-hidden="true" />

          <div>
            <h1 id="hero-title" className="hero-name">
              <span className="block whitespace-nowrap">Reuben</span>
              <span className="block whitespace-nowrap">Korsi Amuzu</span>
            </h1>
            <p className="mono mt-4 text-ink-muted">
              {"// "}also known as <span className="text-magenta">{site.alias}</span>
            </p>
          </div>

          <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-cyan sm:text-base">
            {site.role}
          </p>

          <p className="max-w-xl text-base text-ink sm:text-lg">{site.intro}</p>

          <div className="flex flex-wrap gap-4 pt-1">
            <a href="#projects" className="btn btn-primary accent-cyan">
              View Projects
            </a>
            <a href="#contact" className="btn btn-ghost accent-magenta">
              Contact Me
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden border-t border-line lg:min-h-[33rem] lg:border-l lg:border-t-0">
          <TileWall />
        </div>
      </div>
    </section>
  );
}
