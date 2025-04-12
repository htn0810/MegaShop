import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTranslation } from 'react-i18next'
import { ChatTeardropDots, Minus, X } from '@phosphor-icons/react'
import { DEFAULT_SHOP_AVATAR } from '@/constants/common.constant'
import { useChatStore } from '@/store/chatStore'
import { format } from 'date-fns'

const ChatBox = () => {
  const { t } = useTranslation()
  const [message, setMessage] = useState('')
  const { isChatOpen, isMinimized, activeShop, messages, closeChat, minimizeChat, maximizeChat, sendMessage } =
    useChatStore()

  // If no active chat session, don't render anything
  if (!isChatOpen || !activeShop) return null

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message.trim())
      setMessage('')
    }
  }

  const shopMessages = messages[activeShop.id] || []

  // Render minimized chat pill when minimized
  if (isMinimized) {
    return (
      <div
        className='fixed bottom-4 right-4 bg-background border rounded-lg shadow-lg p-3 z-50 flex items-center gap-2 cursor-pointer'
        onClick={maximizeChat}
      >
        <ChatTeardropDots size={24} className='text-primary' />
        <span className='font-medium'>{activeShop.name}</span>
      </div>
    )
  }

  // Render full chat dialog
  return (
    <div className='fixed bottom-4 right-4 w-80 sm:w-96 bg-background border rounded-lg shadow-lg overflow-hidden z-50 flex flex-col'>
      <div className='p-3 border-b bg-primary text-primary-foreground flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <img
            src={activeShop?.avatarUrl || DEFAULT_SHOP_AVATAR}
            alt={activeShop.name}
            className='w-8 h-8 rounded-full object-cover'
          />
          <span className='font-medium'>{activeShop.name}</span>
        </div>
        <div className='flex gap-1'>
          <Button
            variant='ghost'
            size='icon'
            className='h-7 w-7 text-primary-foreground hover:text-primary-foreground/80'
            onClick={minimizeChat}
          >
            <Minus size={16} />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='h-7 w-7 text-primary-foreground hover:text-primary-foreground/80'
            onClick={closeChat}
          >
            <X size={16} />
          </Button>
        </div>
      </div>

      <div className='flex-grow p-3 h-64 overflow-y-auto bg-gray-50 dark:bg-gray-900'>
        {shopMessages.length === 0 ? (
          <div className='text-center text-gray-500 text-sm my-8'>{t('product_detail.start_conversation')}</div>
        ) : (
          <div className='flex flex-col gap-3'>
            {shopMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[80%] ${
                  msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg ${
                    msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                  }`}
                >
                  {msg.content}
                </div>
                <span className='text-xs text-gray-500 mt-1'>{format(new Date(msg.timestamp), 'HH:mm')}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='p-3 border-t flex gap-2'>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('product_detail.type_message')}
          className='flex-grow'
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button onClick={handleSendMessage}>{t('product_detail.send')}</Button>
      </div>
    </div>
  )
}

export default ChatBox
