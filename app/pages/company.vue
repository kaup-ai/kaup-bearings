<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { session, updateStatus } = useDemoSession()
const { profile, saveProfile, error } = useMarketplace()
const form = reactive({ ...profile.value })
const message = ref('')
useBearingsSeo({
  title: computed(() => `${t('workspace.company')} | Kaup Bearings`),
  description: computed(() => t('suppliers.description')),
  path: '/company',
  index: false,
})

function approve() {
  if (updateStatus('verified')) message.value = t('workspace.verified')
  else message.value = t('workspace.storageError')
}

function save() {
  if (saveProfile({ ...form })) message.value = t('workspace.saved')
  else message.value = t('workspace.storageError')
}
</script>

<template>
  <div class="kb-container page">
    <div class="head">
      <div><p class="kb-eyebrow">SUPPLIER WORKSPACE</p><h1>{{ t('workspace.company') }}</h1></div>
      <span v-if="session" class="kb-badge" :class="{ 'kb-demo': session.status !== 'verified' }">{{ session.status === 'verified' ? t('workspace.verified') : t('workspace.pending') }}</span>
    </div>
    <div v-if="!session || session.role !== 'supplier'" class="gate kb-panel">
      <h2>{{ t('workspace.supplierLogin') }}</h2>
      <p>{{ locale === 'zh' ? '登录供应商账号后维护企业能力资料。' : 'Sign in as a supplier to maintain company capability information.' }}</p>
      <NuxtLink :to="localePath('/auth/supplier')" class="kb-button">{{ t('nav.login') }}</NuxtLink>
    </div>
    <template v-else>
      <div v-if="session.status !== 'verified'" class="approval">
        <div>
          <p class="kb-eyebrow">SIMULATED REVIEW</p>
          <h2>{{ t('workspace.permissionTitle') }}</h2>
          <p>{{ t('workspace.permissionText') }}</p>
        </div>
        <button type="button" class="kb-button" @click="approve">{{ t('workspace.simulateApproval') }}</button>
      </div>
      <form class="profile-form kb-panel" @submit.prevent="save">
        <h2>{{ locale === 'zh' ? '企业资料与制造能力' : 'Company and manufacturing capability' }}</h2>
        <div class="form-grid">
          <div class="kb-field"><label for="company-name">{{ locale === 'zh' ? '企业名称' : 'Company name' }}</label><input id="company-name" v-model="form.company" required ></div>
          <div class="kb-field"><label for="company-contact">{{ locale === 'zh' ? '联系人' : 'Contact' }}</label><input id="company-contact" v-model="form.contact" required ></div>
          <div class="kb-field"><label for="company-phone">{{ locale === 'zh' ? '电话' : 'Phone' }}</label><input id="company-phone" v-model="form.phone" type="tel" ></div>
          <div class="kb-field full"><label for="company-capability">{{ locale === 'zh' ? '制造与检验能力' : 'Manufacturing and inspection capability' }}</label><textarea id="company-capability" v-model="form.capabilities" /></div>
        </div>
        <p v-if="message" class="message" role="status">{{ error ? t('workspace.storageError') : message }}</p>
        <button type="submit" class="kb-button">{{ t('common.save') }}</button>
      </form>
    </template>
  </div>
</template>

<style scoped>
.page {
  max-width: 1040px;
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
.approval {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 18px;
  padding: 22px;
  background: #fff3e3;
  border: 1px solid #f2c68e;
}
.approval h2 {
  margin: 5px 0;
}
.approval p:not(.kb-eyebrow) {
  max-width: 70ch;
  margin: 0;
  color: #75513a;
  font-size: 13px;
}
.profile-form {
  padding: 26px;
}
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
.full {
  grid-column: 1 / -1;
}
.message {
  color: var(--kb-success);
}
@media (max-width: 700px) {
  .approval,
  .form-grid {
    grid-template-columns: 1fr;
  }
  .approval {
    align-items: flex-start;
    flex-direction: column;
  }
  .full {
    grid-column: auto;
  }
}
</style>
