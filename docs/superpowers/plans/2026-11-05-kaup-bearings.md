# Kaup Bearings Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual, SEO-ready Nuxt vertical B2B platform for bearings at `kaupbearings.com`, with a complete local demo purchasing and supplier workflow.

**Architecture:** Nuxt 4 renders public catalog content on the server and uses localized clean routes. Typed shared data and utility modules power catalog/search/SEO logic; browser-storage composables power the demo account, publishing and RFQ workflows. Nuxt Content holds technical articles and the visual system uses custom Tailwind/design tokens over Nuxt UI primitives.

**Tech Stack:** Nuxt 4, Vue 3, TypeScript, Nuxt UI, Tailwind CSS, Nuxt Content, `@nuxtjs/i18n`, Nitro, Node test runner, MiniMax `image-01` for photorealistic assets.

**Spec:** `docs/specs/2026-11-05-kaup-bearings.md`

## Global Constraints

- Canonical domain is exactly `https://kaupbearings.com`.
- English routes are at `/`; Chinese routes are under `/zh/`.
- Runtime framework is Nuxt 4 with TypeScript.
- All demo suppliers, prices, certifications and products must remain clearly labeled demo content.
- Demo product/supplier pages and news/event details are `noindex,follow`; category and technical pages are indexable.
- New suppliers are `pending`; they may save drafts but cannot publish or reply until simulated approval.
- If a generated image shows a person's face, the person must be Chinese with Northeast Chinese facial features.
- Generated images must be photorealistic: no illustration, cartoon, anime, plastic CGI or fantastical bearing geometry.
- Delivery is code/configuration only; do not deploy, change DNS or publish externally.

## Review Focus

- A buyer with empty or malformed URL filters should still get a stable, non-crashing catalog.
- A pending supplier must not bypass publishing/inbox restrictions through direct navigation.
- Local-storage failures must not report successful saves or inquiries.
- Crawlers must receive category titles, descriptions, copy and links in the initial server HTML.
- Mobile catalog forms, long technical names and filter panels must not cause horizontal overflow or inaccessible controls.

---

### Task 1: Project Foundation and Domain Contract

**Files:**
- Create: `package.json`
- Create: `nuxt.config.ts`
- Create: `tsconfig.json`
- Create: `app/app.vue`
- Create: `app/app.config.ts`
- Create: `app/assets/css/main.css`
- Create: `tests/catalog.test.ts`
- Create: `shared/types/catalog.ts`
- Create: `shared/utils/catalog.ts`

**Interfaces:**
- Consumes: none.
- Produces: `Product`, `Category`, `Supplier`, `ProductFilter`; `filterProducts(products, filter): Product[]`; `sortProducts(products, sort, query): Product[]`; `formatBearingDimensions(product): string`.

- [ ] **Step 1: Write failing catalog contract tests**

Test exact dimension matching, range matching, designation query matching, certification OR matching, stable empty-filter behavior, and price sorting.

- [ ] **Step 2: Run the tests and verify they fail**

Run: `node --test tests/catalog.test.ts`  
Expected: FAIL because the shared catalog module is missing.

- [ ] **Step 3: Add the Nuxt foundation and catalog types**

`filterProducts` accepts a typed filter object and returns every product when filters are empty. Numeric `{min,max}` filters include endpoints; missing numeric product values fail active numeric filters.

- [ ] **Step 4: Run catalog tests and the initial build checks**

Run: `node --test tests/catalog.test.ts && pnpm typecheck`  
Expected: catalog tests pass; typecheck exits 0.

### Task 2: Professional Bearing Data Set

**Files:**
- Create: `shared/data/taxonomy.ts`
- Create: `shared/data/products.ts`
- Create: `shared/data/suppliers.ts`
- Create: `shared/data/editorial.ts`
- Create: `tests/data-contract.test.ts`

**Interfaces:**
- Consumes: catalog types from Task 1.
- Produces: `categories`, `products`, `suppliers`, `articles`, `exhibitions`; lookup functions `getCategoryBySlug`, `getProductBySlug`, `getSupplierBySlug`.

- [ ] **Step 1: Write failing data-contract tests**

Assert 8 categories, at least 32 products distributed four per category, 12 suppliers, unique slugs, valid supplier references, required professional parameters, and at least one product image path per product.

- [ ] **Step 2: Run the tests and verify they fail**

Run: `node --test tests/data-contract.test.ts`  
Expected: FAIL because the data modules are missing.

- [ ] **Step 3: Add typed taxonomy, catalog and supplier data**

Use the exact primary taxonomy in the spec and ISO-style designations such as `6205-2RS/C3`, `32012-X`, `NU 206 ECP`, `GE 40 ES`, `UCP 210` and `23140 CC/W33`. All prices and certifications are visibly demo data.

- [ ] **Step 4: Run data-contract tests**

Run: `node --test tests/data-contract.test.ts`  
Expected: PASS.

### Task 3: Brand Shell, Localization and Design Tokens

**Files:**
- Create: `app/components/AppHeader.vue`
- Create: `app/components/AppFooter.vue`
- Create: `app/components/AppLogo.vue`
- Create: `app/components/LocaleSwitcher.vue`
- Create: `app/layouts/default.vue`
- Create: `locales/en.json`
- Create: `locales/zh.json`
- Create: `tests/locale-contract.test.ts`
- Modify: `nuxt.config.ts`
- Modify: `app/assets/css/main.css`

**Interfaces:**
- Consumes: taxonomy from Task 2.
- Produces: responsive brand shell, locale-aware links, global navigation and public design tokens.

- [ ] **Step 1: Write failing locale key parity tests**

Assert both locale files have identical recursive key sets and required brand strings `Kaup Bearings` and `北轴汇`.

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/locale-contract.test.ts`  
Expected: FAIL because locale files are absent.

- [ ] **Step 3: Implement the bilingual shell**

Configure `defaultLocale: 'en'`, `strategy: 'prefix_except_default'`, Chinese locale `zh`, English locale `en`. Use accessible desktop mega-menu and mobile disclosure navigation.

- [ ] **Step 4: Run locale tests and typecheck**

Run: `node --test tests/locale-contract.test.ts && pnpm typecheck`  
Expected: PASS.

### Task 4: SEO Primitives and Crawlable Category Routes

**Files:**
- Create: `app/composables/useBearingsSeo.ts`
- Create: `app/pages/bearings/[category].vue`
- Create: `server/routes/robots.txt.ts`
- Create: `server/routes/sitemap.xml.ts`
- Create: `tests/seo.test.ts`
- Modify: `nuxt.config.ts`

**Interfaces:**
- Consumes: categories and products from Task 2; shell from Task 3.
- Produces: `buildCanonical(locale, route)`, `buildAlternateUrls(route)`, `buildSitemapEntries(locale)`; crawlable category pages with breadcrumbs and CollectionPage JSON-LD.

- [ ] **Step 1: Write failing SEO tests**

Assert English canonical root paths, Chinese `/zh/` paths, reciprocal `hreflang`, exclusive sitemap entries for home/categories/technical content, and exclusion of demo supplier/product/news pages.

- [ ] **Step 2: Run the tests and verify they fail**

Run: `node --test tests/seo.test.ts`  
Expected: FAIL because SEO utilities are missing.

- [ ] **Step 3: Implement SEO utilities and category pages**

Render the category name, technical introduction, variants, selection guidance, applications, FAQ, product links and supplier links in server HTML. Add unique metadata, canonical, alternates, Open Graph and JSON-LD.

- [ ] **Step 4: Run SEO tests and build**

Run: `node --test tests/seo.test.ts && pnpm build`  
Expected: PASS and build exits 0.

### Task 5: Home, Catalog and Detail Discovery

**Files:**
- Create: `app/components/HomeHero.vue`
- Create: `app/components/CategoryGrid.vue`
- Create: `app/components/ProductCard.vue`
- Create: `app/components/SupplierCard.vue`
- Create: `app/pages/index.vue`
- Create: `app/pages/products/index.vue`
- Create: `app/pages/products/[slug].vue`
- Create: `app/components/ProductFilters.vue`
- Create: `tests/discovery.test.ts`

**Interfaces:**
- Consumes: catalog functions and data; `useBearingsSeo`.
- Produces: product-first home, filterable catalog, product detail, related product/supplier links and RFQ calls to action.

- [ ] **Step 1: Write failing discovery tests**

Assert designation and dimension search results, dimension-range boundary inclusion, filter reset, and an empty search result with no throw.

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/discovery.test.ts`  
Expected: FAIL for at least one missing discovery helper.

- [ ] **Step 3: Implement home and catalog**

Home order: category directory and model/dimension search, industrial hero, featured products, application industries, suppliers, technical content/events, RFQ. Catalog URLs retain filters but canonicalize to the selected category.

- [ ] **Step 4: Run tests and build**

Run: `node --test tests/discovery.test.ts && pnpm build`  
Expected: PASS.

### Task 6: Supplier Directory and Detail

**Files:**
- Create: `app/pages/suppliers/index.vue`
- Create: `app/pages/suppliers/[slug].vue`
- Create: `app/components/SupplierProfile.vue`
- Create: `tests/suppliers.test.ts`

**Interfaces:**
- Consumes: suppliers, categories and products.
- Produces: supplier discovery plus profile capabilities, processes, quality systems, inspection, export markets and product links.

- [ ] **Step 1: Write failing supplier tests**

Assert supplier search by name/country/category, valid products, and truthful demo-status labels.

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/suppliers.test.ts`  
Expected: FAIL because supplier query helpers are absent.

- [ ] **Step 3: Implement supplier pages**

Supplier detail pages are `noindex,follow`, while the directory remains useful but may also be `noindex,follow` until real companies replace demo data.

- [ ] **Step 4: Run supplier tests**

Run: `node --test tests/suppliers.test.ts`  
Expected: PASS.

### Task 7: Demo Accounts, Supplier Approval and Workspace Shell

**Files:**
- Create: `app/composables/useDemoSession.ts`
- Create: `app/composables/useDemoMarketplace.ts`
- Create: `app/middleware/supplier.ts`
- Create: `app/pages/auth/buyer.vue`
- Create: `app/pages/auth/supplier.vue`
- Create: `app/pages/company.vue`
- Create: `app/pages/supplier.vue`
- Create: `tests/workspace.test.ts`

**Interfaces:**
- Consumes: supplier data.
- Produces: `login(role,email,password)`, `registerBuyer(input)`, `registerSupplier(input)`, `logout()`, `canPublish(status)`, `canReply(status)`, `approveSupplierDemo(id)` and persisted session/profile state.

- [ ] **Step 1: Write failing permission tests**

Assert demo buyer/supplier login, rejected invalid credentials, pending supplier may save drafts but cannot publish or reply, and simulated approval unlocks both.

- [ ] **Step 2: Run the tests and verify they fail**

Run: `node --test tests/workspace.test.ts`  
Expected: FAIL because permission functions are missing.

- [ ] **Step 3: Implement storage contracts and workspace screens**

Persist `kb_session`, `kb_accounts`, `kb_supplier_profile`, `kb_drafts`, `kb_rfqs`; failures return explicit error results. Private screens are `noindex`.

- [ ] **Step 4: Run workspace tests**

Run: `node --test tests/workspace.test.ts`  
Expected: PASS.

### Task 8: Product Publishing, RFQ and Inquiry Loop

**Files:**
- Create: `app/pages/publish.vue`
- Create: `app/pages/rfq.vue`
- Create: `app/pages/my-rfq.vue`
- Create: `app/pages/inbox.vue`
- Create: `app/components/ProductForm.vue`
- Create: `app/components/RfqForm.vue`
- Create: `app/components/InquiryPanel.vue`
- Create: `tests/inquiry.test.ts`
- Modify: `app/composables/useDemoMarketplace.ts`

**Interfaces:**
- Consumes: permissions and local storage contracts.
- Produces: `validateProductDraft`, `validateRfq`, `submitRfq`, `markViewed`, `replyToRfq`; draft recovery; buyer/supplier inquiry synchronization.

- [ ] **Step 1: Write failing inquiry tests**

Assert product-specific RFQ creation, general RFQ creation, required-field validation, `submitted → viewed → replied`, no status downgrade, and pending supplier reply rejection.

- [ ] **Step 2: Run the tests and verify they fail**

Run: `node --test tests/inquiry.test.ts`  
Expected: FAIL because inquiry domain functions are absent.

- [ ] **Step 3: Implement forms and state transitions**

Use visible labels, inline errors, file placeholders and explicit demo-success copy. Do not send email or upload files.

- [ ] **Step 4: Run inquiry tests**

Run: `node --test tests/inquiry.test.ts`  
Expected: PASS.

### Task 9: Technical Center, News and Exhibitions

**Files:**
- Create: `content.config.ts`
- Create: `content/knowledge/*.md`
- Create: `app/pages/knowledge/index.vue`
- Create: `app/pages/knowledge/[slug].vue`
- Create: `app/pages/news/index.vue`
- Create: `app/pages/news/[slug].vue`
- Create: `app/pages/exhibitions/index.vue`
- Create: `app/pages/exhibitions/[slug].vue`
- Create: `tests/content-contract.test.ts`

**Interfaces:**
- Consumes: Nuxt Content and editorial data.
- Produces: indexable bilingual technical guides, noindex demo news/events and Article JSON-LD for technical guides.

- [ ] **Step 1: Write failing content-contract tests**

Assert at least six technical topics per language or bilingual entries, required SEO fields, professional terminology, and no indexable demo news/event detail.

- [ ] **Step 2: Run the tests and verify they fail**

Run: `node --test tests/content-contract.test.ts`  
Expected: FAIL because content files are absent.

- [ ] **Step 3: Add technical and editorial content**

Cover designation structure, precision grades, internal clearance, seals/shields, cages, mounting fits and failure analysis. Use correct `Cr`, `C0r`, `P0/P6/P5/P4/P2`, `CN/C3/C4`, `ISO 492`, `DIN 620` and `ABEC` terminology.

- [ ] **Step 4: Run content tests and build**

Run: `node --test tests/content-contract.test.ts && pnpm build`  
Expected: PASS.

### Task 10: Image Production, Responsive Integration and Final Verification

**Files:**
- Create: `public/images/products/*`
- Create: `public/images/categories/*`
- Create: `public/images/scenes/*`
- Create: `public/og-kaup-bearings.png`
- Create: `docs/image-prompts.json`
- Create: `README.md`
- Create: `tests/asset-contract.test.ts`
- Create: `tests/ssr-smoke.test.ts`
- Modify: data image paths and image components.

**Interfaces:**
- Consumes: data and rendered pages.
- Produces: 32 product images, 8 category images, 5 scene images, optimized public assets and end-to-end verification evidence.

- [ ] **Step 1: Write failing asset and SSR smoke tests**

Assert every referenced image exists, all generated images exceed minimum dimensions, 32 product assets exist, category SSR HTML contains a crawlable H1 and product links, and demo detail pages expose `noindex`.

- [ ] **Step 2: Run the tests and verify they fail**

Run: `node --test tests/asset-contract.test.ts tests/ssr-smoke.test.ts`  
Expected: FAIL because generated assets and running server are absent.

- [ ] **Step 3: Generate and integrate photorealistic assets**

Use the approved photorealistic style. If a person's face is visible, explicitly require an authentic Chinese national with Northeast Chinese facial features. Avoid faces where they add no product value. Convert final images to responsive WebP/AVIF where supported while retaining acceptable fallbacks.

- [ ] **Step 4: Run complete verification**

Run: `pnpm test && pnpm typecheck && pnpm lint && pnpm build`  
Expected: all commands exit 0.

- [ ] **Step 5: Run browser verification**

Check home, category, catalog, product, supplier, knowledge, RFQ and workspace routes at 375, 768 and 1440 widths. Confirm no horizontal overflow, no missing images, visible focus and working inquiry state transitions.

