import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { ConversationApi } from '@/apis/conversation/conversation'
import { useUserStore } from '@/store/userStore'
import { cleanUpListeners, getSocket } from '@/configs/socket'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { Conversation, Message, SelectedConversation } from '@/types/conversation.type'
import { produce } from 'immer'
import ChatSection from '@/components/chat/ChatSection'

const Chat = () => {
  const { user: currentUser } = useUserStore()
  const [selectedConversation, setSelectedConversation] = useState<SelectedConversation | null>(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [conversations, setConversations] = useState<Conversation[]>([])

  const socket = getSocket()
  // Fetch conversations
  const handleGetConversations = async () => {
    try {
      const response = await ConversationApi.getConversationByUserId(currentUser!.id)
      const conversationsData = response.data.data.map((convo: Conversation) => {
        // Count unread messages for each conversation
        const unreadCount = convo.messages.filter((msg) => !msg.read && msg.senderId !== currentUser?.id).length
        return { ...convo, unreadCount }
      })

      setConversations(conversationsData)
    } catch (error) {
      toast.error('Failed to load conversations')
    }
  }

  const handleGetConversationById = async (id: number) => {
    try {
      const response = await ConversationApi.getConversationById(id)
      const conversationData = response.data.data
      return conversationData
    } catch (error) {
      toast.error('Failed to load conversation')
    }
  }

  // Handle selecting a conversation
  const handleSelectConversation = (userId: number) => {
    const conversation = conversations.find((c) =>
      c.participants.some((p) => p.user.id === userId && p.user.id !== currentUser?.id),
    )

    if (!conversation) return

    const participant = conversation?.participants.find((p) => p.user.id !== currentUser?.id)

    if (!participant) return

    // setUserStatus(participant?.user.chatStatus || 'OFFLINE')
    setSelectedConversation({ otherParticipant: participant, conversationId: conversation.id })

    // Mark all unread messages as read when selecting the conversation
    if (conversation.unreadCount && conversation.unreadCount > 0) {
      socket.emit('readMessage', { senderId: participant.user.id, conversationId: conversation.id })

      setConversations(
        produce(conversations, (draft) => {
          const updatedConversation: Conversation | undefined = draft.find((c) => c.id === conversation?.id)
          if (updatedConversation) {
            updatedConversation.unreadCount = 0
            updatedConversation.messages = conversation.messages.map((msg: Message) =>
              msg.senderId !== currentUser?.id ? { ...msg, read: true } : msg,
            )
          }
        }),
      )
    }
  }

  // Load conversations on component mount
  useEffect(() => {
    handleGetConversations()
  }, [])

  useEffect(() => {
    // Join conversation
    socket.emit('registerUser', { userId: currentUser?.id })

    // Listen for newMessageNotification (when a new message is sent, but not in chat room)
    socket.on('newMessageNotification', async ({ conversationId, message }) => {
      if (conversationId !== selectedConversation?.conversationId) {
        const conversation = conversations.find((c) => c.id === conversationId)
        if (conversation) {
          setConversations(
            produce(conversations, (draft) => {
              const updatedConversation: Conversation | undefined = draft.find((c) => c.id === conversationId)
              if (updatedConversation) {
                updatedConversation.unreadCount = (updatedConversation.unreadCount || 0) + 1
                updatedConversation.messages.push(message)
              }
            }),
          )
        } else {
          // add new conversation
          const newConversation = await handleGetConversationById(conversationId)
          setConversations(
            produce(conversations, (draft) => {
              newConversation.unreadCount = newConversation?.messages?.lenght || 1
              draft.push(newConversation)
            }),
          )
        }
      }
    })

    // Clean up on unmount
    return () => {
      cleanUpListeners(['newMessageNotification'])
    }
  }, [currentUser?.id, selectedConversation?.conversationId, conversations.length])

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col md:flex-row h-full gap-4 md:max-h-[600px]'>
        {/* User List - Left Side */}
        <Card className='w-full md:w-1/3 lg:w-1/4 flex flex-col max-h-[400px]  md:max-h-[600px]'>
          <CardHeader className='px-4 py-3'>
            <CardTitle className='text-sm'>Conversations</CardTitle>
            <div className='relative'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search users...'
                className='pl-8 text-xs'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className='flex-1 p-0 overflow-y-auto'>
            <div className='flex flex-col gap-2 px-4 pb-2 w-full'>
              {conversations?.length === 0 ? (
                <p className='text-center py-4 text-muted-foreground text-xs'>No conversations found</p>
              ) : (
                conversations?.map((conver) => {
                  const otherParicipant = conver.participants.find((p) => p.user.id !== currentUser?.id)
                  if (!otherParicipant) return null
                  const unreadCount = conver.unreadCount || 0
                  return (
                    <div
                      key={otherParicipant?.user.id}
                      className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${
                        selectedConversation?.otherParticipant.userId === otherParicipant?.user.id
                          ? 'bg-primary/10'
                          : 'hover:bg-secondary/50'
                      }`}
                      onClick={() => handleSelectConversation(otherParicipant?.user.id)}
                    >
                      <div className='relative'>
                        <Avatar className='h-10 w-10'>
                          <AvatarImage src={otherParicipant?.user.avatarUrl} alt={otherParicipant?.user.name} />
                          <AvatarFallback>{otherParicipant?.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>

                        {unreadCount > 0 && (
                          <Badge
                            className='absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center'
                            variant='destructive'
                          >
                            {unreadCount > 99 ? '99+' : unreadCount}
                          </Badge>
                        )}
                      </div>
                      <h3 className='font-medium truncate text-xs md:text-sm'>{otherParicipant?.user.name}</h3>
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area - Right Side */}
        {selectedConversation && (
          <ChatSection
            selectedConversation={selectedConversation}
            conversations={conversations}
            setConversations={setConversations}
          />
        )}
        {!selectedConversation && (
          <div className='flex-1 flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center h-full p-4 text-center'>
              <h3 className='text-sm font-medium mb-2'>No Conversation Selected</h3>
              <p className='text-muted-foreground text-xs'>Select a conversation from the list to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Chat
