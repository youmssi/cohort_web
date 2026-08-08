import { getTranslations } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"

export default async function NotFound() {
  const t = await getTranslations("Common")

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-32 text-center sm:px-6">
      <p className="font-mono text-xs text-muted-foreground">404</p>
      <h1 className="mt-3 text-balance font-heading text-3xl font-semibold tracking-tight">
        Coh0rt
      </h1>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button render={<Link href="/">{t("exploreCta")}</Link>} />
        <Button variant="outline" render={<Link href="/apply">{t("applyCta")}</Link>} />
      </div>
    </div>
  )
}
