import { projects } from "@/data/projects";

/**
 * Splits a reply into plain text and things worth linking: project names
 * (to their card on the page), web addresses and email addresses.
 */

export type Token =
  | { type: "text"; value: string }
  | { type: "project"; value: string; href: string }
  | { type: "url"; value: string; href: string }
  | { type: "email"; value: string; href: string };

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Longest names first, so "Campus Print Platform" wins over a shorter overlap.
const projectNames = [...projects]
  .sort((a, b) => b.title.length - a.title.length)
  .map((project) => escapeRegExp(project.title));

const PATTERN = new RegExp(
  [
    `(?<url>https?:\\/\\/[^\\s<>"']+)`,
    `(?<email>[\\w.+-]+@[\\w-]+(?:\\.[\\w-]+)+)`,
    projectNames.length > 0 ? `(?<project>\\b(?:${projectNames.join("|")})\\b)` : null,
  ]
    .filter((part): part is string => part !== null)
    .join("|"),
  "gi",
);

const projectByTitle = new Map(projects.map((project) => [project.title.toLowerCase(), project]));

export function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  let cursor = 0;

  const pushText = (value: string) => {
    if (value) tokens.push({ type: "text", value });
  };

  for (const match of text.matchAll(PATTERN)) {
    const start = match.index;
    let value = match[0];

    if (match.groups?.url) {
      // A full stop or comma right after a link belongs to the sentence, not the link.
      value = value.replace(/[.,;:!?)]+$/, "");
      pushText(text.slice(cursor, start));
      tokens.push({ type: "url", value, href: value });
    } else if (match.groups?.email) {
      value = value.replace(/\.+$/, "");
      pushText(text.slice(cursor, start));
      tokens.push({ type: "email", value, href: `mailto:${value}` });
    } else {
      const project = projectByTitle.get(value.toLowerCase());
      if (!project) continue;
      pushText(text.slice(cursor, start));
      tokens.push({ type: "project", value, href: `#project-${project.id}` });
    }
    cursor = start + value.length;
  }

  pushText(text.slice(cursor));
  return tokens;
}
