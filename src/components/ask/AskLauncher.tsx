"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";

// Downloaded the first time the button is used, not with the page.
const AskDrawer = dynamic(() => import("./AskDrawer"), { ssr: false });

/** Starts the download early, when the visitor shows interest in the button. */
const preload = () => {
  void import("./AskDrawer");
};

/** Floating "> ASK AMSON" button that opens the assistant from anywhere on the site. */
export default function AskLauncher() {
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="ask-launcher mono"
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerEnter={preload}
        onFocus={preload}
        onClick={() => {
          setEverOpened(true);
          setOpen(true);
        }}
      >
        <span aria-hidden="true">&gt; </span>Ask Amson
      </button>

      {everOpened && (
        <AskDrawer
          open={open}
          onClose={() => {
            setOpen(false);
            // Some browsers do not hand focus back to the button on their own.
            buttonRef.current?.focus();
          }}
        />
      )}
    </>
  );
}
