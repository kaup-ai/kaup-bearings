# Kaup Bearings / 北轴汇 Product Specification

**Status:** Confirmed for implementation  
**Date:** 2026-11-05  
**Canonical domain:** `https://kaupbearings.com`  
**Working Chinese brand:** 北轴汇  
**English brand:** Kaup Bearings

## Product Goal

Build a professional, bilingual vertical B2B platform for bearing sourcing. The first
release is a fully interactive frontend prototype built on the Kaup AI website's Nuxt
stack. Product, supplier, authentication, publishing and inquiry data may use local
fixtures and browser storage, but public catalog content must be server-rendered and
crawlable.

The site should reproduce the information architecture and platform breadth of Kaup
Link while establishing a distinct precision-industrial identity for Kaup Bearings.

## Audiences

- Industrial buyers sourcing bearings by type, dimensions, designation and application.
- Bearing manufacturers, distributors and service providers listing products and
  responding to RFQs.
- Engineers evaluating precision, clearance, seals, cages and application suitability.

## Technology

- Nuxt 4 and Vue 3.
- TypeScript.
- Nuxt UI and Tailwind CSS.
- Nuxt Content for the technical knowledge center.
- Nitro server routes for robots and sitemap generation.
- `@nuxtjs/i18n` for English and Chinese routing and copy.
- Native browser storage for the prototype account, draft, RFQ and inquiry state.
- Node's built-in test runner for domain logic and data-contract tests.

The existing Kaup AI deployment topology is not part of this project. The application
must produce a single-domain build suitable for `https://kaupbearings.com`.

## Information Architecture

Public pages:

- Home.
- Bearing category landing pages.
- Searchable product catalog.
- Product detail.
- Supplier directory.
- Supplier detail.
- Technical knowledge center and articles.
- Industry news and exhibitions.
- General RFQ.

Buyer workspace:

- Buyer sign-in and registration.
- My inquiries and inquiry detail.

Supplier workspace:

- Supplier sign-in and onboarding.
- Supplier dashboard.
- Product publishing and draft recovery.
- Inquiry inbox and replies.
- Company profile and capabilities.

## Taxonomy

The primary hierarchy is structure/motion-first. Industry applications are cross-cutting
filters.

1. Ball bearings
   - Deep groove ball bearings
   - Angular contact ball bearings
   - Self-aligning ball bearings
   - Thrust ball bearings
2. Roller bearings
   - Cylindrical roller bearings
   - Spherical roller bearings
   - Tapered roller bearings
   - Needle roller bearings
   - Thrust roller bearings
3. Linear motion
   - Linear ball bushings
   - Linear guide assemblies
   - Ball screw support units
4. Plain bearings
   - Sleeve and flanged bushings
   - Spherical plain bearings
   - Rod ends
   - Thrust washers
5. Bearing units and housings
   - Insert ball bearings
   - Pillow block units
   - Flanged units
   - Take-up units
6. Slewing and special bearings
   - Slewing ring bearings
   - Split bearings
   - Hybrid ceramic bearings
   - High-temperature and corrosion-resistant bearings
7. Bearing components
   - Balls
   - Rollers
   - Cages
   - Rings
   - Seals and shields
8. Mounting, lubrication and condition monitoring
   - Mounting tools
   - Induction heaters
   - Lubricants
   - Condition-monitoring equipment

Product specifications use `d`, `D`, `B/T`, dynamic load rating `Cr`, static load rating
`C0r`, limiting speed, precision grade, internal clearance, sealing/shielding, cage,
material, standards, certifications and applications.

## Functional Requirements

### Catalog

- Filter by category, subcategory, designation/query, dimensions, clearance, precision,
  sealing, cage, material, supplier and application.
- Numeric dimensions support exact values and ranges.
- Filter state is shareable through URL query parameters.
- Search is case-insensitive and matches English/Chinese titles, designations, dimensions
  and known standards.
- Demo listings are clearly marked.

### Accounts and permissions

- Buyer and supplier roles are separate.
- Demo accounts are available without real authentication claims.
- New suppliers enter `pending` status.
- Pending suppliers may edit company data and save product drafts but cannot publish or
  reply until a clearly labeled simulated approval.
- A seeded supplier account is verified so the complete flow remains demonstrable.

### Product publishing

- Supplier profile fields are reused.
- Product form supports bilingual content, category-dependent technical parameters,
  certifications, trade terms, image filename preview, draft recovery and validation.
- Draft persistence failures must not display a false success state.

### RFQ and inquiry

- Product-specific and general RFQs are supported.
- RFQ captures company, country, designation/dimensions, quantity, annual demand,
  application, load, speed, precision, clearance, sealing, delivery, Incoterms and notes.
- Attachment UI is explicitly a prototype placeholder.
- Inquiry states are `submitted`, `viewed` and `replied`.
- Buyers can read supplier replies in My Inquiries.
- Verified suppliers can view, mark read and reply in their inbox.

## Content and Data

- 32 demo products, four per primary category.
- 12 demo suppliers.
- At least 12 technical or industry articles and 6 events.
- All product, supplier, certification, price and event data are clearly labeled demo
  content.
- Technical content must use correct ISO/DIN/ABEC terminology where applicable.

## Visual Direction

Precision-industrial B2B:

- Graphite, steel gray, cool blue and restrained safety amber.
- Dense but readable catalog and specification layouts.
- Square or lightly rounded industrial surfaces, not consumer-app styling.
- Plus Jakarta Sans for Latin text; system Chinese sans-serif for Chinese text.
- Vector Lucide icons only; never use emoji as structural icons.
- Photorealistic imagery only. No illustration, cartoon, anime, plastic render or
  surreal bearing geometry.
- Industrial environment photography and macro product photography.
- If a person's face is visible, the person must be an authentic Chinese national with
  Northeast Chinese (Dongbei) facial features. Prefer natural Chinese Northeast
  technicians/workers, not generic East Asian stock-photo faces.

## SEO and Accessibility

- English at root paths and Chinese under `/zh/`.
- Clean static paths for category and product pages.
- Public catalog content is rendered in server HTML.
- Category and technical content are indexable.
- Demo product, supplier, news and event detail pages use `noindex,follow`.
- Filtered/search pages canonicalize to their category landing page.
- Include unique titles/descriptions, canonical URLs, `hreflang`, Open Graph, Twitter
  cards, Organization/WebSite/CollectionPage/BreadcrumbList/Article JSON-LD where
  truthful, `robots.txt` and `sitemap.xml`.
- Private workspace pages are `noindex`.
- Core images use explicit dimensions, responsive sources and appropriate eager/lazy
  loading.
- WCAG AA contrast, keyboard navigation, visible focus, 44px touch targets, reduced
  motion and semantic forms.

## Delivery Boundary

- Deliver source code, package lockfile, tests, documentation and deployment guidance
  for `https://kaupbearings.com`.
- Do not deploy or alter DNS.
- Do not claim any fictional supplier, certificate, price or product is real.

