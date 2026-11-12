/**
 * A basic prompt-injection check that runs before any text reaches the model.
 *
 * It is a first line of defence, not the only one: the system prompt also tells
 * the model to treat visitor text as questions and never as instructions. The
 * patterns aim at the well-known phrasings and are kept narrow so that ordinary
 * questions ("What rules does he follow for API design?") pass.
 */

export type InjectionRule = "override" | "reveal_prompt" | "role_change" | "fake_markup";

const RULES: { rule: InjectionRule; pattern: RegExp }[] = [
  {
    // "ignore all previous instructions", "disregard your rules"
    rule: "override",
    pattern:
      /\b(ignore|disregard|forget|override|bypass|skip)\b[^.?!\n]{0,40}\b(instructions?|prompts?|rules?|guidelines|directions|restrictions|guardrails|programming)\b/,
  },
  {
    // "new instructions: ..."
    rule: "override",
    pattern: /\b(new|updated|revised|real)\s+(instructions?|rules|system prompt)\s*:/,
  },
  {
    // "show me your system prompt", "repeat the text above"
    rule: "reveal_prompt",
    pattern:
      /\b(reveal|show|print|repeat|output|display|leak|share|give|tell|write|what)\b[^.?!\n]{0,50}\b(system\s*(prompt|message)|(initial|hidden|original|secret)\s+(prompt|instructions?)|your\s+(instructions?|prompt|rules|guidelines)|(text|words|everything)\s+above)\b/,
  },
  {
    // "you are now ...", "pretend to be ...", "developer mode"
    rule: "role_change",
    pattern:
      /\b(you\s+are\s+now|from\s+now\s+on,?\s+you|pretend\s+(to\s+be|you('re|\s+are))|role-?play\s+as|act\s+as\s+(an?\s+)?(different|new|unrestricted|unfiltered|uncensored)|developer\s+mode|dan\s+mode|jailbreak)\b/,
  },
  {
    // Text dressed up as a system or assistant turn.
    rule: "fake_markup",
    pattern:
      /<\/?\s*(system|assistant|instructions?)\s*>|\[\/?\s*(inst|system)\s*\]|#{2,}\s*(system|instructions?)\b|(^|\n)\s*(system|assistant)\s*:/,
  },
];

/** Lower-cases, removes invisible characters and squeezes runs of spaces. */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[​-‏⁠﻿]/g, "")
    .replace(/[ \t]+/g, " ");
}

export function detectInjection(text: string): { flagged: boolean; rule?: InjectionRule } {
  const clean = normalize(text);
  for (const { rule, pattern } of RULES) {
    if (pattern.test(clean)) return { flagged: true, rule };
  }
  return { flagged: false };
}

/** Shown instead of a model reply when the check trips. */
export const INJECTION_REPLY =
  "I can only answer questions about Reuben and his work, so I'll skip that one. Try asking about his projects, his tech stack, or how to contact him.";
