export interface ICart {
  id: number
  userId: number
  totalPrice: number
  totalQuantity: number
  cartProducts: ICartProduct[]
}

export interface ICartProduct {
  id: number
  productId: number
  shopId: number
  shopName: string
  quantity: number
  price: number
  name: string
  image: string
  stock: number
}
