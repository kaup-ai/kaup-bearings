import assert from 'node:assert/strict'
import test from 'node:test'
import {
  absoluteUrl,
  buildSitemapPaths,
  sitePath,
} from '../shared/utils/seo.ts'

test('English paths stay at root and Chinese paths use /zh', () => {
  assert.equal(sitePath('en', '/'), '/')
  assert.equal(sitePath('zh', '/'), '/zh')
  assert.equal(sitePath('en', '/bearings/ball-bearings'), '/bearings/ball-bearings')
  assert.equal(sitePath('zh', '/bearings/ball-bearings'), '/zh/bearings/ball-bearings')
})

test('canonical URLs use the confirmed domain', () => {
  assert.equal(
    absoluteUrl('https://kaupbearings.com/', 'en', '/knowledge'),
    'https://kaupbearings.com/knowledge',
  )
})

test('sitemap excludes private, product, supplier and demo editorial routes', () => {
  const paths = buildSitemapPaths(['ball-bearings'], ['designation'])
  assert.deepEqual(paths, [
    '/',
    '/bearings/ball-bearings',
    '/knowledge',
    '/knowledge/designation',
    '/zh',
    '/zh/bearings/ball-bearings',
    '/zh/knowledge',
    '/zh/knowledge/designation',
  ])
  assert.equal(paths.some((path) => /products|suppliers|news|auth|rfq|inbox/.test(path)), false)
})
