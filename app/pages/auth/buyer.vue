<script setup lang="ts">
const { t } = useI18n()
useBearingsSeo({
  title: computed(() => `${t('workspace.buyerLogin')} | Kaup Bearings`),
  description: computed(() => t('home.description')),
  path: '/auth/buyer',
  index: false,
})
</script>

<template>
  <AuthPanel role="buyer" />
</template>
