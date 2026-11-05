<script setup lang="ts">
import { suppliers, getSupplierBySlug } from '#shared/data/suppliers'
import { products } from '#shared/data/products'
import { categories } from '#shared/data/taxonomy'

const route = useRoute()
const { t, locale } = useI18n()
const { tr } = useLocalized()
const localePath = useLocalePath()
const supplier = getSupplierBySlug(String(route.params.slug))
if (!supplier) throw createError({ statusCode: 404, statusMessage: 'Supplier not found' })

useBearingsSeo({
  title: computed(() => `${tr(supplier.name)} | Kaup Bearings`),
  description: computed(() => tr(supplier.description)),
  path: `/suppliers/${supplier.slug}`,
  index: false,
})

const supplierProducts = products.filter((product) => product.supplierSlug === supplier.slug)
const relatedSuppliers = suppliers.filter((entry) => entry.slug !== supplier.slug && entry.primaryCategories.some((category) => supplier.primaryCategories.includes(category))).slice(0, 3)
const primaryCategoryLabels = categories.filter((category) => supplier.primaryCategories.includes(category.slug))
</script>

<template>
  <div>
    <section class="supplier-hero">
      <div class="kb-container">
        <nav class="breadcrumb"><NuxtLink :to="localePath('/')">{{ t('nav.home') }}</NuxtLink><span>/</span><NuxtLink :to="localePath('/suppliers')">{{ t('nav.suppliers') }}</NuxtLink><span>/</span><span>{{ tr(supplier.name) }}</span></nav>
        <div class="hero-grid">
          <div>
            <span class="kb-badge kb-demo">{{ t('workspace.verified') }}</span>
            <h1>{{ tr(supplier.name) }}</h1>
            <p>{{ tr(supplier.description) }}</p>
            <div class="location">{{ tr(supplier.city) }} · {{ tr(supplier.country) }} · {{ supplier.established }}</div>
          </div>
          <div class="profile-facts">
            <div><span>{{ t('suppliers.precisionCapability') }}</span><strong>{{ tr(supplier.precisionCapability) }}</strong></div>
            <div><span>{{ t('suppliers.leadTime') }}</span><strong>{{ supplier.leadTime }}</strong></div>
            <div><span>{{ locale === 'zh' ? '企业类型' : 'Business type' }}</span><strong>{{ tr(supplier.businessType) }}</strong></div>
          </div>
        </div>
        <div class="factory-image">
          <img :src="supplier.image" :alt="locale === 'zh' ? `${tr(supplier.name)}工厂车间` : `${tr(supplier.name)} factory workshop`" width="1280" height="720" >
        </div>
      </div>
    </section>

    <section class="kb-section">
      <div class="kb-container profile-grid">
        <article>
          <h2>{{ locale === 'zh' ? '主营轴承产品' : 'Primary bearing capability' }}</h2>
          <div class="category-links">
            <NuxtLink v-for="category in primaryCategoryLabels" :key="category.slug" :to="localePath(`/bearings/${category.slug}`)">
              {{ tr(category.title) }} <UIcon name="i-lucide-arrow-up-right" aria-hidden="true" />
            </NuxtLink>
          </div>
          <h2>{{ t('suppliers.processes') }}</h2>
          <ol class="process-list">
            <li v-for="(process, index) in supplier.processes" :key="process.en">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>{{ tr(process) }}
            </li>
          </ol>
          <h2>{{ t('suppliers.inspection') }}</h2>
          <ul class="check-list">
            <li v-for="item in supplier.inspection" :key="item.en"><UIcon name="i-lucide-check" aria-hidden="true" />{{ tr(item) }}</li>
          </ul>
        </article>
        <aside class="kb-panel capability-card">
          <p class="kb-eyebrow">QUALITY PROFILE</p>
          <h2>{{ t('suppliers.quality') }}</h2>
          <div class="tag-list"><span v-for="system in supplier.qualitySystems" :key="system">{{ system }}</span></div>
          <h2>{{ t('suppliers.markets') }}</h2>
          <div class="tag-list"><span v-for="market in supplier.markets" :key="market.en">{{ tr(market) }}</span></div>
          <p class="demo-note">{{ t('home.description') }}</p>
        </aside>
      </div>
    </section>

    <section class="products-band">
      <div class="kb-container">
        <SectionHead :eyebrow="'DEMO CATALOGUE'" :title="locale === 'zh' ? '该供应商的演示产品' : 'Demo products from this supplier'" />
        <div class="kb-grid-4">
          <ProductCard v-for="product in supplierProducts" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <section class="kb-section">
      <div class="kb-container">
        <SectionHead :eyebrow="'RELATED SUPPLIERS'" :title="locale === 'zh' ? '具有相近供应能力的演示企业' : 'Suppliers with related capabilities'" />
        <div class="kb-grid-3">
          <SupplierCard v-for="entry in relatedSuppliers" :key="entry.slug" :supplier="entry" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.supplier-hero {
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
  margin-bottom: 26px;
  color: var(--kb-muted);
  font-size: 12px;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 50px;
  align-items: end;
}
h1 {
  max-width: 18ch;
  margin: 16px 0;
  font-size: clamp(42px, 5vw, 68px);
  line-height: 1;
  letter-spacing: -0.045em;
}
.hero-grid p {
  max-width: 70ch;
  color: var(--kb-muted);
}
.location {
  color: var(--kb-muted);
  font-size: 12px;
}
.profile-facts {
  display: grid;
  gap: 1px;
  background: var(--kb-line);
  border: 1px solid var(--kb-line);
  border-radius: var(--kb-radius);
}
.profile-facts div {
  display: grid;
  gap: 5px;
  padding: 17px;
  background: rgb(255 255 255 / 88%);
}
.profile-facts span {
  color: var(--kb-muted);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.profile-facts strong {
  font-size: 16px;
}
.factory-image {
  margin-top: 34px;
  overflow: hidden;
  border: 1px solid #cbdbe1;
  border-radius: var(--kb-radius);
  box-shadow: var(--kb-shadow-soft);
}
.factory-image img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 21 / 7;
  object-fit: cover;
}
.profile-grid {
  display: grid;
  grid-template-columns: 1.4fr 0.6fr;
  gap: 48px;
}
article h2,
aside h2 {
  margin-top: 32px;
  font-size: 22px;
}
article h2:first-child,
aside h2:first-of-type {
  margin-top: 0;
}
.category-links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}
.category-links a {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 14px;
  background: white;
  border: 1px solid var(--kb-line);
  font-size: 14px;
  font-weight: 700;
}
.process-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  padding: 0;
  list-style: none;
}
.process-list li {
  display: flex;
  gap: 12px;
  padding: 14px;
  background: var(--kb-surface-soft);
}
.process-list span {
  color: var(--kb-orange);
  font-size: 10px;
  font-weight: 800;
}
.check-list {
  display: grid;
  gap: 8px;
  padding: 0;
  list-style: none;
}
.check-list li {
  display: flex;
  gap: 8px;
  align-items: center;
}
.capability-card {
  align-self: start;
  padding: 24px;
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}
.tag-list span {
  padding: 5px 8px;
  background: #e4eef2;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 700;
}
.demo-note {
  margin-top: 28px;
  padding-top: 18px;
  border-top: 1px solid var(--kb-line);
  color: var(--kb-muted);
  font-size: 11px;
}
.products-band {
  padding-block: 64px;
  background: #eef5f7;
}
@media (max-width: 820px) {
  .hero-grid,
  .profile-grid {
    grid-template-columns: 1fr;
  }
}
</style>
