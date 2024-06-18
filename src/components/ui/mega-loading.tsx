import { Dialog, DialogContent } from '@/components/ui/dialog'

const MegaLoading = () => {
  return (
    <div className='absolute inset-0 w-full h-full'>
      <Dialog defaultOpen>
        <DialogContent className='flex justify-center bg-transparent border-none shadow-none outline-none' hideCloseBtn>
          <span className='text-white loading loading-infinity loading-lg scale-[200%]'></span>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MegaLoading
