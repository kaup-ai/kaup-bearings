# Implementation Checklist

## Phase 0: Foundation

- [ ] Scaffold Nuxt 4, TypeScript, Nuxt UI, Tailwind CSS, Nuxt Content, i18n and test scripts.
- [ ] Add ESLint/Prettier configuration and lock dependencies.
- [ ] Create `shared/types` and pure catalog utilities.
- [ ] Add Node tests for filtering, dimensions, search, sorting and data integrity.
- [ ] Run initial typecheck and unit tests.

Validation:

```bash
pnpm test
pnpm typecheck
```

Rollback point: remove only scaffold files if dependency versions are incompatible; no application data is created yet.

## Phase 1: Domain Data

- [ ] Define 8 categories and complete subcategory taxonomy.
- [ ] Add 32 professional products with ISO-style designations and technical parameters.
- [ ] Add 12 demo suppliers with capabilities and quality systems.
- [ ] Add applications, technical articles, news and exhibitions.
- [ ] Add data-integrity tests for counts, unique slugs, references and image paths.

Validation:

```bash
pnpm test
```

Rollback point: data modules are isolated; revert data files if contract tests show inconsistent taxonomy.

## Phase 2: Shell and Design System

- [ ] Build brand lockup for `Kaup Bearings · 北轴汇`.
- [ ] Implement responsive header, mega-menu, mobile navigation and footer.
- [ ] Add locale switcher and bilingual route utilities.
- [ ] Define graphite/steel/blue/safety-amber tokens, typography, spacing and focus states.
- [ ] Add skip link, reduced-motion support and global accessibility defaults.

Validation:

```bash
pnpm typecheck
pnpm lint
```

Rollback point: header/layout files are independent of data and can be reverted without breaking domain tests.

## Phase 3: Public Discovery

- [ ] Build product-first home with category directory, model/dimension search, featured products, suppliers, applications, content and RFQ.
- [ ] Build category landing pages from typed category content.
- [ ] Build catalog with URL-backed filters and empty/reset states.
- [ ] Build product detail with parameter table, standards and supplier information.
- [ ] Build supplier directory and detailed capability profile.

Validation:

```bash
pnpm test
pnpm typecheck
pnpm build
```

Rollback point: keep data intact; revert page/component commits if public shells fail without touching workspace persistence.

## Phase 4: SEO

- [ ] Implement reusable page metadata/canonical/hreflang composable.
- [ ] Add JSON-LD for Organization, WebSite, CollectionPage, BreadcrumbList and TechArticle.
- [ ] Generate `/robots.txt` and `/sitemap.xml` from shared route data.
- [ ] Apply noindex rules to demo details and private workspaces.
- [ ] Verify initial server HTML contains H1, category copy and internal links.

Validation:

```bash
pnpm test
curl -s http://localhost:3000/bearings/tapered-roller-bearings | grep "Tapered roller bearings"
curl -s http://localhost:3000/sitemap.xml
```

Rollback point: SEO utilities are composables/server routes; revert without changing domain logic.

## Phase 5: Buyer and Supplier Workflows

- [ ] Implement safe browser storage adapter and explicit error states.
- [ ] Add buyer/supplier login and registration fixtures.
- [ ] Add supplier approval gate and protected navigation.
- [ ] Add supplier company profile, dashboard and simulated approval.
- [ ] Add product publishing form, draft recovery and validation.
- [ ] Add product-specific/general RFQ, My Inquiries, Inbox and status reducer.

Validation:

```bash
pnpm test
pnpm typecheck
```

Manual browser path:

```text
buyer login → product → RFQ submit → my inquiries
supplier login → inbox → mark viewed → reply
buyer refresh → see replied status and response
pending supplier → publish blocked → simulated approval → publish allowed
```

Rollback point: browser storage keys are versioned; clear them in dev if contract changes. Revert workspace pages independently.

## Phase 6: Technical and Editorial Content

- [ ] Add Nuxt Content knowledge collection and bilingual technical guides.
- [ ] Add knowledge index/detail pages with professional terminology and related links.
- [ ] Add noindex demo news and exhibitions.
- [ ] Link relevant knowledge topics from category and product pages.

Validation:

```bash
pnpm test
pnpm build
```

Rollback point: content collection is isolated; pages return 404 gracefully if content entry is removed.

## Phase 7: Images

- [ ] Finalize prompt registry for 32 products, 8 categories and 5 scenes.
- [ ] Regenerate any face-containing image with Chinese Northeast facial-feature constraints.
- [ ] Generate assets and inspect dimensions/colors/content.
- [ ] Convert to optimized WebP and update data paths.
- [ ] Add asset contract tests.

Validation:

```bash
pnpm test
sips -g pixelWidth -g pixelHeight public/images/products/*.png
```

Rollback point: preview assets and final assets are separate directories; rejected images remain outside runtime references.

## Phase 8: Quality Gate

- [ ] Run full tests, typecheck, lint and production build.
- [ ] Start production preview.
- [ ] Browser-check 375, 768 and 1440 widths.
- [ ] Verify no horizontal overflow, all primary flows and image loads.
- [ ] Verify SEO HTML/robots/sitemap/canonical/hreflang/noindex.
- [ ] Update README and record verification evidence.

Validation:

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm build
pnpm preview
```

Rollback point: if a late integration change breaks public HTML, revert the integration commit and keep passing isolated domain modules.
