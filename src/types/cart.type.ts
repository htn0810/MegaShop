import { ICartProduct } from '@/apis/cart/cartInterface'

export type ProductsGroup = {
  shopId: number
  shopName: string
  products: ICartProduct[]
}

export type CustomCartType = {
  id: number
  userId: number
  totalPrice: number
  totalQuantity: number
  cartProducts: ICartProduct[]
  cartProductsGroupByShop: GroupedProductsByShop[]
}

export type GroupedProductsByShop = {
  shopId: number
  shopName: string
  products: (ICartProduct & { isChecked?: boolean })[]
}
