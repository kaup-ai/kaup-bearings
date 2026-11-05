# Frontend Development Guidelines

## Guidelines Index

| Guide | Description | Status |
| --- | --- | --- |
| [Directory Structure](./directory-structure.md) | Nuxt app, shared domain and server boundaries | Active |
| [Component Guidelines](./component-guidelines.md) | Vue component, scoped CSS and accessibility patterns | Active |
| [Hook Guidelines](./hook-guidelines.md) | Nuxt composable patterns | Active |
| [State Management](./state-management.md) | URL filters and browser-local demo persistence | Active |
| [Quality Guidelines](./quality-guidelines.md) | Tests, build, SEO and visual verification | Active |
| [Type Safety](./type-safety.md) | Shared TypeScript contracts and `#shared` imports | Active |

## Pre-Development Checklist

- Read the active Trellis task artifacts.
- Keep pure domain logic under `shared/`.
- Use `#shared/...` imports from Nuxt app and Nitro code.
- Keep browser storage access inside composables.
- Verify SSR HTML and noindex policy for any new public page.

## Quality Check

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

Also check browser layouts at 375, 768 and 1440 widths.
