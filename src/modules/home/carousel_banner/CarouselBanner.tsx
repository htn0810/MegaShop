import { Card } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

const CarouselBanner = () => {
  return (
    <div className='w-full'>
      <Carousel className='w-full'>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className='p-1'>
                <Card className='w-full'>
                  <img
                    className='w-full max-h-[400px] md:max-h-[600px] 2xl:max-h-[800px] bg-cover'
                    src='https://images.unsplash.com/photo-1524532787116-e70228437bbe?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    alt='BannerImg'
                  />
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-0 w-10 h-10 shadow-lg md:-left-6 xl:w-14 xl:h-14' />
        <CarouselNext className='right-0 w-10 h-10 shadow-lg md:-right-6 xl:w-14 xl:h-14' />
      </Carousel>
    </div>
  )
}

export default CarouselBanner
