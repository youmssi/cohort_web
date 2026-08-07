import { defineConfig, s } from "velite"

/** Derives the locale from the file path: content/<locale>/<collection>/<slug>.mdx */
const localeFromPath = (path: string) => (path.split("/")[0] === "en" ? "en" : "fr")

const slugFromPath = (path: string) => path.split("/").pop()!.replace(/\.mdx$/, "")

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: {
    weeks: {
      name: "Week",
      pattern: "{fr,en}/weeks/*.mdx",
      schema: s
        .object({
          path: s.path(),
          week: s.number().min(1).max(16),
          phase: s.number().min(1).max(4),
          phaseTitle: s.string(),
          title: s.string(),
          objective: s.string(),
          challenge: s.string(),
          deliverable: s.string(),
          content: s.mdx(),
        })
        .transform((data) => ({
          ...data,
          locale: localeFromPath(data.path),
          slug: slugFromPath(data.path),
          permalink: `/curriculum/${data.week}`,
        })),
    },
    competencies: {
      name: "Competency",
      pattern: "{fr,en}/competencies/*.mdx",
      schema: s
        .object({
          path: s.path(),
          code: s.string(),
          order: s.number().min(1).max(10),
          title: s.string(),
          question: s.string(),
          summary: s.string(),
          content: s.mdx(),
        })
        .transform((data) => ({
          ...data,
          locale: localeFromPath(data.path),
          slug: slugFromPath(data.path),
          permalink: `/competencies/${slugFromPath(data.path)}`,
        })),
    },
    faqs: {
      name: "Faq",
      pattern: "{fr,en}/faq/*.mdx",
      schema: s
        .object({
          path: s.path(),
          order: s.number(),
          question: s.string(),
          content: s.mdx(),
        })
        .transform((data) => ({
          ...data,
          locale: localeFromPath(data.path),
          slug: slugFromPath(data.path),
        })),
    },
    personas: {
      name: "Persona",
      pattern: "{fr,en}/personas/*.mdx",
      schema: s
        .object({
          path: s.path(),
          order: s.number(),
          title: s.string(),
          question: s.string(),
          content: s.mdx(),
        })
        .transform((data) => ({
          ...data,
          locale: localeFromPath(data.path),
          slug: slugFromPath(data.path),
        })),
    },
  },
})
