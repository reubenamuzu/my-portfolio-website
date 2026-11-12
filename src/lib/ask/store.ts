import { OFFLINE_MESSAGE, runCommand } from "./commands";
import { LIMITS, SOURCE_HEADER, type AskErrorBody } from "./config";

/**
 * Conversation state for the terminal, kept outside React so the section on
 * the page and the drawer show the same conversation.
 *
 * It lives in memory only. Nothing is written to localStorage or cookies, and
 * a page reload starts fresh.
 */

export type Line = {
  id: number;
  role: "user" | "assistant" | "notice";
  text: string;
  /** True while a reply is still arriving from the server. */
  streaming: boolean;
};

export type AskState = {
  lines: Line[];
  /** A request is in flight. */
  busy: boolean;
  /** The last request found the assistant unavailable. */
  offline: boolean;
  /** Read out by screen readers when a reply finishes. */
  announcement: string;
};

type Turn = { role: "user" | "assistant"; content: string };

const EMPTY: AskState = { lines: [], busy: false, offline: false, announcement: "" };

let state: AskState = EMPTY;
let nextId = 1;
/** What gets sent back to the server for context: completed model exchanges only. */
let history: Turn[] = [];
let controller: AbortController | null = null;
/** Lines whose typing animation has finished, so they are not retyped when a second terminal opens. */
const typed = new Set<number>();
const listeners = new Set<() => void>();

function update(patch: Partial<AskState>): void {
  state = { ...state, ...patch };
  for (const listener of listeners) listener();
}

function addLine(role: Line["role"], text: string, streaming = false): number {
  const id = nextId++;
  if (role === "user") typed.add(id);
  update({ lines: [...state.lines, { id, role, text, streaming }] });
  return id;
}

function patchLine(id: number, patch: Partial<Omit<Line, "id">>): void {
  update({ lines: state.lines.map((line) => (line.id === id ? { ...line, ...patch } : line)) });
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
export const getSnapshot = (): AskState => state;
export const getServerSnapshot = (): AskState => EMPTY;

export const hasTyped = (id: number): boolean => typed.has(id);
export const markTyped = (id: number): void => {
  typed.add(id);
};

export function clear(): void {
  controller?.abort();
  history = [];
  typed.clear();
  update({ lines: [], busy: false, announcement: "Terminal cleared." });
}

/** Stops a reply that is still arriving. */
export function stop(): void {
  controller?.abort();
}

export type SubmitResult = "sent" | "empty" | "too_long" | "busy";

export function submit(raw: string): SubmitResult {
  const text = raw.trim();
  if (!text) return "empty";
  if (text.length > LIMITS.messageChars) return "too_long";
  if (state.busy) return "busy";

  // Slash commands are answered here and never reach the server.
  if (text.startsWith("/")) {
    const result = runCommand(text);
    if (result.kind === "clear") {
      clear();
      return "sent";
    }
    addLine("user", text);
    addLine("assistant", result.text);
    update({ announcement: result.text });
    return "sent";
  }

  addLine("user", text);
  void askServer(text);
  return "sent";
}

function showNotice(id: number, text: string, offline = false): void {
  patchLine(id, { role: "notice", text, streaming: false });
  update({ announcement: text, ...(offline ? { offline: true } : {}) });
}

async function readError(response: Response): Promise<AskErrorBody | null> {
  try {
    const body: unknown = await response.json();
    if (typeof body === "object" && body !== null && "error" in body && "message" in body) {
      return body as AskErrorBody;
    }
  } catch {
    // Not JSON: treated as "unavailable" by the caller.
  }
  return null;
}

async function askServer(question: string): Promise<void> {
  const id = addLine("assistant", "", true);
  const abort = new AbortController();
  controller = abort;
  update({ busy: true });

  let text = "";
  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: question, history }),
      signal: abort.signal,
    });

    if (!response.ok || !response.body) {
      const problem = await readError(response);
      if (problem && problem.error !== "unavailable") showNotice(id, problem.message);
      else showNotice(id, OFFLINE_MESSAGE, true);
      return;
    }

    const fromModel = !response.headers.has(SOURCE_HEADER);
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
      patchLine(id, { text });
    }
    text += decoder.decode();

    if (!text.trim()) {
      showNotice(id, OFFLINE_MESSAGE, true);
      return;
    }

    patchLine(id, { text, streaming: false });
    update({ announcement: text, offline: false });

    // Canned guardrail replies are not part of the model's conversation.
    if (fromModel) {
      history = [
        ...history,
        { role: "user" as const, content: question },
        { role: "assistant" as const, content: text.slice(0, LIMITS.historyTurnChars) },
      ].slice(-LIMITS.historyTurns);
    }
  } catch {
    if (abort.signal.aborted) {
      // The visitor pressed Stop or cleared the terminal.
      if (state.lines.some((line) => line.id === id)) {
        patchLine(id, { text: text ? `${text} [stopped]` : "[stopped]", streaming: false });
      }
    } else if (text) {
      patchLine(id, { text: `${text}\n[connection lost]`, streaming: false });
      update({ announcement: "Connection lost." });
    } else {
      showNotice(id, OFFLINE_MESSAGE, true);
    }
  } finally {
    if (controller === abort) controller = null;
    update({ busy: false });
  }
}
