import { ImageResponse } from "next/og"

import { cohortName, cohorts, getCohort } from "@/lib/cohorts"

/**
 * The face printed on the lanyard badge, one per session.
 *
 * Rendered as an image rather than DOM because it is mapped onto a 3D card
 * texture. The 2:3 ratio matches the card model's UV rect, so nothing is
 * cropped. Kept visually in sync with `components/brand/logo.tsx` by hand:
 * next/og rasterises and cannot import the component's SVG.
 */
export const contentType = "image/png"

export function generateStaticParams() {
  return cohorts.map((cohort) => ({ id: cohort.id }))
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const cohort = getCohort(id)

  if (!cohort) return new Response("Not found", { status: 404 })

  const label = `${String(cohort.year).slice(-2)}${cohort.batch}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#fafafa",
          padding: "56px 40px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <svg width="86" height="86" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="#fafafa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="42 14"
              transform="rotate(-45 12 12)"
            />
            <circle cx="12" cy="3" r="2.25" fill="#fafafa" />
          </svg>
          <div style={{ display: "flex", fontSize: 46, fontWeight: 600, letterSpacing: -1 }}>
            <span>Coh</span>
            <span style={{ color: "#8a8a8a" }}>0</span>
            <span>rt</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ fontSize: 128, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
            {label}
          </div>
          {cohort.founding && (
            <div style={{ fontSize: 26, color: "#8a8a8a", letterSpacing: 2 }}>FONDATRICE</div>
          )}
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#8a8a8a", letterSpacing: 1 }}>
          {cohortName(cohort)} · Conakry
        </div>
      </div>
    ),
    { width: 640, height: 960 }
  )
}
