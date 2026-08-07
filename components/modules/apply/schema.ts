import { z } from "zod"

/** CONTRACT — Cohort 01 application. */
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
})

export type Application = z.infer<typeof applicationSchema>

export type ApplicationFieldErrors = Partial<Record<keyof Application, string>>
