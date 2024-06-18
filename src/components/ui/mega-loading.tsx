import { Dialog, DialogContent } from '@/components/ui/dialog'

const MegaLoading = () => {
  return (
    <div className='absolute inset-0 w-full h-full'>
      <Dialog open>
        <DialogContent className='flex justify-center bg-transparent border-none'>
          <span className='text-white loading loading-infinity loading-lg'></span>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MegaLoading
