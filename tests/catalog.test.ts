import assert from 'node:assert/strict'
import test from 'node:test'
import type { Product } from '../shared/types/catalog.ts'
import {
  advanceInquiryStatus,
  filterProducts,
  formatBearingDimensions,
  sortProducts,
  validateRfq,
} from '../shared/utils/catalog.ts'

const products: Product[] = [
  {
    id: 'p1',
    slug: '6205-2rs-c3',
    designation: '6205-2RS/C3',
    title: { en: '6205 Deep Groove Ball Bearing', zh: '6205 深沟球轴承' },
    description: { en: 'Sealed bearing', zh: '密封深沟球轴承' },
    categorySlug: 'ball-bearings',
    subcategorySlug: 'deep-groove-ball-bearings',
    dimensions: { d: 25, D: 52, B: 15 },
    parameters: {
      precision: 'P0',
      clearance: 'C3',
      sealing: '2RS',
      cage: 'steel',
      material: 'bearing-steel',
    },
    standards: ['ISO 15'],
    certifications: ['ISO 9001'],
    applications: ['electric-motor'],
    supplierSlug: 'supplier-a',
    image: '/images/products/6205.png',
    price: { min: 4, max: 6, currency: 'USD' },
    demo: true,
  },
  {
    id: 'p2',
    slug: '32012-x',
    designation: '32012 X',
    title: { en: '32012 X Tapered Roller Bearing', zh: '32012 X 圆锥滚子轴承' },
    description: { en: 'Metric tapered roller bearing', zh: '公制圆锥滚子轴承' },
    categorySlug: 'roller-bearings',
    subcategorySlug: 'tapered-roller-bearings',
    dimensions: { d: 60, D: 95, T: 23 },
    parameters: {
      precision: 'P6',
      clearance: 'CN',
      sealing: 'open',
      cage: 'brass',
      material: 'bearing-steel',
    },
    standards: ['ISO 355'],
    certifications: ['IATF 16949'],
    applications: ['gearbox'],
    supplierSlug: 'supplier-b',
    image: '/images/products/32012.png',
    price: { min: 22, max: 28, currency: 'USD' },
    demo: true,
  },
]

test('empty filters preserve all products', () => {
  assert.deepEqual(filterProducts(products, {}), products)
})

test('dimension boundaries are inclusive', () => {
  assert.deepEqual(
    filterProducts(products, {
      dimensions: { d: { min: 25, max: 25 }, D: { min: 52, max: 52 } },
    }).map((product) => product.designation),
    ['6205-2RS/C3'],
  )
})

test('missing dimensions fail active ranges', () => {
  const incomplete = { ...products[0], dimensions: {} }
  assert.equal(
    filterProducts([incomplete], { dimensions: { d: { min: 20 } } }).length,
    0,
  )
})

test('search and cert filters are usable together', () => {
  assert.deepEqual(
    filterProducts(products, {
      query: '32012 x',
      certifications: ['missing', 'IATF 16949'],
    }).map((product) => product.designation),
    ['32012 X'],
  )
})

test('sorting does not mutate input', () => {
  const snapshot = structuredClone(products)
  assert.deepEqual(
    sortProducts(products, 'price-asc').map((product) => product.designation),
    ['6205-2RS/C3', '32012 X'],
  )
  assert.deepEqual(products, snapshot)
})

test('dimensions and RFQ validation format correctly', () => {
  assert.equal(formatBearingDimensions(products[0]), '25 × 52 × 15 mm')
  assert.deepEqual(validateRfq({ buyerCompany: '', quantity: 2 }), [
    'buyerCompany',
    'buyerCountry',
    'designation',
    'application',
    'notes',
  ])
})

test('inquiry status never downgrades from replied', () => {
  const replied = {
    id: 'r1',
    buyerCompany: 'Demo',
    buyerCountry: 'Germany',
    designation: '6205',
    dimensions: '25 × 52 × 15 mm',
    quantity: 10,
    application: 'Motor',
    incoterms: 'FOB' as const,
    notes: 'Demo',
    status: 'replied' as const,
    createdAt: '2026-11-05T00:00:00.000Z',
    reply: 'Quoted',
  }
  assert.deepEqual(advanceInquiryStatus(replied, 'viewed'), replied)
})
