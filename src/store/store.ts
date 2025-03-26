import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { create } from 'zustand'
import { IUser } from '@/types/user.type'

export interface MegaState {
  user: IUser | undefined
  setUser: (user: IUser) => void
  logoutUser: () => void
}

export const useMegaStore = create<MegaState>()(
  devtools(
    persist(
      (set) => ({
        user: undefined,
        setUser: (loginUser: IUser) => set(() => ({ user: loginUser })),
        logoutUser: () => set(() => ({ user: undefined })),
      }),
      { name: 'MegaStore', storage: createJSONStorage(() => localStorage) },
    ),
  ),
)
