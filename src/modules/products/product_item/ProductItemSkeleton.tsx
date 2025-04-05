import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface ProductItemSkeletonProps {
  showType?: 'grid' | 'list'
}

function ProductItemGridSkeleton() {
  return (
    <>
      <div className='relative w-full'>
        <Skeleton className='w-full aspect-portrait' />
      </div>
      <div className='my-2'>
        <Skeleton className='h-6 w-full mb-2' />
        <div className='flex items-center justify-between'>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-4 w-24' />
        </div>
      </div>
    </>
  )
}

function ProductItemListSkeleton() {
  return (
    <div className='grid grid-cols-10 gap-x-4'>
      <div className='w-full col-span-3'>
        <Skeleton className='w-full h-[140px] sm:h-[200px] md:h-[230px] xl:h-[260px] 2xl:h-[300px] rounded-xl' />
      </div>
      <div className='col-span-7 bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-2'>
        {/* Product title */}
        <Skeleton className='h-5 md:h-6 xl:h-7 w-4/5 my-2' />

        {/* Rating and reviews */}
        <div className='xl:mt-2 flex md:gap-x-4 gap-x-2 items-baseline'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-4 w-16' />
        </div>

        {/* Price information */}
        <div className='sm:mt-1 xl:mt-2 flex md:gap-x-4 gap-x-2 items-baseline'>
          <Skeleton className='h-5 md:h-6 xl:h-7 w-16 md:w-20' />
          <Skeleton className='h-4 md:h-5 w-12 md:w-16' />
          <Skeleton className='h-4 md:h-5 w-14 md:w-16' />
        </div>

        {/* Description */}
        <Skeleton className='sm:mt-1 xl:mt-4 h-4 md:h-5 w-full' />
        <Skeleton className='mt-1 h-4 md:h-5 w-3/4 sm:block hidden' />
        <Skeleton className='mt-1 h-4 md:h-5 w-1/2 md:block hidden' />

        {/* Button */}
        <Skeleton className='sm:mt-4 2xl:mt-6 h-8 md:h-10 w-32 md:w-40' />
      </div>
    </div>
  )
}

function ProductItemSkeleton({ showType = 'grid' }: ProductItemSkeletonProps) {
  return (
    <Card className='overflow-hidden border-none shadow-none cursor-pointer animate-pulse'>
      {showType === 'grid' ? <ProductItemGridSkeleton /> : <ProductItemListSkeleton />}
    </Card>
  )
}

export default ProductItemSkeleton
