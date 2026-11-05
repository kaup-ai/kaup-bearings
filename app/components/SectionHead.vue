<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
  eyebrow?: string
  title: string
  description?: string
  actionLabel?: string
  actionTo?: RouteLocationRaw
}>()
</script>

<template>
  <div class="section-head">
    <div>
      <p v-if="eyebrow" class="kb-eyebrow">{{ eyebrow }}</p>
      <h2 class="kb-section-title">{{ title }}</h2>
      <p v-if="description" class="kb-lede">{{ description }}</p>
    </div>
    <NuxtLink v-if="actionTo && actionLabel" :to="actionTo" class="head-action">
      {{ actionLabel }}
      <UIcon name="i-lucide-arrow-up-right" aria-hidden="true" />
    </NuxtLink>
  </div>
</template>

<style scoped>
.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 28px;
  margin-bottom: 28px;
  padding-top: 20px;
  border-top: 1px solid var(--kb-line);
}
.section-head h2 {
  margin: 6px 0 10px;
}
.section-head p {
  margin-bottom: 0;
}
.head-action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  font-size: 13px;
  font-weight: 750;
  color: var(--kb-blue-deep);
  white-space: nowrap;
}
@media (max-width: 640px) {
  .section-head {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
