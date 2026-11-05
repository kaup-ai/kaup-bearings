<script setup lang="ts">
import type { EditorialEntry } from '#shared/data/editorial'
import { useLocalized } from '../composables/useLocalized'

defineProps<{
  entries: EditorialEntry[]
  basePath: string
  event?: boolean
}>()
const { tr } = useLocalized()
const localePath = useLocalePath()
</script>

<template>
  <div class="editorial-grid">
    <NuxtLink
      v-for="entry in entries"
      :key="entry.slug"
      :to="localePath(`${basePath}/${entry.slug}`)"
      class="editorial-card"
    >
      <div class="editorial-image">
        <img :src="entry.image" :alt="tr(entry.title)" width="1280" height="720" loading="lazy" >
        <span class="kb-badge kb-demo">Demo</span>
      </div>
      <div class="editorial-copy">
        <p>{{ entry.date }}<span v-if="entry.location"> · {{ tr(entry.location) }}</span></p>
        <h2>{{ tr(entry.title) }}</h2>
        <p>{{ tr(entry.summary) }}</p>
        <span>Read {{ event ? 'event' : 'article' }} <UIcon name="i-lucide-arrow-right" aria-hidden="true" /></span>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.editorial-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}
.editorial-card {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  overflow: hidden;
  background: white;
  border: 1px solid var(--kb-line);
  border-radius: var(--kb-radius);
}
.editorial-image {
  position: relative;
  min-height: 230px;
  background: #d7e1e6;
}
.editorial-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.editorial-image .kb-badge {
  position: absolute;
  top: 12px;
  left: 12px;
}
.editorial-copy {
  display: flex;
  flex-direction: column;
  padding: 22px;
}
.editorial-copy > p:first-child {
  color: var(--kb-blue);
  font-size: 11px;
  font-weight: 750;
}
.editorial-copy h2 {
  margin: 4px 0 10px;
  font-size: 20px;
}
.editorial-copy > p:not(:first-child) {
  color: var(--kb-muted);
  font-size: 13px;
}
.editorial-copy > span {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--kb-line);
  color: var(--kb-blue-deep);
  font-size: 12px;
  font-weight: 800;
}
@media (max-width: 850px) {
  .editorial-grid,
  .editorial-card {
    grid-template-columns: 1fr;
  }
}
</style>
