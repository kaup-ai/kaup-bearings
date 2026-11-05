# Kaup Bearings · 北轴汇

A bilingual vertical B2B platform prototype for bearing sourcing, supplier capability discovery and structured RFQ workflows.

Canonical production origin: `https://kaupbearings.com`

## Technology

- Nuxt 4 and Vue 3
- TypeScript
- Nuxt UI and Tailwind CSS
- Nuxt Content
- Nuxt I18n
- Nitro SSR
- Node's built-in test runner

## Local development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

Production checks:

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm build
pnpm preview
```

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Buyer | `buyer@kaupbearings.demo` | `Demo123!` |
| Supplier | `supplier@kaupbearings.demo` | `Demo123!` |

The credentials only unlock browser-local demonstration state. They are not production authentication.

## Demo workflow

1. Sign in with the buyer account.
2. Open a product and create an RFQ.
3. Open **My inquiries** to see the submitted state.
4. Sign in with the supplier account and open **Inquiry inbox**.
5. Mark the inquiry viewed, write a reply, and save it.
6. Sign back in as the buyer and refresh **My inquiries** to see the replied status and response.

New suppliers are marked `pending`. They may edit company information and save product drafts. Product publishing and inquiry replies unlock through the explicitly labelled **Simulate supplier approval** action.

## Information architecture

- Product-first home and model/dimension search
- Eight professional bearing families and common subcategories
- Filterable product catalogue and detailed specification pages
- Supplier directory and capability profiles
- Technical selection centre
- Demo industry news and exhibitions
- Buyer RFQ and inquiry tracking
- Supplier dashboard, publishing, profile and inbox

## Demo data boundary

The project ships 32 fictional product records and 12 fictional supplier profiles. Prices, certificates, verification states and lead times are demonstration data. They must not be interpreted as live availability, verified certification or a quotation.

No form sends email, uploads a file, charges a buyer or persists data to a server. Sessions, drafts and inquiries live in browser `localStorage`. Storage failure is shown as an error and must not be treated as success.

## SEO and indexing

- English routes are at `/`; Chinese routes are under `/zh/`.
- Category and technical-guide pages are indexable.
- Demo product, supplier, news and exhibition detail pages are `noindex, follow`.
- Private account and workspace routes are excluded from the sitemap.
- Canonical URLs, reciprocal `hreflang`, Open Graph and Twitter metadata are generated per page.
- `/robots.txt` and `/sitemap.xml` are Nitro server routes.
- Category content is rendered on the server so the initial HTML contains headings, descriptions, specifications and internal links.

`NUXT_PUBLIC_SITE_URL` can override the default canonical origin:

```bash
NUXT_PUBLIC_SITE_URL=https://kaupbearings.com pnpm build
```

## Image direction

Images are photorealistic industrial photography or product macro photography. Illustrations, cartoons, anime, plastic CGI and mechanically implausible bearing geometry are excluded.

If a generated image contains a visible face, the person must be an authentic Chinese national with Northeast Chinese facial features. The prompt registry is stored in `docs/image-prompts.json`.

## Deployment boundary

The repository is code-ready for `https://kaupbearings.com` but does not deploy itself or change DNS. A standard Node/Nitro deployment or configured static hosting target may be used. Connect production identity, persistence, upload storage, email notifications and moderation before treating this prototype as a production marketplace.

## Trellis

The implementation is tracked in `.trellis/tasks/11-05-kaup-bearings-platform/`. Use the Trellis workflow commands for continuing verification, spec updates or task closure.

## License

The source code and project content are proprietary to Dalian Kaup Technology
Co., Ltd. See [LICENSE](LICENSE). The package is private and is not released
under an open-source license.
