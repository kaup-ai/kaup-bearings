<script setup lang="ts">
import { suppliers } from '#shared/data/suppliers'
import { categories } from '#shared/data/taxonomy'

const { t, locale } = useI18n()
const { tr } = useLocalized()
const query = ref('')
const category = ref('')
useBearingsSeo({
  title: computed(() => `${t('suppliers.title')} | Kaup Bearings`),
  description: computed(() => t('suppliers.description')),
  path: '/suppliers',
  index: false,
})

const results = computed(() => {
  const needle = query.value.trim().toLocaleLowerCase()
  return suppliers.filter((supplier) => {
    if (category.value && !supplier.primaryCategories.includes(category.value)) return false
    if (!needle) return true
    return [supplier.name.en, supplier.name.zh, supplier.city.en, supplier.city.zh, supplier.country.en, supplier.country.zh]
      .join(' ')
      .toLocaleLowerCase()
      .includes(needle)
  })
})
</script>

<template>
  <div>
    <section class="supplier-head">
      <div class="kb-container">
        <p class="kb-eyebrow">VERIFIED DEMO SUPPLIER NETWORK</p>
        <h1>{{ t('suppliers.title') }}</h1>
        <p>{{ t('suppliers.description') }}</p>
      </div>
    </section>
    <div class="kb-container supplier-page">
      <form class="supplier-search kb-panel" @submit.prevent>
        <div class="kb-field">
          <label for="supplier-query">{{ t('suppliers.search') }}</label>
          <input id="supplier-query" v-model="query" type="search" :placeholder="locale === 'zh' ? '企业名称、城市或国家' : 'Company, city or country'" >
        </div>
        <div class="kb-field">
          <label for="supplier-category">{{ locale === 'zh' ? '轴承能力' : 'Bearing capability' }}</label>
          <select id="supplier-category" v-model="category">
            <option value="">{{ t('common.all') }}</option>
            <option v-for="entry in categories" :key="entry.slug" :value="entry.slug">{{ tr(entry.title) }}</option>
          </select>
        </div>
        <button type="button" class="kb-button secondary" @click="query = ''; category = ''">{{ t('common.reset') }}</button>
      </form>
      <div class="results-head">
        <strong>{{ results.length }}</strong> {{ t('common.suppliers') }}
        <span class="kb-badge kb-demo">{{ t('common.demo') }}</span>
      </div>
      <div class="kb-grid-3">
        <SupplierCard v-for="supplier in results" :key="supplier.slug" :supplier="supplier" />
      </div>
      <div v-if="!results.length" class="empty kb-panel">
        <h2>{{ t('common.empty') }}</h2>
        <p>{{ t('common.emptyHint') }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.supplier-head {
  padding-block: 58px;
  background: linear-gradient(135deg, #f8fcfd, #deedf1);
  color: var(--kb-text);
  border-top: 4px solid var(--kb-blue);
  border-bottom: 1px solid var(--kb-line);
}
.supplier-head h1 {
  margin: 6px 0 12px;
  font-size: clamp(42px, 5vw, 64px);
  line-height: 1;
  letter-spacing: -0.045em;
}
.supplier-head p:not(.kb-eyebrow) {
  max-width: 72ch;
  color: var(--kb-muted);
}
.supplier-page {
  padding-block: 34px 72px;
}
.supplier-search {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr auto;
  gap: 12px;
  align-items: end;
  padding: 18px;
}
.results-head {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-block: 28px 16px;
}
.empty {
  padding: 50px;
  text-align: center;
}
@media (max-width: 700px) {
  .supplier-search {
    grid-template-columns: 1fr;
  }
}
</style>
