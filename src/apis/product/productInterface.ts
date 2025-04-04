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
  categoryId: number
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
