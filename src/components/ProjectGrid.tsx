"use client";

import { useState } from "react";
import { accentFor, CATEGORIES, projects, type Category } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

type Filter = "All" | Category;
const FILTERS: Filter[] = ["All", ...CATEGORIES];

export default function ProjectGrid() {
  const [filter, setFilter] = useState<Filter>("All");

  // Keep each project's original position so its accent colour never changes with the filter.
  const visible = projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => filter === "All" || project.category === filter);

  return (
    <section id="projects" aria-labelledby="projects-title" className="shell py-14 md:py-20">
      <Reveal>
        <SectionTitle id="projects-title">All Projects</SectionTitle>

        <div
          role="group"
          aria-label="Filter projects by category"
          className="mb-4 flex flex-wrap gap-2"
        >
          {FILTERS.map((name) => (
            <button
              key={name}
              type="button"
              className="chip mono"
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
            >
              {name}
            </button>
          ))}
        </div>

        <p className="mono mb-6 text-ink-muted" aria-live="polite">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
          {filter === "All" ? "" : ` in ${filter}`}
        </p>
      </Reveal>

      {visible.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map(({ project, index }) => (
            <li key={project.id}>
              <Reveal className="h-full">
                <ProjectCard project={project} accent={accentFor(index)} />
              </Reveal>
            </li>
          ))}
        </ul>
      ) : (
        <p className="border border-line bg-surface-1 p-6 text-ink-muted">
          Nothing in {filter} yet. More is on the way.
        </p>
      )}
    </section>
  );
}
