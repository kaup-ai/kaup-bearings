# Composable Guidelines

## Naming and Return Shape

Use `useXxx` and return refs, readonly errors and explicit functions:

```ts
const { session, error, login, logout } = useDemoSession()
```

## Browser-only Work

Register `onMounted(load)` for browser storage. SSR renders a safe logged-out or empty state and must not access `window`.

## Pure Logic

Filtering, status transitions and permission checks live in `shared/utils/`. This keeps them testable with Node and reusable from Nitro.

## SEO

Public pages call `useBearingsSeo` once with title, description, path and index policy. Do not duplicate canonical or `hreflang` markup.
