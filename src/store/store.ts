import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { create } from 'zustand'
import { IUser } from '@/types/user.type'
import { IShop } from '@/apis/shop/shopInterfaces'

export interface MegaState {
  user: IUser | undefined
  setUser: (user: IUser) => void
  logoutUser: () => void
  updateShop: (shop: Partial<IShop>) => void
}

export const useMegaStore = create<MegaState>()(
  devtools(
    persist(
      (set) => ({
        user: undefined,
        setUser: (loginUser: IUser) => set(() => ({ user: loginUser })),
        logoutUser: () => set(() => ({ user: undefined })),
        updateShop: (shop: Partial<IShop>) =>
          set((state) => {
            if (!state.user) return state
            return {
              user: {
                ...state.user,
                shop: { ...state.user.shop, ...shop },
              },
            }
          }),
      }),
      { name: 'MegaStore', storage: createJSONStorage(() => localStorage) },
    ),
  ),
)
