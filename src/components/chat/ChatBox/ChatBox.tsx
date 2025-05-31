import React, { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useUserStore } from '@/store/userStore'
import { ConversationApi } from '@/apis/conversation/conversation'
import { cleanUpListeners, getSocket } from '@/configs/socket'
import { useChatStore } from '@/store/chatStore'
import { X, Minus, PaperPlaneRight, ImageSquare, ChatDots } from '@phosphor-icons/react'
import { toast } from 'sonner'
import TypingIndicator from '@/components/typing_indicator/TypingIndicator'
import { Conversation, Message, Participant } from '@/types/conversation.type'

const ChatBox = () => {
  const { user } = useUserStore()
  const {
    isChatOpen,
    selectedChatUserId,
    setSelectedChatUserId,
    removeChatUserId,
    chatUserIds,
    isMinimized,
    minimizeChat,
    maximizeChat,
    isBubbled,
    showBubble,
    hideBubble,
    closeChat,
  } = useChatStore()

  const [messages, setMessages] = useState<Message[]>([])
  const [otherParticipant, setOtherParticipant] = useState<Participant['user'] | null>(null)
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<'ONLINE' | 'OFFLINE'>('OFFLINE')
  const [isTyping, setIsTyping] = useState(false)
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [loading, setLoading] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const socket = getSocket()
  // Typing logic
  const typingTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleSelectChat = (userId: number) => {
    if (userId !== selectedChatUserId) {
      setSelectedChatUserId(userId)
    }
    hideBubble()
    maximizeChat()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!conversation) return

    setInput(e.target.value)

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
    try {
      socket.emit('sendMessage', {
        conversationId: conversation.id,
        senderId: user?.id,
        content: input,
        type: 'TEXT',
      })

      socket.emit('stopTyping', { conversationId: conversation.id, senderId: user?.id })
      setInput('')
    } catch (error) {
      toast.error('Failed to send message')
    }
  }

  // Handle conversation initialization when activeShop changes
  useEffect(() => {
    if (!user?.id || !selectedChatUserId) return
    const initializeConversation = async () => {
      setLoading(true)
      try {
        // Get all conversations
        const response = await ConversationApi.getConversationByUserId(user.id)
        const conversations = response.data.data

        // Find existing conversation with this shop
        const existingConversation = conversations.find((conv: Conversation) => {
          const participantIds = conv.participants.map((p) => p.user.id)
          return participantIds.includes(selectedChatUserId) && participantIds.includes(user.id)
        })

        let otherParticipant = null

        if (existingConversation) {
          // Use existing conversation
          otherParticipant = existingConversation.participants.find((p: Participant) => p.user.id !== user.id)

          setConversation(existingConversation)
          setMessages(existingConversation.messages)
        } else {
          // Create new conversation
          const createResponse = await ConversationApi.createConversation(selectedChatUserId)
          const newConversation = createResponse.data.data
          otherParticipant = newConversation.participants.find((p: Participant) => p.user.id !== user.id)
          setConversation(newConversation)
          setMessages(newConversation.messages)
        }
        setStatus(otherParticipant?.user.chatStatus)
        setOtherParticipant(otherParticipant.user)
      } catch (error) {
        toast.error('Failed to initialize conversation!')
      } finally {
        setLoading(false)
      }
    }

    initializeConversation()
    setUnreadCount(0)
  }, [selectedChatUserId, user?.id])

  // Socket.IO setup
  useEffect(() => {
    if (!user?.id || !conversation) return

    socket.emit('joinConversation', { conversationId: conversation.id })

    // Receive new messages
    socket.on('newMessage', (message: Message) => {
      if (isMinimized) {
        setUnreadCount((prev) => prev + 1)
      } else {
        if (message.senderId !== user?.id) {
          socket.emit('readMessage', { senderId: message.senderId, conversationId: conversation.id })
        }
      }
      setMessages((prev) => [...prev, message])
    })

    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })

    socket.on('statusUpdate', ({ userId, status }) => {
      if (userId === selectedChatUserId) {
        setStatus(status)
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
    socket.on('messageRead', ({ senderId, conversationId }) => {
      if (conversationId === conversation?.id) {
        setMessages((prev) => prev.map((msg) => (msg.senderId === senderId ? { ...msg, read: true } : msg)))
      }
    })

    // error when send message
    socket.on('error', (error) => {
      toast.error(error.message)
    })

    return () => {
      cleanUpListeners(['newMessage', 'statusUpdate', 'typing', 'stopTyping', 'messageRead'])
    }
  }, [conversation, user?.id, isMinimized])

  // Reset unread count when chat is maximized
  useEffect(() => {
    if (!isMinimized && unreadCount > 0 && conversation && otherParticipant?.id) {
      // Mark all messages as read
      socket.emit('readMessage', { senderId: otherParticipant.id, conversationId: conversation.id })

      setUnreadCount(0)
    }
  }, [isMinimized])

  // Auto-scroll to latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // If chat is not open, don't render anything
  if (!isChatOpen || !selectedChatUserId || !otherParticipant) return null

  // Render minimized chat
  console.log('isMinimized', isMinimized)
  if (isMinimized) {
    return (
      <div
        className='fixed bottom-4 right-4 z-[9999] p-3 cursor-pointer transition-all duration-200'
        onClick={showBubble}
      >
        {isBubbled && chatUserIds.length > 0 && (
          <div className='flex flex-col gap-y-2'>
            {chatUserIds.map((userId) => (
              <div className='w-[50px] h-[50px] hover:scale-110 flex items-center justify-center relative group'>
                <Avatar
                  className='h-full w-full shadow-md dark:shadow-gray-600'
                  key={userId}
                  onClick={() => handleSelectChat(userId)}
                >
                  <AvatarImage src={otherParticipant.avatarUrl} alt={otherParticipant.name} />
                  <AvatarFallback>{userId}</AvatarFallback>
                </Avatar>
                <Button
                  variant='secondary'
                  size='icon'
                  className='hidden group-hover:flex items-center justify-center size-4 absolute top-0 right-0 rounded-full hover:bg-red-500'
                  onClick={() => removeChatUserId(userId)}
                >
                  <X />
                </Button>
              </div>
            ))}
          </div>
        )}
        <div className='w-[50px] h-[50px] hover:scale-110 shadow-md dark:shadow-gray-600 bg-white rounded-full flex items-center justify-center mt-2'>
          <ChatDots size={28} className='dark:text-black' />
        </div>

        {unreadCount > 0 && (
          <div className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center min-w-[20px] h-[20px] px-1'>
            {unreadCount > 99 ? '99+' : unreadCount}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className='fixed bottom-4 right-4 z-50 flex flex-col h-[400px] md:h-[450px] lg:h-[500px] w-[250px] md:w-[300px] lg:w-[350px] border rounded-lg shadow-lg bg-background'>
      <div className='p-2 md:p-4 bg-primary text-primary-foreground rounded-t-lg flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <div className='relative'>
            <Avatar>
              <AvatarImage src={otherParticipant.shop?.avatarUrl || otherParticipant?.avatarUrl} />
              <AvatarFallback>{otherParticipant?.name[0]}</AvatarFallback>
            </Avatar>
            <div
              className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background ${
                status === 'ONLINE' ? 'bg-green-500' : 'bg-gray-400'
              }`}
            />
          </div>
          <div>
            <h3 className='font-medium text-sm md:text-base'>
              {otherParticipant?.shop?.name || otherParticipant.name}
            </h3>
            <p className='text-xs text-primary-foreground/80'>{status === 'ONLINE' ? 'Online' : 'Offline'}</p>
          </div>
        </div>
        <div className='flex'>
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
        <ScrollArea className='flex-1 p-2 md:p-4'>
          {messages?.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-full text-muted-foreground text-xs  md:text-sm '>
              <p>Start chatting with {otherParticipant?.shop?.name}</p>
            </div>
          ) : (
            messages?.map((msg) => (
              <div key={msg.id} className={`mb-4 flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[70%] rounded-lg p-2 leading-none ${
                    msg.senderId === user?.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}
                >
                  {msg.type === 'TEXT' ? (
                    <p className='text-xs md:text-sm text-wrap break-words'>{msg.content}</p>
                  ) : (
                    <img src={msg.content} alt='Chat image' className='max-w-[200px] rounded' />
                  )}
                  <div className='flex justify-between text-xs mt-1 opacity-70'>
                    <span>{new Date(msg.createdAt).toLocaleTimeString()}</span>
                    {msg.senderId === user?.id && <span className='ml-1'>{msg.read ? 'Read' : 'Sent'}</span>}
                  </div>
                </div>
              </div>
            ))
          )}
          <div className='flex justify-start items-center mb-2 mt-2'>
            {isTyping && (
              <TypingIndicator avatarUrl={otherParticipant?.avatarUrl || ''} name={otherParticipant?.name || ''} />
            )}
          </div>
          <div ref={scrollRef} />
        </ScrollArea>
      )}

      <div className='p-2 md:p-4 border-t flex gap-2 bg-background'>
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder='Type a message...'
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className='flex-1 text-xs md:text-sm'
        />
        <Button size='icon' onClick={handleSend}>
          <PaperPlaneRight size={18} weight='fill' />
        </Button>
        <Button size='icon' variant='outline' asChild>
          <label>
            {/* <input type='file' accept='image/*' className='hidden' onChange={handleImageUpload} /> */}
            <ImageSquare size={18} />
          </label>
        </Button>
      </div>
    </div>
  )
}

export default ChatBox
