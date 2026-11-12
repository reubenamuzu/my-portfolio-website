"use client";

import { useRef, useState } from "react";
import type { Accent } from "@/data/projects";

type Ripple = { id: number; x: number; y: number };

type Props = {
  accent: Accent;
  children: React.ReactNode;
  className?: string;
  id?: string;
};

/**
 * Card shell: accent colour, hover lift and glow (in CSS),
 * plus a click ripple that starts where the pointer landed.
 */
export default function HudCard({ accent, children, className = "", id }: Props) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const nextId = useRef(0);

  const addRipple = (event: React.PointerEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    const ripple = {
      id: nextId.current++,
      x: event.clientX - box.left,
      y: event.clientY - box.top,
    };
    setRipples((current) => [...current, ripple]);
  };

  const removeRipple = (rippleId: number) =>
    setRipples((current) => current.filter((r) => r.id !== rippleId));

  return (
    <article
      id={id}
      className={`hud-card accent-${accent} ${className}`}
      onPointerDown={addRipple}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple"
          style={{ left: r.x, top: r.y }}
          aria-hidden="true"
          onAnimationEnd={() => removeRipple(r.id)}
        />
      ))}
    </article>
  );
}
