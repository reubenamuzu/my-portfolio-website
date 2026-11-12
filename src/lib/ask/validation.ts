import { z } from "zod";
import { LIMITS } from "./config";

const turnSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(LIMITS.historyTurnChars),
});

export const askRequestSchema = z.object({
  message: z.string().trim().min(1).max(LIMITS.messageChars),
  history: z.array(turnSchema).max(LIMITS.historyTurns).default([]),
});

export type AskRequest = z.infer<typeof askRequestSchema>;
export type HistoryTurn = z.infer<typeof turnSchema>;

export type ParseResult =
  | { ok: true; data: AskRequest }
  | { ok: false; message: string };

/**
 * Checks a request body and returns either clean data or a message that is
 * safe to show the visitor. Unknown fields are dropped.
 */
export function parseAskRequest(input: unknown): ParseResult {
  const result = askRequestSchema.safeParse(input);
  if (result.success) return { ok: true, data: result.data };

  // Report the first problem in plain words rather than zod's wording.
  const field = result.error.issues[0]?.path[0];
  if (field === "history") {
    return {
      ok: false,
      message: "This conversation is too long to continue. Type /clear to start a new one.",
    };
  }

  const raw =
    typeof input === "object" && input !== null && "message" in input
      ? (input as { message: unknown }).message
      : undefined;
  if (typeof raw === "string" && raw.trim().length > LIMITS.messageChars) {
    return {
      ok: false,
      message: `Questions can be up to ${LIMITS.messageChars} characters. Try a shorter one.`,
    };
  }
  return { ok: false, message: "Type a question first." };
}

/**
 * The Claude API needs a conversation to open with a user message, so drop
 * anything before the first one.
 */
export function normalizeHistory(history: HistoryTurn[]): HistoryTurn[] {
  const firstUser = history.findIndex((turn) => turn.role === "user");
  return firstUser === -1 ? [] : history.slice(firstUser);
}
