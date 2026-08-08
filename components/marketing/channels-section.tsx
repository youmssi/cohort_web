import { getTranslations } from "next-intl/server"
import { ArrowUpRight, MessageCircle } from "lucide-react"

import type { Locale } from "@/i18n/routing"
import { ButtonLink } from "@/components/shared"
import { RevealOnScroll } from "@/components/animations/reveal-on-scroll"
import { liveChannels, type ChannelKey } from "@/lib/constants"

type IconComponent = (props: React.ComponentProps<"svg">) => React.ReactElement

const icons: Record<ChannelKey, IconComponent> = {
  whatsappCommunity: MessageCircle as unknown as IconComponent,
  discord: DiscordIcon,
  facebook: FacebookIcon,
}

/** Discord and Facebook have no lucide glyphs, so the brand marks are inlined. */
function DiscordIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.317 4.369A19.79 19.79 0 0 0 15.446 3c-.21.375-.455.88-.623 1.28a18.27 18.27 0 0 0-5.646 0A12.6 12.6 0 0 0 8.548 3 19.74 19.74 0 0 0 3.677 4.37C.533 9.046-.32 13.604.106 18.098a19.9 19.9 0 0 0 6.002 3.03c.485-.66.916-1.362 1.287-2.098a12.9 12.9 0 0 1-2.028-.972c.171-.125.338-.256.499-.39a14.2 14.2 0 0 0 12.27 0c.163.135.33.266.5.39-.647.382-1.328.708-2.03.973.372.735.802 1.437 1.287 2.097a19.85 19.85 0 0 0 6.005-3.03c.5-5.209-.854-9.725-3.581-13.729ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.42 0-1.333.955-2.42 2.157-2.42 1.21 0 2.176 1.096 2.157 2.42 0 1.335-.956 2.42-2.157 2.42Zm7.96 0c-1.184 0-2.157-1.085-2.157-2.42 0-1.333.954-2.42 2.157-2.42 1.21 0 2.176 1.096 2.157 2.42 0 1.335-.947 2.42-2.157 2.42Z" />
    </svg>
  )
}

function FacebookIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.412c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
    </svg>
  )
}

/**
 * Community and social channels.
 *
 * Reads from `liveChannels()`, which filters out anything without a published
 * URL. Until the WhatsApp and Discord links exist the section degrades to a
 * short note plus the contact route, rather than shipping dead links.
 */
export async function ChannelsSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Channels" })
  const tc = await getTranslations({ locale, namespace: "Common" })
  const available = liveChannels()

  return (
    <section id="channels" className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <RevealOnScroll
          as="h2"
          className="text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {t("title")}
        </RevealOnScroll>
        <RevealOnScroll delay={120} className="mt-4 text-pretty text-muted-foreground">
          {t("subtitle")}
        </RevealOnScroll>
      </div>

      {available.length > 0 ? (
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-3">
          {available.map(([key, url], index) => {
            const Icon = icons[key]
            return (
              <RevealOnScroll key={key} delay={index * 80} className="bg-background">
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full items-start justify-between gap-3 p-6 transition-colors hover:bg-muted/50"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="size-4 shrink-0 text-muted-foreground" />
                    <span className="text-sm font-medium">{t(key)}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </RevealOnScroll>
            )
          })}
        </div>
      ) : (
        <RevealOnScroll
          delay={200}
          className="mt-12 flex flex-col items-center gap-5 rounded-2xl border bg-muted/30 p-8 text-center"
        >
          <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
            {t("pending")}
          </p>
          <ButtonLink href="/contact" variant="outline">
            {tc("contactCta")}
          </ButtonLink>
        </RevealOnScroll>
      )}
    </section>
  )
}
