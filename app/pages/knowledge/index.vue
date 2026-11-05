<script setup lang="ts">
import { knowledgeTopics } from '#shared/data/knowledge'

const { t, locale } = useI18n()
const { tr } = useLocalized()
const localePath = useLocalePath()
useBearingsSeo({
  title: computed(() => `${t('knowledge.title')} | Kaup Bearings`),
  description: computed(() => t('knowledge.description')),
  path: '/knowledge',
  image: '/images/scenes/knowledge-selection.webp',
})
</script>

<template>
  <div>
    <section class="knowledge-hero">
      <div class="kb-container knowledge-grid">
        <div>
          <p class="kb-eyebrow">ENGINEERING KNOWLEDGE</p>
          <h1>{{ t('knowledge.title') }}</h1>
          <p>{{ t('knowledge.description') }}</p>
        </div>
        <figure class="knowledge-visual">
          <img
            src="/images/scenes/knowledge-selection.webp"
            :alt="locale === 'zh' ? '轴承工程师对照断面、载荷与尺寸要求进行选型' : 'Bearing engineer comparing cross-sections, load direction and dimensions for selection'"
            width="1280"
            height="720"
            loading="eager"
          >
          <figcaption>
            <span>ISO 492 · P5</span>
            <span>C3 · 2RS</span>
            <span>d · D · B</span>
          </figcaption>
        </figure>
      </div>
    </section>
    <section class="kb-section">
      <div class="kb-container topic-grid">
        <NuxtLink
          v-for="topic in knowledgeTopics"
          :key="topic.slug"
          :to="localePath(`/knowledge/${topic.slug}`)"
          class="topic-card"
        >
          <span class="topic-number">{{ String(topic.order).padStart(2, '0') }}</span>
          <h2>{{ tr(topic.title) }}</h2>
          <p>{{ tr(topic.description) }}</p>
          <span class="read-link">{{ t('knowledge.read') }} <UIcon name="i-lucide-arrow-right" aria-hidden="true" /></span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.knowledge-hero {
  padding-block: 64px;
  background: linear-gradient(135deg, #f8fcfd, #deedf1);
  color: var(--kb-text);
  border-top: 4px solid var(--kb-blue);
  border-bottom: 1px solid var(--kb-line);
}
.knowledge-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 60px;
  align-items: center;
}
h1 {
  margin: 8px 0 16px;
  font-size: clamp(44px, 5vw, 70px);
  line-height: 1;
  letter-spacing: -0.05em;
}
.knowledge-grid p:not(.kb-eyebrow) {
  max-width: 68ch;
  color: var(--kb-muted);
}
.knowledge-visual {
  margin: 0;
  overflow: hidden;
  background: white;
  border: 1px solid var(--kb-line);
  border-radius: var(--kb-radius);
  box-shadow: var(--kb-shadow-soft);
}
.knowledge-visual img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}
.knowledge-visual figcaption {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-between;
  padding: 12px 16px;
  background: white;
  border-top: 1px solid var(--kb-line);
  color: var(--kb-blue-deep);
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 11px;
  font-weight: 700;
}
.topic-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
.topic-card {
  display: flex;
  min-height: 280px;
  flex-direction: column;
  padding: 24px;
  background: white;
  border: 1px solid var(--kb-line);
  border-radius: var(--kb-radius);
}
.topic-card:hover {
  border-color: #9bb4c0;
}
.topic-number {
  color: var(--kb-orange);
  font-size: 11px;
  font-weight: 800;
}
h2 {
  margin: 28px 0 12px;
  font-size: 22px;
  line-height: 1.2;
}
.topic-card p {
  color: var(--kb-muted);
  font-size: 13px;
}
.read-link {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid var(--kb-line);
  color: var(--kb-blue-deep);
  font-size: 12px;
  font-weight: 800;
}
@media (max-width: 900px) {
  .topic-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 640px) {
  .knowledge-grid,
  .topic-grid {
    grid-template-columns: 1fr;
  }
  .knowledge-visual img {
    aspect-ratio: 16 / 9;
  }
}
</style>
