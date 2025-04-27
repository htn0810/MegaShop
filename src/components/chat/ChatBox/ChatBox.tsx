// src/components/Chat.tsx
import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useUserStore } from '@/store/userStore'
import { ConversationApi } from '@/apis/conversation/conversation'
import { socket } from '@/configs/socket'
import axios from 'axios'
import { useChatStore } from '@/store/chatStore'
import { X, Minus, PaperPlaneRight, ImageSquare, ChatDots } from '@phosphor-icons/react'
import { toast } from 'sonner'
import TypingIndicator from '@/components/typing_indicator/TypingIndicator'
import { Conversation, Message } from '@/types/conversation.type'

const ChatBox = () => {
  const { user } = useUserStore()
  const { isChatOpen, chatUserIds, selectedChatUserId, isMinimized, minimizeChat, maximizeChat, closeChat } =
    useChatStore()

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<'ONLINE' | 'OFFLINE'>('OFFLINE')
  const [isTyping, setIsTyping] = useState(false)
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [loading, setLoading] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Handle conversation initialization when activeShop changes
  useEffect(() => {
    if (!user?.id || !selectedChatUserId) return

    const initializeConversation = async () => {
      setLoading(true)
      try {
        // Get all conversations
        const response = await ConversationApi.getConversation()
        const conversations = response.data.data

        // Find existing conversation with this shop
        const existingConversation = conversations.find((conv: Conversation) => {
          return conv.participants.some((p) => p.user.id === selectedChatUserId)
        })

        if (existingConversation) {
          // Use existing conversation
          setConversation(existingConversation)
          setMessages(existingConversation.messages)
        } else {
          // Create new conversation
          const createResponse = await ConversationApi.createConversation(selectedChatUserId)
          const newConversation = createResponse.data.data
          setConversation(newConversation)
          setMessages(newConversation.messages || [])
        }
      } catch (error) {
        console.error('Failed to initialize conversation:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeConversation()
    // Reset unread count when opening a conversation
    setUnreadCount(0)
  }, [selectedChatUserId, user?.id])

  // Socket.IO setup
  useEffect(() => {
    if (!user?.id || !conversation) return

    socket.connect()
    socket.emit('joinConversation', { conversationId: conversation.id })

    // Update status
    socket.emit('setStatus', {
      userId: user.id,
      status: 'ONLINE',
    })

    // Receive new messages
    socket.on('newMessage', (message: Message) => {
      setMessages((prev) => [...prev, message])
      if (message.senderId !== user.id) {
        // Increment unread count if chat is minimized
        if (isMinimized) {
          setUnreadCount((prev) => prev + 1)
        } else {
          socket.emit('readMessage', { messageId: message.id, conversationId: conversation.id })
        }
      }
    })

    // Typing indicator
    socket.on('typing', ({ senderId }) => {
      if (senderId !== user.id) {
        setIsTyping(true)
      }
    })

    socket.on('stopTyping', ({ senderId }) => {
      if (senderId !== user.id) {
        setIsTyping(false)
      }
    })

    // Read message
    socket.on('messageRead', ({ messageId, read }) => {
      setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, read } : msg)))
    })

    // Status update
    socket.on('statusUpdate', ({ userId, status }) => {
      const otherUser = getOtherUser()
      if (otherUser && userId === otherUser.id) {
        setStatus(status)
      }
    })

    // error when send message
    socket.on('error', (error) => {
      toast.error(error.message)
    })

    return () => {
      socket.emit('setStatus', {
        userId: user.id,
        status: 'OFFLINE',
      })
      socket.disconnect()
    }
  }, [conversation, user?.id, isMinimized])

  // Reset unread count when chat is maximized
  useEffect(() => {
    if (!isMinimized && unreadCount > 0 && conversation) {
      // Mark all messages as read
      messages
        .filter((msg) => !msg.read && msg.senderId !== user?.id)
        .forEach((msg) => {
          socket.emit('readMessage', { messageId: msg.id, conversationId: conversation.id })
        })

      setUnreadCount(0)
    }
  }, [isMinimized, unreadCount, conversation])

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Typing logic
  const typingTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    if (!conversation) return

    socket.emit('typing', { conversationId: conversation.id, senderId: user?.id })

    if (typingTimeout.current) clearTimeout(typingTimeout.current)
    typingTimeout.current = setTimeout(() => {
      if (conversation) {
        socket.emit('stopTyping', { conversationId: conversation.id, senderId: user?.id })
      }
    }, 2000)
  }

  // Send message
  const handleSend = () => {
    if (!input.trim() || !conversation) return
    socket.emit('sendMessage', {
      conversationId: conversation.id,
      senderId: user?.id,
      content: input,
      type: 'TEXT',
    })

    socket.emit('stopTyping', { conversationId: conversation.id, senderId: user?.id })
    setInput('')
  }

  // Upload image
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !conversation) return

    const formData = new FormData()
    formData.append('image', file)

    try {
      const { data } = await axios.post('/api/conversations/upload-image', formData)
      socket.emit('sendMessage', {
        conversationId: conversation.id,
        senderId: user?.id,
        content: data.url,
        type: 'IMAGE',
      })
    } catch (error) {
      console.log('Upload failed:', error)
    }
  }

  // Helper functions
  const getOtherUser = () => {
    if (!conversation) return null
    return conversation.participants.find((p) => p.user.id !== user?.id)?.user
  }

  const getLastActive = (lastActive: string) => {
    const now = new Date()
    const last = new Date(lastActive)
    const diff = Math.floor((now.getTime() - last.getTime()) / 1000 / 60)
    return diff < 1 ? 'Online now' : `Active ${diff} minutes ago`
  }

  // If chat is not open, don't render anything
  if (!isChatOpen || !selectedChatUserId) return null

  const otherUser = getOtherUser()
  console.log('🚀 ~ ChatBox ~ otherUser:', otherUser)

  // Render minimized chat
  if (isMinimized) {
    return (
      <div
        className='fixed bottom-4 right-4 z-[9999] bg-white rounded-full shadow-lg p-3 cursor-pointer hover:shadow-xl transition-all duration-200 border border-gray-200'
        onClick={maximizeChat}
        style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <ChatDots size={28} />

        {unreadCount > 0 && (
          <div className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center min-w-[20px] h-[20px] px-1'>
            {unreadCount > 99 ? '99+' : unreadCount}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className='fixed bottom-4 right-4 z-50 flex flex-col h-[500px] w-[350px] border rounded-lg shadow-lg bg-background'>
      <div className='p-4 bg-primary text-primary-foreground rounded-t-lg flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <Avatar>
            <AvatarImage src={otherUser?.avatarUrl} />
            <AvatarFallback>{otherUser?.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className='font-medium'>{otherUser?.shop?.name}</h3>
            <p className='text-xs text-primary-foreground/80'>
              {status === 'ONLINE'
                ? 'Online now'
                : otherUser
                  ? getLastActive(otherUser.lastActive || new Date().toISOString())
                  : 'Offline'}
            </p>
          </div>
        </div>
        <div className='flex gap-2'>
          <Button variant='ghost' size='icon' className='h-8 w-8 text-primary-foreground' onClick={minimizeChat}>
            <Minus size={16} weight='bold' />
          </Button>
          <Button variant='ghost' size='icon' className='h-8 w-8 text-primary-foreground' onClick={closeChat}>
            <X size={16} weight='bold' />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className='flex-1 flex items-center justify-center'>
          <p>Loading conversation...</p>
        </div>
      ) : (
        <ScrollArea className='flex-1 p-4'>
          {messages.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-full text-muted-foreground'>
              <p>Start chatting with {otherUser?.shop?.name}</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`mb-4 flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[70%] rounded-lg p-2 ${
                    msg.senderId === user?.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}
                >
                  {msg.type === 'TEXT' ? (
                    <p>{msg.content}</p>
                  ) : (
                    <img src={msg.content} alt='Chat image' className='max-w-[200px] rounded' />
                  )}
                  <div className='flex justify-between text-xs mt-1 opacity-70'>
                    <span>{new Date(msg.createdAt).toLocaleTimeString()}</span>
                    {msg.senderId === user?.id && <span>{msg.read ? 'Read' : 'Sent'}</span>}
                  </div>
                </div>
              </div>
            ))
          )}
          <div className='flex justify-start items-center mb-2 mt-2'>
            {isTyping && <TypingIndicator avatarUrl={otherUser?.avatarUrl || ''} name={otherUser?.name || ''} />}
          </div>
          <div ref={scrollRef} />
        </ScrollArea>
      )}

      <div className='p-4 border-t flex gap-2 bg-background'>
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder='Type a message...'
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className='flex-1'
        />
        <Button size='icon' onClick={handleSend}>
          <PaperPlaneRight size={18} weight='fill' />
        </Button>
        <Button size='icon' variant='outline' asChild>
          <label>
            <input type='file' accept='image/*' className='hidden' onChange={handleImageUpload} />
            <ImageSquare size={18} />
          </label>
        </Button>
      </div>
    </div>
  )
}

export default ChatBox
