"use client";

import { useEffect, useRef } from "react";
import { LuX } from "react-icons/lu";
import AskTerminal from "./AskTerminal";

type Props = {
  open: boolean;
  onClose: () => void;
};

/**
 * Slide-out panel holding the terminal.
 *
 * It is a native <dialog> opened with showModal(), so the browser handles the
 * hard parts: focus stays inside while it is open, Esc closes it, the page
 * behind cannot be clicked, and focus returns to the button that opened it.
 */
export default function AskDrawer({ open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="ask-drawer"
      aria-labelledby="ask-drawer-title"
      onClose={onClose}
      // A click on the dimmed area outside the panel lands on the dialog itself.
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="ask-drawer-panel">
        <div className="ask-drawer-head">
          <h2 id="ask-drawer-title" className="text-sm font-bold tracking-[0.2em]">
            Ask Amson
          </h2>
          <button type="button" className="menu-button" onClick={onClose} aria-label="Close Ask Amson">
            <LuX aria-hidden="true" size={18} />
          </button>
        </div>
        {open && <AskTerminal variant="drawer" autoFocus onNavigate={onClose} />}
      </div>
    </dialog>
  );
}
