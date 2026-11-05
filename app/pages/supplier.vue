<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { session, canPublish } = useDemoSession()
const { drafts, rfqs } = useMarketplace()
useBearingsSeo({
  title: computed(() => `${t('nav.workspace')} | Kaup Bearings`),
  description: computed(() => t('suppliers.description')),
  path: '/supplier',
  index: false,
})
</script>

<template>
  <div class="kb-container page">
    <div class="head">
      <div><p class="kb-eyebrow">SUPPLIER WORKSPACE</p><h1>{{ t('nav.workspace') }}</h1></div>
      <span v-if="session" class="kb-badge" :class="{ 'kb-demo': session.status !== 'verified' }">{{ session.status === 'verified' ? t('workspace.verified') : t('workspace.pending') }}</span>
    </div>
    <div v-if="!session || session.role !== 'supplier'" class="gate kb-panel">
      <h2>{{ t('workspace.supplierLogin') }}</h2>
      <p>{{ locale === 'zh' ? '登录供应商演示账号后进入工作台。' : 'Sign in with the supplier demo account to open the workspace.' }}</p>
      <NuxtLink :to="localePath('/auth/supplier')" class="kb-button">{{ t('nav.login') }}</NuxtLink>
    </div>
    <template v-else>
      <div class="dashboard-grid">
        <section class="stat-card">
          <span>{{ locale === 'zh' ? '企业' : 'Company' }}</span>
          <strong>{{ session.company }}</strong>
          <NuxtLink :to="localePath('/company')">{{ t('workspace.company') }}</NuxtLink>
        </section>
        <section class="stat-card">
          <span>{{ t('workspace.inbox') }}</span>
          <strong>{{ rfqs.length }}</strong>
          <NuxtLink :to="localePath('/inbox')">{{ locale === 'zh' ? '查看询盘' : 'Open inbox' }}</NuxtLink>
        </section>
        <section class="stat-card">
          <span>{{ t('workspace.myProducts') }}</span>
          <strong>{{ drafts.length }}</strong>
          <NuxtLink :to="localePath('/publish')">{{ t('workspace.publish') }}</NuxtLink>
        </section>
      </div>
      <div v-if="!canPublish" class="warning">
        <UIcon name="i-lucide-clock-3" aria-hidden="true" />
        <div><strong>{{ t('workspace.permissionTitle') }}</strong><p>{{ t('workspace.permissionText') }}</p></div>
        <NuxtLink :to="localePath('/company')">{{ locale === 'zh' ? '前往审核' : 'Open approval' }}</NuxtLink>
      </div>
      <section class="product-list kb-panel">
        <div class="list-head"><h2>{{ t('workspace.myProducts') }}</h2><NuxtLink :to="localePath('/publish')" class="kb-button">{{ t('workspace.publish') }}</NuxtLink></div>
        <div v-if="drafts.length">
          <article v-for="draft in drafts" :key="draft.id" class="draft-row">
            <div><span>{{ draft.id }}</span><h3>{{ draft.titleEn }}</h3><p>{{ draft.titleZh }}</p></div>
            <span>{{ draft.categorySlug }}</span>
            <span class="status">{{ draft.status }}</span>
          </article>
        </div>
        <p v-else class="empty">{{ locale === 'zh' ? '尚未保存商品草稿。' : 'No product drafts saved yet.' }}</p>
      </section>
    </template>
  </div>
</template>

<style scoped>
.page {
  padding-block: 42px 76px;
}
.head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 24px;
}
h1 {
  margin: 5px 0 0;
  font-size: clamp(38px, 5vw, 58px);
  letter-spacing: -0.04em;
}
.gate {
  padding: 42px;
  text-align: center;
}
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.stat-card {
  display: grid;
  gap: 7px;
  padding: 20px;
  background: white;
  border: 1px solid var(--kb-line);
}
.stat-card span {
  color: var(--kb-muted);
  font-size: 11px;
  text-transform: uppercase;
}
.stat-card strong {
  font-size: 24px;
}
.stat-card a {
  color: var(--kb-blue-deep);
  font-size: 12px;
  font-weight: 800;
}
.warning {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 14px;
  align-items: center;
  margin-top: 16px;
  padding: 16px;
  background: #fff3e3;
  border: 1px solid #f2c68e;
}
.warning p {
  margin: 3px 0 0;
  font-size: 12px;
}
.warning a {
  font-size: 12px;
  font-weight: 800;
  text-decoration: underline;
}
.product-list {
  margin-top: 18px;
  padding: 22px;
}
.list-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list-head h2 {
  margin: 0;
}
.draft-row {
  display: grid;
  grid-template-columns: 1fr 180px 100px;
  gap: 16px;
  align-items: center;
  padding-block: 15px;
  border-top: 1px solid var(--kb-line);
}
.draft-row > div > span {
  color: var(--kb-blue);
  font-size: 10px;
  font-weight: 800;
}
.draft-row h3 {
  margin: 3px 0;
  font-size: 15px;
}
.draft-row p {
  margin: 0;
  color: var(--kb-muted);
  font-size: 12px;
}
.status {
  padding: 4px 8px;
  background: #e9f0f3;
  font-size: 10px;
}
.empty {
  color: var(--kb-muted);
}
@media (max-width: 700px) {
  .dashboard-grid,
  .draft-row {
    grid-template-columns: 1fr;
  }
}
</style>
