import type { ZodError } from "zod"

/**
 * Stable, locale-independent reasons a field can be rejected.
 *
 * Services return these rather than Zod's own strings: Zod emits developer
 * English ("Too small: expected string to have >=20 characters"), which is not
 * something a candidate should ever read, least of all on a French-first site.
 * The form component turns the code into copy through next-intl.
 */
export type FieldErrorCode = "required" | "email" | "tooShort" | "invalid"

/** Anything shorter than this reads as "you left it blank" rather than "too short". */
const TOO_SHORT_THRESHOLD = 10

function codeFor(issue: ZodError["issues"][number]): FieldErrorCode {
  if (issue.code === "invalid_format" && "format" in issue && issue.format === "email") {
    return "email"
  }

  if (issue.code === "too_small") {
    const minimum = "minimum" in issue ? Number(issue.minimum) : 0
    return minimum >= TOO_SHORT_THRESHOLD ? "tooShort" : "required"
  }

  return "invalid"
}

/**
 * Collapses a Zod error into one code per field. The first issue wins, which is
 * the one worth showing: later issues on the same field are usually knock-on.
 */
export function toFieldErrors<TField extends string>(
  error: ZodError
): Partial<Record<TField, FieldErrorCode>> {
  const errors: Partial<Record<TField, FieldErrorCode>> = {}

  for (const issue of error.issues) {
    const field = issue.path[0] as TField | undefined
    if (!field || errors[field]) continue
    errors[field] = codeFor(issue)
  }

  return errors
}
