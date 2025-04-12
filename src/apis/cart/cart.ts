import { http } from '@/utils/interceptor'

export class CartAPI {
  public static async getCart() {
    return await http.get('/carts')
  }

  public static async addToCart(productId: number, quantity: number) {
    return http.post(`/carts`, {
      productId,
      quantity,
    })
  }

  public static async increaseQuantity(productId: number) {
    return await http.post(`/carts/increase-quantity`, {
      productId,
    })
  }

  public static async decreaseQuantity(productId: number) {
    return await http.post(`/carts/decrease-quantity`, {
      productId,
    })
  }

  public static async removeFromCart(productId: number) {
    return await http.post(`/carts/remove-product`, {
      productId,
    })
  }

  public static async removeAllProductsOfShopFromCart(shopId: number) {
    return await http.post(`/carts/remove-products/${shopId}`)
  }

  public static async clearCart(cartId: number) {
    return await http.put(`/carts/${cartId}`)
  }
}
