/* eslint-disable prettier/prettier */
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { ICartProduct } from '@/apis/cart/cartInterface'
import { immer } from 'zustand/middleware/immer'
import { CustomCartType, GroupedProductsByShop } from '@/types/cart.type'

interface CartState {
  cart: CustomCartType | undefined
  setCart: (cart: CustomCartType) => void
  clearCart: () => void
  addToCart: (product: ICartProduct, quantity: number, shopId: number) => void
  removeFromCart: (productId: number, shopId: number) => void
  removeAllProductsOfShopFromCart: (shopId: number) => void
  increaseQuantity: (productId: number, shopId: number) => void
  decreaseQuantity: (productId: number, shopId: number) => void
  addProductToReview: (product: ICartProduct) => void
  removeProductFromReview: (product: ICartProduct) => void
  addAllProductsOfShopToReview: (shopId: number, products: ICartProduct[]) => void
  removeAllProductsOfShopFromReview: (shopId: number) => void
}

export const useCartStore = create<CartState>()(
  immer(
    devtools(
      persist(
        (set) => ({
          cart: undefined,
          setCart: (cart: CustomCartType) =>
            set(() => {
              return { cart }
            }),
          clearCart: () => set(() => ({ cart: undefined })),
          addToCart: (product: ICartProduct, shopId: number, quantity: number) =>
            set((state) => {
              if (!state.cart) return
              const existedShopIdx = state.cart.cartProductsGroupByShop.findIndex((item) => item.shopId === shopId)
              if (existedShopIdx === -1) {
                state.cart.cartProductsGroupByShop.push({
                  shopId,
                  shopName: product.shopName,
                  products: [{ ...product, quantity }],
                })
                state.cart.totalQuantity += quantity
                state.cart.totalPrice += product.price * quantity
                return state
              }

              const existedProductIdx = state.cart.cartProductsGroupByShop[existedShopIdx].products.findIndex(
                (item) => item.id === product.id,
              )
              if (existedProductIdx !== -1) {
                state.cart.cartProductsGroupByShop[existedShopIdx].products[existedProductIdx].quantity += quantity
                state.cart.totalQuantity += quantity
                state.cart.totalPrice += product.price * quantity
                return state
              }

              state.cart.cartProductsGroupByShop[existedShopIdx].products.push({ ...product, quantity })
              state.cart.totalQuantity += quantity
              state.cart.totalPrice += product.price * quantity
              return state
            }),
          removeFromCart: (productId: number, shopId: number) =>
            set((state) => {
              if (!state.cart) return
              const existedShopIdx = state.cart.cartProductsGroupByShop.findIndex((item) => item.shopId === shopId)
              if (existedShopIdx === -1) return
              const existedProductIdx = state.cart.cartProductsGroupByShop[existedShopIdx].products.findIndex(
                (item) => item.productId === productId,
              )
              if (existedProductIdx === -1) return
              const existedProduct = state.cart.cartProductsGroupByShop[existedShopIdx].products[existedProductIdx]
              state.cart.cartProductsGroupByShop[existedShopIdx].products.splice(existedProductIdx, 1)
              state.cart.totalQuantity -= existedProduct.quantity
              state.cart.totalPrice -= existedProduct.price * existedProduct.quantity
              return state
            }),
          removeAllProductsOfShopFromCart: (shopId: number) =>
            set((state) => {
              if (!state.cart) return
              const existedShopIdx = state.cart.cartProductsGroupByShop.findIndex((item) => item.shopId === shopId)
              if (existedShopIdx === -1) return
              const quantityProductsInShop = state.cart.cartProductsGroupByShop[existedShopIdx].products.reduce(
                (acc, product) => acc + product.quantity,
                0,
              )
              const totalPriceProductsInShop = state.cart.cartProductsGroupByShop[existedShopIdx].products.reduce(
                (acc, product) => acc + product.price * product.quantity,
                0,
              )
              state.cart.cartProductsGroupByShop.splice(existedShopIdx, 1)
              state.cart.totalQuantity -= quantityProductsInShop
              state.cart.totalPrice -= totalPriceProductsInShop
              return state
            }),

          increaseQuantity: (productId: number, shopId: number) =>
            set((state) => {
              if (!state.cart) return
              const existedShopIdx = state.cart.cartProductsGroupByShop.findIndex((item) => item.shopId === shopId)
              if (existedShopIdx === -1) return
              const existedProductIdx = state.cart.cartProductsGroupByShop[existedShopIdx].products.findIndex(
                (item) => item.productId === productId,
              )
              if (existedProductIdx === -1) return
              state.cart.cartProductsGroupByShop[existedShopIdx].products[existedProductIdx].quantity += 1
              state.cart.totalQuantity += 1
              state.cart.totalPrice +=
                state.cart.cartProductsGroupByShop[existedShopIdx].products[existedProductIdx].price
              return state
            }),

          decreaseQuantity: (productId: number, shopId: number) =>
            set((state) => {
              if (!state.cart) return
              const existedShopIdx = state.cart.cartProductsGroupByShop.findIndex((item) => item.shopId === shopId)
              if (existedShopIdx === -1) return
              const existedProductIdx = state.cart.cartProductsGroupByShop[existedShopIdx].products.findIndex(
                (item) => item.productId === productId,
              )
              if (existedProductIdx === -1) return

              state.cart.cartProductsGroupByShop[existedShopIdx].products[existedProductIdx].quantity -= 1
              state.cart.totalQuantity -= 1
              state.cart.totalPrice -=
                state.cart.cartProductsGroupByShop[existedShopIdx].products[existedProductIdx].price
              if (state.cart.cartProductsGroupByShop[existedShopIdx].products[existedProductIdx].quantity <= 0) {
                state.cart.cartProductsGroupByShop[existedShopIdx].products.splice(existedProductIdx, 1)
              }
              return state
            }),

          addProductToReview: (product: ICartProduct) =>
            set((state) => {
              if (!state.cart) return state

              // Check if store has selected products include grouped product by shopId
              let existedShopIdx = -1
              if (state.cart.cartProductsGroupByShop.length !== 0) {
                existedShopIdx = state.cart.cartProductsGroupByShop.findIndex((item) => item.shopId === product.shopId)
              }

              // if there is no selected product or does not exist grouped product by shopId, add the product to the selected products and group by shop
              if (state.cart.cartProductsGroupByShop.length === 0 || existedShopIdx === -1) {
                const productGroupByShop: GroupedProductsByShop = {
                  shopId: product.shopId,
                  shopName: product.shopName,
                  products: [{ ...product, isChecked: true }],
                }
                state.cart.cartProductsGroupByShop.push(productGroupByShop)
                return state
              }

              // Exist grouped product by shopId
              const existedProductIdx = state.cart.cartProductsGroupByShop[existedShopIdx].products.findIndex(
                (item) => item.productId === product.productId,
              )
              if (existedProductIdx === -1) {
                state.cart.cartProductsGroupByShop[existedShopIdx].products.push({ ...product, isChecked: true })
                return state
              }

              state.cart.cartProductsGroupByShop[existedShopIdx].products[existedProductIdx].isChecked = true
              return state
            }),

          removeProductFromReview: (product: ICartProduct) =>
            set((state) => {
              if (!state.cart) return
              const existedShopIdx = state.cart.cartProductsGroupByShop.findIndex(
                (item) => item.shopId === product.shopId,
              )
              if (existedShopIdx === -1) return
              const existedProductIdx = state.cart.cartProductsGroupByShop[existedShopIdx].products.findIndex(
                (item) => item.productId === product.productId,
              )
              if (existedProductIdx === -1) return
              state.cart.cartProductsGroupByShop[existedShopIdx].products[existedProductIdx].isChecked = false
              return state
            }),

          addAllProductsOfShopToReview: (shopId: number, products: ICartProduct[]) =>
            set((state) => {
              if (!state.cart) return state

              const existedShopIdx = state.cart.cartProductsGroupByShop.findIndex((item) => item.shopId === shopId)
              const checkedProducts = products.map((product) => ({ ...product, isChecked: true }))

              if (state.cart.cartProductsGroupByShop.length === 0 || existedShopIdx === -1) {
                const productGroupByShop: GroupedProductsByShop = {
                  shopId,
                  shopName: products[0].shopName,
                  products: checkedProducts,
                }
                state.cart.cartProductsGroupByShop.push(productGroupByShop)
                return state
              }

              if (existedShopIdx !== -1) {
                state.cart.cartProductsGroupByShop[existedShopIdx].products = checkedProducts
              }
              return state
            }),

          removeAllProductsOfShopFromReview: (shopId: number) =>
            set((state) => {
              if (!state.cart) return state

              const existedShopIdx = state.cart.cartProductsGroupByShop.findIndex((item) => item.shopId === shopId)
              if (existedShopIdx === -1) return state

              const uncheckedProducts = state.cart.cartProductsGroupByShop[existedShopIdx].products.map((product) => ({
                ...product,
                isChecked: false,
              }))

              state.cart.cartProductsGroupByShop[existedShopIdx].products = uncheckedProducts
              return state
            }),
        }),
        { name: 'CartStore', storage: createJSONStorage(() => localStorage) },
      ),
      { name: 'CartStore' },
    ),
  ),
)
