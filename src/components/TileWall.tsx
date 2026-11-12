"use client";

import Image from "next/image";
import { useState } from "react";
import { accentFor, projects } from "@/data/projects";

const TILES_PER_COLUMN = 6;
const COLUMN_SPEEDS = ["38s", "46s", "42s"];

/** Each column starts at a different project so the three columns never line up. */
const columns = COLUMN_SPEEDS.map((speed, col) => {
  const tiles = Array.from({ length: TILES_PER_COLUMN }, (_, row) => {
    const index = (row + col * 2) % projects.length;
    return { project: projects[index], accent: accentFor(index) };
  });
  // The list is rendered twice so the scroll can loop without a visible jump.
  return { speed, tiles: [...tiles, ...tiles] };
});

/**
 * Decorative wall of project screenshots that scrolls on its own.
 * It pauses on hover, and the button pauses it for keyboard and touch users.
 */
export default function TileWall() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="wall" data-paused={paused}>
      <div className="wall-grid" aria-hidden="true">
        {columns.map((column, col) => (
          <div
            key={col}
            className="wall-col"
            style={{ "--wall-speed": column.speed } as React.CSSProperties}
          >
            {column.tiles.map(({ project, accent }, i) => (
              <div key={`${project.id}-${i}`} className={`tile accent-${accent}`}>
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 190px, (min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="wall-toggle mono motion-reduce:hidden"
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? "Play motion" : "Pause motion"}
      </button>
    </div>
  );
}
