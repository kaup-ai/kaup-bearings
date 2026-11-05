<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { session } = useDemoSession()
const { rfqs } = useMarketplace()
useBearingsSeo({
  title: computed(() => `${t('workspace.myRfqs')} | Kaup Bearings`),
  description: computed(() => t('rfq.description')),
  path: '/my-rfq',
  index: false,
})
</script>

<template>
  <div class="kb-container workspace">
    <div class="workspace-head">
      <div>
        <p class="kb-eyebrow">BUYER WORKSPACE</p>
        <h1>{{ t('workspace.myRfqs') }}</h1>
      </div>
      <span class="kb-badge kb-demo">{{ t('common.privatePage') }}</span>
    </div>
    <div v-if="!session || session.role !== 'buyer'" class="login-prompt kb-panel">
      <h2>{{ t('workspace.buyerLogin') }}</h2>
      <p>{{ locale === 'zh' ? '登录买家演示账号后查看本地保存的询价。' : 'Sign in with the buyer demo account to view locally saved inquiries.' }}</p>
      <NuxtLink :to="localePath('/auth/buyer')" class="kb-button">{{ t('nav.login') }}</NuxtLink>
    </div>
    <div v-else-if="rfqs.length" class="rfq-list">
      <article v-for="rfq in rfqs" :key="rfq.id" class="rfq-card">
        <div class="rfq-main">
          <div class="rfq-top">
            <span class="id">{{ rfq.id }}</span>
            <span class="status" :data-status="rfq.status">{{ rfq.status }}</span>
          </div>
          <h2>{{ rfq.designation }}</h2>
          <p>{{ rfq.dimensions }} · {{ rfq.application }}</p>
          <dl>
            <div><dt>{{ t('rfq.company') }}</dt><dd>{{ rfq.buyerCompany }}</dd></div>
            <div><dt>{{ t('rfq.quantity') }}</dt><dd>{{ rfq.quantity }}</dd></div>
            <div><dt>{{ t('rfq.terms') }}</dt><dd>{{ rfq.incoterms }}</dd></div>
          </dl>
          <p class="notes">{{ rfq.notes }}</p>
        </div>
        <div v-if="rfq.reply" class="reply">
          <p class="kb-eyebrow">{{ t('workspace.reply') }}</p>
          <p>{{ rfq.reply }}</p>
        </div>
      </article>
    </div>
    <div v-else class="login-prompt kb-panel">
      <h2>{{ t('workspace.empty') }}</h2>
      <p>{{ t('common.emptyHint') }}</p>
      <NuxtLink :to="localePath('/rfq')" class="kb-button">{{ t('nav.rfq') }}</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.workspace {
  padding-block: 42px 76px;
}
.workspace-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 28px;
}
h1 {
  margin: 5px 0 0;
  font-size: clamp(38px, 5vw, 58px);
  letter-spacing: -0.04em;
}
.login-prompt {
  padding: 40px;
  text-align: center;
}
.login-prompt p {
  color: var(--kb-muted);
}
.rfq-list {
  display: grid;
  gap: 14px;
}
.rfq-card {
  display: grid;
  grid-template-columns: 1fr 0.7fr;
  overflow: hidden;
  background: white;
  border: 1px solid var(--kb-line);
  border-radius: var(--kb-radius);
}
.rfq-main {
  padding: 22px;
}
.rfq-top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
.id {
  color: var(--kb-blue);
  font-size: 11px;
  font-weight: 800;
}
.status {
  padding: 3px 8px;
  background: #edf2f4;
  font-size: 10px;
  text-transform: uppercase;
}
.status[data-status="replied"] {
  background: #e2f5ea;
  color: #17633f;
}
h2 {
  margin: 14px 0 6px;
}
.rfq-main > p {
  color: var(--kb-muted);
  font-size: 13px;
}
dl {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}
dl div {
  display: grid;
}
dt {
  color: var(--kb-muted);
  font-size: 10px;
}
dd {
  margin: 0;
  font-weight: 700;
}
.notes {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--kb-line);
}
.reply {
  padding: 22px;
  background: #eef6f4;
  border-left: 1px solid var(--kb-line);
}
.reply p:not(.kb-eyebrow) {
  color: #285b4a;
}
@media (max-width: 720px) {
  .rfq-card {
    grid-template-columns: 1fr;
  }
}
</style>
