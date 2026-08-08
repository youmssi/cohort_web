import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

/** Touch icon, same mark as `app/icon.tsx` at homescreen size. */
export default function AppleIcon() {
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
        }}
      >
        <svg width="112" height="112" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="#fafafa"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="42 14"
            transform="rotate(-45 12 12)"
          />
          <circle cx="12" cy="3" r="2.3" fill="#fafafa" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
