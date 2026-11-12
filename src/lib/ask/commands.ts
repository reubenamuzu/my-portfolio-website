import { contact, site, socials, stack } from "@/data/profile";
import { projects } from "@/data/projects";

/**
 * Slash commands are answered here, in the browser, from the same data files
 * the site uses. They never call the API, so they keep working when the
 * assistant is offline.
 */

export const COMMANDS = [
  { name: "/help", about: "list these commands" },
  { name: "/projects", about: "what Reuben has built" },
  { name: "/stack", about: "the tools he works with" },
  { name: "/contact", about: "how to reach him" },
  { name: "/clear", about: "wipe the terminal" },
] as const;

export const SUGGESTIONS = [
  "What is he building now?",
  "What's his tech stack?",
  "Is he open to internships?",
  "Tell me about the Dental X-ray AI",
] as const;

export const WELCOME = `Ask anything about ${site.name}'s work, or type /help for commands.`;

export const OFFLINE_MESSAGE = `The AI assistant is offline right now. Slash commands still work (try /help), or reach Reuben directly at ${contact.email} or through the contact section.`;

export type CommandResult = { kind: "clear" } | { kind: "text"; text: string };

export function runCommand(input: string): CommandResult {
  const name = input.trim().split(/\s+/)[0].toLowerCase();

  switch (name) {
    case "/clear":
      return { kind: "clear" };

    case "/help":
      return {
        kind: "text",
        text: [
          "Commands:",
          ...COMMANDS.map((command) => `  ${command.name.padEnd(10)} ${command.about}`),
          "",
          "Or just type a question about Reuben's work.",
        ].join("\n"),
      };

    case "/projects":
      return {
        kind: "text",
        text: projects
          .map((project) => `${project.title} [${project.status}]\n  ${project.summary}`)
          .join("\n"),
      };

    case "/stack":
      return {
        kind: "text",
        text: stack.map((item) => `${item.name} (${item.note})`).join("\n"),
      };

    case "/contact":
      return {
        kind: "text",
        text: [
          `Email: ${contact.email}`,
          ...socials.map((social) => `${social.label}: ${social.href}`),
        ].join("\n"),
      };

    default:
      return { kind: "text", text: `Unknown command "${name}". Type /help to see what's available.` };
  }
}
