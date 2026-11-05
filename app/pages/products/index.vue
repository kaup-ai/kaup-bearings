<script setup lang="ts">
import { products } from '#shared/data/products'
import { suppliers } from '#shared/data/suppliers'
import { categories } from '#shared/data/taxonomy'
import { applications } from '#shared/data/editorial'
import { filterProducts, sortProducts } from '#shared/utils/catalog'
import type { DimensionKey, ProductFilter } from '#shared/types/catalog'

const { t, locale } = useI18n()
const { tr } = useLocalized()
const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()
useBearingsSeo({
  title: computed(() => `${t('catalog.title')} | Kaup Bearings`),
  description: computed(() => t('catalog.description')),
  path: '/products',
  index: false,
})

const stringQuery = (key: string) => {
  const value = route.query[key]
  return typeof value === 'string' ? value : ''
}
const filters = reactive({
  query: stringQuery('q'),
  category: stringQuery('category'),
  subcategory: stringQuery('subcategory'),
  supplier: stringQuery('supplier'),
  precision: stringQuery('precision'),
  clearance: stringQuery('clearance'),
  sealing: stringQuery('sealing'),
  cage: stringQuery('cage'),
  material: stringQuery('material'),
  application: stringQuery('application'),
  certification: stringQuery('certification'),
  dmin: stringQuery('dmin'),
  dmax: stringQuery('dmax'),
  Dmin: stringQuery('Dmin'),
  Dmax: stringQuery('Dmax'),
  Bmin: stringQuery('Bmin'),
  Bmax: stringQuery('Bmax'),
  sort: stringQuery('sort') || 'relevance',
})

const selectedCategory = computed(() => categories.find((item) => item.slug === filters.category))
const results = computed(() => {
  const dimension = (key: DimensionKey, minKey: string, maxKey: string) => ({
    min: numberQueryFromState(filters[minKey as keyof typeof filters]),
    max: numberQueryFromState(filters[maxKey as keyof typeof filters]),
  })
  const filter: ProductFilter = {
    category: filters.category || undefined,
    subcategory: filters.subcategory || undefined,
    supplier: filters.supplier || undefined,
    precision: filters.precision || undefined,
    clearance: filters.clearance || undefined,
    sealing: filters.sealing || undefined,
    cage: filters.cage || undefined,
    material: filters.material || undefined,
    query: filters.query || undefined,
    certifications: filters.certification ? [filters.certification] : [],
    applications: filters.application ? [filters.application] : [],
    dimensions: {
      d: dimension('d', 'dmin', 'dmax'),
      D: dimension('D', 'Dmin', 'Dmax'),
      B: dimension('B', 'Bmin', 'Bmax'),
    },
  }
  return sortProducts(
    filterProducts(products, filter),
    filters.sort as 'relevance' | 'price-asc' | 'price-desc' | 'designation',
    filters.query,
  )
})

function numberQueryFromState(value: string) {
  if (value === '') return undefined
  const number = Number(value)
  return Number.isFinite(number) ? number : undefined
}

function applyFilters() {
  const query: Record<string, string> = {}
  for (const [key, value] of Object.entries(filters)) {
    if (value && value !== 'relevance') query[key] = String(value)
  }
  router.replace({ path: localePath('/products'), query })
}

function resetFilters() {
  for (const key of Object.keys(filters)) {
    filters[key as keyof typeof filters] = key === 'sort' ? 'relevance' : ''
  }
  router.replace({ path: localePath('/products') })
}

const precisionOptions = [...new Set(products.map((product) => product.parameters.precision))]
const clearanceOptions = [...new Set(products.map((product) => product.parameters.clearance))]
const sealingOptions = [...new Set(products.map((product) => product.parameters.sealing))]
const cageOptions = [...new Set(products.map((product) => product.parameters.cage))]
const materialOptions = [...new Set(products.map((product) => product.parameters.material))]
const certificationOptions = [...new Set(products.flatMap((product) => product.certifications))]
</script>

<template>
  <div>
    <section class="catalog-head">
      <div class="kb-container">
        <p class="kb-eyebrow">BEARING CATALOGUE</p>
        <h1>{{ t('catalog.title') }}</h1>
        <p>{{ t('catalog.description') }}</p>
        <span class="kb-badge kb-demo">{{ t('common.demo') }}</span>
      </div>
    </section>

    <div class="kb-container catalog-layout">
      <aside class="filters kb-panel">
        <div class="filter-head">
          <h2>{{ t('catalog.filters') }}</h2>
          <button type="button" @click="resetFilters">{{ t('common.reset') }}</button>
        </div>
        <form @submit.prevent="applyFilters">
          <div class="kb-field">
            <label for="catalog-query">{{ t('common.modelOrDimensions') }}</label>
            <input id="catalog-query" v-model="filters.query" type="search" :placeholder="t('common.searchPlaceholder')" >
          </div>
          <div class="kb-field">
            <label for="catalog-category">{{ locale === 'zh' ? '轴承分类' : 'Bearing family' }}</label>
            <select id="catalog-category" v-model="filters.category" @change="filters.subcategory = ''">
              <option value="">{{ t('common.all') }}</option>
              <option v-for="category in categories" :key="category.slug" :value="category.slug">{{ tr(category.title) }}</option>
            </select>
          </div>
          <div v-if="selectedCategory" class="kb-field">
            <label for="catalog-subcategory">{{ t('catalog.subcategory') }}</label>
            <select id="catalog-subcategory" v-model="filters.subcategory">
              <option value="">{{ t('common.all') }}</option>
              <option v-for="subcategory in selectedCategory.subcategories" :key="subcategory.slug" :value="subcategory.slug">
                {{ tr(subcategory.title) }}
              </option>
            </select>
          </div>

          <fieldset class="dimension-group">
            <legend>{{ locale === 'zh' ? '公制尺寸范围（包含边界）' : 'Metric dimensions (inclusive)' }}</legend>
            <div
v-for="[label, minKey, maxKey] in [
              [t('catalog.bore'), 'dmin', 'dmax'],
              [t('catalog.outside'), 'Dmin', 'Dmax'],
              [t('catalog.width'), 'Bmin', 'Bmax'],
            ]" :key="minKey" class="dimension-row">
              <span class="dimension-label">{{ label }}</span>
              <label class="range-field">
                <small>{{ t('catalog.min') }}</small>
                <input v-model="filters[minKey as keyof typeof filters]" type="number" min="0" inputmode="decimal" :aria-label="`${label} ${t('catalog.min')}`" >
              </label>
              <label class="range-field">
                <small>{{ t('catalog.max') }}</small>
                <input v-model="filters[maxKey as keyof typeof filters]" type="number" min="0" inputmode="decimal" :aria-label="`${label} ${t('catalog.max')}`" >
              </label>
            </div>
          </fieldset>

          <div
v-for="[label, key, options] in [
            [t('common.precision'), 'precision', precisionOptions],
            [t('common.clearance'), 'clearance', clearanceOptions],
            [t('common.sealing'), 'sealing', sealingOptions],
            [t('common.cage'), 'cage', cageOptions],
            [t('common.material'), 'material', materialOptions],
          ]" :key="key" class="kb-field">
            <label :for="`filter-${key}`">{{ label }}</label>
            <select :id="`filter-${key}`" v-model="filters[key as keyof typeof filters]">
              <option value="">{{ t('common.all') }}</option>
              <option v-for="option in options" :key="String(option)" :value="String(option)">{{ option }}</option>
            </select>
          </div>
          <div class="kb-field">
            <label for="filter-supplier">{{ t('catalog.supplier') }}</label>
            <select id="filter-supplier" v-model="filters.supplier">
              <option value="">{{ t('common.all') }}</option>
              <option v-for="supplier in suppliers" :key="supplier.slug" :value="supplier.slug">{{ tr(supplier.name) }}</option>
            </select>
          </div>
          <div class="kb-field">
            <label for="filter-application">{{ t('common.applications') }}</label>
            <select id="filter-application" v-model="filters.application">
              <option value="">{{ t('common.all') }}</option>
              <option v-for="application in applications" :key="application.slug" :value="application.slug">{{ tr(application.name) }}</option>
            </select>
          </div>
          <div class="kb-field">
            <label for="filter-certification">{{ t('common.certifications') }}</label>
            <select id="filter-certification" v-model="filters.certification">
              <option value="">{{ t('common.all') }}</option>
              <option v-for="certification in certificationOptions" :key="certification" :value="certification">{{ certification }}</option>
            </select>
          </div>
          <button type="submit" class="kb-button filter-submit">{{ locale === 'zh' ? '查看筛选结果' : 'Apply filters' }}</button>
        </form>
      </aside>

      <section class="results">
        <div class="results-toolbar">
          <p><strong>{{ results.length }}</strong> {{ t('common.products') }}</p>
          <label>
            {{ t('catalog.sort') }}
            <select v-model="filters.sort" @change="applyFilters">
              <option value="relevance">{{ t('catalog.relevance') }}</option>
              <option value="price-asc">{{ t('catalog.priceAsc') }}</option>
              <option value="price-desc">{{ t('catalog.priceDesc') }}</option>
              <option value="designation">{{ t('catalog.designation') }}</option>
            </select>
          </label>
        </div>
        <div v-if="results.length" class="kb-grid-3 result-grid">
          <ProductCard v-for="product in results" :key="product.id" :product="product" />
        </div>
        <div v-else class="empty-state kb-panel">
          <UIcon name="i-lucide-search-x" aria-hidden="true" />
          <h2>{{ t('common.empty') }}</h2>
          <p>{{ t('common.emptyHint') }}</p>
          <button type="button" class="kb-button secondary" @click="resetFilters">{{ t('common.reset') }}</button>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.catalog-head {
  padding-block: 48px;
  background: linear-gradient(135deg, #f8fcfd, #deedf1);
  color: var(--kb-text);
  border-top: 4px solid var(--kb-blue);
  border-bottom: 1px solid var(--kb-line);
}
.catalog-head h1 {
  margin: 7px 0 10px;
  font-size: clamp(42px, 5vw, 64px);
  line-height: 1;
  letter-spacing: -0.045em;
}
.catalog-head p:not(.kb-eyebrow) {
  max-width: 72ch;
  color: var(--kb-muted);
}
.catalog-layout {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 28px;
  padding-block: 36px 72px;
}
.filters {
  align-self: start;
  padding: 18px;
}
.filter-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--kb-line);
}
.filter-head h2 {
  margin: 0;
  font-size: 17px;
}
.filter-head button {
  border: 0;
  background: transparent;
  color: var(--kb-blue);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}
form {
  display: grid;
  gap: 14px;
  margin-top: 16px;
}
form .kb-field select,
form .kb-field input {
  min-height: 42px;
  font-size: 13px;
}
.dimension-group {
  margin: 0;
  padding: 12px 0 0;
  border: 0;
  border-top: 1px solid var(--kb-line);
}
.dimension-group legend {
  padding-top: 4px;
  font-size: 12px;
  font-weight: 750;
}
.dimension-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin-top: 14px;
}
.dimension-label {
  grid-column: 1 / -1;
  font-size: 12px;
  font-weight: 700;
}
.range-field {
  display: grid;
  gap: 4px;
  min-width: 0;
}
.range-field small {
  color: var(--kb-muted);
  font-size: 10px;
  font-weight: 700;
}
.range-field input {
  width: 100%;
  min-width: 0;
  height: 38px;
  border: 1px solid #bccbd3;
  border-radius: 6px;
  background: white;
  padding: 7px 10px;
}
.filter-submit {
  width: 100%;
}
.results-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 48px;
  margin-bottom: 15px;
}
.results-toolbar p {
  margin: 0;
}
.results-toolbar label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--kb-muted);
  font-size: 12px;
}
.results-toolbar select {
  min-height: 40px;
  padding: 6px 28px 6px 9px;
  border: 1px solid var(--kb-line);
  background: white;
}
.result-grid {
  align-items: stretch;
}
.empty-state {
  display: grid;
  justify-items: center;
  padding: 70px 24px;
  text-align: center;
}
.empty-state > svg {
  width: 34px;
  height: 34px;
  color: var(--kb-steel);
}
.empty-state p {
  color: var(--kb-muted);
}
@media (max-width: 900px) {
  .catalog-layout {
    grid-template-columns: 1fr;
  }
  .filters form {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .dimension-group,
  .filter-submit {
    grid-column: 1 / -1;
  }
}
@media (max-width: 640px) {
  .filters form {
    grid-template-columns: 1fr;
  }
  .results-toolbar {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
