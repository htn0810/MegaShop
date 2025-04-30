import TypingIndicator from '@/components/typing_indicator/TypingIndicator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cleanUpSocket, socket } from '@/configs/socket'
import { useUserStore } from '@/store/userStore'
import { Conversation, Message, Participant, SelectedConversation } from '@/types/conversation.type'
import { produce } from 'immer'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  selectedConversation: SelectedConversation
  conversations: Conversation[]
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>
}

const ChatSection = (props: Props) => {
  const { user: currentUser } = useUserStore()
  const { selectedConversation, conversations, setConversations } = props
  const currentConversation = conversations.find((c) => c.id === selectedConversation?.conversationId)
  const [messages, setMessages] = useState<Message[]>(currentConversation?.messages || [])
  const [otherParticipant, setOtherParticipant] = useState<Participant['user']>(
    selectedConversation.otherParticipant.user,
  )
  const scrollRef = useRef<HTMLDivElement>(null)
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const typingTimeout = useRef<NodeJS.Timeout | null>(null)

  // Handle sending a new message
  const handleSendMessage = (selectedUserId: number) => {
    if (!message.trim() || !selectedUserId) return

    if (selectedConversation?.otherParticipant.userId !== selectedUserId) {
      toast.error('Could not send message: Conversation not found')
      return
    }

    try {
      const conversationId = selectedConversation?.conversationId

      socket.emit('sendMessage', {
        conversationId: conversationId,
        senderId: currentUser?.id,
        content: message,
        type: 'TEXT',
      })

      socket.emit('stopTyping', { conversationId: conversationId, senderId: currentUser?.id })
      setMessage('')
    } catch (error) {
      toast.error('Failed to send message')
    }
  }

  // Typing logic
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedConversation?.conversationId) return
    const value = e.target.value
    setMessage(value)

    socket.emit('typing', {
      conversationId: selectedConversation.conversationId,
      senderId: currentUser?.id,
    })

    if (typingTimeout.current) clearTimeout(typingTimeout.current)
    typingTimeout.current = setTimeout(() => {
      if (selectedConversation?.conversationId) {
        socket.emit('stopTyping', {
          conversationId: selectedConversation.conversationId,
          senderId: currentUser?.id,
        })
      }
    }, 2000)
  }

  useEffect(() => {
    const currentConversation = conversations.find((c) => c.id === selectedConversation?.conversationId)
    setMessages(currentConversation?.messages || [])
    setOtherParticipant(selectedConversation.otherParticipant.user)
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [selectedConversation.conversationId])

  // Connect socket and listen for events
  useEffect(() => {
    if (!currentUser?.id || !selectedConversation) return

    // Connect to socket
    socket.connect()

    // Join conversation
    socket.emit('joinConversation', { conversationId: selectedConversation.conversationId })

    // Listen for new messages
    socket.on('newMessage', (message: Message) => {
      setConversations(
        produce(conversations, (draft) => {
          const conversation = draft.find((c) => c.id === message.conversationId)
          if (conversation) {
            if (conversation.id === selectedConversation.conversationId) {
              conversation.messages.push(message)
              setMessages(
                produce(messages, (draft) => {
                  draft.push(message)
                }),
              )
              if (message.senderId !== currentUser?.id) {
                socket.emit('readMessage', {
                  messageId: message.id,
                  conversationId: selectedConversation.conversationId,
                })
              }
            } else {
              conversation.messages.push({ ...message, read: false })
              conversation.unreadCount = conversation.unreadCount ? conversation.unreadCount + 1 : 1
            }
            conversation.messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          }
        }),
      )
    })

    socket.on('statusUpdate', ({ userId, status }) => {
      if (userId === otherParticipant?.id) {
        setOtherParticipant((prev) => ({ ...prev, chatStatus: status }))
      }
    })

    // Read message
    socket.on('messageRead', ({ messageId, read }) => {
      setMessages(
        produce(messages, (draft) => {
          const messageIdx = draft.findIndex((msg) => msg.id === messageId)
          if (messageIdx !== -1) {
            draft[messageIdx].read = read
          }
        }),
      )
      setConversations(
        produce(conversations, (draft) => {
          const conversation = draft.find((c) => c.id === selectedConversation?.conversationId)
          if (conversation) {
            const messageIdx = conversation.messages.findIndex((msg) => msg.id === messageId)
            if (messageIdx !== -1) {
              conversation.messages[messageIdx].read = read
            }
          }
        }),
      )
    })

    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    // Typing indicator
    socket.on('typing', ({ senderId }) => {
      if (senderId !== currentUser?.id && selectedConversation?.otherParticipant.userId === senderId) {
        setIsTyping(true)
      }
    })

    socket.on('stopTyping', ({ senderId }) => {
      if (senderId !== currentUser?.id && selectedConversation?.otherParticipant.userId === senderId) {
        setIsTyping(false)
      }
    })

    // Error handling
    socket.on('error', (error) => {
      toast.error(error.message || 'An error occurred')
    })

    // Clean up on unmount
    return () => {
      socket.disconnect()
      cleanUpSocket()
    }
  }, [currentUser?.id, conversations, selectedConversation])

  return (
    <Card className='flex-1 hidden md:flex flex-col '>
      <CardHeader className='px-4 py-3 border-b'>
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src={otherParticipant.avatarUrl} alt={otherParticipant.name} />
              <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div
              className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background ${
                otherParticipant.chatStatus === 'ONLINE' ? 'bg-green-500' : 'bg-gray-400'
              }`}
            />
          </div>
          <div>
            <CardTitle className='text-lg'>{otherParticipant.name}</CardTitle>
            <p className='text-xs text-muted-foreground'>
              {otherParticipant.chatStatus === 'ONLINE' ? 'Online now' : `Offline`}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className='flex-1 p-0 overflow-hidden flex flex-col '>
        <ScrollArea className='p-4 h-[500px]'>
          <div className='space-y-4'>
            {messages?.map((msg) => (
              <div
                key={msg.id}
                className={`flex text-xs md:text-sm ${msg.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    msg.senderId === currentUser?.id ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                  }`}
                >
                  {msg.type === 'TEXT' ? (
                    <p>{msg.content}</p>
                  ) : (
                    <img src={msg.content} alt='Chat image' className='max-w-[200px] rounded' />
                  )}
                  <div
                    className={`flex justify-between text-xs mt-1 ${
                      msg.senderId === currentUser?.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}
                  >
                    <span className='text-xs'>{new Date(msg.createdAt).toLocaleTimeString()}</span>
                    {msg.senderId === currentUser?.id && (
                      <span className='text-xs ml-1'>{msg.read ? 'Read' : 'Sent'}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className='flex justify-start items-center mb-2 mt-2'>
              {isTyping && <TypingIndicator avatarUrl={otherParticipant.avatarUrl} name={otherParticipant.name} />}
            </div>
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
        <div className='p-3 border-t flex gap-2'>
          <Input
            value={message}
            onChange={handleInputChange}
            placeholder='Type your message...'
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(selectedConversation.otherParticipant.userId)}
            className='flex-1'
          />
          <Button
            className='shrink-0'
            onClick={() => handleSendMessage(selectedConversation.otherParticipant.userId)}
            disabled={!message.trim()}
          >
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ChatSection
