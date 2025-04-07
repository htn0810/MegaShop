import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

const ProductDetailSkeleton = () => {
  return (
    <div className='py-10'>
      <div className='flex md:flex-row flex-col gap-6'>
        {/* Skeleton for DoubleCarousel - matched to actual component structure */}
        <div className='flex flex-col gap-y-6 w-full md:w-1/2'>
          {/* Main image carousel skeleton */}
          <Carousel className='w-full md:max-w-2xl'>
            <CarouselContent>
              <CarouselItem>
                <div className='p-1'>
                  <Card>
                    <CardContent className='flex aspect-square items-center justify-center p-0 rounded-md overflow-hidden'>
                      <Skeleton className='w-full h-full bg-gray-200' />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>

          {/* Thumbnail carousel skeleton */}
          <Carousel className='w-full md:max-w-xl'>
            <CarouselContent className='-ml-1'>
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <CarouselItem key={index} className='pl-1 basis-1/4'>
                    <div className='p-1'>
                      <Card>
                        <CardContent className='flex aspect-square items-center justify-center p-0 overflow-hidden rounded-md'>
                          <Skeleton className='w-full h-full bg-gray-100' />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Product details skeleton */}
        <div className='w-full md:w-1/2'>
          {/* Product name skeleton */}
          <Skeleton className='h-7 w-3/4 mb-4 bg-gray-200' />

          {/* Rating and reviews skeletons */}
          <div className='flex gap-6 mt-4 pb-6 border-b-2 border-b-gray-100 items-center'>
            <Skeleton className='h-5 w-28 bg-gray-100' />
            <Skeleton className='h-5 w-20 ml-4 bg-gray-100' />
          </div>

          {/* Price skeleton */}
          <div className='flex gap-6 mt-4 items-center'>
            <Skeleton className='h-7 w-24 bg-gray-200' />
          </div>

          {/* Product details grid skeleton */}
          <div className='grid grid-flow-row mt-2 gap-y-2 pb-6 border-b-2 border-b-gray-100'>
            <div className='flex gap-x-1'>
              <Skeleton className='h-5 w-20 basis-1/5 bg-gray-100' />
              <Skeleton className='h-5 w-24 bg-gray-100' />
            </div>
            <div className='flex'>
              <Skeleton className='h-5 w-20 basis-1/5 bg-gray-100' />
              <Skeleton className='h-5 w-28 bg-gray-100' />
            </div>
            <Skeleton className='h-5 w-32 bg-gray-100' />
          </div>

          {/* Add to cart section skeleton */}
          <div className='mt-2 py-4 flex gap-x-4 md:gap-x-14 items-center'>
            {/* Product counter skeleton */}
            <Skeleton className='h-10 w-32 bg-gray-200' />
            {/* Button skeleton */}
            <Skeleton className='h-10 w-40 bg-gray-200' />
          </div>
        </div>
      </div>

      {/* View shop skeleton */}
      <div className='mt-6 md:p-6 px-2 py-4 rounded-md border border-gray-200'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-3'>
            <Skeleton className='h-12 w-12 rounded-full bg-gray-200' />
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-5 w-40 bg-gray-200' />
              <Skeleton className='h-4 w-24 bg-gray-200' />
            </div>
          </div>
          <div className='flex gap-3 mt-2'>
            <Skeleton className='h-9 w-28 bg-gray-200' />
            <Skeleton className='h-9 w-28 bg-gray-200' />
          </div>
        </div>
      </div>

      {/* Product description skeleton */}
      <div className='mt-6 py-2 md:p-6'>
        <Skeleton className='h-6 w-44 mb-4 bg-gray-200' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-full bg-gray-100' />
          <Skeleton className='h-4 w-full bg-gray-100' />
          <Skeleton className='h-4 w-3/4 bg-gray-100' />
        </div>
      </div>
    </div>
  )
}

export default ProductDetailSkeleton
