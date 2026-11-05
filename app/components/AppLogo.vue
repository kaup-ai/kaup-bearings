<template>
  <span class="logo-lockup" aria-label="Kaup Bearings · 北轴汇">
    <svg viewBox="0 0 54 54" role="img" aria-hidden="true">
      <rect width="54" height="54" rx="9" fill="currentColor" />
      <circle cx="27" cy="27" r="15" fill="none" stroke="#9bb2bf" stroke-width="4" />
      <circle cx="27" cy="27" r="6" fill="var(--kb-orange)" />
      <path d="M8 27h6M40 27h6M27 8v6M27 40v6" stroke="#f1f6f8" stroke-width="3" stroke-linecap="round" />
    </svg>
    <span>
      <strong>KAUP BEARINGS</strong>
      <small>北轴汇 · BEARING SOURCING</small>
    </span>
  </span>
</template>

<style scoped>
.logo-lockup {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  color: var(--kb-graphite);
}
svg {
  width: 42px;
  height: 42px;
  flex: none;
}
strong {
  display: block;
  font-size: 18px;
  line-height: 1.05;
  letter-spacing: 0.045em;
}
small {
  display: block;
  margin-top: 5px;
  color: var(--kb-muted);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.11em;
}
</style>
