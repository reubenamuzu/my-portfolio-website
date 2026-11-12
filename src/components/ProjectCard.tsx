import { FaGithub } from "react-icons/fa6";
import { LuArrowUpRight } from "react-icons/lu";
import type { Accent, Project } from "@/data/projects";
import HudCard from "./HudCard";
import ProjectMedia from "./ProjectMedia";

/** GitHub and live links, or a muted "pending" note while a link is still a placeholder. */
export function ProjectLinks({ project }: { project: Project }) {
  return (
    <ul className="mono flex flex-wrap items-center gap-x-5 gap-y-2">
      <li>
        {project.github ? (
          <a
            className="glitch-link"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub aria-hidden="true" />
            Code
            <span className="sr-only"> for {project.title} (opens in a new tab)</span>
          </a>
        ) : (
          <span className="pending">Repo pending</span>
        )}
      </li>
      <li>
        {project.live ? (
          <a
            className="glitch-link"
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live
            <LuArrowUpRight aria-hidden="true" />
            <span className="sr-only"> site for {project.title} (opens in a new tab)</span>
          </a>
        ) : (
          <span className="pending">Demo pending</span>
        )}
      </li>
    </ul>
  );
}

/** Mono meta line, e.g. "NEXT.JS · CLAUDE API". Upper-casing happens in CSS. */
export const metaLine = (project: Project) => project.tags.slice(0, 3).join(" · ");

type Props = { project: Project; accent: Accent };

export default function ProjectCard({ project, accent }: Props) {
  return (
    <HudCard accent={accent} id={`project-${project.id}`} className="h-full">
      <ProjectMedia
        src={project.image}
        alt={project.imageAlt}
        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
      >
        <span className="badge mono absolute left-3 top-3">{project.status}</span>
        <div className="media-shade">
          <div className="flex items-center gap-3">
            <span className="accent-bar" aria-hidden="true" />
            <h3 className="card-title">{project.title}</h3>
          </div>
          <p className="card-meta mono">{metaLine(project)}</p>
        </div>
      </ProjectMedia>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <p className="text-sm text-ink">{project.summary}</p>
        <div className="mt-auto flex items-center justify-between gap-3">
          <ProjectLinks project={project} />
          <span className="mono shrink-0 text-ink-muted">{project.category}</span>
        </div>
      </div>
    </HudCard>
  );
}
