import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { IShop } from '@/apis/shop/shopInterfaces'

interface Message {
  id: string
  content: string
  sender: 'user' | 'shop'
  timestamp: number
}

interface ChatState {
  isChatOpen: boolean
  isMinimized: boolean
  activeShop: IShop | null
  messages: Record<number, Message[]> // shopId -> messages

  // Actions
  openChat: (shop: IShop) => void
  closeChat: () => void
  minimizeChat: () => void
  maximizeChat: () => void
  sendMessage: (content: string) => void
  receiveMessage: (shopId: number, message: string) => void
}

export const useChatStore = create<ChatState>()(
  devtools(
    persist(
      (set, get) => ({
        isChatOpen: false,
        isMinimized: false,
        activeShop: null,
        messages: {},

        openChat: (shop: IShop) =>
          set(() => ({
            isChatOpen: true,
            isMinimized: false,
            activeShop: shop,
            messages: {
              ...get().messages,
              [shop.id]: get().messages[shop.id] || [],
            },
          })),

        closeChat: () =>
          set(() => ({
            isChatOpen: false,
            isMinimized: false,
            activeShop: null,
          })),

        minimizeChat: () => set(() => ({ isMinimized: true })),

        maximizeChat: () => set(() => ({ isMinimized: false })),

        sendMessage: (content: string) =>
          set((state) => {
            if (!state.activeShop) return state

            const shopId = state.activeShop.id
            const message: Message = {
              id: Date.now().toString(),
              content,
              sender: 'user',
              timestamp: Date.now(),
            }

            return {
              messages: {
                ...state.messages,
                [shopId]: [...(state.messages[shopId] || []), message],
              },
            }
          }),

        receiveMessage: (shopId: number, content: string) =>
          set((state) => {
            const message: Message = {
              id: Date.now().toString(),
              content,
              sender: 'shop',
              timestamp: Date.now(),
            }

            return {
              messages: {
                ...state.messages,
                [shopId]: [...(state.messages[shopId] || []), message],
              },
            }
          }),
      }),
      {
        name: 'ChatStore',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          messages: state.messages,
          // We don't persist these as they should reset on page refresh
          // isChatOpen: state.isChatOpen,
          // isMinimized: state.isMinimized,
          // activeShop: state.activeShop
        }),
      },
    ),
    { name: 'ChatStore' },
  ),
)
