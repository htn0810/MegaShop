import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'

const CartProductItemSkeleton = () => {
  return (
    <div className='grid grid-cols-8 p-2 md:p-4 shadow-gray-200 shadow-sm rounded-md mt-4 items-center'>
      {/* Desktop View */}
      <div className='hidden md:flex col-span-3 gap-x-2 md:gap-x-4 items-center'>
        <div className='flex items-center justify-center opacity-50'>
          <Checkbox id='product-skeleton' disabled />
        </div>
        <Skeleton className='w-20 h-20' />
        <Skeleton className='h-5 flex-1' />
      </div>
      <div className='hidden md:block text-center'>
        <Skeleton className='h-5 w-16 mx-auto' />
      </div>
      <div className='hidden md:flex justify-center col-span-2'>
        <Skeleton className='h-10 w-32' />
      </div>
      <div className='hidden md:block text-center'>
        <Skeleton className='h-5 w-20 mx-auto' />
      </div>
      <div className='hidden md:flex justify-end'>
        <Skeleton className='h-9 w-9 rounded-md' />
      </div>

      {/* Mobile View */}
      <div className='flex md:hidden col-span-8 gap-x-2'>
        <div className='flex w-fit items-center gap-x-2'>
          <div className='flex items-center justify-center opacity-50'>
            <Checkbox id='product-skeleton-mobile' disabled />
          </div>
          <Skeleton className='w-16 h-16' />
        </div>
        <div className='flex flex-col gap-y-2 w-full'>
          <div className='grid grid-cols-8 gap-x-2 items-center'>
            <Skeleton className='h-5 col-span-7' />
            <div className='flex justify-end'>
              <Skeleton className='h-5 w-5 rounded-md' />
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <Skeleton className='h-4 w-16' />
            <Skeleton className='h-8 w-24' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartProductItemSkeleton
