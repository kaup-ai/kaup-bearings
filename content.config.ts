import { defineCollection, z } from '@nuxt/content'

const knowledge = defineCollection({
  type: 'page',
  source: 'knowledge/**/*.md',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    language: z.enum(['en', 'zh']),
    translationKey: z.string(),
    order: z.number(),
    categorySlug: z.string(),
  }),
})

export default defineContentConfig({
  collections: { knowledge },
})
