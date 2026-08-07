import type { Faq } from "@/.velite"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MdxContent } from "@/components/mdx-content"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <section id="faq" className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <RevealOnScroll as="h2" className="text-balance text-center font-heading text-3xl font-semibold sm:text-4xl">
        Questions fréquentes
      </RevealOnScroll>

      <Accordion className="mt-10">
        {faqs.map((faq) => (
          <AccordionItem key={faq.slug} value={faq.slug}>
            <AccordionTrigger className="text-start">{faq.question}</AccordionTrigger>
            <AccordionContent>
              <MdxContent code={faq.content} className="prose-sm" />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
