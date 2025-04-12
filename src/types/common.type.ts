import { ICartProduct } from '@/apis/cart/cartInterface'

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

export type Pagination = {
  page: number
  pageSize: number
  totalPages: number
}

export type InputCounterType = 'product_detail' | 'cart'
