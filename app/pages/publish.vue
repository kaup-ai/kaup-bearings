<script setup lang="ts">
import { categories } from '#shared/data/taxonomy'

const { t, locale } = useI18n()
const { tr } = useLocalized()
const localePath = useLocalePath()
const { session, canPublish } = useDemoSession()
const { saveDraft, drafts, error } = useMarketplace()
const form = reactive({
  titleEn: '',
  titleZh: '',
  categorySlug: '',
  designation: '',
  d: '',
  D: '',
  B: '',
  precision: 'P0',
  clearance: 'CN',
  sealing: '2RS',
  certification: 'ISO 9001',
  price: '',
})
const message = ref('')
const saved = ref(false)
const imageName = ref('')
useBearingsSeo({
  title: computed(() => `${t('workspace.publish')} | Kaup Bearings`),
  description: computed(() => t('suppliers.description')),
  path: '/publish',
  index: false,
})

function persist(status: 'draft' | 'submitted') {
  saved.value = false
  if (!form.titleEn.trim() || !form.titleZh.trim() || !form.categorySlug || !form.designation.trim()) {
    message.value = locale.value === 'zh' ? '请填写中英文标题、轴承分类和型号。' : 'Complete both titles, bearing category and designation.'
    return
  }
  if (status === 'submitted' && !canPublish.value) {
    message.value = t('workspace.permissionText')
    return
  }
  const ok = saveDraft({
    titleEn: form.titleEn,
    titleZh: form.titleZh,
    categorySlug: form.categorySlug,
    designation: form.designation,
    dimensions: [form.d, form.D, form.B].filter(Boolean).join(' × '),
    precision: form.precision,
    imageName: imageName.value,
    status,
  })
  if (!ok) {
    message.value = t('workspace.storageError')
    return
  }
  saved.value = true
  message.value = status === 'submitted' ? (locale.value === 'zh' ? '演示商品已提交到本地工作台。' : 'Demo product submitted to the local workspace.') : (locale.value === 'zh' ? '草稿已保存。' : 'Draft saved.')
}

watch(
  () => drafts.value.length,
  () => {
    if (form.titleEn || !drafts.value[0]) return
    const draft = drafts.value[0]
    form.titleEn = draft.titleEn
    form.titleZh = draft.titleZh
    form.categorySlug = draft.categorySlug
    form.designation = draft.designation
    form.precision = draft.precision
    imageName.value = draft.imageName ?? ''
  },
)
</script>

<template>
  <div class="kb-container page">
    <div class="head">
      <div><p class="kb-eyebrow">SUPPLIER WORKSPACE</p><h1>{{ t('workspace.publish') }}</h1></div>
      <span v-if="session" class="kb-badge" :class="{ 'kb-demo': session.status !== 'verified' }">{{ session.status === 'verified' ? t('workspace.verified') : t('workspace.pending') }}</span>
    </div>
    <div v-if="!session || session.role !== 'supplier'" class="gate kb-panel">
      <h2>{{ t('workspace.supplierLogin') }}</h2>
      <p>{{ t('workspace.permissionText') }}</p>
      <NuxtLink :to="localePath('/auth/supplier')" class="kb-button">{{ t('nav.login') }}</NuxtLink>
    </div>
    <template v-else>
      <div v-if="session.status !== 'verified'" class="warning">
        <UIcon name="i-lucide-lock-keyhole" aria-hidden="true" />
        <div><strong>{{ t('workspace.permissionTitle') }}</strong><p>{{ t('workspace.permissionText') }}</p></div>
        <NuxtLink :to="localePath('/company')">{{ locale === 'zh' ? '完成模拟审核' : 'Complete demo approval' }}</NuxtLink>
      </div>
      <form class="publish-form kb-panel" @submit.prevent="persist('submitted')">
        <section>
          <h2>{{ locale === 'zh' ? '商品基本信息' : 'Product information' }}</h2>
          <div class="form-grid">
            <div class="kb-field"><label for="publish-category">{{ locale === 'zh' ? '轴承分类' : 'Bearing category' }} *</label><select id="publish-category" v-model="form.categorySlug" required><option value="" disabled>{{ locale === 'zh' ? '请选择' : 'Select' }}</option><option v-for="category in categories" :key="category.slug" :value="category.slug">{{ tr(category.title) }}</option></select></div>
            <div class="kb-field"><label for="publish-designation">{{ t('rfq.designation') }} *</label><input id="publish-designation" v-model="form.designation" required placeholder="6205-2RS/C3" ></div>
            <div class="kb-field"><label for="publish-title-en">English title *</label><input id="publish-title-en" v-model="form.titleEn" required ></div>
            <div class="kb-field"><label for="publish-title-zh">中文标题 *</label><input id="publish-title-zh" v-model="form.titleZh" required ></div>
          </div>
        </section>
        <section>
          <h2>{{ locale === 'zh' ? '技术参数' : 'Technical parameters' }}</h2>
          <div class="form-grid four">
            <div class="kb-field"><label for="publish-d">d（mm）</label><input id="publish-d" v-model="form.d" type="number" min="0" step="0.01" ></div>
            <div class="kb-field"><label for="publish-D">D（mm）</label><input id="publish-D" v-model="form.D" type="number" min="0" step="0.01" ></div>
            <div class="kb-field"><label for="publish-B">B/T（mm）</label><input id="publish-B" v-model="form.B" type="number" min="0" step="0.01" ></div>
            <div class="kb-field"><label for="publish-precision">{{ t('common.precision') }}</label><select id="publish-precision" v-model="form.precision"><option>P0</option><option>P6</option><option>P5</option><option>P4</option><option>P2</option></select></div>
            <div class="kb-field"><label for="publish-clearance">{{ t('common.clearance') }}</label><select id="publish-clearance" v-model="form.clearance"><option>CN</option><option>C3</option><option>C4</option><option>C2</option></select></div>
            <div class="kb-field"><label for="publish-sealing">{{ t('common.sealing') }}</label><select id="publish-sealing" v-model="form.sealing"><option>2RS</option><option>2Z</option><option>open</option><option>sealed</option></select></div>
            <div class="kb-field"><label for="publish-price">{{ locale === 'zh' ? '参考价格（USD）' : 'Reference price (USD)' }}</label><input id="publish-price" v-model="form.price" type="number" min="0" step="0.01" ></div>
            <div class="kb-field"><label for="publish-cert">{{ t('common.certifications') }}</label><input id="publish-cert" v-model="form.certification" ></div>
          </div>
        </section>
        <section>
          <h2>{{ locale === 'zh' ? '图片与说明' : 'Image and description' }}</h2>
          <div class="kb-field"><label for="publish-image">{{ locale === 'zh' ? '商品图片' : 'Product image' }}</label><input id="publish-image" type="file" accept="image/png,image/jpeg,image/webp" @change="imageName = ($event.target as HTMLInputElement).files?.[0]?.name || ''" ><small>{{ imageName || (locale === 'zh' ? '原型仅显示文件名，不上传文件。' : 'Prototype shows the filename only. No file is uploaded.') }}</small></div>
          <div class="kb-field"><label for="publish-notes">{{ locale === 'zh' ? '技术与包装说明' : 'Technical and packing notes' }}</label><textarea id="publish-notes" /></div>
        </section>
        <p v-if="message" class="message" :class="{ success: saved, error: error || !saved }" role="status">{{ message }}</p>
        <div class="actions">
          <button type="button" class="kb-button secondary" @click="persist('draft')">{{ locale === 'zh' ? '保存草稿' : 'Save draft' }}</button>
          <button type="submit" class="kb-button" :disabled="!canPublish">{{ locale === 'zh' ? '提交演示商品' : 'Submit demo product' }}</button>
        </div>
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
.warning {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 14px;
  align-items: center;
  margin-bottom: 16px;
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
.publish-form {
  padding: 26px;
}
.publish-form section + section {
  margin-top: 30px;
  padding-top: 24px;
  border-top: 1px solid var(--kb-line);
}
h2 {
  font-size: 22px;
}
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
.form-grid.four {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
small {
  color: var(--kb-muted);
}
.message {
  margin-top: 20px;
  padding: 12px;
  font-size: 13px;
}
.message.success {
  background: #e7f5ed;
  color: #185b3c;
}
.message.error {
  background: #ffebe9;
  color: var(--kb-danger);
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 22px;
}
@media (max-width: 800px) {
  .form-grid,
  .form-grid.four {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 520px) {
  .form-grid,
  .form-grid.four {
    grid-template-columns: 1fr;
  }
}
</style>
