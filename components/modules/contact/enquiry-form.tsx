"use client"

import { useActionState } from "react"
import { useTranslations } from "next-intl"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { submitEnquiry } from "./contact.service"
import { enquiryInitialState } from "./state"

export function EnquiryForm() {
  const t = useTranslations("Contact")
  const [state, formAction, pending] = useActionState(submitEnquiry, enquiryInitialState)

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border bg-card p-10 text-center">
        <CheckCircle2 className="mx-auto size-8" />
        <p className="mt-4 font-heading text-xl font-semibold">
          {t("form.successTitle")}
        </p>
        <p className="mx-auto mt-3 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
          {t("responseBody")}
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="rounded-2xl border bg-card p-6 sm:p-8">
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="name">{t("form.name")}</FieldLabel>
            <FieldContent>
              <Input id="name" name="name" required autoComplete="name" />
              <FieldError>{state.fieldErrors?.name}</FieldError>
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel htmlFor="email">{t("form.email")}</FieldLabel>
            <FieldContent>
              <Input id="email" name="email" type="email" required autoComplete="email" />
              <FieldError>{state.fieldErrors?.email}</FieldError>
            </FieldContent>
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="subject">{t("form.subject")}</FieldLabel>
          <FieldContent>
            <Input
              id="subject"
              name="subject"
              required
              placeholder={t("form.subjectPlaceholder")}
            />
            <FieldError>{state.fieldErrors?.subject}</FieldError>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="message">{t("form.message")}</FieldLabel>
          <FieldContent>
            <Textarea
              id="message"
              name="message"
              rows={5}
              required
              className="min-h-28"
              placeholder={t("form.messagePlaceholder")}
            />
            <FieldError>{state.fieldErrors?.message}</FieldError>
          </FieldContent>
        </Field>

        {state.status === "error" && !state.fieldErrors && (
          <p className="text-sm text-destructive">{t("responseBody")}</p>
        )}

        <Button type="submit" size="lg" disabled={pending} className="w-full">
          {pending ? t("form.submitting") : t("form.submit")}
        </Button>
      </div>
    </form>
  )
}
