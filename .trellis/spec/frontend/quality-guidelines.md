# Quality Guidelines

## Required Commands

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

All four must pass before delivery.

## Test Coverage

- Catalog filtering, search and sorting.
- RFQ validation and status monotonicity.
- Supplier permission gates.
- Locale key parity.
- Canonical and sitemap path contracts.
- Data references, product/category counts and image existence.
- Bilingual technical-content presence.

## SEO Contract

- Initial server HTML contains the category H1, copy and internal links.
- Category and technical pages are indexable.
- Demo commercial/news detail pages use `noindex, follow`.
- Product, supplier and private workspace pages stay out of the sitemap.
- Canonical origin is `https://kaupbearings.com`.

## Browser Verification

- 375, 768 and 1440 viewport widths.
- No horizontal overflow.
- Above-fold images load.
- Keyboard order and visible focus are preserved.
- RFQ → supplier inbox → reply → buyer reply works.
- Pending suppliers cannot publish or reply.

## Forbidden Patterns

- Client-only rendering for indexable public content.
- Unlabelled controls or emoji structural icons.
- Direct `localStorage` access outside the browser-store adapter.
- Presenting fictional commercial data as real.
- Face-bearing image prompts without the Chinese Northeast facial-feature constraint.
