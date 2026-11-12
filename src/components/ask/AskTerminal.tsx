"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { COMMANDS, SUGGESTIONS, WELCOME } from "@/lib/ask/commands";
import { LIMITS } from "@/lib/ask/config";
import { tokenize } from "@/lib/ask/linkify";
import {
  getServerSnapshot,
  getSnapshot,
  hasTyped,
  markTyped,
  stop,
  submit,
  subscribe,
  type Line,
} from "@/lib/ask/store";

type Props = {
  /** "section" sits in the page; "drawer" fills the slide-out panel. */
  variant?: "section" | "drawer";
  /** Put the cursor in the input as soon as the terminal appears. */
  autoFocus?: boolean;
  /** Called when a link to a project card is followed (the drawer closes itself). */
  onNavigate?: () => void;
};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/** True when the visitor has asked their device to reduce motion. */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(REDUCED_MOTION);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

/** Reply text with project names, web addresses and emails turned into links. */
function Linked({ text, onNavigate }: { text: string; onNavigate?: () => void }) {
  return (
    <>
      {tokenize(text).map((token, i) => {
        if (token.type === "text") return <span key={i}>{token.value}</span>;
        if (token.type === "project") {
          return (
            <a key={i} href={token.href} className="glitch-link" onClick={onNavigate}>
              {token.value}
            </a>
          );
        }
        if (token.type === "email") {
          return (
            <a key={i} href={token.href} className="glitch-link">
              {token.value}
            </a>
          );
        }
        return (
          <a key={i} href={token.href} className="glitch-link" target="_blank" rel="noopener noreferrer">
            {token.value}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        );
      })}
    </>
  );
}

type ReplyProps = {
  line: Line;
  /** Skip the typing effect (reduced motion). */
  instant: boolean;
  onProgress: () => void;
  onNavigate?: () => void;
};

/** A reply that types itself out, with a blinking caret while it is still arriving. */
function Reply({ line, instant, onProgress, onNavigate }: ReplyProps) {
  const [shown, setShown] = useState(() => (hasTyped(line.id) ? line.text.length : 0));
  const count = instant ? line.text.length : Math.min(shown, line.text.length);
  const caughtUp = count >= line.text.length;

  useEffect(() => {
    if (caughtUp) {
      if (!line.streaming) markTyped(line.id);
      return;
    }
    // Type a few characters per frame, faster when there is a lot left to show.
    const frame = requestAnimationFrame(() => {
      setShown((current) => {
        const left = line.text.length - current;
        return current + Math.max(2, Math.ceil(left / 24));
      });
      onProgress();
    });
    return () => cancelAnimationFrame(frame);
  }, [caughtUp, shown, line.id, line.streaming, line.text.length, onProgress]);

  const typing = line.streaming || !caughtUp;
  return (
    <>
      <Linked text={line.text.slice(0, count)} onNavigate={onNavigate} />
      {typing && <span className="caret" aria-hidden="true" />}
    </>
  );
}

export default function AskTerminal({ variant = "section", autoFocus = false, onNavigate }: Props) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const reducedMotion = usePrefersReducedMotion();
  const [draft, setDraft] = useState("");
  const [hint, setHint] = useState("");
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const hintId = useId();

  const scrollToEnd = useCallback(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, []);

  // Keep the newest line in view as lines arrive and replies grow.
  useEffect(scrollToEnd, [state.lines, scrollToEnd]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const send = (text: string) => {
    const result = submit(text);
    if (result === "empty") setHint("Type a question first.");
    else if (result === "too_long") setHint(`Questions can be up to ${LIMITS.messageChars} characters.`);
    else if (result === "busy") setHint("One moment, still answering the last question.");
    else {
      setDraft("");
      setHint("");
    }
    inputRef.current?.focus();
  };

  const nearLimit = draft.length > LIMITS.messageChars - 100;
  const isEmpty = state.lines.length === 0;

  return (
    <div className={`ask ask-in-${variant} accent-cyan`}>
      <span className="bracket bracket-tl" aria-hidden="true" />
      <span className="bracket bracket-tr" aria-hidden="true" />
      <span className="bracket bracket-bl" aria-hidden="true" />
      <span className="bracket bracket-br" aria-hidden="true" />

      <div className="terminal-bar">
        <span className="terminal-dot accent-magenta" aria-hidden="true" />
        <span className="terminal-dot accent-lime" aria-hidden="true" />
        <span className="terminal-dot accent-cyan" aria-hidden="true" />
        <span className="mono ml-3 normal-case text-ink-muted" aria-hidden="true">
          amson@portfolio:~$
        </span>
        {state.offline && <span className="ask-offline mono ml-auto">AI offline</span>}
      </div>

      <div className="ask-screen">
        <div
          ref={logRef}
          className="ask-log"
          role="region"
          aria-label="Conversation with Ask Amson"
          tabIndex={0}
        >
          <p className="ask-welcome">{WELCOME}</p>

          {state.lines.map((line) =>
            line.role === "user" ? (
              <p key={line.id} className="ask-line ask-user">
                <span className="prompt" aria-hidden="true">
                  &gt;{" "}
                </span>
                <span className="sr-only">You asked: </span>
                {line.text}
              </p>
            ) : (
              <p key={line.id} className={`ask-line ${line.role === "notice" ? "ask-notice" : "ask-reply"}`}>
                <Reply
                  line={line}
                  instant={reducedMotion}
                  onProgress={scrollToEnd}
                  onNavigate={onNavigate}
                />
              </p>
            ),
          )}
        </div>
        <span className="ask-lines" aria-hidden="true" />
      </div>

      {isEmpty && (
        <ul className="ask-chips" aria-label="Suggested questions">
          {SUGGESTIONS.map((question) => (
            <li key={question}>
              <button type="button" className="chip ask-chip" onClick={() => send(question)}>
                {question}
              </button>
            </li>
          ))}
        </ul>
      )}

      <form
        className="ask-form"
        onSubmit={(event) => {
          event.preventDefault();
          send(draft);
        }}
      >
        <label htmlFor={inputId} className="sr-only">
          Ask a question about Reuben, or type a command such as {COMMANDS[0].name}
        </label>
        <span className="prompt" aria-hidden="true">
          &gt;
        </span>
        <input
          id={inputId}
          ref={inputRef}
          className="ask-input"
          type="text"
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value);
            if (hint) setHint("");
          }}
          maxLength={LIMITS.messageChars}
          placeholder="Ask a question, or type /help"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="send"
          aria-describedby={hintId}
        />
        {state.busy ? (
          <button type="button" className="ask-send mono" onClick={stop}>
            Stop
          </button>
        ) : (
          <button type="submit" className="ask-send mono">
            Send
          </button>
        )}
      </form>

      <p id={hintId} className="ask-hint mono" role="status">
        {hint || (nearLimit ? `${draft.length} / ${LIMITS.messageChars}` : "")}
      </p>

      {/* Screen readers hear each finished reply once, not every typed character. */}
      <p className="sr-only" aria-live="polite">
        {state.announcement}
      </p>
    </div>
  );
}
