import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'
import { absoluteUrl, sitePath } from '#shared/utils/seo'

interface SeoOptions {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  path: MaybeRefOrGetter<string>
  index?: boolean
  image?: string
  type?: 'website' | 'article'
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export { absoluteUrl, sitePath }

export function useBearingsSeo(options: SeoOptions) {
  const config = useRuntimeConfig()
  const { locale } = useI18n()
  const siteUrl = String(config.public.siteUrl || 'https://kaupbearings.com')
  const pagePath = computed(() => toValue(options.path))
  const canonical = computed(() => absoluteUrl(siteUrl, String(locale.value), pagePath.value))
  const english = computed(() => absoluteUrl(siteUrl, 'en', pagePath.value))
  const chinese = computed(() => absoluteUrl(siteUrl, 'zh', pagePath.value))
  const shareImage = computed(() => `${siteUrl}${options.image ?? '/og-kaup-bearings.png'}`)

  useHead(() => ({
    title: toValue(options.title),
    htmlAttrs: { lang: locale.value === 'zh' ? 'zh-CN' : 'en' },
    link: [
      { rel: 'canonical', href: canonical.value },
      { rel: 'alternate', hreflang: 'en', href: english.value },
      { rel: 'alternate', hreflang: 'zh-CN', href: chinese.value },
      { rel: 'alternate', hreflang: 'x-default', href: english.value },
    ],
    meta: [
      { name: 'description', content: toValue(options.description) },
      {
        name: 'robots',
        content: options.index === false
          ? 'noindex, follow, max-image-preview:large'
          : 'index, follow, max-snippet:-1, max-image-preview:large',
      },
      { property: 'og:type', content: options.type ?? 'website' },
      { property: 'og:site_name', content: 'Kaup Bearings' },
      { property: 'og:title', content: toValue(options.title) },
      { property: 'og:description', content: toValue(options.description) },
      { property: 'og:url', content: canonical.value },
      { property: 'og:image', content: shareImage.value },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: toValue(options.title) },
      { name: 'twitter:description', content: toValue(options.description) },
      { name: 'twitter:image', content: shareImage.value },
    ],
    script: options.jsonLd
      ? [{ type: 'application/ld+json', innerHTML: JSON.stringify(options.jsonLd) }]
      : [],
  }))
}
