<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <nav class="locale-switch" aria-label="Language">
    <NuxtLink
      :to="switchLocalePath('en') || '/'"
      :aria-current="locale === 'en' ? 'page' : undefined"
      :class="{ active: locale === 'en' }"
    >EN</NuxtLink>
    <NuxtLink
      :to="switchLocalePath('zh') || '/zh'"
      :aria-current="locale === 'zh' ? 'page' : undefined"
      :class="{ active: locale === 'zh' }"
    >中文</NuxtLink>
  </nav>
</template>

<style scoped>
.locale-switch {
  display: inline-flex;
  border: 1px solid #3a4852;
  border-radius: 4px;
  overflow: hidden;
}
a {
  display: grid;
  min-width: 44px;
  min-height: 38px;
  place-items: center;
  color: #c6d4dc;
  font-size: 12px;
  font-weight: 700;
}
a.active {
  background: #f0f5f7;
  color: var(--kb-graphite);
}
</style>
