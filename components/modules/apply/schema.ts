import type { FieldErrorCode } from "@/components/shared/form-errors"

import { z } from "zod"

/** CONTRACT. An individual application to the open cohort. */
export const applicationSchema = z.object({
  fullName: z.string().min(2),
  email: z.email(),
  phone: z.string().min(6),
  role: z.string().min(2),
  organization: z.string().min(2),
  industry: z.string().min(2),
  challenge: z.string().min(20),
  motivation: z.string().min(20),
  commitment: z.enum(["yes", "unsure"]),
  // A seat can be funded by the candidate's employer. The application stays
  // individual either way, so this only changes who we invoice.
  sponsor: z.enum(["self", "employer", "unsure"]),
})

export type Application = z.infer<typeof applicationSchema>

export type ApplicationFieldErrors = Partial<Record<keyof Application, FieldErrorCode>>
