import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import ProductItem from '@/modules/products/product_item'

const FlashSale = () => {
  return (
    <div className='mt-6'>
      <div className='flex gap-x-2 center'>
        <span className='block w-3 bg-black rounded-sm'></span>
        <span className='font-semibold'>Today's</span>
      </div>
      <div>
        <div className='flex items-center gap-x-8'>
          <span className='text-xl font-bold'>Flash Sales</span>
          <div className='flex items-center gap-x-4'>
            <div className='flex flex-col items-center'>
              <span className='text-sm font-semibold'>Days</span>
              <span className='text-3xl font-bold'>03</span>
            </div>
            <span className='text-xl font-bold text-red-500'>:</span>
            <div className='flex flex-col items-center'>
              <span className='text-sm font-semibold'>Hours</span>
              <span className='text-3xl font-bold'>23</span>
            </div>
            <span className='text-xl font-bold text-red-500'>:</span>
            <div className='flex flex-col items-center'>
              <span className='text-sm font-semibold'>Minutes</span>
              <span className='text-3xl font-bold'>19</span>
            </div>
            <span className='text-xl font-bold text-red-500'>:</span>
            <div className='flex flex-col items-center'>
              <span className='text-sm font-semibold'>Seconds</span>
              <span className='text-3xl font-bold'>56</span>
            </div>
          </div>
        </div>
      </div>
      <Carousel
        opts={{
          align: 'start',
        }}
        className='w-full mt-6'
      >
        <CarouselContent>
          {Array.from({ length: 8 }).map((_, index) => (
            <CarouselItem key={index} className='sm:basis-1/2 md:basis-1/3 lg:basis-1/4 2xl:basis-1/5'>
              <div className='p-1'>
                <ProductItem star={2}></ProductItem>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='w-10 h-10 shadow-lg -left-6 xl:w-14 xl:h-14' />
        <CarouselNext className='w-10 h-10 shadow-lg -right-6 xl:w-14 xl:h-14' />
      </Carousel>
    </div>
  )
}

export default FlashSale
