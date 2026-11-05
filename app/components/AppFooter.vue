<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <footer class="site-footer">
    <div class="kb-container footer-main">
      <div>
        <AppLogo />
        <p>{{ t('footer.notice') }}</p>
      </div>
      <div class="footer-links">
        <div>
          <h2>{{ t('footer.platform') }}</h2>
          <NuxtLink :to="localePath('/products')">{{ t('nav.catalog') }}</NuxtLink>
          <NuxtLink :to="localePath('/suppliers')">{{ t('nav.suppliers') }}</NuxtLink>
          <NuxtLink :to="localePath('/rfq')">{{ t('nav.rfq') }}</NuxtLink>
        </div>
        <div>
          <h2>{{ t('footer.resources') }}</h2>
          <NuxtLink :to="localePath('/knowledge')">{{ t('nav.knowledge') }}</NuxtLink>
          <NuxtLink :to="localePath('/news')">{{ t('nav.news') }}</NuxtLink>
          <NuxtLink :to="localePath('/exhibitions')">{{ t('nav.exhibitions') }}</NuxtLink>
        </div>
      </div>
    </div>
    <div class="kb-container footer-bottom">
      <span>{{ t('footer.copyright') }}</span>
      <span>kaupbearings.com</span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: 64px;
  background: var(--kb-graphite);
  color: #d6e2e7;
  border-top: 3px solid var(--kb-blue);
}
.footer-main {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 70px;
  padding-block: 56px;
}
.footer-main :deep(.logo-lockup) {
  color: white;
}
.footer-main :deep(.logo-lockup small) {
  color: #9fb4be;
}
.footer-main > div > p {
  max-width: 60ch;
  color: #a9bdc5;
  margin-top: 22px;
  font-size: 13px;
}
.footer-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}
h2 {
  color: white;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.footer-links a {
  display: block;
  min-height: 36px;
  color: #bfd0d7;
  font-size: 13px;
}
.footer-bottom {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding-block: 18px;
  border-top: 1px solid #38505d;
  color: #9db1ba;
  font-size: 11px;
}
@media (max-width: 760px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: 34px;
  }
}
</style>
