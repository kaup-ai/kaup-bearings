<script setup lang="ts">
import { news } from '#shared/data/editorial'

const { t } = useI18n()
useBearingsSeo({
  title: computed(() => `${t('news.title')} | Kaup Bearings`),
  description: computed(() => t('news.description')),
  path: '/news',
  index: false,
  image: '/images/scenes/assembly.webp',
})
</script>

<template>
  <div>
    <section class="page-head">
      <div class="kb-container">
        <p class="kb-eyebrow">EDITORIAL / DEMO</p>
        <h1>{{ t('news.title') }}</h1>
        <p>{{ t('news.description') }}</p>
      </div>
    </section>
    <div class="kb-container kb-section">
      <EditorialGrid :entries="news" base-path="/news" />
    </div>
  </div>
</template>

<style scoped>
.page-head {
  padding-block: 58px;
  background: linear-gradient(135deg, #f8fcfd, #deedf1);
  color: var(--kb-text);
  border-top: 4px solid var(--kb-blue);
  border-bottom: 1px solid var(--kb-line);
}
h1 {
  margin: 7px 0 12px;
  font-size: clamp(42px, 5vw, 64px);
  line-height: 1;
  letter-spacing: -0.045em;
}
.page-head p:not(.kb-eyebrow) {
  color: var(--kb-muted);
}
</style>
