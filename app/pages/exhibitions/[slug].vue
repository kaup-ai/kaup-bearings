<script setup lang="ts">
import { exhibitions } from '#shared/data/editorial'

const route = useRoute()
const { locale } = useI18n()
const { tr } = useLocalized()
const localePath = useLocalePath()
const entry = exhibitions.find((item) => item.slug === route.params.slug)
if (!entry) throw createError({ statusCode: 404, statusMessage: 'Exhibition not found' })
useBearingsSeo({
  title: computed(() => `${tr(entry.title)} | Kaup Bearings`),
  description: computed(() => tr(entry.summary)),
  path: `/exhibitions/${entry.slug}`,
  index: false,
  image: entry.image,
})
</script>

<template>
  <article class="kb-container detail">
    <nav class="breadcrumb"><NuxtLink :to="localePath('/')">{{ locale === 'zh' ? '首页' : 'Home' }}</NuxtLink><span>/</span><NuxtLink :to="localePath('/exhibitions')">{{ locale === 'zh' ? '展会活动' : 'Events' }}</NuxtLink></nav>
    <span class="kb-badge kb-demo">{{ locale === 'zh' ? '演示活动' : 'Demo event' }}</span>
    <h1>{{ tr(entry.title) }}</h1>
    <dl>
      <div><dt>{{ locale === 'zh' ? '日期' : 'Date' }}</dt><dd>{{ entry.date }}</dd></div>
      <div><dt>{{ locale === 'zh' ? '地点' : 'Location' }}</dt><dd>{{ tr(entry.location!) }}</dd></div>
    </dl>
    <img :src="entry.image" :alt="tr(entry.title)" width="1280" height="720" >
    <p class="summary">{{ tr(entry.summary) }}</p>
    <p>{{ locale === 'zh' ? '本页为展会日程演示，不构成真实活动报名或主办方信息。' : 'This is a demonstration event listing and does not represent a live organizer or registration service.' }}</p>
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
dl {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
dl div {
  padding: 10px 14px;
  background: white;
  border: 1px solid var(--kb-line);
}
dt {
  color: var(--kb-muted);
  font-size: 10px;
  text-transform: uppercase;
}
dd {
  margin: 2px 0 0;
  font-weight: 700;
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
