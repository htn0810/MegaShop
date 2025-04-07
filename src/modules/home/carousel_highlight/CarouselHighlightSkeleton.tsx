import { Skeleton } from '@/components/ui/skeleton'

const CarouselHighlightSkeleton = () => {
  return (
    <div className='mt-6 py-2 md:p-6'>
      <Skeleton className='h-6 w-52 mb-4 bg-gray-200' />
      <Skeleton className='h-5 w-36 mb-6 bg-gray-200' />
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div key={index} className='flex flex-col gap-2'>
              <Skeleton className='w-full aspect-square rounded-md bg-gray-200' />
              <Skeleton className='h-5 w-3/4 bg-gray-200' />
              <div className='flex gap-2'>
                <Skeleton className='h-5 w-1/2 bg-gray-100' />
                <Skeleton className='h-5 w-1/2 bg-gray-100' />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default CarouselHighlightSkeleton
