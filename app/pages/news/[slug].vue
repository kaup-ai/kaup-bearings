<script setup lang="ts">
import { news } from '#shared/data/editorial'

const route = useRoute()
const { locale } = useI18n()
const { tr } = useLocalized()
const localePath = useLocalePath()
const entry = news.find((item) => item.slug === route.params.slug)
if (!entry) throw createError({ statusCode: 404, statusMessage: 'Article not found' })
useBearingsSeo({
  title: computed(() => `${tr(entry.title)} | Kaup Bearings`),
  description: computed(() => tr(entry.summary)),
  path: `/news/${entry.slug}`,
  index: false,
  image: entry.image,
})
</script>

<template>
  <article class="kb-container detail">
    <nav class="breadcrumb"><NuxtLink :to="localePath('/')">{{ locale === 'zh' ? '首页' : 'Home' }}</NuxtLink><span>/</span><NuxtLink :to="localePath('/news')">{{ locale === 'zh' ? '行业资讯' : 'News' }}</NuxtLink></nav>
    <span class="kb-badge kb-demo">{{ locale === 'zh' ? '演示资讯' : 'Demo editorial' }}</span>
    <h1>{{ tr(entry.title) }}</h1>
    <p class="meta">{{ entry.date }}</p>
    <img :src="entry.image" :alt="tr(entry.title)" width="1280" height="720" >
    <p class="summary">{{ tr(entry.summary) }}</p>
    <p>{{ locale === 'zh' ? '本页为平台界面演示内容，不构成行业新闻或采购建议。真实资料接入后应补充来源、日期与技术审核信息。' : 'This page is platform demonstration content. It is not a live industry report or sourcing recommendation. Replace it with sourced, technically reviewed material before launch.' }}</p>
  </article>
</template>

<style scoped>
.detail {
  max-width: 980px;
  padding-block: 40px 72px;
}
.breadcrumb {
  display: flex;
  gap: 8px;
  margin-bottom: 26px;
  color: var(--kb-muted);
  font-size: 12px;
}
h1 {
  max-width: 20ch;
  margin: 15px 0;
  font-size: clamp(40px, 5.5vw, 68px);
  line-height: 1.04;
  letter-spacing: -0.045em;
}
.meta {
  color: var(--kb-muted);
  font-size: 12px;
}
img {
  width: 100%;
  margin-block: 24px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
.summary {
  font-size: 20px;
  font-weight: 600;
}
p {
  color: #344b57;
  line-height: 1.75;
}
</style>
