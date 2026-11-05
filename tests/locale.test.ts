import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

function flatten(value: unknown, prefix = ''): string[] {
  if (!value || typeof value !== 'object') return [prefix]
  return Object.entries(value as Record<string, unknown>)
    .flatMap(([key, child]) => flatten(child, prefix ? `${prefix}.${key}` : key))
    .sort()
}

const en = JSON.parse(readFileSync('i18n/locales/en.json', 'utf8'))
const zh = JSON.parse(readFileSync('i18n/locales/zh.json', 'utf8'))

test('English and Chinese locale keys are identical', () => {
  assert.deepEqual(flatten(en), flatten(zh))
})

test('locale files include the confirmed brand names', () => {
  assert.equal(en.brand, 'Kaup Bearings')
  assert.equal(zh.brand, 'Kaup Bearings')
  assert.equal(zh.brandCn, '北轴汇')
})
