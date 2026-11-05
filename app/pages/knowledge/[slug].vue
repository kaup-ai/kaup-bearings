<script setup lang="ts">
import { knowledgeTopics } from '#shared/data/knowledge'

const route = useRoute()
const { t, locale } = useI18n()
const { tr } = useLocalized()
const localePath = useLocalePath()
const topic = knowledgeTopics.find((entry) => entry.slug === route.params.slug)
if (!topic) throw createError({ statusCode: 404, statusMessage: 'Technical article not found' })

const { data: article } = await useAsyncData(
  `knowledge-${topic.slug}-${locale.value}`,
  () => queryCollection('knowledge')
    .where('translationKey', '=', topic.slug)
    .where('language', '=', locale.value)
    .first(),
)
if (!article.value) throw createError({ statusCode: 404, statusMessage: 'Technical article not found' })

useBearingsSeo({
  title: computed(() => `${tr(topic.title)} | Kaup Bearings`),
  description: computed(() => tr(topic.description)),
  path: `/knowledge/${topic.slug}`,
  image: '/images/scenes/inspection.webp',
  type: 'article',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: tr(topic.title),
    description: tr(topic.description),
    inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en',
    publisher: {
      '@type': 'Organization',
      name: 'Kaup Bearings',
      url: useRuntimeConfig().public.siteUrl,
    },
  },
})
const related = knowledgeTopics.filter((entry) => entry.slug !== topic.slug).slice(0, 4)
</script>

<template>
  <div>
    <section class="article-head">
      <div class="kb-container">
        <nav class="breadcrumb">
          <NuxtLink :to="localePath('/')">{{ t('nav.home') }}</NuxtLink><span>/</span>
          <NuxtLink :to="localePath('/knowledge')">{{ t('nav.knowledge') }}</NuxtLink><span>/</span>
          <span>{{ tr(topic.title) }}</span>
        </nav>
        <p class="kb-eyebrow">TECHNICAL GUIDE / {{ String(topic.order).padStart(2, '0') }}</p>
        <h1>{{ tr(topic.title) }}</h1>
        <p>{{ tr(topic.description) }}</p>
      </div>
    </section>
    <div class="kb-container article-layout">
      <article class="kb-panel article-body">
        <ContentRenderer v-if="article" :value="article" />
      </article>
      <aside>
        <h2>{{ locale === 'zh' ? '关联技术内容' : 'Related technical guides' }}</h2>
        <NuxtLink v-for="entry in related" :key="entry.slug" :to="localePath(`/knowledge/${entry.slug}`)">
          <span>{{ String(entry.order).padStart(2, '0') }}</span>
          <strong>{{ tr(entry.title) }}</strong>
          <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
        </NuxtLink>
        <NuxtLink :to="localePath('/rfq')" class="kb-button">
          {{ t('nav.rfq') }}
        </NuxtLink>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.article-head {
  padding-block: 30px 58px;
  background: linear-gradient(135deg, #f8fcfd, #deedf1);
  color: var(--kb-text);
  border-top: 4px solid var(--kb-blue);
  border-bottom: 1px solid var(--kb-line);
}
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
  color: var(--kb-muted);
  font-size: 12px;
}
h1 {
  max-width: 20ch;
  margin: 8px 0 18px;
  font-size: clamp(42px, 5.2vw, 72px);
  line-height: 1;
  letter-spacing: -0.05em;
}
.article-head > .kb-container > p:not(.kb-eyebrow) {
  max-width: 72ch;
  color: var(--kb-muted);
}
.article-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(260px, 0.65fr);
  gap: 28px;
  margin-top: 34px;
}
.article-body {
  padding: clamp(24px, 4vw, 52px);
}
.article-body :deep(h2) {
  margin-top: 34px;
  font-size: 26px;
}
.article-body :deep(h2:first-child) {
  margin-top: 0;
}
.article-body :deep(p) {
  color: #344b57;
  font-size: 17px;
  line-height: 1.75;
}
.article-body :deep(strong) {
  color: var(--kb-graphite);
}
aside {
  align-self: start;
  padding: 20px;
  background: #e8eef1;
}
aside h2 {
  font-size: 16px;
}
aside > a:not(.kb-button) {
  display: grid;
  grid-template-columns: 24px 1fr 20px;
  gap: 8px;
  align-items: center;
  padding-block: 12px;
  border-top: 1px solid #cbd7dd;
  font-size: 12px;
}
aside > a span {
  color: var(--kb-orange);
  font-size: 10px;
}
aside .kb-button {
  width: 100%;
  margin-top: 18px;
}
@media (max-width: 800px) {
  .article-layout {
    grid-template-columns: 1fr;
  }
}
</style>
