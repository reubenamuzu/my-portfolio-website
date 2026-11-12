"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { site } from "@/data/site";

/** How far the card tilts toward the cursor, in degrees. */
const MAX_TILT = 9;

/** The read-out lines that appear over the photo once the scanner locks on. */
const READOUT: [label: string, value: string][] = [
  ["ID", site.alias],
  ["Role", "Full-Stack / AI"],
  ["Loc", "Kumasi, GH"],
  ["Now", site.nowBuilding],
];

/**
 * Portrait as a HUD "ID scanner".
 *
 * Idle: the photo sits desaturated behind scan lines.
 * Hover (or tap on a phone): the card tilts toward the cursor, colour comes
 * back, a scan beam sweeps down, a reticle locks onto the face and the
 * read-out appears.
 *
 * Everything here is decoration. The same facts are in the bio text, so the
 * extra layers are hidden from screen readers.
 */
export default function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [active, setActive] = useState(false);

  const clearTilt = () => {
    cancelAnimationFrame(frame.current);
    const el = ref.current;
    if (!el) return;
    for (const name of ["--rx", "--ry", "--mx", "--my"]) el.style.removeProperty(name);
  };

  const track = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    const box = el.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;

    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--ry", `${((x - 0.5) * 2 * MAX_TILT).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${((0.5 - y) * 2 * MAX_TILT).toFixed(2)}deg`);
      el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    });
  };

  return (
    <div
      ref={ref}
      className="portrait"
      data-active={active}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setActive(true);
      }}
      onPointerMove={track}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        setActive(false);
        clearTilt();
      }}
      // No hover on touch screens, so a tap switches the scan on and off.
      onPointerUp={(event) => {
        if (event.pointerType !== "mouse") setActive((value) => !value);
      }}
    >
      <div className="portrait-card">
        <span className="portrait-corner portrait-corner-tl" aria-hidden="true" />
        <span className="portrait-corner portrait-corner-tr" aria-hidden="true" />
        <span className="portrait-corner portrait-corner-bl" aria-hidden="true" />
        <span className="portrait-corner portrait-corner-br" aria-hidden="true" />

        <div className="portrait-bar mono" aria-hidden="true">
          <span>Subject {"//"} {site.alias}</span>
          <span className="portrait-state portrait-state-idle">Standby</span>
          <span className="portrait-state portrait-state-live">Locked</span>
        </div>

        <div className="portrait-photo">
          <Image
            src="/images/portrait.png"
            alt={`Portrait of ${site.name}`}
            width={800}
            height={1076}
            sizes="336px"
          />

          <div aria-hidden="true">
            <span className="portrait-tint" />
            <span className="portrait-lines" />
            <span className="portrait-glare" />
            <span className="portrait-scan" />
            <span className="portrait-reticle" />
            <span className="portrait-lock mono">Target locked</span>

            <dl className="portrait-readout">
              {READOUT.map(([label, value]) => (
                <div key={label} className="portrait-row">
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <p className="portrait-hint mono" aria-hidden="true">
        [ hover or tap to scan ]
      </p>
    </div>
  );
}
