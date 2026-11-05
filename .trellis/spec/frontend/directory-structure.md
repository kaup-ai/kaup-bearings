# Directory Structure

```text
app/
├── assets/css/          global design tokens and integration styles
├── components/          reusable Vue components
├── composables/         browser store, marketplace and SEO adapters
├── layouts/             shared page chrome
└── pages/               file-based routes
content/knowledge/       bilingual Nuxt Content Markdown
i18n/locales/            English and Chinese message catalogues
public/images/           final WebP runtime imagery
server/routes/           Nitro robots and sitemap routes
shared/data/             typed domain fixtures
shared/types/            cross-layer domain contracts
shared/utils/            pure catalog, SEO and permission logic
tests/                   Node contract and integration tests
```

## Boundaries

- `shared/` must not import Vue, Nuxt composables, browser APIs or Nitro APIs.
- Nuxt app and server code import shared modules through `#shared/...`.
- Browser persistence lives only in `app/composables/useBrowserStore.ts` and its consumers.
- Runtime media belongs in `public/images/{products,categories,scenes}/`.
- Prompt and image-generation records belong under `docs/`.

## Naming

- Slugs are lowercase kebab-case English technical identifiers.
- Vue components use PascalCase; composables use `useXxx`.
- Localized text uses `{ en: string, zh: string }`.
- Images use stable product IDs (`p01.webp`) or semantic slugs.
