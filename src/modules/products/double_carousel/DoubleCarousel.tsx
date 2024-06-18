import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useState } from 'react'

const IMAGE_DUMMY: string[] = [
  'https://images.unsplash.com/photo-1658457459792-f4dfe37407ca?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1657586640569-4a3d4577328c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1643330683233-ff2ac89b002c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1653525749885-46a75af1eb5d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1654263391025-4c4809a37f5c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
]
const DoubleCarousel = () => {
  const [selectedImg, setSelectedImg] = useState<string>(IMAGE_DUMMY[0])
  return (
    <div className='flex flex-col gap-y-6'>
      <Carousel className='w-full md:max-w-2xl'>
        <CarouselContent>
          <CarouselItem>
            <div className='p-1'>
              <Card>
                <CardContent className='flex aspect-square items-center justify-center p-0 rounded-md overflow-hidden'>
                  <img src={selectedImg} alt='ProductImage' className='w-full h-full bg-cover' />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <Carousel className='w-full md:max-w-xl'>
        <CarouselContent className='-ml-1'>
          {IMAGE_DUMMY.map((src, index) => (
            <CarouselItem key={index} className='pl-1 basis-1/4'>
              <div className='p-1'>
                <Card className='cursor-pointer'>
                  <CardContent
                    className='flex aspect-square items-center justify-center p-0 overflow-hidden rounded-md'
                    onClick={() => setSelectedImg(src)}
                  >
                    <img src={src} alt='ProductImage' className='w-full h-full bg-cover' />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default DoubleCarousel
