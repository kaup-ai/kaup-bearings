<script setup lang="ts">
const props = defineProps<{ role: 'buyer' | 'supplier' }>()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { login, register, error } = useDemoSession()
const mode = ref<'login' | 'register'>('login')
const company = ref('')
const email = ref(props.role === 'buyer' ? 'buyer@kaupbearings.demo' : 'supplier@kaupbearings.demo')
const password = ref('Demo123!')
const message = ref('')
const busy = ref(false)

async function submit() {
  busy.value = true
  message.value = ''
  const success = mode.value === 'login'
    ? login(props.role, email.value, password.value)
    : register(props.role, company.value, email.value)
  busy.value = false
  if (!success) {
    message.value = error.value ? t('workspace.storageError') : (locale.value === 'zh' ? '演示账号或登录信息不正确。' : 'Demo account or sign-in information is incorrect.')
    return
  }
  await navigateTo(localePath(props.role === 'buyer' ? '/my-rfq' : '/supplier'))
}

function fillDemo() {
  email.value = props.role === 'buyer' ? 'buyer@kaupbearings.demo' : 'supplier@kaupbearings.demo'
  password.value = 'Demo123!'
  mode.value = 'login'
}
</script>

<template>
  <section class="auth-shell">
    <div class="kb-container auth-grid">
      <div class="auth-copy">
        <p class="kb-eyebrow">{{ role === 'buyer' ? 'BUYER WORKSPACE' : 'SUPPLIER WORKSPACE' }}</p>
        <h1>{{ role === 'buyer' ? t('workspace.buyerLogin') : t('workspace.supplierLogin') }}</h1>
        <p>{{ role === 'buyer'
          ? (locale === 'zh' ? '集中查看轴承询价、供应商回复和采购进度。' : 'Track bearing RFQs, supplier replies and sourcing progress in one place.')
          : (locale === 'zh' ? '维护企业资料、发布轴承商品并处理采购询价。' : 'Maintain company capability, publish bearings and manage buyer inquiries.')
        }}</p>
        <div class="auth-note">
          <strong>{{ locale === 'zh' ? '演示账号' : 'Demo credentials' }}</strong>
          <code>{{ role }}@kaupbearings.demo</code>
          <code>Demo123!</code>
          <span>{{ locale === 'zh' ? '仅用于本地演示，不构成真实认证。' : 'Local demo only. This is not real authentication.' }}</span>
        </div>
      </div>
      <div class="auth-card kb-panel">
        <div class="mode-switch">
          <button type="button" :class="{ active: mode === 'login' }" @click="mode = 'login'">{{ t('nav.login') }}</button>
          <button type="button" :class="{ active: mode === 'register' }" @click="mode = 'register'">{{ t('workspace.register') }}</button>
        </div>
        <form @submit.prevent="submit">
          <div v-if="mode === 'register'" class="kb-field">
            <label for="auth-company">{{ locale === 'zh' ? '企业名称' : 'Company name' }}</label>
            <input id="auth-company" v-model="company" required autocomplete="organization" >
          </div>
          <div class="kb-field">
            <label for="auth-email">{{ t('workspace.email') }}</label>
            <input id="auth-email" v-model="email" required type="email" autocomplete="username" >
          </div>
          <div class="kb-field">
            <label for="auth-password">{{ t('workspace.password') }}</label>
            <input id="auth-password" v-model="password" required type="password" autocomplete="current-password" >
          </div>
          <p v-if="message" class="error" role="alert">{{ message }}</p>
          <button type="submit" class="kb-button submit" :disabled="busy">
            {{ busy ? (locale === 'zh' ? '处理中…' : 'Working…') : (mode === 'login' ? t('nav.login') : t('workspace.register')) }}
          </button>
          <button type="button" class="kb-button secondary submit" @click="fillDemo">
            {{ role === 'buyer' ? t('workspace.demoBuyer') : t('workspace.demoSupplier') }}
          </button>
        </form>
        <p v-if="role === 'supplier' && mode === 'register'" class="register-hint">
          {{ locale === 'zh' ? '新供应商将以“待审核”状态进入工作台。' : 'New suppliers enter the workspace with pending-review status.' }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.auth-shell {
  padding-block: 58px 82px;
  background: linear-gradient(135deg, #f8fcfd, #deedf1);
  color: var(--kb-text);
  border-top: 4px solid var(--kb-blue);
  border-bottom: 1px solid var(--kb-line);
}
.auth-grid {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  gap: 72px;
  align-items: center;
}
h1 {
  margin: 8px 0 16px;
  font-size: clamp(42px, 5vw, 68px);
  line-height: 1;
  letter-spacing: -0.045em;
}
.auth-copy > p:not(.kb-eyebrow) {
  max-width: 56ch;
  color: var(--kb-muted);
}
.auth-note {
  display: grid;
  gap: 5px;
  max-width: 410px;
  margin-top: 32px;
  padding: 18px;
  border: 1px solid var(--kb-line);
  background: rgb(255 255 255 / 58%);
}
.auth-note span {
  margin-top: 7px;
  color: var(--kb-muted);
  font-size: 11px;
}
code {
  color: var(--kb-blue-deep);
}
.auth-card {
  padding: 24px;
  color: var(--kb-text);
}
.mode-switch {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  margin-bottom: 20px;
  padding: 4px;
  background: #e7edf0;
}
.mode-switch button {
  min-height: 42px;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-weight: 700;
}
.mode-switch button.active {
  background: white;
  color: var(--kb-blue-deep);
}
form {
  display: grid;
  gap: 14px;
}
.submit {
  width: 100%;
}
.error {
  color: var(--kb-danger);
  font-size: 13px;
}
.register-hint {
  margin: 16px 0 0;
  color: var(--kb-muted);
  font-size: 11px;
}
@media (max-width: 800px) {
  .auth-grid {
    grid-template-columns: 1fr;
    gap: 34px;
  }
}
</style>
