import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Props = {
  avatarUrl: string
  name: string
}

const TypingIndicator = ({ avatarUrl, name }: Props) => {
  return (
    <div className='flex items-start gap-2'>
      <Avatar className='h-7 w-7'>
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className='flex items-center bg-secondary rounded-lg py-2 px-3'>
        <div className='flex space-x-1.5'>
          <div
            className='w-2 h-2 rounded-full bg-muted-foreground/70 animate-typing-dot'
            style={{ animationDelay: '0ms' }}
          ></div>
          <div
            className='w-2 h-2 rounded-full bg-muted-foreground/70 animate-typing-dot'
            style={{ animationDelay: '300ms' }}
          ></div>
          <div
            className='w-2 h-2 rounded-full bg-muted-foreground/70 animate-typing-dot'
            style={{ animationDelay: '600ms' }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator
