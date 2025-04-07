import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useEffect, useState } from 'react'

type Props = {
  images: string[]
}
const DoubleCarousel = (props: Props) => {
  const { images } = props
  const [selectedImg, setSelectedImg] = useState<string>(images[0])

  useEffect(() => {
    setSelectedImg(images[0])
  }, [images.length])

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
          {images.map((src, index) => (
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
