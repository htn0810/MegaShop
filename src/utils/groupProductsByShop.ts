import { ICartProduct } from '@/apis/cart/cartInterface'
import { ProductsGroup } from '@/types/cart.type'

export const groupProductsByShop = (products: ICartProduct[]): ProductsGroup[] => {
  const productsGroup = products.reduce((acc: ProductsGroup[], product: ICartProduct) => {
    const shopId = product.shopId
    const shopName = product.shopName
    const existingGroup = acc.find((group) => group.shopId === shopId)
    if (existingGroup) {
      existingGroup.products.push(product)
    } else {
      acc.push({ shopId, shopName, products: [product] })
    }
    return acc
  }, [])
  return productsGroup
}
