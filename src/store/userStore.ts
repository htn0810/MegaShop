import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { IUser } from '@/types/user.type'
import { IShop } from '@/apis/shop/shopInterfaces'

interface UserState {
  user: IUser | undefined
  setUser: (user: IUser) => void
  logoutUser: () => void
  updateShop: (shop: Partial<IShop>) => void
}

export const useUserStore = create<UserState>()(
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
      { name: 'UserStore', storage: createJSONStorage(() => localStorage) },
    ),
    { name: 'UserStore' },
  ),
)
