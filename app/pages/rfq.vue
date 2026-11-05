<script setup lang="ts">
import { products } from '#shared/data/products'
import type { Rfq } from '#shared/types/catalog'

const { t, locale } = useI18n()
const { tr } = useLocalized()
const localePath = useLocalePath()
const route = useRoute()
const { session } = useDemoSession()
const { createRfq, productToRfq, error } = useMarketplace()
const selectedProduct = computed(() => products.find((product) => product.slug === route.query.product))
const initial = selectedProduct.value ? productToRfq(selectedProduct.value) : {}
const form = reactive({
  buyerCompany: session.value?.role === 'buyer' ? session.value.company : '',
  buyerCountry: '',
  designation: initial.designation ?? '',
  dimensions: initial.dimensions ?? '',
  quantity: '',
  annualDemand: '',
  application: '',
  load: '',
  speed: '',
  precision: initial.precision ?? '',
  clearance: initial.clearance ?? '',
  sealing: initial.sealing ?? '',
  delivery: '',
  incoterms: 'FOB' as Rfq['incoterms'],
  notes: '',
})
const errors = ref<string[]>([])
const success = ref(false)

useBearingsSeo({
  title: computed(() => `${t('rfq.title')} | Kaup Bearings`),
  description: computed(() => t('rfq.description')),
  path: '/rfq',
  index: false,
})

function submit() {
  success.value = false
  const result = createRfq({
    ...form,
    quantity: Number(form.quantity),
    annualDemand: form.annualDemand ? Number(form.annualDemand) : undefined,
    load: form.load ? Number(form.load) : undefined,
    speed: form.speed ? Number(form.speed) : undefined,
    productSlug: selectedProduct.value?.slug,
  })
  errors.value = result.errors
  if (!result.ok) return
  success.value = true
  form.quantity = ''
  form.notes = ''
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div>
    <section class="rfq-head">
      <div class="kb-container">
        <p class="kb-eyebrow">RFQ / TECHNICAL SOURCING</p>
        <h1>{{ t('rfq.title') }}</h1>
        <p>{{ t('rfq.description') }}</p>
      </div>
    </section>
    <div class="kb-container form-layout">
      <form class="rfq-form kb-panel" @submit.prevent="submit">
        <div v-if="success" class="notice success" role="status">
          <UIcon name="i-lucide-check-circle-2" aria-hidden="true" />
          <div>
            <strong>{{ t('rfq.success') }}</strong>
            <NuxtLink :to="localePath('/my-rfq')">{{ locale === 'zh' ? '查看我的询价' : 'Open my inquiries' }}</NuxtLink>
          </div>
        </div>
        <div v-if="selectedProduct" class="product-context">
          <img :src="selectedProduct.image" :alt="tr(selectedProduct.title)" width="1280" height="720" >
          <div>
            <span>{{ selectedProduct.designation }}</span>
            <strong>{{ tr(selectedProduct.title) }}</strong>
          </div>
        </div>
        <h2>{{ t('rfq.general') }}</h2>
        <div class="form-grid">
          <div class="kb-field"><label for="rfq-company">{{ t('rfq.company') }} *</label><input id="rfq-company" v-model="form.buyerCompany" required autocomplete="organization" ></div>
          <div class="kb-field"><label for="rfq-country">{{ t('rfq.country') }} *</label><input id="rfq-country" v-model="form.buyerCountry" required autocomplete="country-name" ></div>
          <div class="kb-field"><label for="rfq-designation">{{ t('rfq.designation') }} *</label><input id="rfq-designation" v-model="form.designation" required ></div>
          <div class="kb-field"><label for="rfq-dimensions">{{ t('rfq.dimensions') }}</label><input id="rfq-dimensions" v-model="form.dimensions" placeholder="d × D × B" ></div>
          <div class="kb-field"><label for="rfq-quantity">{{ t('rfq.quantity') }} *</label><input id="rfq-quantity" v-model="form.quantity" required type="number" min="1" ></div>
          <div class="kb-field"><label for="rfq-annual">{{ t('rfq.annualDemand') }}</label><input id="rfq-annual" v-model="form.annualDemand" type="number" min="1" ></div>
          <div class="kb-field full"><label for="rfq-application">{{ t('rfq.application') }} *</label><input id="rfq-application" v-model="form.application" required ></div>
          <div class="kb-field"><label for="rfq-load">{{ t('rfq.load') }}</label><input id="rfq-load" v-model="form.load" type="number" min="0" step="0.1" ></div>
          <div class="kb-field"><label for="rfq-speed">{{ t('rfq.speed') }}</label><input id="rfq-speed" v-model="form.speed" type="number" min="0" ></div>
          <div class="kb-field"><label for="rfq-precision">{{ t('common.precision') }}</label><input id="rfq-precision" v-model="form.precision" placeholder="P0 / P6 / P5 / P4" ></div>
          <div class="kb-field"><label for="rfq-clearance">{{ t('common.clearance') }}</label><input id="rfq-clearance" v-model="form.clearance" placeholder="CN / C3 / C4" ></div>
          <div class="kb-field"><label for="rfq-sealing">{{ t('common.sealing') }}</label><input id="rfq-sealing" v-model="form.sealing" placeholder="2RS / 2Z / open" ></div>
          <div class="kb-field"><label for="rfq-delivery">{{ t('rfq.delivery') }}</label><input id="rfq-delivery" v-model="form.delivery" type="date" ></div>
          <div class="kb-field"><label for="rfq-terms">{{ t('rfq.terms') }}</label><select id="rfq-terms" v-model="form.incoterms"><option>EXW</option><option>FOB</option><option>CIF</option></select></div>
          <div class="kb-field full"><label for="rfq-notes">{{ t('rfq.notes') }} *</label><textarea id="rfq-notes" v-model="form.notes" required :placeholder="locale === 'zh' ? '请说明载荷方向、润滑、安装配合或特殊环境要求。' : 'Describe load direction, lubrication, mounting fit or environmental requirements.'" /></div>
          <div class="kb-field full"><label for="rfq-attachment">{{ t('rfq.attachment') }}</label><input id="rfq-attachment" type="file" accept=".pdf,.dwg,.dxf,.step,.stp,.xlsx,.csv,.png,.jpg" ><small>{{ t('rfq.attachmentHint') }}</small></div>
        </div>
        <p v-if="errors.length || error" class="error" role="alert">
          {{ error ? t('workspace.storageError') : (locale === 'zh' ? '请补全必填的采购信息。' : 'Complete the required sourcing information.') }}
        </p>
        <button type="submit" class="kb-button">{{ t('rfq.submit') }} <UIcon name="i-lucide-arrow-right" aria-hidden="true" /></button>
      </form>
      <aside>
        <div class="aside-card">
          <p class="kb-eyebrow">TECHNICAL CHECK</p>
          <h2>{{ locale === 'zh' ? '一条有效询价应包含什么？' : 'What makes an RFQ actionable?' }}</h2>
          <ul>
            <li>{{ locale === 'zh' ? '明确的型号或 d / D / B 尺寸' : 'A confirmed designation or d / D / B dimensions' }}</li>
            <li>{{ locale === 'zh' ? '精度、游隙和密封要求' : 'Precision, clearance and sealing requirements' }}</li>
            <li>{{ locale === 'zh' ? '载荷方向、转速和润滑方式' : 'Load direction, speed and lubrication' }}</li>
            <li>{{ locale === 'zh' ? '数量、年需求与目标交期' : 'Quantity, annual demand and target delivery' }}</li>
          </ul>
        </div>
        <div class="aside-note">{{ locale === 'zh' ? '此原型不会发送邮件或上传附件。询盘仅保存在当前浏览器。' : 'This prototype sends no email and uploads no files. RFQs stay in this browser only.' }}</div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.rfq-head {
  padding-block: 54px;
  background: linear-gradient(135deg, #f8fcfd, #deedf1);
  color: var(--kb-text);
  border-top: 4px solid var(--kb-blue);
  border-bottom: 1px solid var(--kb-line);
}
h1 {
  margin: 7px 0 12px;
  font-size: clamp(42px, 5vw, 64px);
  line-height: 1;
  letter-spacing: -0.045em;
}
.rfq-head p:not(.kb-eyebrow) {
  max-width: 72ch;
  color: var(--kb-muted);
}
.form-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(280px, 0.7fr);
  gap: 28px;
  padding-block: 34px 72px;
}
.rfq-form {
  padding: 28px;
}
h2 {
  margin-top: 0;
}
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px;
}
.full {
  grid-column: 1 / -1;
}
small {
  color: var(--kb-muted);
}
.product-context {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 14px;
  align-items: center;
  margin-bottom: 24px;
  padding: 10px;
  background: #eaf0f3;
}
.product-context img {
  width: 100px;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}
.product-context span {
  display: block;
  color: var(--kb-blue);
  font-size: 11px;
  font-weight: 800;
}
.product-context strong {
  font-size: 14px;
}
.notice {
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
  padding: 15px;
  background: #e5f5ec;
  color: #155b3c;
}
.notice strong,
.notice a {
  display: block;
}
.notice a {
  text-decoration: underline;
}
.error {
  color: var(--kb-danger);
}
aside {
  align-self: start;
  display: grid;
  gap: 16px;
}
.aside-card {
  padding: 24px;
  background: var(--kb-surface-blue);
  color: var(--kb-text);
  border: 1px solid var(--kb-line);
  border-radius: var(--kb-radius);
}
.aside-card h2 {
  font-size: 24px;
}
.aside-card ul {
  display: grid;
  gap: 10px;
  padding-left: 18px;
  color: var(--kb-muted);
  font-size: 13px;
}
.aside-note {
  padding: 16px;
  border: 1px solid var(--kb-line);
  color: var(--kb-muted);
  font-size: 11px;
}
@media (max-width: 850px) {
  .form-layout,
  .form-grid {
    grid-template-columns: 1fr;
  }
  .full {
    grid-column: auto;
  }
}
</style>
