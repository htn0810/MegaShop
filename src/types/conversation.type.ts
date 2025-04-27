export interface Message {
  id: number
  conversationId: number
  senderId: number
  content: string
  type: 'TEXT' | 'IMAGE'
  read: boolean
  createdAt: string
}

export interface Participant {
  userId: number
  conversationId: number
  user: {
    id: number
    name: string
    email: string
    avatarUrl: string
    chatStatus: 'ONLINE' | 'OFFLINE'
    lastActive: string
    shop?: { name: string; avatarUrl?: string }
  }
}

export interface Conversation {
  id: number
  participants: Participant[]
  messages: Message[]
  unreadCount?: number
}

export interface SelectedConversation {
  conversationId: number
  otherParticipant: Participant
}
