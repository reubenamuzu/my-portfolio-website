import { accentFor, featuredProjects, projects } from "@/data/projects";
import HudCard from "./HudCard";
import { ProjectLinks } from "./ProjectCard";
import ProjectMedia from "./ProjectMedia";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

export default function FeaturedProjects() {
  if (featuredProjects.length === 0) return null;

  return (
    <section aria-labelledby="featured-title" className="shell py-14 md:py-20">
      <Reveal>
        <SectionTitle id="featured-title" accent="magenta">
          Featured Projects
        </SectionTitle>
      </Reveal>

      <div className="grid gap-8">
        {featuredProjects.map((project, i) => {
          // Same colour the project gets in the "All Projects" grid.
          const accent = accentFor(projects.indexOf(project));
          const flip = i % 2 === 1;

          return (
            <Reveal key={project.id}>
              <HudCard accent={accent}>
                <div className="grid lg:grid-cols-2">
                  <ProjectMedia
                    src={project.image}
                    alt={project.imageAlt}
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className={`lg:aspect-auto lg:min-h-[21rem] ${flip ? "lg:order-2" : ""}`}
                  />

                  <div className="flex flex-col gap-5 p-6 sm:p-8 lg:p-10">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="badge mono">{project.status}</span>
                      <span className="mono text-ink-muted">
                        Featured · {project.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="accent-bar" aria-hidden="true" />
                      <h3 className="text-xl font-bold sm:text-2xl">{project.title}</h3>
                    </div>

                    <p className="text-ink">{project.description ?? project.summary}</p>

                    <ul className="mono flex flex-wrap gap-2" aria-label="Technologies">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="border border-line-strong bg-surface-2 px-2.5 py-1 text-ink-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-2">
                      <ProjectLinks project={project} />
                    </div>
                  </div>
                </div>
              </HudCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
