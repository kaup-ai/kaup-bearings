import { categories } from '#shared/data/taxonomy'
import { knowledgeTopics } from '#shared/data/knowledge'
import { buildSitemapPaths } from '#shared/utils/seo'

const escapeXml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const root = String(config.public.siteUrl || 'https://kaupbearings.com').replace(/\/$/, '')
  const urls = buildSitemapPaths(
    categories.flatMap((category) => [
      category.slug,
      ...category.subcategories.map((subcategory) => subcategory.slug),
    ]),
    knowledgeTopics.map((topic) => topic.slug),
  )
    .map((path) => `  <url><loc>${escapeXml(`${root}${path}`)}</loc><changefreq>${path.includes('/knowledge') ? 'monthly' : 'weekly'}</changefreq><priority>${path === '/' || path === '/zh' ? '1.0' : '0.8'}</priority></url>`)
    .join('\n')
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
})
