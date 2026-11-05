<script setup lang="ts">
import type { Supplier } from '#shared/types/catalog'
import { useLocalized } from '../composables/useLocalized'

defineProps<{ supplier: Supplier }>()
const { tr } = useLocalized()
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <article class="supplier-card">
    <NuxtLink :to="localePath(`/suppliers/${supplier.slug}`)" class="supplier-image" tabindex="-1" aria-hidden="true">
      <img :src="supplier.image" :alt="tr(supplier.name)" width="1280" height="720" loading="lazy" >
    </NuxtLink>
    <div class="supplier-head">
      <span class="supplier-mark" aria-hidden="true">{{ tr(supplier.name).slice(0, 1) }}</span>
      <div>
        <h3>
          <NuxtLink :to="localePath(`/suppliers/${supplier.slug}`)">{{ tr(supplier.name) }}</NuxtLink>
        </h3>
        <p>{{ tr(supplier.city) }} · {{ tr(supplier.country) }}</p>
      </div>
    </div>
    <p>{{ tr(supplier.description) }}</p>
    <div class="badge-row">
      <span class="kb-badge">{{ t('workspace.verified') }}</span>
      <span v-for="system in supplier.qualitySystems" :key="system" class="kb-badge">{{ system }}</span>
    </div>
    <dl>
      <div>
        <dt>{{ t('suppliers.precisionCapability') }}</dt>
        <dd>{{ tr(supplier.precisionCapability) }}</dd>
      </div>
      <div>
        <dt>{{ t('suppliers.leadTime') }}</dt>
        <dd>{{ supplier.leadTime }}</dd>
      </div>
    </dl>
    <NuxtLink :to="localePath(`/suppliers/${supplier.slug}`)" class="supplier-link">
      {{ t('common.viewDetails') }} <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
    </NuxtLink>
  </article>
</template>

<style scoped>
.supplier-card {
  overflow: hidden;
  background: white;
  border: 1px solid var(--kb-line);
  border-radius: var(--kb-radius);
}
.supplier-image {
  display: block;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--kb-steel);
}
.supplier-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 240ms ease;
}
.supplier-card:hover .supplier-image img {
  transform: scale(1.025);
}
.supplier-head {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 20px 22px 0;
}
.supplier-mark {
  display: grid;
  flex: none;
  width: 46px;
  height: 46px;
  place-items: center;
  background: var(--kb-graphite);
  color: white;
  border-radius: 5px;
  font-weight: 800;
}
h3 {
  margin: 0;
  font-size: 17px;
}
.supplier-head p,
.supplier-card > p {
  color: var(--kb-muted);
  font-size: 13px;
}
.supplier-head p {
  margin: 3px 0 0;
}
.supplier-card > p {
  min-height: 62px;
  margin-block: 18px;
  padding-inline: 22px;
}
.badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  padding-inline: 22px;
}
dl {
  margin: 18px 22px;
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
  font-weight: 700;
}
.supplier-link {
  display: flex;
  min-height: 42px;
  align-items: center;
  justify-content: space-between;
  color: var(--kb-blue-deep);
  font-size: 13px;
  font-weight: 800;
  margin-inline: 22px;
}
</style>
