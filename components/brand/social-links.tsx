import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import { liveSocials } from "@/lib/constants"

import { SocialIcon } from "./social-icons"

/**
 * The channel row, shared by the footer and the contact page so the two never
 * drift apart. Channels without a destination are already filtered out by
 * `liveSocials`, so this renders nothing rather than a dead link.
 */
export function SocialLinks({ className }: { className?: string }) {
  const t = useTranslations("Footer")
  const socials = liveSocials()

  if (socials.length === 0) return null

  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socials.map((social) => (
        <li key={social.key}>
          <a
            href={social.url}
            target={social.key === "email" ? undefined : "_blank"}
            rel="noreferrer"
            aria-label={t(`social.${social.key}`)}
            title={t(`social.${social.key}`)}
            className="inline-flex size-9 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            <SocialIcon channel={social.key} className="size-4" />
          </a>
        </li>
      ))}
    </ul>
  )
}
