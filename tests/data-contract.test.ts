import assert from 'node:assert/strict'
import test from 'node:test'
import { categories } from '../shared/data/taxonomy.ts'
import { products } from '../shared/data/products.ts'
import { suppliers } from '../shared/data/suppliers.ts'
import { knowledgeTopics } from '../shared/data/knowledge.ts'

test('taxonomy contains eight unique bearing families', () => {
  assert.equal(categories.length, 8)
  assert.equal(new Set(categories.map((category) => category.slug)).size, 8)
  assert.ok(categories.every((category) => category.subcategories.length >= 3))
})

test('catalogue contains 32 products and four per family', () => {
  assert.equal(products.length, 32)
  for (const category of categories) {
    assert.equal(
      products.filter((product) => product.categorySlug === category.slug).length,
      4,
      category.slug,
    )
  }
})

test('supplier and category references are valid', () => {
  const supplierSlugs = new Set(suppliers.map((supplier) => supplier.slug))
  const categorySlugs = new Set(categories.map((category) => category.slug))
  const subcategories = new Set(
    categories.flatMap((category) =>
      category.subcategories.map((subcategory) => `${category.slug}/${subcategory.slug}`),
    ),
  )
  assert.equal(suppliers.length, 12)
  for (const product of products) {
    assert.ok(supplierSlugs.has(product.supplierSlug), product.slug)
    assert.ok(categorySlugs.has(product.categorySlug), product.slug)
    assert.ok(subcategories.has(`${product.categorySlug}/${product.subcategorySlug}`), product.slug)
    assert.ok(product.image.startsWith('/images/products/'))
    assert.equal(product.demo, true)
  }
})

test('technical topics cover the required engineering subjects', () => {
  assert.equal(knowledgeTopics.length, 7)
  assert.deepEqual(
    knowledgeTopics.map((topic) => topic.slug),
    [
      'bearing-designation-system',
      'precision-grades-iso-abec',
      'internal-clearance-cn-c3',
      'seals-versus-shields',
      'cage-material-selection',
      'mounting-fits-and-preload',
      'bearing-failure-analysis',
    ],
  )
})
