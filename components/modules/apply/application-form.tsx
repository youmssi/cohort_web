"use client"

import { useActionState } from "react"
import { useTranslations } from "next-intl"

import type { FieldErrorCode } from "@/components/shared/form-errors"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

import { site } from "@/lib/constants"

import { submitApplication } from "./apply.service"
import { applyInitialState } from "./state"

function Section({ title, children }: React.PropsWithChildren<{ title: string }>) {
  return (
    <fieldset className="rounded-2xl border bg-card p-6">
      <legend className="px-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {title}
      </legend>
      <div className="mt-2 space-y-5">{children}</div>
    </fieldset>
  )
}

export function ApplicationForm() {
  const t = useTranslations("Apply")
  const tv = useTranslations("Validation")
  const [state, formAction, pending] = useActionState(submitApplication, applyInitialState)

  // Services return locale-independent codes; the copy lives in messages/.
  const fieldError = (code?: FieldErrorCode) => (code ? tv(code) : undefined)

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border bg-card p-10 text-center">
        <CheckCircle2 className="mx-auto size-8 text-foreground" />
        <p className="mt-4 font-heading text-2xl font-semibold">{t("successTitle")}</p>
        <p className="mx-auto mt-3 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
          {t("successBody")}
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      <Section title={t("sections.identity")}>
        <Field>
          <FieldLabel htmlFor="fullName">{t("fields.fullName")}</FieldLabel>
          <FieldContent>
            <Input id="fullName" name="fullName" required autoComplete="name" />
            <FieldError>{fieldError(state.fieldErrors?.fullName)}</FieldError>
          </FieldContent>
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="email">{t("fields.email")}</FieldLabel>
            <FieldContent>
              <Input id="email" name="email" type="email" required autoComplete="email" />
              <FieldError>{fieldError(state.fieldErrors?.email)}</FieldError>
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel htmlFor="phone">{t("fields.phone")}</FieldLabel>
            <FieldContent>
              <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
              <FieldError>{fieldError(state.fieldErrors?.phone)}</FieldError>
            </FieldContent>
          </Field>
        </div>
      </Section>

      <Section title={t("sections.context")}>
        <div className="grid gap-5 sm:grid-cols-3">
          <Field>
            <FieldLabel htmlFor="role">{t("fields.role")}</FieldLabel>
            <FieldContent>
              <Input id="role" name="role" required autoComplete="organization-title" />
              <FieldError>{fieldError(state.fieldErrors?.role)}</FieldError>
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel htmlFor="organization">{t("fields.organization")}</FieldLabel>
            <FieldContent>
              <Input id="organization" name="organization" required autoComplete="organization" />
              <FieldError>{fieldError(state.fieldErrors?.organization)}</FieldError>
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel htmlFor="industry">{t("fields.industry")}</FieldLabel>
            <FieldContent>
              <Input id="industry" name="industry" required />
              <FieldError>{fieldError(state.fieldErrors?.industry)}</FieldError>
            </FieldContent>
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="challenge">{t("fields.challenge")}</FieldLabel>
          <FieldContent>
            <Textarea id="challenge" name="challenge" required rows={4} />
            <FieldDescription>{t("hints.challenge")}</FieldDescription>
            <FieldError>{fieldError(state.fieldErrors?.challenge)}</FieldError>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="motivation">{t("fields.motivation")}</FieldLabel>
          <FieldContent>
            <Textarea id="motivation" name="motivation" required rows={4} />
            <FieldDescription>{t("hints.motivation")}</FieldDescription>
            <FieldError>{fieldError(state.fieldErrors?.motivation)}</FieldError>
          </FieldContent>
        </Field>
      </Section>

      <Section title={t("sections.commitment")}>
        <Field>
          <FieldLabel>{t("fields.commitment")}</FieldLabel>
          <FieldContent>
            <RadioGroup name="commitment" defaultValue="yes" className="gap-3">
              {(["yes", "unsure"] as const).map((value) => (
                <div key={value} className="flex items-center gap-2.5">
                  <RadioGroupItem value={value} id={`commitment-${value}`} />
                  <Label htmlFor={`commitment-${value}`} className="font-normal">
                    {t(`commitmentOptions.${value}`)}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <FieldError>{fieldError(state.fieldErrors?.commitment)}</FieldError>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>{t("sponsorLabel")}</FieldLabel>
          <FieldContent>
            <RadioGroup name="sponsor" defaultValue="self" className="gap-3">
              {(["self", "employer", "unsure"] as const).map((value) => (
                <div key={value} className="flex items-center gap-2.5">
                  <RadioGroupItem value={value} id={`sponsor-${value}`} />
                  <Label htmlFor={`sponsor-${value}`} className="font-normal">
                    {t(`sponsorOptions.${value}`)}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <FieldError>{fieldError(state.fieldErrors?.sponsor)}</FieldError>
          </FieldContent>
        </Field>
      </Section>

      {state.status === "error" && !state.fieldErrors && (
        <p className="text-sm text-destructive">
          {t("errorBody", { phone: site.phoneDisplay })}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? t("submitting") : t("submit")}
      </Button>
    </form>
  )
}
