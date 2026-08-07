import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 24, opacity: 0.6, letterSpacing: 2 }}>
          DIGITAL LEADERSHIP IMMERSION
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 64,
            fontWeight: 600,
            marginTop: 24,
            lineHeight: 1.1,
          }}
        >
          <div>Comprendre la technologie.</div>
          <div>Diriger la décision.</div>
        </div>
        <div style={{ fontSize: 22, opacity: 0.6, marginTop: 32 }}>
          16 semaines · 8–12 participants · Conakry, Guinée
        </div>
      </div>
    ),
    { ...size }
  )
}
