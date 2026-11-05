<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { session, canReply } = useDemoSession()
const { rfqs, updateRfq, error } = useMarketplace()
const replies = reactive<Record<string, string>>({})
useBearingsSeo({
  title: computed(() => `${t('workspace.inbox')} | Kaup Bearings`),
  description: computed(() => t('rfq.description')),
  path: '/inbox',
  index: false,
})

function markViewed(id: string) {
  updateRfq(id, 'viewed')
}

function reply(id: string) {
  if (!canReply.value || !replies[id]?.trim()) return
  if (updateRfq(id, 'replied', replies[id])) replies[id] = ''
}
</script>

<template>
  <div class="kb-container workspace-page">
    <div class="workspace-head">
      <div><p class="kb-eyebrow">SUPPLIER WORKSPACE</p><h1>{{ t('workspace.inbox') }}</h1></div>
      <span v-if="session" class="kb-badge" :class="{ 'kb-demo': session.status !== 'verified' }">{{ session.status === 'verified' ? t('workspace.verified') : t('workspace.pending') }}</span>
    </div>
    <div v-if="!session || session.role !== 'supplier'" class="gate kb-panel">
      <h2>{{ t('workspace.supplierLogin') }}</h2>
      <p>{{ locale === 'zh' ? '登录供应商演示账号后查看买家询盘。' : 'Sign in with the supplier demo account to view buyer inquiries.' }}</p>
      <NuxtLink :to="localePath('/auth/supplier')" class="kb-button">{{ t('nav.login') }}</NuxtLink>
    </div>
    <template v-else>
      <div v-if="session.status !== 'verified'" class="warning" role="status">
        <UIcon name="i-lucide-shield-alert" aria-hidden="true" />
        <div><strong>{{ t('workspace.permissionTitle') }}</strong><p>{{ t('workspace.permissionText') }}</p></div>
        <NuxtLink :to="localePath('/company')">{{ locale === 'zh' ? '前往审核' : 'Open approval' }}</NuxtLink>
      </div>
      <div class="toolbar">
        <p><strong>{{ rfqs.length }}</strong> {{ locale === 'zh' ? '条询盘' : 'inquiries' }}</p>
        <NuxtLink :to="localePath('/supplier')">{{ t('workspace.myProducts') }} <UIcon name="i-lucide-arrow-right" aria-hidden="true" /></NuxtLink>
      </div>
      <div v-if="rfqs.length" class="inquiry-list">
        <article v-for="rfq in rfqs" :key="rfq.id" class="inquiry kb-panel">
          <div class="inquiry-head">
            <div>
              <span class="rfq-id">{{ rfq.id }}</span>
              <h2>{{ rfq.designation }}</h2>
              <p>{{ rfq.buyerCompany }} · {{ rfq.buyerCountry }}</p>
            </div>
            <span class="status" :data-status="rfq.status">{{ rfq.status }}</span>
          </div>
          <dl>
            <div><dt>{{ t('rfq.dimensions') }}</dt><dd>{{ rfq.dimensions || '—' }}</dd></div>
            <div><dt>{{ t('rfq.quantity') }}</dt><dd>{{ rfq.quantity }}</dd></div>
            <div><dt>{{ t('rfq.application') }}</dt><dd>{{ rfq.application }}</dd></div>
            <div><dt>{{ t('rfq.terms') }}</dt><dd>{{ rfq.incoterms }}</dd></div>
            <div><dt>{{ t('common.precision') }}</dt><dd>{{ rfq.precision || '—' }}</dd></div>
            <div><dt>{{ t('common.clearance') }}</dt><dd>{{ rfq.clearance || '—' }}</dd></div>
          </dl>
          <div class="notes"><strong>{{ t('rfq.notes') }}</strong><p>{{ rfq.notes }}</p></div>
          <div v-if="rfq.reply" class="existing-reply"><strong>{{ t('workspace.reply') }}</strong><p>{{ rfq.reply }}</p></div>
          <div class="actions">
            <button v-if="rfq.status === 'submitted'" type="button" class="kb-button secondary" @click="markViewed(rfq.id)">{{ t('workspace.markViewed') }}</button>
            <div class="reply-form">
              <label :for="`reply-${rfq.id}`" class="kb-label">{{ t('workspace.reply') }}</label>
              <textarea
                :id="`reply-${rfq.id}`"
                v-model="replies[rfq.id]"
                :disabled="!canReply"
                :placeholder="t('workspace.replyPlaceholder')"
              />
              <button type="button" class="kb-button" :disabled="!canReply || !replies[rfq.id]?.trim()" @click="reply(rfq.id)">
                {{ t('workspace.sendReply') }}
              </button>
            </div>
          </div>
        </article>
      </div>
      <div v-else class="gate kb-panel"><h2>{{ t('workspace.empty') }}</h2><p>{{ t('common.emptyHint') }}</p></div>
      <p v-if="error" class="error" role="alert">{{ t('workspace.storageError') }}</p>
    </template>
  </div>
</template>

<style scoped>
.workspace-page {
  padding-block: 42px 76px;
}
.workspace-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}
h1 {
  margin: 5px 0 0;
  font-size: clamp(38px, 5vw, 58px);
  letter-spacing: -0.04em;
}
.gate {
  padding: 44px;
  text-align: center;
}
.gate p {
  color: var(--kb-muted);
}
.warning {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 14px;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px;
  background: #fff4e6;
  border: 1px solid #f1c791;
  color: #743b00;
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
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.toolbar p {
  margin: 0;
}
.toolbar a {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 700;
}
.inquiry-list {
  display: grid;
  gap: 14px;
}
.inquiry {
  padding: 22px;
}
.inquiry-head {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
.rfq-id {
  color: var(--kb-blue);
  font-size: 10px;
  font-weight: 800;
}
.inquiry h2 {
  margin: 6px 0 2px;
  font-size: 22px;
}
.inquiry-head p {
  margin: 0;
  color: var(--kb-muted);
  font-size: 12px;
}
.status {
  align-self: start;
  padding: 3px 8px;
  background: #edf2f4;
  font-size: 10px;
  text-transform: uppercase;
}
.status[data-status="replied"] {
  background: #e1f4e8;
  color: #155c3a;
}
dl {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  margin-block: 18px;
  background: var(--kb-line);
  border: 1px solid var(--kb-line);
}
dl div {
  padding: 10px;
  background: #f7fafb;
}
dt {
  color: var(--kb-muted);
  font-size: 10px;
}
dd {
  margin: 2px 0 0;
  font-size: 12px;
  font-weight: 700;
}
.notes,
.existing-reply {
  padding: 13px;
  background: #eef3f5;
  font-size: 12px;
}
.notes p,
.existing-reply p {
  margin: 4px 0 0;
  color: #3c505b;
}
.existing-reply {
  margin-top: 10px;
  background: #e5f4ec;
}
.actions {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px;
  align-items: end;
  margin-top: 16px;
}
.reply-form {
  display: grid;
  gap: 6px;
}
.reply-form textarea {
  min-height: 80px;
  width: 100%;
  border: 1px solid var(--kb-line);
  padding: 10px;
}
.reply-form button {
  justify-self: end;
}
.error {
  color: var(--kb-danger);
}
@media (max-width: 700px) {
  .actions {
    grid-template-columns: 1fr;
  }
  dl {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
