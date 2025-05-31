import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface ChatState {
  isChatOpen: boolean
  isMinimized: boolean
  isBubbled: boolean
  chatUserIds: number[]
  selectedChatUserId: number | null

  // Actions
  openChat: () => void
  closeChat: () => void
  minimizeChat: () => void
  maximizeChat: () => void
  showBubble: () => void
  hideBubble: () => void
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
        isBubbled: false,
        chatUserIds: [],
        selectedChatUserId: null,

        openChat: () =>
          set(() => ({
            isChatOpen: true,
            isMinimized: false,
            isBubbled: false,
          })),

        closeChat: () =>
          set(() => ({
            isChatOpen: false,
            isMinimized: false,
            selectedChatUserId: null,
          })),

        minimizeChat: () => set(() => ({ isMinimized: true, isBubbled: false })),

        maximizeChat: () => set(() => ({ isMinimized: false, isBubbled: false })),

        showBubble: () =>
          set((state) => {
            return { ...state, isBubbled: !state.isBubbled }
          }),
        hideBubble: () => set(() => ({ isBubbled: false })),

        setSelectedChatUserId: (userId: number) => set(() => ({ selectedChatUserId: userId })),

        addChatUserId: (userId) =>
          set((state) => {
            // Only add userId if it’s not already in the array
            if (state.chatUserIds.includes(userId)) {
              return state // No change if userId exists
            }
            return {
              ...state,
              chatUserIds: [...state.chatUserIds, userId],
            }
          }),

        removeChatUserId: (userId) =>
          set((state) => {
            const newChatUserIds = state.chatUserIds.filter((id) => id !== userId)
            if (newChatUserIds && newChatUserIds.length === 0) {
              return { ...state, isChatOpen: false, selectedChatUserId: null, chatUserIds: [] }
            } else {
              return { ...state, chatUserIds: newChatUserIds }
            }
          }),
      }),
      {
        name: 'ChatStore',
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { name: 'ChatStore' },
  ),
)
