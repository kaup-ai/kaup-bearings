<script setup lang="ts">
import type { Product } from '#shared/types/catalog'
import { formatBearingDimensions } from '#shared/utils/catalog'
import { useLocalized } from '../composables/useLocalized'

defineProps<{ product: Product }>()
const { tr } = useLocalized()
const { t, locale } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <article class="product-card">
    <NuxtLink :to="localePath(`/products/${product.slug}`)" class="product-image">
      <img
        :src="product.image"
        :alt="tr(product.title)"
        width="1280"
        height="720"
        loading="lazy"
      >
      <span class="kb-badge kb-demo">{{ t('common.demo') }}</span>
    </NuxtLink>
    <div class="product-body">
      <p class="designation">{{ product.designation }}</p>
      <h3>
        <NuxtLink :to="localePath(`/products/${product.slug}`)">
          {{ tr(product.title) }}
        </NuxtLink>
      </h3>
      <dl>
        <div><dt>{{ locale === 'zh' ? '尺寸' : 'Dimensions' }}</dt><dd>{{ formatBearingDimensions(product) }}</dd></div>
        <div><dt>{{ t('common.precision') }}</dt><dd>{{ product.parameters.precision }}</dd></div>
        <div><dt>{{ t('common.clearance') }}</dt><dd>{{ product.parameters.clearance }}</dd></div>
      </dl>
      <div class="product-bottom">
        <span v-if="product.price.min > 0">${{ product.price.min.toFixed(2) }} +</span>
        <span v-else>{{ locale === 'zh' ? '按项目报价' : 'Project quote' }}</span>
        <NuxtLink :to="localePath(`/products/${product.slug}`)" :aria-label="t('common.viewDetails')">
          <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  overflow: hidden;
  background: white;
  border: 1px solid var(--kb-line);
  border-radius: var(--kb-radius);
  transition: border-color 160ms ease, box-shadow 160ms ease;
}
.product-card:hover {
  border-color: #9eb3be;
  box-shadow: 0 14px 30px rgba(17, 24, 32, 0.09);
}
.product-image {
  position: relative;
  display: block;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #dce5e9;
}
.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.product-image .kb-badge {
  position: absolute;
  top: 12px;
  left: 12px;
}
.product-body {
  padding: 18px;
}
.designation {
  margin: 0 0 8px;
  color: var(--kb-blue);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
}
h3 {
  min-height: 48px;
  margin: 0;
  font-size: 18px;
  line-height: 1.35;
}
dl {
  display: grid;
  gap: 6px;
  margin: 18px 0;
  padding-top: 14px;
  border-top: 1px solid var(--kb-line);
}
dl div {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 12px;
}
dt {
  color: var(--kb-muted);
}
dd {
  margin: 0;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
}
.product-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 800;
}
.product-bottom a {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid var(--kb-line);
  border-radius: 4px;
}
</style>
