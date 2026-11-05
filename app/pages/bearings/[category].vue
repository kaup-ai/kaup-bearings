<script setup lang="ts">
import { categories, getCategoryBySlug } from '#shared/data/taxonomy'
import { products } from '#shared/data/products'
import { suppliers } from '#shared/data/suppliers'

const route = useRoute()
const { t, locale } = useI18n()
const { tr } = useLocalized()
const localePath = useLocalePath()
const requestedSlug = String(route.params.category)
const directCategory = getCategoryBySlug(requestedSlug)
const parentCategory = categories.find((entry) =>
  entry.subcategories.some((subcategory) => subcategory.slug === requestedSlug),
)
const category = directCategory ?? parentCategory
if (!category) throw createError({ statusCode: 404, statusMessage: 'Category not found' })
const selectedSubcategory = category.subcategories.find(
  (subcategory) => subcategory.slug === requestedSlug,
)
const pageTitle = selectedSubcategory?.title ?? category.title
const pagePath = selectedSubcategory
  ? `/bearings/${selectedSubcategory.slug}`
  : `/bearings/${category.slug}`

const title = computed(() => `${tr(pageTitle)} | Kaup Bearings`)
const description = computed(() => selectedSubcategory
  ? `${tr(selectedSubcategory.title)} — ${tr(category.introduction)}`
  : tr(category.introduction))
useBearingsSeo({
  title,
  description,
  path: pagePath,
  image: category.image,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: tr(pageTitle),
    description: tr(category.introduction),
    url: `${useRuntimeConfig().public.siteUrl}${locale.value === 'zh' ? '/zh' : ''}${pagePath}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products
        .filter((product) =>
          product.categorySlug === category.slug &&
          (!selectedSubcategory || product.subcategorySlug === selectedSubcategory.slug),
        )
        .map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: product.designation,
        })),
    },
  },
})

const categoryProducts = products.filter((product) =>
  product.categorySlug === category.slug &&
  (!selectedSubcategory || product.subcategorySlug === selectedSubcategory.slug),
)
const categorySuppliers = suppliers.filter((supplier) =>
  supplier.primaryCategories.includes(category.slug),
)
const siblingCategories = categories.filter((entry) => entry.slug !== category.slug)
</script>

<template>
  <div>
    <section class="category-hero">
      <div class="kb-container">
        <nav class="breadcrumb" :aria-label="locale === 'zh' ? '面包屑' : 'Breadcrumb'">
          <NuxtLink :to="localePath('/')">{{ t('nav.home') }}</NuxtLink>
          <span>/</span>
          <span>{{ tr(category.title) }}</span>
        </nav>
        <div class="category-hero-grid">
          <div>
            <p class="kb-eyebrow">{{ category.number }} / BEARING FAMILY</p>
            <h1>{{ tr(pageTitle) }}</h1>
            <p>{{ tr(category.summary) }}</p>
            <div class="hero-badges">
              <span>{{ selectedSubcategory ? tr(category.title) : `${category.subcategories.length} ${locale === 'zh' ? '个细分类' : 'subcategories'}` }}</span>
              <span>{{ categoryProducts.length }} {{ t('common.products') }}</span>
              <span>{{ t('common.demo') }}</span>
            </div>
          </div>
          <figure>
            <img :src="category.image" :alt="tr(category.title)" width="1280" height="720" >
          </figure>
        </div>
      </div>
    </section>

    <section class="kb-section">
      <div class="kb-container editorial-layout">
        <article>
          <p class="kb-eyebrow">TECHNICAL OVERVIEW</p>
          <h2 class="kb-section-title">{{ locale === 'zh' ? '结构特点与选型边界' : 'Construction and selection boundaries' }}</h2>
          <p class="intro">{{ tr(category.introduction) }}</p>
          <h3>{{ locale === 'zh' ? '常见变型' : 'Common variants' }}</h3>
          <div class="variant-list">
            <NuxtLink
              v-for="subcategory in category.subcategories"
              :key="subcategory.slug"
              :to="{ path: localePath('/products'), query: { category: category.slug, subcategory: subcategory.slug } }"
            >
              {{ tr(subcategory.title) }}
              <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
            </NuxtLink>
          </div>
          <h3>{{ locale === 'zh' ? '选型要点' : 'Selection notes' }}</h3>
          <ul class="selection-list">
            <li v-for="(note, index) in category.selectionNotes" :key="index">{{ tr(note) }}</li>
          </ul>
          <h3>{{ t('common.applications') }}</h3>
          <div class="tag-list">
            <span v-for="application in category.applications" :key="application.en">
              {{ tr(application) }}
            </span>
          </div>
        </article>
        <aside class="kb-panel index-panel">
          <p class="kb-eyebrow">FAMILY INDEX</p>
          <h2>{{ locale === 'zh' ? '其他轴承分类' : 'Other bearing families' }}</h2>
          <NuxtLink
            v-for="entry in siblingCategories.slice(0, 7)"
            :key="entry.slug"
            :to="localePath(`/bearings/${entry.slug}`)"
          >
            <span>{{ entry.number }}</span>
            <strong>{{ tr(entry.title) }}</strong>
            <UIcon name="i-lucide-arrow-up-right" aria-hidden="true" />
          </NuxtLink>
        </aside>
      </div>
    </section>

    <section class="products-band">
      <div class="kb-container">
        <SectionHead
          :eyebrow="`${category.number} / PRODUCTS`"
          :title="locale === 'zh' ? '该分类下的演示轴承' : 'Demo bearings in this family'"
          :action-label="t('nav.catalog')"
          :action-to="{ path: localePath('/products'), query: { category: category.slug } }"
        />
        <div class="kb-grid-4">
          <ProductCard v-for="product in categoryProducts" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <section class="kb-section">
      <div class="kb-container">
        <SectionHead
          eyebrow="SUPPLIER CAPABILITY"
          :title="locale === 'zh' ? '供应此类轴承的供应商' : 'Suppliers with this capability'"
          :action-label="t('nav.suppliers')"
          :action-to="localePath('/suppliers')"
        />
        <div class="kb-grid-3">
          <SupplierCard v-for="supplier in categorySuppliers.slice(0, 3)" :key="supplier.slug" :supplier="supplier" />
        </div>
      </div>
    </section>

    <section class="kb-section faq-section">
      <div class="kb-container faq-grid">
        <div>
          <p class="kb-eyebrow">TECHNICAL FAQ</p>
          <h2 class="kb-section-title">{{ locale === 'zh' ? '常见选型问题' : 'Common selection questions' }}</h2>
        </div>
        <div>
          <details v-for="entry in category.faq" :key="entry.question.en">
            <summary>{{ tr(entry.question) }}</summary>
            <p>{{ tr(entry.answer) }}</p>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.category-hero {
  padding-block: 24px 54px;
  background: linear-gradient(135deg, #f8fcfd, #deedf1);
  color: var(--kb-text);
  border-top: 4px solid var(--kb-blue);
  border-bottom: 1px solid var(--kb-line);
}
.breadcrumb {
  display: flex;
  gap: 8px;
  margin-bottom: 26px;
  color: var(--kb-muted);
  font-size: 12px;
}
.category-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 54px;
  align-items: center;
}
h1 {
  margin: 10px 0 16px;
  font-size: clamp(48px, 6vw, 84px);
  line-height: 0.98;
  letter-spacing: -0.055em;
}
.category-hero-grid p:not(.kb-eyebrow) {
  max-width: 56ch;
  color: var(--kb-muted);
}
.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.hero-badges span {
  padding: 6px 9px;
  border: 1px solid #c9d9df;
  border-radius: 3px;
  color: var(--kb-blue-deep);
  background: rgb(255 255 255 / 72%);
  font-size: 11px;
}
figure {
  aspect-ratio: 16 / 10;
  margin: 0;
  overflow: hidden;
  background: var(--kb-surface-soft);
  border: 1px solid var(--kb-line);
  border-radius: var(--kb-radius);
}
figure img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.editorial-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(280px, 0.55fr);
  gap: 60px;
}
article .intro {
  max-width: 75ch;
  color: #344c59;
  font-size: 18px;
}
article h3 {
  margin-top: 34px;
}
.variant-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}
.variant-list a {
  display: flex;
  min-height: 54px;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  background: white;
  border: 1px solid var(--kb-line);
  font-size: 13px;
  font-weight: 700;
}
.selection-list {
  padding-left: 20px;
  color: #344c59;
}
.selection-list li {
  margin-block: 8px;
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag-list span {
  padding: 6px 10px;
  background: #e5eef2;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 700;
}
.index-panel {
  align-self: start;
  padding: 22px;
}
.index-panel h2 {
  margin-top: 5px;
}
.index-panel a {
  display: grid;
  grid-template-columns: 28px 1fr 20px;
  align-items: center;
  min-height: 50px;
  border-top: 1px solid var(--kb-line);
  font-size: 13px;
}
.index-panel a span {
  color: var(--kb-orange);
  font-size: 10px;
  font-weight: 800;
}
.products-band {
  padding-block: 68px;
  background: #eef5f7;
}
.faq-grid {
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  gap: 54px;
}
details {
  border-top: 1px solid var(--kb-line);
}
summary {
  padding-block: 18px;
  cursor: pointer;
  font-weight: 750;
}
details p {
  margin-top: 0;
  color: var(--kb-muted);
}
@media (max-width: 850px) {
  .category-hero-grid,
  .editorial-layout,
  .faq-grid {
    grid-template-columns: 1fr;
  }
  .variant-list {
    grid-template-columns: 1fr;
  }
}
</style>
