<script setup lang="ts">
const { t } = useI18n()
useBearingsSeo({
  title: computed(() => `${t('workspace.supplierLogin')} | Kaup Bearings`),
  description: computed(() => t('suppliers.description')),
  path: '/auth/supplier',
  index: false,
})
</script>

<template>
  <AuthPanel role="supplier" />
</template>
