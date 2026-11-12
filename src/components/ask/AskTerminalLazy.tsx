"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/** A still frame the same size as the terminal, shown until the real one loads. */
function Shell() {
  return (
    <div className="ask ask-in-section accent-cyan" aria-hidden="true">
      <span className="bracket bracket-tl" />
      <span className="bracket bracket-tr" />
      <span className="bracket bracket-bl" />
      <span className="bracket bracket-br" />
      <div className="terminal-bar">
        <span className="terminal-dot accent-magenta" />
        <span className="terminal-dot accent-lime" />
        <span className="terminal-dot accent-cyan" />
        <span className="mono ml-3 normal-case text-ink-muted">amson@portfolio:~$</span>
      </div>
      <div className="ask-screen">
        <div className="ask-log">
          <p className="ask-welcome">Starting terminal…</p>
        </div>
      </div>
    </div>
  );
}

// The chat code is downloaded only when it is needed, so it never slows the first page load.
const AskTerminal = dynamic(() => import("./AskTerminal"), { ssr: false, loading: Shell });

/** Loads the terminal when its section is about to scroll into view. */
export default function AskTerminalLazy() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="ask-slot">
      {near ? <AskTerminal variant="section" /> : <Shell />}
      <noscript>
        <p className="mt-4 text-ink-muted">
          The assistant needs JavaScript. You can still reach me through the contact section below.
        </p>
      </noscript>
    </div>
  );
}
