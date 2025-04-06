export type Layout = 'grid' | 'list'

export type Option = {
  label: string
  value: string
}

export type FiltersProduct = {
  categoryIds: number[]
  rating: number
  minPrice: number
  maxPrice: number
  bestSelling: boolean
  newest: boolean
}
