import { ICategoryResponse } from '@/apis/category/categoryInterface'
import { IShop } from '@/types/user.type'

export interface IProduct {
  id: number
  name: string
  description: string
  imageUrls: string
  price: number
  stock: number
  rating: number
  isActive: boolean
  slug: string
  shopId: number
  shop?: IShop
  categoryId: number
  category?: ICategoryResponse
  createdAt: string
  updatedAt: string
}

export interface IAddUpdateProduct {
  id?: number
  name: string
  description: string
  slug: string
  categoryId: number
  shopId: number
  price: number
  stock: number
}
