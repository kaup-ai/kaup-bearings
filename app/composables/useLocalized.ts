import type { LocalizedText } from '#shared/types/catalog'

export function useLocalized() {
  const { locale } = useI18n()
  const isZh = computed(() => locale.value === 'zh')
  const tr = (value: LocalizedText) => value[isZh.value ? 'zh' : 'en']
  return { locale, isZh, tr }
}
