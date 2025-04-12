import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IUser } from '@/types/user.type'
import { useUserStore } from './userStore'
import { useCartStore } from './cartStore'
import { CustomCartType } from '@/types/cart.type'

export interface MegaState {
  user: IUser | undefined
  cart: CustomCartType | undefined
  clearAllData: () => void
}

export const useMegaStore = create<MegaState>()(
  devtools(
    (set) => {
      const initialState: MegaState = {
        user: useUserStore.getState().user,
        cart: useCartStore.getState().cart,
        clearAllData: () => {
          useUserStore.getState().logoutUser()
          useCartStore.getState().clearCart()
        },
      }

      // Đồng bộ state từ userStore
      useUserStore.subscribe((state) => {
        set((prev) => ({ ...prev, user: state.user }))
      })

      // Đồng bộ state từ cartStore
      useCartStore.subscribe((state) => {
        set((prev) => ({ ...prev, cart: state.cart }))
      })

      return initialState
    },
    { name: 'MegaStore' },
  ),
)
