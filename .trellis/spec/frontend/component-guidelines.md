# Component Guidelines

## Structure

Use `<script setup lang="ts">`, a semantic template, then scoped styles. Shared data components accept strongly typed props:

```vue
<script setup lang="ts">
import type { Product } from '#shared/types/catalog'
defineProps<{ product: Product }>()
</script>
```

## Styling

- Global tokens and shared primitives live in `app/assets/css/main.css`.
- Component-specific styles stay inside `<style scoped>`.
- Use Nuxt UI and local Lucide icons; never use emoji as control icons.
- Use CSS grid with `minmax(0, 1fr)` for dense catalog layouts.
- Avoid fixed desktop widths; verify 375, 768 and 1440 viewports.

## Accessibility

- Every form control has a visible associated label.
- Icon-only controls need an accessible name.
- Primary workflow controls reach 44px; breadcrumb links use a 44px minimum height.
- Include status text such as `submitted`, `viewed` and `replied`; color alone is insufficient.
- Respect `prefers-reduced-motion`.

## Truthfulness

Commercial demo content displays a Demo label and must not be presented as live stock, verified certification or a firm quotation.
