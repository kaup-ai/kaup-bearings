import type {
  DimensionKey,
  Product,
  ProductFilter,
  Rfq,
} from '../types/catalog.ts'

const hasRangeValue = (range: { min?: number; max?: number }) =>
  range.min !== undefined || range.max !== undefined

function matchesDimension(
  value: number | undefined,
  range: { min?: number; max?: number },
): boolean {
  if (value === undefined) return false
  if (range.min !== undefined && value < range.min) return false
  if (range.max !== undefined && value > range.max) return false
  return true
}

export function formatBearingDimensions(product: Product): string {
  const width = product.dimensions.B ?? product.dimensions.T
  const parts = [product.dimensions.d, product.dimensions.D, width].filter(
    (value): value is number => value !== undefined,
  )
  return `${parts.join(' × ')} mm`
}

export function productSearchText(product: Product): string {
  return [
    product.designation,
    product.title.en,
    product.title.zh,
    product.description.en,
    product.description.zh,
    ...product.standards,
    ...Object.values(product.dimensions),
  ]
    .join(' ')
    .toLocaleLowerCase()
}

export function filterProducts(
  products: Product[],
  filter: ProductFilter,
): Product[] {
  const query = filter.query?.trim().toLocaleLowerCase()
  return products.filter((product) => {
    if (filter.category && product.categorySlug !== filter.category) return false
    if (filter.subcategory && product.subcategorySlug !== filter.subcategory) {
      return false
    }
    if (filter.supplier && product.supplierSlug !== filter.supplier) return false
    if (query && !productSearchText(product).includes(query)) return false
    if (filter.precision && product.parameters.precision !== filter.precision) {
      return false
    }
    if (filter.clearance && product.parameters.clearance !== filter.clearance) {
      return false
    }
    if (filter.sealing && product.parameters.sealing !== filter.sealing) {
      return false
    }
    if (filter.cage && product.parameters.cage !== filter.cage) return false
    if (filter.material && product.parameters.material !== filter.material) {
      return false
    }
    if (
      filter.certifications?.length &&
      !filter.certifications.some((certification) =>
        product.certifications.includes(certification),
      )
    ) {
      return false
    }
    if (
      filter.applications?.length &&
      !filter.applications.some((application) =>
        product.applications.includes(application),
      )
    ) {
      return false
    }
    for (const [key, range] of Object.entries(filter.dimensions ?? {}) as Array<
      [DimensionKey, { min?: number; max?: number }]
    >) {
      if (hasRangeValue(range) && !matchesDimension(product.dimensions[key], range)) {
        return false
      }
    }
    return true
  })
}

function relevance(product: Product, query = ''): number {
  const needle = query.trim().toLocaleLowerCase()
  if (!needle) return 0
  let score = 0
  if (product.designation.toLocaleLowerCase() === needle) score += 100
  if (product.title.en.toLocaleLowerCase().includes(needle)) score += 50
  if (product.title.zh.includes(query.trim())) score += 50
  if (productSearchText(product).includes(needle)) score += 10
  return score
}

export function sortProducts(
  products: Product[],
  sort: 'relevance' | 'price-asc' | 'price-desc' | 'designation' = 'relevance',
  query = '',
): Product[] {
  return [...products].sort((left, right) => {
    if (sort === 'price-asc') return left.price.min - right.price.min
    if (sort === 'price-desc') return right.price.min - left.price.min
    if (sort === 'designation') {
      return left.designation.localeCompare(right.designation)
    }
    return relevance(right, query) - relevance(left, query)
  })
}

export function advanceInquiryStatus(
  rfq: Rfq,
  next: 'viewed' | 'replied',
  reply?: string,
): Rfq {
  if (rfq.status === 'replied') return rfq
  if (next === 'replied') {
    return { ...rfq, status: 'replied', reply: reply?.trim() || rfq.reply }
  }
  if (rfq.status === 'submitted') return { ...rfq, status: 'viewed' }
  return rfq
}

export function validateRfq(input: Partial<Rfq>): string[] {
  const required: Array<keyof Rfq> = [
    'buyerCompany',
    'buyerCountry',
    'designation',
    'quantity',
    'application',
    'notes',
  ]
  return required
    .filter((key) => {
      const value = input[key]
      return typeof value === 'number' ? value <= 0 : !String(value ?? '').trim()
    })
    .map(String)
}
