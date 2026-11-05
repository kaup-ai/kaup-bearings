# Reference Evidence

## Kaup Link

- `kaup-link` is a native multi-page HTML/CSS/JavaScript prototype with local data and browser storage.
- Its 16 pages already demonstrate home, catalog, product detail, suppliers, RFQ, buyer inquiries, supplier inbox, publishing, company profile, news and exhibitions.
- Public content is injected into empty `main` elements by JavaScript, and the pages share one generic meta description.
- It has no canonical, hreflang, robots, sitemap or JSON-LD.

Conclusion: preserve the useful information architecture and workflow breadth, but do not reuse its browser-only SEO architecture.

## Kaup AI Website

- Uses Nuxt 4, TypeScript, Nuxt UI, Nuxt Content, Tailwind CSS and Nitro.
- Has server-side SEO patterns, route-specific noindex decisions, Organization/WebSite JSON-LD and generated robots/sitemap content.
- Its request-time SSR and ICP behavior exists to support its dual-domain marketing deployment, not bearings commerce.

Conclusion: adopt the technical capabilities and typed service boundaries, while rebuilding the data model and avoiding its deployment topology.

## Image Preview Evidence

- The first wind-turbine preview showed a person whose face did not meet the user's demographic requirement and was removed.
- The corrected preview explicitly requires a Chinese national from Northeast China for any visible face and forbids Western, South Asian, Southeast Asian, Japanese, Korean and generic East Asian faces.
- The user approved the corrected overall image direction on 2026-11-05.

Runtime images to retain:

- `public/images/previews/preview-hero-bearing-factory.png`
- `public/images/previews/preview-product-deep-groove.png`
- `public/images/previews/preview-application-wind-turbine-v2.png`
