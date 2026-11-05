import { advanceInquiryStatus, validateRfq } from '#shared/utils/catalog'
import type { Product, Rfq } from '#shared/types/catalog'

const rfqKey = 'kb_rfqs_v1'
const draftKey = 'kb_drafts_v1'
const profileKey = 'kb_supplier_profile_v1'

export interface ProductDraft {
  id: string
  titleEn: string
  titleZh: string
  categorySlug: string
  designation: string
  dimensions: string
  precision: string
  imageName?: string
  status: 'draft' | 'submitted'
  createdAt: string
}

export interface SupplierProfile {
  company: string
  contact: string
  phone: string
  capabilities: string
}

export function useMarketplace() {
  const rfqs = useState<Rfq[]>('kb-rfqs', () => [])
  const drafts = useState<ProductDraft[]>('kb-drafts', () => [])
  const profile = useState<SupplierProfile>('kb-profile', () => ({
    company: 'North Ridge Precision Bearing Co.',
    contact: 'Lin Yang',
    phone: '+86 451 5550 1200',
    capabilities: 'Precision grinding, superfinishing and noise inspection',
  }))
  const error = ref<StoreError | null>(null)

  function load() {
    const storedRfqs = readBrowserStore<Rfq[]>(rfqKey, [])
    const storedDrafts = readBrowserStore<ProductDraft[]>(draftKey, [])
    const storedProfile = readBrowserStore<SupplierProfile | null>(profileKey, null)
    if (storedRfqs.ok) rfqs.value = storedRfqs.value
    else error.value = storedRfqs.error
    if (storedDrafts.ok) drafts.value = storedDrafts.value
    else error.value = storedDrafts.error
    if (storedProfile.ok && storedProfile.value) profile.value = storedProfile.value
  }

  function createRfq(input: Partial<Rfq>): { ok: boolean; errors: string[] } {
    const errors = validateRfq(input)
    if (errors.length) return { ok: false, errors }
    const rfq: Rfq = {
      id: `RFQ-${Date.now().toString(36).toUpperCase()}`,
      buyerCompany: input.buyerCompany!,
      buyerCountry: input.buyerCountry!,
      designation: input.designation!,
      dimensions: input.dimensions ?? '',
      quantity: Number(input.quantity),
      annualDemand: input.annualDemand ? Number(input.annualDemand) : undefined,
      application: input.application!,
      load: input.load ? Number(input.load) : undefined,
      speed: input.speed ? Number(input.speed) : undefined,
      precision: input.precision,
      clearance: input.clearance,
      sealing: input.sealing,
      delivery: input.delivery,
      incoterms: input.incoterms ?? 'FOB',
      notes: input.notes!,
      status: 'submitted',
      createdAt: new Date().toISOString(),
      productSlug: input.productSlug,
    }
    const result = writeBrowserStore(rfqKey, [rfq, ...rfqs.value])
    if (!result.ok) {
      error.value = result.error
      return { ok: false, errors: ['storage'] }
    }
    rfqs.value = result.value
    return { ok: true, errors: [] }
  }

  function updateRfq(id: string, next: 'viewed' | 'replied', reply?: string) {
    const updated = rfqs.value.map((rfq) =>
      rfq.id === id ? advanceInquiryStatus(rfq, next, reply) : rfq,
    )
    const result = writeBrowserStore(rfqKey, updated)
    if (!result.ok) {
      error.value = result.error
      return false
    }
    rfqs.value = result.value
    return true
  }

  function saveDraft(draft: Omit<ProductDraft, 'id' | 'createdAt'>) {
    const row: ProductDraft = {
      ...draft,
      id: `DRAFT-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
    }
    const result = writeBrowserStore(draftKey, [row, ...drafts.value])
    if (!result.ok) {
      error.value = result.error
      return false
    }
    drafts.value = result.value
    return true
  }

  function saveProfile(next: SupplierProfile) {
    const result = writeBrowserStore(profileKey, next)
    if (!result.ok) {
      error.value = result.error
      return false
    }
    profile.value = result.value
    return true
  }

  function productToRfq(product: Product): Partial<Rfq> {
    return {
      productSlug: product.slug,
      designation: product.designation,
      dimensions: `${product.dimensions.d ?? '—'} × ${product.dimensions.D ?? '—'} × ${product.dimensions.B ?? product.dimensions.T ?? '—'} mm`,
      precision: product.parameters.precision,
      clearance: product.parameters.clearance,
      sealing: product.parameters.sealing,
    }
  }

  onMounted(load)

  return {
    rfqs,
    drafts,
    profile,
    error: readonly(error),
    createRfq,
    updateRfq,
    saveDraft,
    saveProfile,
    productToRfq,
  }
}
