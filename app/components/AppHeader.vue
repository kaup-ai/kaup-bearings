<script setup lang="ts">
import { categories } from '#shared/data/taxonomy'
import { useLocalized } from '../composables/useLocalized'

const { t, locale } = useI18n()
const { tr } = useLocalized()
const localePath = useLocalePath()
const route = useRoute()
const { session } = useDemoSession()
const query = ref('')

function search() {
  const path = localePath('/products')
  navigateTo({ path, query: query.value.trim() ? { q: query.value.trim() } : {} })
}

const isActive = (path: string) => route.path === path || route.path.endsWith(path)
</script>

<template>
  <a class="skip-link" href="#main-content">
    {{ locale === 'zh' ? '跳到主要内容' : 'Skip to main content' }}
  </a>
  <div class="utility-bar">
    <div class="kb-container utility-inner">
      <span>{{ t('tagline') }}</span>
      <LocaleSwitcher />
    </div>
  </div>
  <header class="site-header">
    <div class="kb-container header-main">
      <NuxtLink :to="localePath('/')" class="brand-link"><AppLogo /></NuxtLink>
      <form class="model-search" role="search" @submit.prevent="search">
        <label class="sr-only" for="header-bearing-search">{{ t('common.search') }}</label>
        <UIcon name="i-lucide-search" aria-hidden="true" />
        <input
          id="header-bearing-search"
          v-model="query"
          type="search"
          :placeholder="t('common.searchPlaceholder')"
        >
        <button type="submit">{{ locale === 'zh' ? '搜索' : 'Search' }}</button>
      </form>
      <div class="header-actions">
        <NuxtLink v-if="!session" :to="localePath('/auth/buyer')" class="login-link">
          {{ t('nav.login') }}
        </NuxtLink>
        <NuxtLink v-if="!session" :to="localePath('/auth/supplier')" class="kb-button dark">
          {{ locale === 'zh' ? '供应商入驻' : 'Supplier access' }}
        </NuxtLink>
        <NuxtLink
          v-else
          :to="localePath(session.role === 'supplier' ? '/supplier' : '/my-rfq')"
          class="kb-button dark"
        >
          {{ t('nav.workspace') }}
        </NuxtLink>
      </div>
    </div>
    <nav class="primary-nav" aria-label="Primary navigation">
      <div class="kb-container nav-inner">
        <NuxtLink :to="localePath('/')" :class="{ active: isActive(localePath('/')) }">
          {{ t('nav.home') }}
        </NuxtLink>
        <details class="category-menu">
          <summary>{{ locale === 'zh' ? '轴承分类' : 'Bearing types' }}</summary>
          <div class="mega-menu">
            <NuxtLink
              v-for="category in categories"
              :key="category.slug"
              :to="localePath(`/bearings/${category.slug}`)"
              class="mega-category"
            >
              <span class="mega-number">{{ category.number }}</span>
              <span>
                <strong>{{ tr(category.title) }}</strong>
                <small>{{ tr(category.summary) }}</small>
              </span>
            </NuxtLink>
          </div>
        </details>
        <NuxtLink :to="localePath('/products')">{{ t('nav.catalog') }}</NuxtLink>
        <NuxtLink :to="localePath('/suppliers')">{{ t('nav.suppliers') }}</NuxtLink>
        <NuxtLink :to="localePath('/knowledge')">{{ t('nav.knowledge') }}</NuxtLink>
        <NuxtLink :to="localePath('/news')">{{ t('nav.news') }}</NuxtLink>
        <NuxtLink :to="localePath('/exhibitions')">{{ t('nav.exhibitions') }}</NuxtLink>
        <NuxtLink :to="localePath('/rfq')" class="rfq-link">
          <UIcon name="i-lucide-file-text" aria-hidden="true" />
          {{ t('nav.rfq') }}
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.utility-bar {
  background: var(--kb-graphite);
  color: #d7e5ea;
  font-size: 11px;
  letter-spacing: 0.04em;
  border-bottom: 1px solid var(--kb-graphite);
}
.utility-inner {
  min-height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}
.site-header {
  position: relative;
  z-index: 40;
  background: white;
  border-bottom: 1px solid var(--kb-line);
}
.header-main {
  min-height: 88px;
  display: flex;
  align-items: center;
  gap: 26px;
}
.brand-link {
  flex: none;
}
.model-search {
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 640px;
  min-width: 220px;
  margin-left: auto;
  border: 1px solid #b9c8d0;
  border-radius: 6px;
  background: #f7fafb;
}
.model-search:focus-within {
  border-color: var(--kb-blue);
  box-shadow: 0 0 0 2px rgb(8 127 158 / 12%);
}
.model-search > .iconify {
  flex: none;
  width: 18px;
  height: 18px;
  margin-left: 20px;
  color: var(--kb-blue);
}
.model-search input {
  min-width: 0;
  flex: 1;
  border: 0;
  background: transparent;
  padding: 12px 12px 12px 10px;
}
.model-search input:focus-visible {
  box-shadow: none;
}
.model-search button {
  min-height: 38px;
  margin: 4px 5px 4px 4px;
  padding: 0 18px;
  border: 0;
  border-radius: 5px;
  background: var(--kb-blue);
  color: white;
  font-weight: 700;
  cursor: pointer;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.login-link {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
}
.primary-nav {
  border-top: 1px solid #edf1f3;
}
.nav-inner {
  display: flex;
  align-items: stretch;
  gap: 26px;
  min-height: 50px;
}
.nav-inner > a,
.category-menu > summary {
  display: flex;
  min-height: 50px;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
}
.nav-inner a:hover,
.nav-inner a.active,
.category-menu > summary:hover {
  color: var(--kb-blue-deep);
}
.category-menu {
  position: relative;
}
.category-menu > summary {
  list-style: none;
}
.category-menu > summary::-webkit-details-marker {
  display: none;
}
.category-menu > summary::after {
  content: '⌄';
  font-size: 14px;
}
.mega-menu {
  position: absolute;
  top: calc(100% + 1px);
  left: -20px;
  width: min(920px, 86vw);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4px;
  padding: 16px;
  background: white;
  border: 1px solid var(--kb-line);
  border-radius: var(--kb-radius);
  box-shadow: 0 18px 45px rgba(29, 48, 59, 0.12);
}
.mega-category {
  display: flex;
  gap: 12px;
  min-height: 76px;
  padding: 12px;
  border-radius: 5px;
}
.mega-category:hover {
  background: #f0f5f7;
}
.mega-number {
  color: var(--kb-orange);
  font-size: 12px;
  font-weight: 800;
}
.mega-category strong {
  display: block;
  font-size: 14px;
}
.mega-category small {
  display: block;
  color: var(--kb-muted);
  font-size: 12px;
  line-height: 1.4;
}
.rfq-link {
  margin-left: auto;
  color: #9a4e00;
}
@media (max-width: 1080px) {
  .primary-nav {
    overflow-x: auto;
  }
  .nav-inner {
    gap: 18px;
    width: max-content;
    min-width: 100%;
    padding-inline: 20px;
  }
  .header-main {
    flex-wrap: wrap;
    padding-block: 14px;
  }
  .model-search {
    order: 3;
    flex-basis: 100%;
    max-width: none;
    margin-left: 0;
  }
}
@media (max-width: 640px) {
  .utility-inner > span {
    display: none;
  }
  .utility-inner {
    justify-content: flex-end;
  }
  .header-actions .login-link {
    display: none;
  }
  .mega-menu {
    grid-template-columns: 1fr;
    left: -80px;
  }
}
</style>
