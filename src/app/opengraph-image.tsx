import { ImageResponse } from "next/og";
import { site } from "@/data/site";

// The share image shown when the site is linked on social media or in chat apps.
// It is drawn from code at build time, so it always matches the site colours.
export const alt = `${site.name} | ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CYAN = "#00f0ff";
const MAGENTA = "#ff2bd6";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 84px",
          backgroundColor: "#0c0e11",
          backgroundImage:
            "radial-gradient(circle at 0% 0%, rgba(0,240,255,0.22), transparent 55%), radial-gradient(circle at 100% 100%, rgba(255,43,214,0.2), transparent 55%)",
          color: "#eef0f2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: CYAN }}>
          AMSON [DEV]
        </div>
        <div
          style={{
            display: "flex",
            width: 140,
            height: 8,
            marginTop: 36,
            backgroundImage: `linear-gradient(90deg, ${CYAN}, ${MAGENTA})`,
          }}
        />
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 84,
            fontWeight: 800,
            letterSpacing: 2,
            lineHeight: 1.05,
            textTransform: "uppercase",
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 34,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: CYAN,
          }}
        >
          {site.role}
        </div>
        <div style={{ display: "flex", marginTop: 26, fontSize: 28, color: "#a7aeb6" }}>
          Fintech, SaaS and AI products for West African markets
        </div>
      </div>
    ),
    size,
  );
}
