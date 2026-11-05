export function sitePath(locale: string, path: string): string {
  const normalized = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  return locale === 'zh' ? `/zh${normalized || ''}` : normalized || '/'
}

export function absoluteUrl(
  siteUrl: string,
  locale: string,
  path: string,
): string {
  return `${siteUrl.replace(/\/$/, '')}${sitePath(locale, path)}`
}

export function buildSitemapPaths(
  categories: string[],
  knowledge: string[],
): string[] {
  const english = [
    '/',
    ...categories.map((slug) => `/bearings/${slug}`),
    '/knowledge',
    ...knowledge.map((slug) => `/knowledge/${slug}`),
  ]
  return [...english, ...english.map((path) => sitePath('zh', path))]
}
