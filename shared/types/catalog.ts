export type LocaleCode = 'en' | 'zh'

export type LocalizedText = Record<LocaleCode, string>

export type DimensionKey = 'd' | 'D' | 'B' | 'T'

export interface NumericRange {
  min?: number
  max?: number
}

export interface Subcategory {
  slug: string
  title: LocalizedText
}

export interface FaqEntry {
  question: LocalizedText
  answer: LocalizedText
}

export interface Category {
  slug: string
  number: string
  title: LocalizedText
  summary: LocalizedText
  introduction: LocalizedText
  variants: string[]
  selectionNotes: LocalizedText[]
  applications: LocalizedText[]
  faq: FaqEntry[]
  image: string
  subcategories: Subcategory[]
}

export interface ProductParameters {
  precision: string
  clearance: string
  sealing: string
  cage: string
  material: string
  limitingSpeed?: number
  dynamicLoad?: number
  staticLoad?: number
}

export interface Product {
  id: string
  slug: string
  designation: string
  title: LocalizedText
  description: LocalizedText
  categorySlug: string
  subcategorySlug: string
  dimensions: Partial<Record<DimensionKey, number>>
  parameters: ProductParameters
  standards: string[]
  certifications: string[]
  applications: string[]
  supplierSlug: string
  image: string
  price: { min: number; max: number; currency: 'USD' }
  demo: true
}

export interface Supplier {
  slug: string
  name: LocalizedText
  image: string
  country: LocalizedText
  city: LocalizedText
  description: LocalizedText
  established: number
  businessType: LocalizedText
  primaryCategories: string[]
  processes: LocalizedText[]
  qualitySystems: string[]
  inspection: LocalizedText[]
  precisionCapability: LocalizedText
  markets: LocalizedText[]
  leadTime: string
  verified: boolean
  demo: true
}

export type InquiryStatus = 'submitted' | 'viewed' | 'replied'

export interface Rfq {
  id: string
  productSlug?: string
  buyerCompany: string
  buyerCountry: string
  designation: string
  dimensions: string
  quantity: number
  annualDemand?: number
  application: string
  load?: number
  speed?: number
  precision?: string
  clearance?: string
  sealing?: string
  delivery?: string
  incoterms: 'EXW' | 'FOB' | 'CIF'
  notes: string
  status: InquiryStatus
  createdAt: string
  reply?: string
}

export interface ProductFilter {
  category?: string
  subcategory?: string
  query?: string
  dimensions?: Partial<Record<DimensionKey, NumericRange>>
  precision?: string
  clearance?: string
  sealing?: string
  cage?: string
  material?: string
  certifications?: string[]
  applications?: string[]
  supplier?: string
}

export interface DemoSession {
  userId: string
  role: 'buyer' | 'supplier'
  company: string
  status: 'pending' | 'verified' | 'rejected'
}
