import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'

type Props = {
  content?: string | React.ReactNode
}

const MegaLoading = ({ content }: Props) => {
  return (
    <div className='absolute inset-0 w-full h-full'>
      <Dialog defaultOpen>
        <DialogContent
          className='flex flex-col items-center justify-center bg-transparent border-none shadow-none outline-none'
          hideCloseBtn
        >
          <DialogTitle className='hidden' />
          <DialogDescription className='hidden' />
          <span className='text-white loading loading-infinity loading-lg scale-[200%]'></span>
          {content && <div className='text-white'>{content}</div>}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MegaLoading
