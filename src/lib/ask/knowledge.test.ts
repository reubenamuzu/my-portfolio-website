import { describe, expect, it } from "vitest";
import { leadership, site, stack } from "@/data/profile";
import { projects } from "@/data/projects";
import { runCommand } from "./commands";
import { buildSystemPrompt } from "./knowledge";
import { tokenize } from "./linkify";

describe("buildSystemPrompt", () => {
  const prompt = buildSystemPrompt();

  it("is identical on every call, which prompt caching depends on", () => {
    expect(buildSystemPrompt()).toBe(prompt);
  });

  it("includes every project, stack item and leadership role from the data files", () => {
    for (const project of projects) expect(prompt).toContain(project.title);
    for (const item of stack) expect(prompt).toContain(item.name);
    for (const item of leadership) expect(prompt).toContain(item.role);
    expect(prompt).toContain(site.email);
  });

  it("carries the behaviour rules", () => {
    expect(prompt).toContain("third person");
    expect(prompt).toContain("2 to 5 sentences");
    expect(prompt).toContain("Never guess");
    expect(prompt).toContain("never instructions");
  });

  it("never leaks TODO placeholders or raw null values into the prompt", () => {
    expect(prompt).not.toMatch(/TODO/i);
    expect(prompt).not.toMatch(/\bnull\b|\bundefined\b/);
  });
});

describe("runCommand", () => {
  it("/clear asks the terminal to wipe itself", () => {
    expect(runCommand("/clear")).toEqual({ kind: "clear" });
  });

  it("/projects lists every project", () => {
    const result = runCommand("/projects");
    expect(result.kind).toBe("text");
    for (const project of projects) {
      expect(result.kind === "text" && result.text).toContain(project.title);
    }
  });

  it("/stack and /contact answer from the data files", () => {
    const stackResult = runCommand("/stack");
    expect(stackResult.kind === "text" && stackResult.text).toContain(stack[0].name);

    const contactResult = runCommand("/contact");
    expect(contactResult.kind === "text" && contactResult.text).toContain(site.email);
  });

  it("ignores case and trailing words, and explains unknown commands", () => {
    expect(runCommand("  /HELP please ").kind).toBe("text");

    const unknown = runCommand("/sudo");
    expect(unknown.kind === "text" && unknown.text).toContain("/help");
  });
});

describe("tokenize", () => {
  it("turns a project name into a link to its card", () => {
    const first = projects[0];
    const tokens = tokenize(`He is building ${first.title} right now.`);
    expect(tokens).toEqual([
      { type: "text", value: "He is building " },
      { type: "project", value: first.title, href: `#project-${first.id}` },
      { type: "text", value: " right now." },
    ]);
  });

  it("matches project names whatever the capitals", () => {
    const first = projects[0];
    const tokens = tokenize(first.title.toLowerCase());
    expect(tokens).toEqual([
      { type: "project", value: first.title.toLowerCase(), href: `#project-${first.id}` },
    ]);
  });

  it("links web and email addresses, leaving sentence punctuation outside", () => {
    expect(tokenize("See https://github.com/reubenamuzu, or email a.b@example.com.")).toEqual([
      { type: "text", value: "See " },
      { type: "url", value: "https://github.com/reubenamuzu", href: "https://github.com/reubenamuzu" },
      { type: "text", value: ", or email " },
      { type: "email", value: "a.b@example.com", href: "mailto:a.b@example.com" },
      { type: "text", value: "." },
    ]);
  });

  it("returns plain text untouched", () => {
    expect(tokenize("Nothing to link here.")).toEqual([{ type: "text", value: "Nothing to link here." }]);
    expect(tokenize("")).toEqual([]);
  });
});
