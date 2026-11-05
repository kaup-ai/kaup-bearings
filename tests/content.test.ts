import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'

const files = readdirSync('content/knowledge').filter((file) => file.endsWith('.md'))

test('technical centre ships seven bilingual guides', () => {
  assert.equal(files.length, 14)
  const english = files.filter((file) => file.endsWith('.en.md'))
  const chinese = files.filter((file) => file.endsWith('.zh.md'))
  assert.equal(english.length, 7)
  assert.equal(chinese.length, 7)
})

test('each technical guide contains SEO metadata and a professional body', () => {
  for (const file of files) {
    const source = readFileSync(`content/knowledge/${file}`, 'utf8')
    assert.match(source, /^---\n/)
    assert.match(source, /title: /)
    assert.match(source, /description: /)
    assert.match(source, /translationKey: /)
    assert.ok(source.length > 300, `${file} is too short`)
  }
})
