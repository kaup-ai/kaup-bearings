<script setup lang="ts">
import { products } from '#shared/data/products'
import { getSupplierBySlug } from '#shared/data/suppliers'
import { getCategoryBySlug } from '#shared/data/taxonomy'
import { formatBearingDimensions } from '#shared/utils/catalog'

const route = useRoute()
const { t, locale } = useI18n()
const { tr } = useLocalized()
const localePath = useLocalePath()
const product = products.find((entry) => entry.slug === route.params.slug)
if (!product) throw createError({ statusCode: 404, statusMessage: 'Product not found' })

const category = getCategoryBySlug(product.categorySlug)!
const supplier = getSupplierBySlug(product.supplierSlug)!
const related = products.filter((entry) => entry.categorySlug === product.categorySlug && entry.id !== product.id).slice(0, 3)
useBearingsSeo({
  title: computed(() => `${tr(product.title)} | Kaup Bearings`),
  description: computed(() => tr(product.description)),
  path: `/products/${product.slug}`,
  index: false,
  image: product.image,
})

function dimensionLabel(key: 'd' | 'D' | 'B' | 'T') {
  return key === 'T' ? 'T' : key
}
</script>

<template>
  <div>
    <section class="product-top kb-section">
      <div class="kb-container">
        <nav class="breadcrumb" :aria-label="locale === 'zh' ? '面包屑' : 'Breadcrumb'">
          <NuxtLink :to="localePath('/')">{{ t('nav.home') }}</NuxtLink>
          <span>/</span>
          <NuxtLink :to="localePath(`/bearings/${category.slug}`)">{{ tr(category.title) }}</NuxtLink>
          <span>/</span>
          <span>{{ product.designation }}</span>
        </nav>
        <div class="product-grid">
          <figure>
            <img :src="product.image" :alt="tr(product.title)" width="1280" height="720" fetchpriority="high" >
          </figure>
          <div class="product-summary">
            <span class="kb-badge kb-demo">{{ t('common.demo') }}</span>
            <p class="designation">{{ product.designation }}</p>
            <h1>{{ tr(product.title) }}</h1>
            <p class="description">{{ tr(product.description) }}</p>
            <dl class="quick-specs">
              <div><dt>{{ locale === 'zh' ? '尺寸' : 'Dimensions' }}</dt><dd>{{ formatBearingDimensions(product) }}</dd></div>
              <div><dt>{{ t('common.precision') }}</dt><dd>{{ product.parameters.precision }}</dd></div>
              <div><dt>{{ t('common.clearance') }}</dt><dd>{{ product.parameters.clearance }}</dd></div>
              <div><dt>{{ t('common.sealing') }}</dt><dd>{{ product.parameters.sealing }}</dd></div>
            </dl>
            <div class="price">
              <span>{{ locale === 'zh' ? '演示参考价' : 'Demo reference price' }}</span>
              <strong>${{ product.price.min.toFixed(2) }} – ${{ product.price.max.toFixed(2) }}</strong>
            </div>
            <NuxtLink :to="{ path: localePath('/rfq'), query: { product: product.slug } }" class="kb-button quote-button">
              {{ t('common.requestQuote') }} <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
            </NuxtLink>
            <p class="demo-notice">{{ t('product.demoNotice') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="kb-section details-band">
      <div class="kb-container details-grid">
        <article class="kb-panel specifics">
          <h2>{{ t('common.specifications') }}</h2>
          <table class="kb-table">
            <tbody>
              <tr><th>{{ t('product.dimensions') }}</th><td>{{ formatBearingDimensions(product) }}</td></tr>
              <tr v-for="(value, key) in product.dimensions" :key="key">
                <th>{{ dimensionLabel(key as 'd' | 'D' | 'B' | 'T') }}（mm）</th><td>{{ value }}</td>
              </tr>
              <tr><th>{{ t('common.dynamicLoad') }}</th><td>{{ product.parameters.dynamicLoad ?? '—' }} kN</td></tr>
              <tr><th>{{ t('common.staticLoad') }}</th><td>{{ product.parameters.staticLoad ?? '—' }} kN</td></tr>
              <tr><th>{{ t('common.limitingSpeed') }}</th><td>{{ product.parameters.limitingSpeed ? `${product.parameters.limitingSpeed} rpm` : '—' }}</td></tr>
              <tr><th>{{ t('common.precision') }}</th><td>{{ product.parameters.precision }}</td></tr>
              <tr><th>{{ t('common.clearance') }}</th><td>{{ product.parameters.clearance }}</td></tr>
              <tr><th>{{ t('common.sealing') }}</th><td>{{ product.parameters.sealing }}</td></tr>
              <tr><th>{{ t('common.cage') }}</th><td>{{ product.parameters.cage }}</td></tr>
              <tr><th>{{ t('common.material') }}</th><td>{{ product.parameters.material }}</td></tr>
            </tbody>
          </table>
          <h2>{{ t('common.standards') }}</h2>
          <div class="tag-row"><span v-for="standard in product.standards" :key="standard">{{ standard }}</span></div>
          <h2>{{ t('common.certifications') }}</h2>
          <div class="tag-row"><span v-for="certification in product.certifications" :key="certification">{{ certification }} · {{ t('common.demo') }}</span></div>
        </article>
        <aside>
          <SupplierCard :supplier="supplier" />
          <div class="rfq-card">
            <p class="kb-eyebrow">STRUCTURED RFQ</p>
            <h2>{{ locale === 'zh' ? '需要确认价格或交期？' : 'Need price or lead-time confirmation?' }}</h2>
            <p>{{ locale === 'zh' ? '询价会自动带入型号、尺寸、精度、游隙和密封要求。' : 'The RFQ form carries designation, dimensions, precision, clearance and sealing automatically.' }}</p>
            <NuxtLink :to="{ path: localePath('/rfq'), query: { product: product.slug } }" class="kb-button">{{ t('common.requestQuote') }}</NuxtLink>
          </div>
        </aside>
      </div>
    </section>

    <section class="kb-section">
      <div class="kb-container">
        <SectionHead
          :eyebrow="'RELATED / ' + category.number"
          :title="t('product.related')"
          :action-label="t('nav.catalog')"
          :action-to="{ path: localePath('/products'), query: { category: category.slug } }"
        />
        <div class="kb-grid-3">
          <ProductCard v-for="item in related" :key="item.id" :product="item" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.product-top {
  background: #f6fafb;
}
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 22px;
  color: var(--kb-muted);
  font-size: 12px;
}
.product-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 48px;
}
figure {
  aspect-ratio: 16 / 11;
  margin: 0;
  overflow: hidden;
  background: white;
}
figure img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.designation {
  margin: 16px 0 3px;
  color: var(--kb-blue);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.06em;
}
h1 {
  margin: 0;
  font-size: clamp(36px, 4.5vw, 58px);
  line-height: 1.03;
  letter-spacing: -0.045em;
}
.description {
  color: var(--kb-muted);
}
.quick-specs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  background: var(--kb-line);
  border: 1px solid var(--kb-line);
}
.quick-specs div {
  padding: 12px;
  background: white;
}
.quick-specs dt {
  color: var(--kb-muted);
  font-size: 11px;
}
.quick-specs dd {
  margin: 3px 0 0;
  font-weight: 750;
}
.price {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid #bfcdd4;
}
.price span {
  color: var(--kb-muted);
  font-size: 11px;
}
.price strong {
  font-size: 21px;
}
.quote-button {
  width: 100%;
  margin-top: 14px;
}
.demo-notice {
  color: var(--kb-muted);
  font-size: 11px;
}
.details-band {
  background: white;
}
.details-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(300px, 0.6fr);
  gap: 32px;
}
.specifics {
  padding: 26px;
}
.specifics h2 {
  margin-top: 30px;
  font-size: 20px;
}
.specifics h2:first-child {
  margin-top: 0;
}
.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}
.tag-row span {
  padding: 6px 9px;
  background: #e9f1f4;
  border-radius: 3px;
  font-size: 12px;
}
aside {
  display: grid;
  align-content: start;
  gap: 20px;
}
.rfq-card {
  padding: 24px;
  background: var(--kb-surface-blue);
  color: var(--kb-text);
  border: 1px solid var(--kb-line);
  border-radius: var(--kb-radius);
}
.rfq-card h2 {
  font-size: 22px;
}
.rfq-card p:not(.kb-eyebrow) {
  color: var(--kb-muted);
  font-size: 13px;
}
@media (max-width: 900px) {
  .product-grid,
  .details-grid {
    grid-template-columns: 1fr;
  }
}
</style>
