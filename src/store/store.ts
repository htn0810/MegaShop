import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { create } from 'zustand'
import { IUser } from '@/types/user.type'

interface MegaState {
  user: IUser | undefined
  setUser: (user: IUser | undefined) => void
}

export const useMegaStore = create<MegaState>()(
  devtools(
    persist(
      (set) => ({
        user: undefined,
        setUser: (loginUser: IUser | undefined) => set(() => ({ user: loginUser })),
      }),
      { name: 'MegaStore', storage: createJSONStorage(() => localStorage) },
    ),
  ),
)
