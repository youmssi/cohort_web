import { ImageResponse } from "next/og"
import { getTranslations } from "next-intl/server"

import { routing, type Locale } from "@/i18n/routing"
import { cohort } from "@/lib/constants"
import { currentCohort } from "@/lib/cohorts"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Coh0rt"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

/**
 * Social card. Lives inside the `[locale]` segment so Next attaches it to every
 * marketing page automatically and the copy follows the page language.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Home" })
  const tc = await getTranslations({ locale, namespace: "Common" })

  const facts = [
    `${cohort.durationWeeks} ${tc("weeksLabel")}`,
    `${currentCohort().seats.min}-${currentCohort().seats.max} ${tc("participantsLabel")}`,
    tc("location"),
  ].join("   ·   ")

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
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
          <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: -0.4 }}>Coh0rt</div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 62,
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: -1.5,
            maxWidth: 940,
          }}
        >
          {t("headline")}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#a1a1a1",
            borderTop: "1px solid #262626",
            paddingTop: 24,
          }}
        >
          {facts}
        </div>
      </div>
    ),
    { ...size }
  )
}
