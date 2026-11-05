# Type Safety

## Contracts

Domain types live in `shared/types/catalog.ts`. App and server code import them through `#shared/types/catalog`.

```ts
export interface ProductFilter {
  category?: string
  dimensions?: Partial<Record<DimensionKey, NumericRange>>
}
```

## Runtime Validation

Nuxt Content frontmatter is validated by `content.config.ts` with Zod. RFQ submission calls `validateRfq` before browser persistence. Native form constraints are supplementary.

## Rules

- TypeScript strict mode is enabled.
- Avoid `any`; use `unknown` plus guards for external payloads.
- Use discriminated result types for recoverable storage failures.
- Validate product/category slugs and references in tests.
- Do not define parallel payload interfaces in pages or components.
