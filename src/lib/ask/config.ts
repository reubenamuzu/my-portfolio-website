/**
 * Limits and defaults for "Ask Amson".
 * Safe to import from the browser: there are no secrets in this file.
 */

export const LIMITS = {
  /** Longest question a visitor can send. */
  messageChars: 500,
  /** How many earlier messages are sent along for context. */
  historyTurns: 10,
  /** Longest single earlier message accepted. */
  historyTurnChars: 2000,
  /** Requests allowed per visitor (by IP) each minute. */
  perMinute: 10,
  /** Requests allowed per visitor (by IP) each day. */
  perDay: 50,
} as const;

/** Used when the ANTHROPIC_MODEL environment variable is not set. */
export const DEFAULT_MODEL = "claude-haiku-5-5";

/** Cap on the length of one reply. Replies are meant to be 2 to 5 sentences. */
export const MAX_OUTPUT_TOKENS = 400;

/** Error codes the API route can return, shared with the terminal UI. */
export type AskErrorCode = "invalid_input" | "rate_limited" | "unavailable";

export type AskErrorBody = {
  error: AskErrorCode;
  /** Safe to show to the visitor. */
  message: string;
  /** Seconds until the visitor can try again (rate limiting only). */
  retryAfter?: number;
};

/** Response header that marks a canned reply which did not come from the model. */
export const SOURCE_HEADER = "x-ask-source";
