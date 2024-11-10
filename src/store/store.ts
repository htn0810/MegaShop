import { devtools } from 'zustand/middleware'
import { create } from 'zustand'
import { IUser } from '@/types/user.type'

interface MegaState {
  user: IUser | undefined
  setUser: (user: IUser) => void
}

export const useMegaStore = create<MegaState>()(
  devtools(
    (set) => ({
      user: undefined,
      setUser: (loginUser: IUser) => set(() => ({ user: loginUser })),
    }),
    { name: 'MegaStore' },
  ),
)
