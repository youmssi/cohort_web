"use server"

import { z } from "zod"
import { getTranslations } from "next-intl/server"

import { routing } from "@/i18n/routing"
import { cohortName, currentCohort } from "@/lib/cohorts"
import { contact, site } from "@/lib/constants"
import { escapeHtml, sendNotificationEmail } from "@/lib/email"

import { competencyLabel } from "./questions"
import { scoreDiagnostic } from "./scoring"

import type { DiagnosticResult } from "./schema"
import type { EmailResultState } from "./state"

const payloadSchema = z.object({
  email: z.email(),
  answers: z.string(), // JSON-encoded Answer[]
  // The visitor's locale, so the profile they receive is written in the same
  // language as the one they just took the diagnostic in.
  locale: z.enum(routing.locales).catch(routing.defaultLocale),
})

type Locale = (typeof routing.locales)[number]
type Translate = Awaited<ReturnType<typeof getTranslations<"Diagnostic">>>

/** `as-needed` prefixing: the default locale carries no segment. */
function localePath(locale: Locale, path: string) {
  return `${site.url}${locale === routing.defaultLocale ? "" : `/${locale}`}${path}`
}

/**
 * The visitor's own copy of their profile. This is the message the result
 * screen promises ("vous recevrez votre profil détaillé par e-mail"), so it is
 * built to stand on its own: the full ten, not a teaser that forces a return trip.
 *
 * Styling is inline and deliberately plain. Mail clients strip stylesheets, and
 * the brand register is a printed document rather than a marketing template.
 */
function profileEmail(result: DiagnosticResult, locale: Locale, t: Translate) {
  const rows = result.scores
    .map(
      (score) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #eaeaea;">${competencyLabel(score.competency, locale)}</td>
          <td style="padding:8px 0;border-bottom:1px solid #eaeaea;text-align:right;white-space:nowrap;color:#8a8a8a;">
            ${score.score} / 100 · ${t(`levels.${score.level}`)}
          </td>
        </tr>`
    )
    .join("")

  return `
    <div style="font-family:Helvetica,Arial,sans-serif;color:#0a0a0a;max-width:560px;line-height:1.6;">
      <p style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#8a8a8a;margin:0 0 8px;">
        ${t("eyebrow")}
      </p>
      <h1 style="font-size:22px;font-weight:600;margin:0 0 24px;">${t("resultTitle")}</h1>

      <p style="margin:0 0 4px;color:#8a8a8a;font-size:13px;">${t("overall")}</p>
      <p style="margin:0 0 32px;font-size:40px;font-weight:600;">
        ${result.overall}<span style="font-size:18px;color:#8a8a8a;"> / 100</span>
      </p>

      <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>

      <p style="margin:32px 0 4px;color:#8a8a8a;font-size:13px;">${t("strongest")}</p>
      <p style="margin:0 0 16px;font-weight:600;">${competencyLabel(result.strongest.competency, locale)}</p>

      <p style="margin:0 0 4px;color:#8a8a8a;font-size:13px;">${t("priority")}</p>
      <p style="margin:0 0 32px;font-weight:600;">${competencyLabel(result.priority.competency, locale)}</p>

      <p style="margin:0 0 32px;font-size:14px;color:#8a8a8a;">${t("email.note")}</p>

      <p style="margin:0 0 8px;font-size:14px;">
        ${t("applyPrompt", { cohort: cohortName(currentCohort()) })}
      </p>
      <p style="margin:0 0 32px;font-size:14px;">
        <a href="${localePath(locale, "/apply")}" style="color:#0a0a0a;">${localePath(locale, "/apply")}</a>
      </p>

      <p style="margin:0;font-size:13px;color:#8a8a8a;border-top:1px solid #eaeaea;padding-top:16px;">
        ${site.name} · ${site.builtBy}<br />
        <a href="${localePath(locale, "")}" style="color:#8a8a8a;">${site.domain}</a>
      </p>
    </div>
  `
}

/**
 * SERVICE. Server Action bound to the "email me my result" form on the
 * Diagnostic result screen. Recomputes the score server-side (never trusts a
 * client-submitted score), sends the visitor their profile, then notifies the
 * programme team.
 */
export async function emailDiagnosticResult(
  _prevState: EmailResultState,
  formData: FormData
): Promise<EmailResultState> {
  const parsed = payloadSchema.safeParse({
    email: formData.get("email"),
    answers: formData.get("answers"),
    locale: formData.get("locale"),
  })

  if (!parsed.success) {
    return { status: "error", message: "invalid" }
  }

  let answers: { questionId: string; optionId: string }[]
  try {
    answers = JSON.parse(parsed.data.answers)
  } catch {
    return { status: "error", message: "invalid" }
  }

  const { email, locale } = parsed.data
  const result = scoreDiagnostic(answers)
  const t = await getTranslations({ locale, namespace: "Diagnostic" })

  // The visitor's copy goes first, because it is the one the form promised. If
  // it does not leave, the form must say so rather than claim it is on its way.
  const delivery = await sendNotificationEmail({
    to: email,
    subject: `${t("resultTitle")} · ${result.overall}/100`,
    replyTo: contact.applicationNotificationEmail,
    html: profileEmail(result, locale, t),
  })

  if (!delivery.ok) {
    return { status: "error", message: "delivery" }
  }

  // Team notification. Best effort by design: the visitor already has their
  // profile, so a failure here is logged rather than shown to them as a failure
  // of their own request.
  const rows = result.scores
    .map((s) => `<tr><td>${competencyLabel(s.competency, "fr")}</td><td>${s.score}</td></tr>`)
    .join("")

  await sendNotificationEmail({
    to: contact.applicationNotificationEmail,
    subject: `Diagnostic Digital Leadership · ${result.overall}/100 · ${email}`,
    replyTo: email,
    html: `
      <p>${escapeHtml(email)} · ${locale.toUpperCase()}</p>
      <p>Score global : ${result.overall}/100</p>
      <p>Point fort : ${competencyLabel(result.strongest.competency, "fr")} ·
         Priorité : ${competencyLabel(result.priority.competency, "fr")}</p>
      <table>${rows}</table>
    `,
  })

  return { status: "success" }
}
