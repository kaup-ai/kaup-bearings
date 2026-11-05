import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'
import { categories } from '../shared/data/taxonomy.ts'
import { products } from '../shared/data/products.ts'
import { suppliers } from '../shared/data/suppliers.ts'
import { applications } from '../shared/data/editorial.ts'

const homepageHeroImages = [
  '/images/hero/packing.webp',
  '/images/hero/port-loading.webp',
  '/images/hero/voyage.webp',
]

test('all category and product image references exist', () => {
  for (const file of [
    ...categories.map((category) => category.image),
    ...products.map((product) => product.image),
    ...suppliers.map((supplier) => supplier.image),
    ...applications.map((application) => application.image),
    ...homepageHeroImages,
    '/og-kaup-bearings.png',
    '/images/scenes/hero.webp',
    '/images/scenes/inspection.webp',
    '/images/scenes/assembly.webp',
    '/images/scenes/exhibition.webp',
    '/images/scenes/wind.webp',
    '/images/scenes/knowledge-selection.webp',
  ]) {
    assert.ok(existsSync(`public${file}`), file)
  }
})

test('generated image inventory meets the requested minimum', () => {
  assert.equal(products.length, 32)
  assert.equal(categories.length, 8)
  assert.equal(applications.length, 7)
  assert.equal(suppliers.length, 12)
})

test('semantically distinct application and supplier images are unique', () => {
  const images = [
    ...applications.map((application) => application.image),
    ...suppliers.map((supplier) => supplier.image),
  ]
  const hashes = images.map((file) =>
    createHash('sha256').update(readFileSync(`public${file}`)).digest('hex'),
  )
  assert.equal(new Set(hashes).size, images.length)
})

test('homepage export hero uses three distinct images', () => {
  assert.equal(homepageHeroImages.length, 3)
  const hashes = homepageHeroImages.map((file) =>
    createHash('sha256').update(readFileSync(`public${file}`)).digest('hex'),
  )
  assert.equal(new Set(hashes).size, homepageHeroImages.length)
})
