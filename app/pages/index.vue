<script setup lang="ts">
import { applications, exhibitions, news } from '#shared/data/editorial'
import { products } from '#shared/data/products'
import { suppliers } from '#shared/data/suppliers'
import { categories } from '#shared/data/taxonomy'
import { knowledgeTopics } from '#shared/data/knowledge'
import type { Product } from '#shared/types/catalog'

const { t, locale } = useI18n()
const { tr } = useLocalized()
const localePath = useLocalePath()
const config = useRuntimeConfig()
const query = ref('')
const bore = ref('')
const outside = ref('')
const activeHero = ref(0)

const heroSlides = computed(() =>
  locale.value === 'zh'
    ? [
        {
          image: '/images/hero/packing.webp',
          step: '01 / 出厂包装',
          title: '精工包装，整装待发',
          description: '轴承完成防锈处理后，通过 VCI 防护、干燥剂和定制定位木箱可靠固定。',
        },
        {
          image: '/images/hero/port-loading.webp',
          step: '02 / 港口装船',
          title: '整柜吊装，安全上船',
          description: '防锈木箱装入封闭钢制集装箱后，由岸桥整柜吊装上船并完成船载绑扎。',
        },
        {
          image: '/images/hero/voyage.webp',
          step: '03 / 全球交付',
          title: '远洋启航，交付现场',
          description: '集装箱货轮驶离北方工业港口，把中国制造的轴承送往全球工业项目。',
        },
      ]
    : [
        {
          image: '/images/hero/packing.webp',
          step: '01 / EXPORT PACKING',
          title: 'Protected, blocked and ready to ship',
          description: 'Corrosion protection, VCI film, desiccant and a fitted export case prepare the bearing for sea freight.',
        },
        {
          image: '/images/hero/port-loading.webp',
          step: '02 / PORT LOADING',
          title: 'Loaded by the container, not the crate',
          description: 'Protective cases are packed inside a closed steel container, which is lifted aboard and secured by the terminal crane.',
        },
        {
          image: '/images/hero/voyage.webp',
          step: '03 / GLOBAL DELIVERY',
          title: 'Underway to industrial projects worldwide',
          description: 'A container vessel departs a Northeast Chinese industrial port for international project delivery.',
        },
      ],
)

function moveHero(direction: -1 | 1) {
  activeHero.value = (activeHero.value + direction + heroSlides.value.length) % heroSlides.value.length
}

const title = computed(() =>
  locale.value === 'zh'
    ? 'Kaup Bearings 北轴汇｜全球轴承采购与技术选型平台'
    : 'Kaup Bearings | Global Bearing Sourcing Platform',
)
const description = computed(() =>
  locale.value === 'zh'
    ? '按型号、尺寸、精度与游隙查找球轴承、滚子轴承、直线运动、滑动轴承及轴承附件，获取专业参数并提交询价。'
    : 'Source ball, roller, linear and plain bearings by designation, d / D / B dimensions, precision and clearance. Compare specifications and submit structured RFQs.',
)

useBearingsSeo({
  title,
  description,
  path: '/',
  image: '/og-kaup-bearings.png',
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${config.public.siteUrl}/#organization`,
        name: 'Kaup Bearings',
        alternateName: '北轴汇',
        url: config.public.siteUrl,
        logo: `${config.public.siteUrl}/favicon.svg`,
      },
      {
        '@type': 'WebSite',
        '@id': `${config.public.siteUrl}/#website`,
        url: config.public.siteUrl,
        name: 'Kaup Bearings',
        publisher: { '@id': `${config.public.siteUrl}/#organization` },
        inLanguage: ['en', 'zh-CN'],
      },
    ],
  },
})

function search() {
  const params: Record<string, string> = {}
  if (query.value.trim()) params.q = query.value.trim()
  if (bore.value) params.dmin = bore.value
  if (outside.value) params.Dmax = outside.value
  navigateTo({ path: localePath('/products'), query: params })
}

const featured = [
  '6205-2rs-c3-deep-groove-ball-bearing',
  '32012-x-tapered-roller-bearing',
  'ucp210-pillow-block-unit',
  '6205-hc5-hybrid-ceramic-bearing',
]
  .map((slug) => products.find((product) => product.slug === slug))
  .filter((product): product is Product => Boolean(product))
const homeSuppliers = suppliers.slice(0, 4)
const homeNews = news.slice(0, 3)
const homeEvents = exhibitions.slice(0, 2)
</script>

<template>
  <div>
    <section class="hero">
      <div class="kb-container hero-grid">
        <div class="hero-copy">
          <p class="hero-eyebrow">{{ t('home.eyebrow') }}</p>
          <h1>{{ t('home.title') }}</h1>
          <p>{{ t('home.description') }}</p>
          <form class="hero-search" @submit.prevent="search">
            <label class="hero-field hero-query">
              <span>{{ t('common.modelOrDimensions') }}</span>
              <input
                v-model="query"
                type="search"
                :placeholder="t('common.searchPlaceholder')"
              >
            </label>
            <label class="hero-field">
              <span>{{ locale === 'zh' ? '内径 d ≥' : 'Bore d ≥' }}</span>
              <input v-model="bore" type="number" min="0" inputmode="decimal" placeholder="mm" >
            </label>
            <label class="hero-field">
              <span>{{ locale === 'zh' ? '外径 D ≤' : 'Outside D ≤' }}</span>
              <input v-model="outside" type="number" min="0" inputmode="decimal" placeholder="mm" >
            </label>
            <button class="kb-button hero-search-submit" type="submit">
              <UIcon name="i-lucide-search" aria-hidden="true" />
              {{ locale === 'zh' ? '搜索目录' : 'Search catalogue' }}
            </button>
          </form>
          <div class="hero-actions">
            <NuxtLink :to="localePath('/bearings/ball-bearings')" class="hero-link">
              {{ t('home.browse') }} <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
            </NuxtLink>
            <NuxtLink :to="localePath('/rfq')" class="hero-link">
              {{ t('home.startRfq') }} <UIcon name="i-lucide-file-text" aria-hidden="true" />
            </NuxtLink>
          </div>
        </div>
        <div
          class="hero-visual"
          role="region"
          aria-roledescription="carousel"
          :aria-label="locale === 'zh' ? '轴承制造与出口流程' : 'Bearing manufacturing and export journey'"
          tabindex="0"
          @keydown.left.prevent="moveHero(-1)"
          @keydown.right.prevent="moveHero(1)"
        >
          <div class="hero-slides">
            <div
              v-for="(slide, index) in heroSlides"
              v-show="index === activeHero"
              :key="slide.image"
              class="hero-slide"
              role="group"
              aria-roledescription="slide"
              :aria-label="`${index + 1} / ${heroSlides.length}`"
            >
              <img
                :src="slide.image"
                :alt="slide.title"
                width="1280"
                height="720"
                loading="eager"
                :fetchpriority="index === 0 ? 'high' : 'auto'"
              >
            </div>
          </div>
          <div class="hero-caption">
            <div aria-live="polite">
              <span>{{ heroSlides[activeHero]?.step }}</span>
              <strong>{{ heroSlides[activeHero]?.title }}</strong>
              <p>{{ heroSlides[activeHero]?.description }}</p>
            </div>
            <div class="hero-carousel-nav">
              <div class="hero-slide-dots" role="tablist" :aria-label="locale === 'zh' ? '选择主视觉' : 'Choose hero slide'">
                <button
                  v-for="(slide, index) in heroSlides"
                  :key="slide.step"
                  type="button"
                  role="tab"
                  :aria-selected="index === activeHero"
                  :aria-label="slide.title"
                  :class="{ active: index === activeHero }"
                  @click="activeHero = index"
                />
              </div>
              <div class="hero-carousel-actions">
                <button
                  type="button"
                  :aria-label="locale === 'zh' ? '上一张' : 'Previous slide'"
                  @click="moveHero(-1)"
                >
                  <UIcon name="i-lucide-arrow-left" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  :aria-label="locale === 'zh' ? '下一张' : 'Next slide'"
                  @click="moveHero(1)"
                >
                  <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="kb-container hero-facts">
        <div><strong>32</strong><span>{{ t('common.products') }}</span></div>
        <div><strong>8</strong><span>{{ t('common.categories') }}</span></div>
        <div><strong>12</strong><span>{{ t('common.suppliers') }}</span></div>
        <p>{{ locale === 'zh' ? '所有身份、价格与证书均明确标记为演示数据。' : 'Every identity, price and certificate is explicitly demo data.' }}</p>
      </div>
    </section>

    <section class="kb-section">
      <div class="kb-container">
        <SectionHead
          eyebrow="01 / TAXONOMY"
          :title="t('home.catalogTitle')"
          :description="t('home.catalogText')"
          :action-label="t('nav.catalog')"
          :action-to="localePath('/products')"
        />
        <div class="category-grid">
          <NuxtLink
            v-for="category in categories"
            :key="category.slug"
            :to="localePath(`/bearings/${category.slug}`)"
            class="category-card"
          >
            <div class="category-number">{{ category.number }}</div>
            <img :src="category.image" :alt="tr(category.title)" width="1280" height="720" loading="lazy" >
            <div class="category-content">
              <h3>{{ tr(category.title) }}</h3>
              <p>{{ tr(category.summary) }}</p>
              <span>{{ category.subcategories.length }} {{ locale === 'zh' ? '个细分类' : 'subcategories' }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="kb-section featured-section">
      <div class="kb-container">
        <SectionHead
          eyebrow="02 / CATALOGUE"
          :title="t('home.featured')"
          :action-label="t('nav.catalog')"
          :action-to="localePath('/products')"
        />
        <div class="kb-grid-4">
          <ProductCard v-for="product in featured" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <section class="application-section">
      <div class="kb-container">
        <SectionHead eyebrow="03 / APPLICATION" :title="t('home.applications')" />
        <div class="application-grid">
          <NuxtLink
            v-for="application in applications"
            :key="application.slug"
            :to="{ path: localePath('/products'), query: { application: application.slug } }"
            class="application-card"
          >
            <img :src="application.image" :alt="tr(application.name)" width="1280" height="720" loading="lazy" >
            <div>
              <UIcon :name="application.icon" aria-hidden="true" />
              <span>{{ tr(application.name) }}</span>
              <UIcon name="i-lucide-arrow-up-right" aria-hidden="true" />
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="kb-section">
      <div class="kb-container">
        <SectionHead
          eyebrow="04 / SUPPLY"
          :title="t('home.supplierTitle')"
          :action-label="t('nav.suppliers')"
          :action-to="localePath('/suppliers')"
        />
        <div class="kb-grid-4">
          <SupplierCard v-for="supplier in homeSuppliers" :key="supplier.slug" :supplier="supplier" />
        </div>
      </div>
    </section>

    <section class="kb-section knowledge-section">
      <div class="kb-container editorial-grid">
        <div>
          <SectionHead
            eyebrow="05 / ENGINEERING"
            :title="t('home.knowledgeTitle')"
            :action-label="t('nav.knowledge')"
            :action-to="localePath('/knowledge')"
          />
          <div class="knowledge-list">
            <NuxtLink
              v-for="topic in knowledgeTopics.slice(0, 5)"
              :key="topic.slug"
              :to="localePath(`/knowledge/${topic.slug}`)"
            >
              <span>{{ String(topic.order).padStart(2, '0') }}</span>
              <div>
                <h3>{{ tr(topic.title) }}</h3>
                <p>{{ tr(topic.description) }}</p>
              </div>
              <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
            </NuxtLink>
          </div>
        </div>
        <aside>
          <SectionHead
            eyebrow="06 / CALENDAR"
            :title="t('nav.exhibitions')"
            :action-label="locale === 'zh' ? '全部活动' : 'All events'"
            :action-to="localePath('/exhibitions')"
          />
          <div class="events">
            <NuxtLink
              v-for="event in homeEvents"
              :key="event.slug"
              :to="localePath(`/exhibitions/${event.slug}`)"
            >
              <strong>{{ event.date.slice(5) }}</strong>
              <div>
                <h3>{{ tr(event.title) }}</h3>
                <p>{{ tr(event.location!) }}</p>
              </div>
            </NuxtLink>
          </div>
          <div class="news-stack">
            <NuxtLink v-for="item in homeNews" :key="item.slug" :to="localePath(`/news/${item.slug}`)">
              <small>{{ item.date }}</small>
              <h3>{{ tr(item.title) }}</h3>
            </NuxtLink>
          </div>
        </aside>
      </div>
    </section>

    <section class="rfq-band">
      <div class="kb-container rfq-band-inner">
        <div>
          <p class="kb-eyebrow">07 / RFQ</p>
          <h2>{{ t('home.rfqTitle') }}</h2>
          <p>{{ t('home.rfqText') }}</p>
        </div>
        <NuxtLink :to="localePath('/rfq')" class="kb-button">
          {{ t('home.startRfq') }}
          <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  overflow: hidden;
  padding-top: 42px;
  background:
    radial-gradient(circle at 88% 18%, rgb(8 127 158 / 18%), transparent 34%),
    linear-gradient(135deg, #f8fcfd 0%, #e3f0f3 56%, #d5e8ee 100%);
  color: var(--kb-text);
  border-top: 4px solid var(--kb-blue);
}
.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  gap: 48px;
  align-items: center;
}
.hero-copy {
  padding-block: 50px 36px;
}
.hero-copy h1 {
  color: var(--kb-graphite);
}
.hero-eyebrow {
  color: var(--kb-blue);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
h1 {
  max-width: 14ch;
  margin: 12px 0 22px;
  font-size: clamp(48px, 6.4vw, 88px);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.06em;
}
.hero-copy > p:not(.hero-eyebrow) {
  max-width: 62ch;
  color: var(--kb-muted);
  font-size: 17px;
}
.hero-search {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(112px, auto);
  gap: 4px;
  margin-top: 30px;
  padding: 5px;
  background: white;
  border: 1px solid var(--kb-line);
  border-radius: 7px;
  box-shadow: 0 14px 34px rgb(22 59 77 / 8%);
}
.hero-search:focus-within {
  border-color: var(--kb-blue);
  box-shadow:
    0 0 0 2px rgb(8 127 158 / 12%),
    0 14px 34px rgb(22 59 77 / 8%);
}
.hero-field input:focus-visible {
  box-shadow: none;
}
.hero-search .hero-field {
  display: grid;
  gap: 2px;
  padding: 7px 11px;
  border-right: 1px solid var(--kb-line);
}
.hero-query {
  grid-column: 1 / 3;
}
.hero-field:nth-of-type(2) {
  grid-column: 1;
  grid-row: 2;
}
.hero-field:nth-of-type(3) {
  grid-column: 2;
  grid-row: 2;
}
.hero-search .hero-field:nth-of-type(2),
.hero-search .hero-field:nth-of-type(3) {
  border-top: 1px solid var(--kb-line);
}
.hero-field span {
  color: var(--kb-muted);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
}
.hero-field input {
  min-width: 0;
  border: 0;
  background: transparent;
  padding: 0;
  color: var(--kb-text);
  font-size: 14px;
  outline: none;
}
.hero-search button {
  border-radius: 4px;
}
.hero-search-submit {
  grid-column: 3;
  grid-row: 1 / 3;
  justify-content: flex-start;
  gap: 10px;
  padding-inline: 32px;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  margin-top: 24px;
}
.hero-link {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 8px;
  color: var(--kb-blue-deep);
  font-size: 13px;
  font-weight: 750;
}
.hero-visual {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  min-height: 520px;
  margin-top: -1px;
  overflow: hidden;
  background: var(--kb-graphite);
  border-radius: 8px;
  border: 1px solid var(--kb-line);
  box-shadow: var(--kb-shadow-soft);
}
.hero-slides {
  position: relative;
  min-height: 390px;
}
.hero-slide {
  position: absolute;
  inset: 0;
}
.hero-visual img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 520px;
  object-fit: cover;
}
.hero-caption {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 18px;
  align-items: end;
  padding: 18px 20px 20px;
  background: rgb(255 255 255 / 96%);
  border-top: 1px solid var(--kb-line);
}
.hero-caption span {
  display: block;
  margin-bottom: 7px;
  color: var(--kb-orange);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
}
.hero-caption strong {
  display: block;
  margin-bottom: 6px;
  font-size: clamp(18px, 2vw, 24px);
  line-height: 1.25;
}
.hero-caption p {
  margin: 0;
  font-size: 12px;
  line-height: 1.55;
  color: var(--kb-muted);
}
.hero-carousel-actions {
  display: flex;
  gap: 6px;
}
.hero-carousel-actions button {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  background: var(--kb-surface-soft);
  border: 1px solid var(--kb-line);
  border-radius: 4px;
  color: var(--kb-blue-deep);
}
.hero-carousel-actions button:hover {
  background: var(--kb-orange);
  border-color: var(--kb-orange);
}
.hero-carousel-actions svg {
  width: 17px;
  height: 17px;
}
.hero-carousel-nav {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}
.hero-slide-dots {
  display: flex;
  gap: 7px;
  padding-bottom: 18px;
}
.hero-slide-dots button {
  width: 28px;
  height: 5px;
  padding: 0;
  background: #c7d5db;
  border: 0;
  border-radius: 999px;
}
.hero-slide-dots button.active {
  width: 50px;
  background: var(--kb-blue);
}
.hero-facts {
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  gap: 32px;
  align-items: end;
  padding-block: 22px;
  border-top: 1px solid #cfdee4;
}
.hero-facts strong {
  display: block;
  color: var(--kb-blue-deep);
  font-size: 28px;
  line-height: 1;
}
.hero-facts span {
  color: var(--kb-muted);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.hero-facts p {
  justify-self: end;
  margin: 0;
  color: var(--kb-muted);
  font-size: 11px;
}
.category-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}
.category-card {
  position: relative;
  min-height: 0;
  overflow: hidden;
  background: white;
  color: var(--kb-text);
  border: 1px solid var(--kb-line);
  border-top: 3px solid var(--kb-blue);
  border-radius: var(--kb-radius);
  transition: border-color 180ms ease, box-shadow 180ms ease;
}
.category-card img {
  width: 100%;
  height: 168px;
  object-fit: cover;
  transition: transform 320ms ease;
}
.category-card:hover img {
  transform: scale(1.025);
}
.category-card:hover {
  border-color: #a8c7d1;
  box-shadow: var(--kb-shadow-soft);
}
.category-number {
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 2;
  padding: 4px 7px;
  background: var(--kb-graphite);
  color: white;
  font-size: 10px;
  font-weight: 800;
}
.category-content {
  position: relative;
  z-index: 2;
  padding: 18px;
}
.category-content h3 {
  margin: 0 0 8px;
  font-size: 21px;
}
.category-content p {
  margin: 0 0 12px;
  color: var(--kb-muted);
  font-size: 12px;
}
.category-content span {
  color: var(--kb-blue);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
}
.featured-section {
  background: #e2eef2;
}
.application-section {
  padding-block: 72px;
  background: #f8fbfc;
  color: var(--kb-text);
  border-block: 1px solid var(--kb-line);
}
.application-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}
.application-card {
  display: flex;
  min-height: 0;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--kb-line);
  border-top: 3px solid var(--kb-orange);
  border-radius: var(--kb-radius);
  color: var(--kb-text);
  background: white;
  box-shadow: 0 1px 0 rgb(29 48 59 / 2%);
}
.application-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: transform 320ms ease;
}
.application-card > div {
  position: relative;
  display: grid;
  padding: 15px 16px;
  grid-template-columns: 20px 1fr 20px;
  gap: 10px;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  background: #f3f8fa;
}
.application-card:hover {
  border-color: #a8c7d1;
  box-shadow: var(--kb-shadow-soft);
}
.application-card:hover img {
  transform: scale(1.035);
}
.application-card > div > svg:first-child {
  color: var(--kb-orange);
  width: 18px;
  height: 18px;
}
.editorial-grid {
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: 56px;
}
.knowledge-list {
  border-top: 1px solid var(--kb-line);
}
.knowledge-list a {
  display: grid;
  grid-template-columns: 34px 1fr 28px;
  gap: 15px;
  align-items: start;
  padding-block: 18px;
  border-bottom: 1px solid var(--kb-line);
}
.knowledge-list > a > span {
  color: var(--kb-orange);
  font-size: 11px;
  font-weight: 800;
}
.knowledge-list h3 {
  margin: 0 0 4px;
  font-size: 16px;
}
.knowledge-list p {
  margin: 0;
  color: var(--kb-muted);
  font-size: 13px;
}
.events {
  display: grid;
  gap: 8px;
}
.events a {
  display: grid;
  grid-template-columns: 58px 1fr;
  gap: 14px;
  padding: 16px;
  background: white;
  border: 1px solid var(--kb-line);
}
.events strong {
  color: var(--kb-blue);
  font-size: 17px;
}
.events h3 {
  margin: 0 0 3px;
  font-size: 14px;
}
.events p {
  margin: 0;
  color: var(--kb-muted);
  font-size: 12px;
}
.news-stack {
  margin-top: 30px;
  padding-top: 16px;
  border-top: 1px solid var(--kb-line);
}
.news-stack a {
  display: block;
  padding-block: 9px;
}
.news-stack small {
  color: var(--kb-muted);
  font-size: 10px;
}
.news-stack h3 {
  margin: 2px 0 0;
  font-size: 13px;
}
.rfq-band {
  background: var(--kb-graphite);
  color: white;
  border-top: 4px solid var(--kb-blue);
}
.rfq-band-inner {
  min-height: 230px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}
.rfq-band h2 {
  margin: 7px 0;
  font-size: clamp(30px, 4vw, 52px);
  letter-spacing: -0.035em;
}
.rfq-band p {
  margin: 0;
  color: #c6d6dd;
}
@media (max-width: 1050px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
  .hero-visual {
    min-height: 420px;
  }
  .hero-visual img {
    height: 100%;
  }
  .category-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .application-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (max-width: 700px) {
  .hero-search {
    grid-template-columns: 1fr;
  }
  .hero-search .hero-field {
    grid-column: 1;
    grid-row: auto;
    border-right: 0;
    border-bottom: 1px solid var(--kb-line);
  }
  .hero-search-submit {
    grid-column: 1;
    grid-row: auto;
    min-height: 48px;
  }
  .hero-facts {
    grid-template-columns: repeat(3, 1fr);
  }
  .hero-facts p {
    grid-column: 1 / -1;
    justify-self: start;
  }
  .hero-visual {
    min-height: 360px;
  }
  .hero-visual img {
    height: 100%;
  }
  .hero-caption {
    grid-template-columns: 1fr;
    gap: 12px;
    padding-top: 18px;
  }
  .hero-carousel-nav {
    justify-content: space-between;
  }
  .category-grid {
    grid-template-columns: 1fr;
  }
  .application-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .editorial-grid {
    grid-template-columns: 1fr;
    gap: 44px;
  }
  .rfq-band-inner {
    align-items: flex-start;
    flex-direction: column;
    padding-block: 42px;
  }
}
</style>
