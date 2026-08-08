import { getTranslations } from "next-intl/server"

import type { Faq } from "@/.velite"
import type { Locale } from "@/i18n/routing"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MdxContent } from "@/components/mdx-content"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"

export async function FaqAccordion({
  faqs,
  locale,
  showHeading = true,
}: {
  faqs: Faq[]
  locale: Locale
  showHeading?: boolean
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" })

  return (
    <section id="faq" className="mx-auto max-w-2xl px-4 py-24 sm:px-6">
      {showHeading && (
        <RevealOnScroll
          as="h2"
          className="text-balance text-center font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {t("pages.faq.title")}
        </RevealOnScroll>
      )}

      <RevealOnScroll delay={120} className="mt-12">
        <Accordion className="rounded-2xl">
          {faqs.map((faq) => (
            <AccordionItem key={faq.slug} value={faq.slug}>
              <AccordionTrigger className="px-5 py-4 text-start text-sm font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4">
                <MdxContent
                  code={faq.content}
                  className="prose-sm prose-p:text-muted-foreground prose-p:leading-relaxed"
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </RevealOnScroll>
    </section>
  )
}
