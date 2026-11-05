# Kaup Bearings Verification

Date: 2026-11-05

## Automated checks

| Check | Result |
| --- | --- |
| `pnpm test` | PASS — 22/22 |
| `pnpm typecheck` | PASS |
| `pnpm lint` | PASS |
| `pnpm build` | PASS — Nitro node-server build generated |

## Data and assets

- 8 primary bearing families and 33 reachable subcategory slugs.
- 32 products, four per primary family.
- 12 demo suppliers.
- 7 bilingual technical guides (14 Markdown files).
- 45 final runtime images: 32 products, 8 categories, 5 scenes.
- All runtime images are 1280x720 WebP; total runtime image payload is approximately 2.5 MB.
- Rejected foreign-face preview was removed. The approved wind-service sample explicitly depicts a Chinese Northeast technician constraint.

## SEO/SSR evidence

- All 22 checked public, buyer and supplier route URLs returned HTTP `200`, including both locales, a family page, a subcategory page, product, supplier, knowledge, news, exhibition, RFQ and workspace entry routes.
- `GET /bearings/tapered-roller-bearings` → `200`; initial HTML contains the H1, technical copy and `32012 X` product link.
- `GET /zh/bearings/tapered-roller-bearings` → `200`; title is Chinese; canonical and reciprocal `hreflang` use `https://kaupbearings.com`.
- `GET /knowledge/precision-grades-iso-abec` and its `/zh/` route render Nuxt Content server-side.
- Product detail returns `noindex, follow, max-image-preview:large`.
- `/sitemap.xml` includes only home, category, and knowledge pages in both languages.
- `/robots.txt` excludes only `/api/`; noindex pages remain crawlable so search engines can observe their directives.

## Browser evidence

Using a named `agent-browser` session against the production build:

- Desktop home at 1440px: no horizontal overflow; all visible images loaded.
- Mobile home at 375px: no horizontal overflow.
- Tablet product detail at 768px: no horizontal overflow; hero product image loaded at 1280×720 natural size.
- Mobile category at 375px: no horizontal overflow and no interactive targets below 24×24 CSS px.
- Chinese home at 1440px: Chinese H1 and `北轴汇` brand rendered with no overflow.
- Catalog query `dmin=60&Dmax=95&precision=P6` returned the expected `32012 X`.
- Buyer demo login persisted to `kb_session_v1`.
- Submitted product RFQ persisted with `submitted` status.
- Supplier demo login could see the inquiry and reply.
- Buyer returned to My Inquiries and saw the reply with `replied` status.
- Pending supplier: publish button disabled and approval warning visible.
- Simulated approval changed the session to `verified` and enabled publishing.

Screenshots:

- `docs/screenshots/home-desktop.png`
- `docs/screenshots/home-mobile.png`
- `docs/screenshots/home-zh-desktop.png`
- `docs/screenshots/category-desktop.png`
- `docs/screenshots/category-mobile.png`
- `docs/screenshots/catalog-mobile.png`
- `docs/screenshots/product-tablet.png`

## Known prototype boundaries

- Authentication, inquiries, drafts and approval are browser-local demos.
- No email, file upload, real stock, payment, moderation queue or production API exists.
- Generated supplier and product records remain fictional and are labelled Demo.
- Production deployment and DNS changes were intentionally not performed.
