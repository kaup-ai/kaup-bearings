# Kaup Bearings Technical Design

## Architecture

Use a single Nuxt 4 application:

```text
Browser / crawler
  → Nitro SSR for public pages
  → Vue islands for filters and interactive demos
  → typed fixture data
  → browser storage adapters for session/drafts/RFQs
```

The runtime stays single-domain and does not inherit Kaup AI's ICP or relay infrastructure. Public discovery pages are server-rendered; private workspaces render client-only after hydration and are marked `noindex`.

## Application Boundaries

### Shared domain layer

`shared/` owns:

- Catalog types.
- Taxonomy, products, suppliers and editorial fixtures.
- Pure functions for filtering, sorting, validation, SEO paths and inquiry transitions.
- No Vue imports and no browser APIs.

This layer is safe to call from Nitro routes, page setup and Node tests.

### App presentation layer

`app/` owns:

- Layout and navigation.
- Public pages and private workspace pages.
- Nuxt UI/Tailwind components.
- Locale-aware links and page metadata.
- Thin adapters around shared domain functions.

### Persistence boundary

`app/composables/useBrowserStore` is the only module allowed to read/write `localStorage`. It returns explicit result objects:

```ts
type StoreResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: 'unavailable' | 'invalid' | 'quota' }
```

Account, draft and RFQ composables use this adapter. UI must branch on `ok`; it cannot catch storage failures and show success.

### Server routes

Nitro provides:

- `/robots.txt`
- `/sitemap.xml`

Both use `runtimeConfig.public.siteUrl`, fixed to `https://kaupbearings.com`.

## Content Model

### Category

```ts
interface Category {
  slug: string
  number: string
  title: LocalizedText
  summary: LocalizedText
  introduction: LocalizedText
  variants: string[]
  selectionNotes: LocalizedText[]
  applications: LocalizedText[]
  faq: Array<{ question: LocalizedText; answer: LocalizedText }>
  image: string
  subcategories: Subcategory[]
}
```

### Product

```ts
interface Product {
  id: string
  slug: string
  designation: string
  title: LocalizedText
  description: LocalizedText
  categorySlug: string
  subcategorySlug: string
  dimensions: Partial<Record<'d' | 'D' | 'B' | 'T', number>>
  parameters: {
    precision: string
    clearance: string
    sealing: string
    cage: string
    material: string
    limitingSpeed?: number
    dynamicLoad?: number
    staticLoad?: number
  }
  standards: string[]
  certifications: string[]
  applications: string[]
  supplierSlug: string
  image: string
  price: { min: number; max: number; currency: 'USD' }
  demo: true
}
```

### Demo session

```ts
interface DemoSession {
  userId: string
  role: 'buyer' | 'supplier'
  company: string
  status: 'pending' | 'verified' | 'rejected'
}
```

### RFQ

```ts
interface Rfq {
  id: string
  productSlug?: string
  buyerCompany: string
  buyerCountry: string
  designation: string
  dimensions: string
  quantity: number
  annualDemand?: number
  application: string
  load?: number
  speed?: number
  precision?: string
  clearance?: string
  sealing?: string
  delivery?: string
  incoterms: 'EXW' | 'FOB' | 'CIF'
  notes: string
  status: 'submitted' | 'viewed' | 'replied'
  createdAt: string
  reply?: string
}
```

## Search and Filtering

The filter model is URL-backed:

```ts
interface ProductFilter {
  category?: string
  subcategory?: string
  query?: string
  dimensions?: Partial<Record<'d' | 'D' | 'B' | 'T', { min?: number; max?: number }>>
  precision?: string
  clearance?: string
  sealing?: string
  cage?: string
  material?: string
  certifications?: string[]
  applications?: string[]
  supplier?: string
}
```

Rules:

- Between fields: AND.
- Within certifications/applications: OR.
- Numeric ranges are inclusive.
- Missing active dimensions fail the filter.
- Search normalizes case and matches bilingual title/description/designation.
- Filtered/search URLs canonicalize to `/[category]`.

## Localization

Use `@nuxtjs/i18n`:

- `defaultLocale: 'en'`
- `strategy: 'prefix_except_default'`
- English at `/`
- Chinese at `/zh/`
- Product and category slugs remain English technical slugs for stable identifiers.
- Locale files must have identical recursive key sets.

## SEO

### Index policy

Indexable:

- `/`
- `/bearings/:category`
- `/knowledge`
- `/knowledge/:slug`

Noindex:

- `/products`
- `/products/:slug`
- `/suppliers`
- `/suppliers/:slug`
- `/news`
- `/news/:slug`
- `/exhibitions`
- `/exhibitions/:slug`
- `/rfq`, `/my-rfq`, `/inbox`, `/publish`, `/supplier`, `/company`, `/auth/*`

Canonical base is `https://kaupbearings.com`.

For each localized page:

- Title and description from page-specific content.
- Canonical to the current locale path.
- Reciprocal English/Chinese `hreflang`.
- `x-default` points to English.
- Open Graph/Twitter metadata uses the generated hero image.

JSON-LD:

- Home: Organization + WebSite.
- Category: CollectionPage + BreadcrumbList.
- Knowledge article: TechArticle + BreadcrumbList.
- Demo commercial pages: no Product/Offer or Organization claim that implies real availability.

## Images and Performance

- Use static public assets with stable names.
- 32 product images, 8 category images, 5 scene images.
- Product/category images generated at 1280x720 or larger, visually consistent.
- Use `<picture>`/Nuxt image helpers with explicit width and height and WebP output where available.
- Hero image is eager and high priority; below-fold images lazy-load.
- Every visible face in any generated image must be an authentic Chinese person with Northeast Chinese features. Prompts explicitly prohibit foreign and generic East Asian faces.

## Security and Truthfulness

- Demo passwords are frontend fixtures and never claimed secure.
- No HTML injection from user data: Vue interpolation only.
- External URL fields are not rendered as trusted HTML.
- All fictional suppliers, prices, certifications and metrics are labeled demo.
- No email, network request or file upload is performed by inquiry/publish flows.

## Failure Handling

- Invalid category/product/supplier slug → Nuxt 404.
- Invalid URL filters → normalize to valid defaults.
- Local-storage unavailable/quota exceeded → explicit failure banner.
- Empty catalog search → empty state with reset action.
- Pending supplier direct navigation to protected actions → permission screen.
- Missing image → CSS neutral fallback plus accessible alt text; build/test detects missing files.

## Deployment Handoff

- `pnpm build` produces a Nitro application.
- Pre-render public static routes where possible; keep dynamic workspaces client-only.
- Document Node/server or static output requirements without deploying.
- `NUXT_PUBLIC_SITE_URL` defaults to `https://kaupbearings.com`.
