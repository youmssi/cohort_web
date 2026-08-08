import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

/**
 * Favicon, generated from the same mark as `components/brand/logo.tsx`: an open
 * ring with one filled seat. Kept in sync by hand because next/og renders to a
 * raster and cannot import the JSX component's SVG directly at this size.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          borderRadius: 7,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="#fafafa"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="42 14"
            transform="rotate(-45 12 12)"
          />
          <circle cx="12" cy="3" r="2.4" fill="#fafafa" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
