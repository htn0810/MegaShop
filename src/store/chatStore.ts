import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface ChatState {
  isChatOpen: boolean
  isMinimized: boolean
  chatUserIds: number[]
  selectedChatUserId: number | null

  // Actions
  openChat: () => void
  closeChat: () => void
  minimizeChat: () => void
  maximizeChat: () => void
  setSelectedChatUserId: (userId: number) => void
  addChatUserId: (userId: number) => void
  removeChatUserId: (userId: number) => void
}

export const useChatStore = create<ChatState>()(
  devtools(
    persist(
      (set) => ({
        isChatOpen: false,
        isMinimized: false,
        chatUserIds: [],
        selectedChatUserId: null,

        openChat: () =>
          set(() => ({
            isChatOpen: true,
            isMinimized: false,
          })),

        closeChat: () =>
          set(() => ({
            isChatOpen: false,
            isMinimized: false,
          })),

        minimizeChat: () => set(() => ({ isMinimized: true })),

        maximizeChat: () => set(() => ({ isMinimized: false })),

        setSelectedChatUserId: (userId: number) => set(() => ({ selectedChatUserId: userId })),

        addChatUserId: (userId: number) => set((state) => ({ chatUserIds: [...state.chatUserIds, userId] })),

        removeChatUserId: (userId: number) =>
          set((state) => ({ chatUserIds: state.chatUserIds.filter((id) => id !== userId) })),
      }),
      {
        name: 'ChatStore',
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { name: 'ChatStore' },
  ),
)
