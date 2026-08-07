"use client"

import { useActionState } from "react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

import { applyInitialState, submitApplication } from "./apply.service"

export function ApplicationForm() {
  const t = useTranslations("Apply")
  const [state, formAction, pending] = useActionState(submitApplication, applyInitialState)

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border p-8 text-center">
        <p className="font-heading text-2xl font-semibold">{t("successTitle")}</p>
        <p className="mt-2 text-pretty text-muted-foreground">{t("successBody")}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-8">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fullName">{t("fields.fullName")}</FieldLabel>
          <FieldContent>
            <Input id="fullName" name="fullName" required autoComplete="name" />
            <FieldError>{state.fieldErrors?.fullName}</FieldError>
          </FieldContent>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="email">{t("fields.email")}</FieldLabel>
            <FieldContent>
              <Input id="email" name="email" type="email" required autoComplete="email" />
              <FieldError>{state.fieldErrors?.email}</FieldError>
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel htmlFor="phone">{t("fields.phone")}</FieldLabel>
            <FieldContent>
              <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
              <FieldError>{state.fieldErrors?.phone}</FieldError>
            </FieldContent>
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field>
            <FieldLabel htmlFor="role">{t("fields.role")}</FieldLabel>
            <FieldContent>
              <Input id="role" name="role" required />
              <FieldError>{state.fieldErrors?.role}</FieldError>
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel htmlFor="organization">{t("fields.organization")}</FieldLabel>
            <FieldContent>
              <Input id="organization" name="organization" required />
              <FieldError>{state.fieldErrors?.organization}</FieldError>
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel htmlFor="industry">{t("fields.industry")}</FieldLabel>
            <FieldContent>
              <Input id="industry" name="industry" required />
              <FieldError>{state.fieldErrors?.industry}</FieldError>
            </FieldContent>
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="challenge">{t("fields.challenge")}</FieldLabel>
          <FieldContent>
            <Textarea id="challenge" name="challenge" required rows={4} />
            <FieldError>{state.fieldErrors?.challenge}</FieldError>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="motivation">{t("fields.motivation")}</FieldLabel>
          <FieldContent>
            <Textarea id="motivation" name="motivation" required rows={4} />
            <FieldError>{state.fieldErrors?.motivation}</FieldError>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>{t("fields.commitment")}</FieldLabel>
          <FieldContent>
            <RadioGroup name="commitment" defaultValue="yes" className="gap-2">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="yes" id="commitment-yes" />
                <Label htmlFor="commitment-yes" className="font-normal">
                  {t("commitmentOptions.yes")}
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="unsure" id="commitment-unsure" />
                <Label htmlFor="commitment-unsure" className="font-normal">
                  {t("commitmentOptions.unsure")}
                </Label>
              </div>
            </RadioGroup>
            <FieldError>{state.fieldErrors?.commitment}</FieldError>
          </FieldContent>
        </Field>
      </FieldGroup>

      {state.status === "error" && !state.fieldErrors && (
        <FieldDescription className="text-destructive">{t("errorBody")}</FieldDescription>
      )}

      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? t("submitting") : t("submit")}
      </Button>
    </form>
  )
}
