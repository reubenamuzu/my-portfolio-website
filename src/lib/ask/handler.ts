import Anthropic from "@anthropic-ai/sdk";
import {
  DEFAULT_MODEL,
  MAX_OUTPUT_TOKENS,
  SOURCE_HEADER,
  type AskErrorBody,
  type AskErrorCode,
} from "./config";
import { detectInjection, INJECTION_REPLY } from "./injection";
import { SYSTEM_PROMPT } from "./knowledge";
import { clientKey, getRateLimiter } from "./rate-limit";
import { normalizeHistory, parseAskRequest } from "./validation";

/**
 * Server-side handler for POST /api/ask.
 *
 * Order of checks, cheapest first:
 *   1. input validation          -> 400
 *   2. is an API key configured? -> 503 (the UI falls back to slash commands)
 *   3. rate limit per visitor    -> 429
 *   4. prompt-injection check    -> canned reply, the model is never called
 *   5. Claude API, streamed back as plain text
 *
 * Privacy: nothing a visitor types is logged or stored. Failures are logged
 * by type only.
 */

const REFUSAL_REPLY =
  "I can't help with that one. I can tell you about Reuben's projects, his tech stack, or how to get in touch with him.";

const TEXT_HEADERS = {
  "content-type": "text/plain; charset=utf-8",
  "cache-control": "no-store",
  "x-content-type-options": "nosniff",
};

function errorResponse(
  status: number,
  error: AskErrorCode,
  message: string,
  retryAfter?: number,
): Response {
  const body: AskErrorBody = { error, message, ...(retryAfter ? { retryAfter } : {}) };
  return Response.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
      ...(retryAfter ? { "retry-after": String(retryAfter) } : {}),
    },
  });
}

const unavailable = () =>
  errorResponse(503, "unavailable", "The assistant is offline right now.");

/** A fixed reply that did not come from the model. */
const cannedResponse = (text: string) =>
  new Response(text, { headers: { ...TEXT_HEADERS, [SOURCE_HEADER]: "guardrail" } });

let client: Anthropic | undefined;
let clientKeyUsed: string | undefined;

function getClient(apiKey: string): Anthropic {
  if (!client || clientKeyUsed !== apiKey) {
    // One retry and a short timeout: a visitor is waiting on this.
    client = new Anthropic({ apiKey, maxRetries: 1, timeout: 20_000 });
    clientKeyUsed = apiKey;
  }
  return client;
}

/**
 * Per-model request settings.
 *
 * On Claude Haiku 5.5, thinking is on by default and shares the max_tokens
 * budget with the visible answer, so a 400-token cap could be spent before any
 * text appears. These are short factual answers, so thinking is switched off
 * for Haiku. Several other current models reject "disabled", so for those
 * thinking stays on and the cap is raised to leave room for it.
 */
function modelSettings(
  model: string,
): Pick<Anthropic.MessageStreamParams, "max_tokens" | "thinking" | "output_config"> {
  if (model.startsWith("claude-haiku-5")) {
    return {
      max_tokens: MAX_OUTPUT_TOKENS,
      thinking: { type: "disabled" },
      output_config: { effort: "low" },
    };
  }
  return { max_tokens: MAX_OUTPUT_TOKENS + 800, output_config: { effort: "low" } };
}

/** Logs what kind of failure happened, never what the visitor wrote. */
function logFailure(error: unknown): void {
  if (error instanceof Anthropic.APIError) {
    console.error(`[ask] Claude API error, status ${error.status ?? "unknown"}`);
  } else {
    console.error("[ask] request to the Claude API failed");
  }
}

/** Yields the reply text piece by piece as the model writes it. */
async function* replyText(
  stream: ReturnType<Anthropic["messages"]["stream"]>,
): AsyncGenerator<string> {
  let wroteText = false;
  for await (const event of stream) {
    if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
      wroteText = true;
      yield event.delta.text;
    }
  }

  // If a safety classifier declined before any text was written, nothing is
  // yielded and the caller sends the canned refusal reply instead.
  const final = await stream.finalMessage();
  if (final.stop_reason === "max_tokens" && wroteText) yield "…";
}

export async function handleAsk(request: Request): Promise<Response> {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return errorResponse(400, "invalid_input", "Type a question first.");
  }

  const parsed = parseAskRequest(payload);
  if (!parsed.ok) return errorResponse(400, "invalid_input", parsed.message);
  const { message } = parsed.data;
  const history = normalizeHistory(parsed.data.history);

  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) return unavailable();

  const limit = await getRateLimiter().check(clientKey(request));
  if (!limit.ok) {
    const wait =
      limit.window === "day"
        ? "You've reached today's question limit. Please come back tomorrow."
        : `Too many questions at once. Try again in ${limit.retryAfter} seconds.`;
    return errorResponse(429, "rate_limited", wait, limit.retryAfter);
  }

  // Earlier user turns are checked too, since the browser sends them back each time.
  const visitorText = [message, ...history.filter((turn) => turn.role === "user").map((turn) => turn.content)];
  if (visitorText.some((text) => detectInjection(text).flagged)) {
    return cannedResponse(INJECTION_REPLY);
  }

  const model = process.env.ANTHROPIC_MODEL?.trim() || DEFAULT_MODEL;
  const messages: Anthropic.MessageParam[] = [...history, { role: "user", content: message }];

  let stream: ReturnType<Anthropic["messages"]["stream"]>;
  let chunks: AsyncGenerator<string>;
  let first: IteratorResult<string>;
  try {
    stream = getClient(apiKey).messages.stream(
      {
        model,
        ...modelSettings(model),
        // The system prompt is identical on every request, so it is cached.
        system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
        messages,
      },
      { signal: request.signal },
    );
    chunks = replyText(stream);
    // Wait for the first piece of text before answering, so a bad key or an
    // API outage becomes a clean 503 instead of a broken stream.
    first = await chunks.next();
  } catch (error) {
    logFailure(error);
    return unavailable();
  }

  if (first.done) return cannedResponse(REFUSAL_REPLY);

  const encoder = new TextEncoder();
  const firstChunk = first.value;
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(firstChunk));
    },
    async pull(controller) {
      try {
        const next = await chunks.next();
        if (next.done) controller.close();
        else controller.enqueue(encoder.encode(next.value));
      } catch (error) {
        logFailure(error);
        controller.error(error);
      }
    },
    cancel() {
      // The visitor closed the page or pressed Stop: stop paying for tokens.
      stream.abort();
    },
  });

  return new Response(body, { headers: TEXT_HEADERS });
}
