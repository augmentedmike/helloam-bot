import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "He's not an app. He's yours. — Meet AugmentedMike";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Top label */}
        <div
          style={{
            display: "flex",
            color: "#a78bfa",
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          helloam.bot
        </div>
        {/* Main headline */}
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 800,
            color: "#ededed",
            textAlign: "center",
            lineHeight: "1.1",
            maxWidth: 900,
            marginBottom: 24,
          }}
        >
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          He&apos;s not an app.{" "}He&apos;s{" "}
          <span style={{ color: "#a78bfa", display: "flex" }}>yours.</span>
        </div>
        {/* Subtext */}
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#9ca3af",
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          A personal AI companion bonded to you — and only you.
        </div>
        {/* Bottom brand */}
        <div
          style={{
            display: "flex",
            color: "#6b7280",
            fontSize: 16,
            fontWeight: 500,
            marginTop: 60,
          }}
        >
          AugmentedMike · helloam.bot
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
