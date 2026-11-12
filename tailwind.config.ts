import type { Config } from "tailwindcss";

/**
 * Colours point at the CSS variables in src/app/globals.css.
 * Change a colour there and it updates everywhere.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-deep": "var(--bg-deep)",
        surface: {
          1: "var(--surface-1)",
          2: "var(--surface-2)",
          3: "var(--surface-3)",
          4: "var(--surface-4)",
        },
        line: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
        },
        ink: {
          DEFAULT: "var(--text)",
          heading: "var(--heading)",
          muted: "var(--muted)",
        },
        cyan: "var(--cyan)",
        magenta: "var(--magenta)",
        lime: "var(--lime)",
        violet: "var(--violet)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      transitionTimingFunction: {
        hud: "cubic-bezier(.2,.7,.2,1)",
      },
      maxWidth: {
        shell: "76rem",
      },
    },
  },
  plugins: [],
};

export default config;
