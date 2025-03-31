import { ICategoryResponse } from '@/apis/category/categoryInterface'
import { IProduct } from '@/assets/dummyDatas/dummyModels'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import ProductItem from '@/modules/products/product_item'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

type Props = {
  subTitle: string
  title: string
  type: 'product' | 'category'
  products?: IProduct[] | undefined
  categories?: ICategoryResponse[] | undefined
  showViewAll?: boolean
  isFlashSales?: boolean
}

const CarouselHighlight = (props: Props) => {
  const { subTitle, title, type, products, categories, showViewAll, isFlashSales } = props
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <Fragment>
      <Carousel
        opts={{
          align: 'start',
        }}
        className='w-full'
      >
        <div className='flex gap-x-2 center'>
          <span className='block w-3 bg-black rounded-sm dark:bg-white'></span>
          <span className='font-semibold'>{subTitle}</span>
        </div>
        <div className='flex justify-between'>
          <div className='flex items-center gap-x-8'>
            <span className='text-xl font-bold'>{title}</span>
            {isFlashSales && (
              <div className='flex items-center md:gap-x-4 gap-x-2'>
                <div className='flex flex-col items-center'>
                  <span className='text-sm font-semibold'>{t('home.product.sale_day')}</span>
                  <span className='text-lg font-bold md:text-3xl'>03</span>
                </div>
                <span className='text-xl font-bold text-red-500'>:</span>
                <div className='flex flex-col items-center'>
                  <span className='text-sm font-semibold'>{t('home.product.sale_hour')}</span>
                  <span className='text-lg font-bold md:text-3xl'>23</span>
                </div>
                <span className='text-xl font-bold text-red-500'>:</span>
                <div className='flex flex-col items-center'>
                  <span className='text-sm font-semibold'>{t('home.product.sale_minute')}</span>
                  <span className='text-lg font-bold md:text-3xl'>19</span>
                </div>
                <span className='text-xl font-bold text-red-500'>:</span>
                <div className='flex flex-col items-center'>
                  <span className='text-sm font-semibold'>{t('home.product.sale_second')}</span>
                  <span className='text-lg font-bold md:text-3xl'>56</span>
                </div>
              </div>
            )}
          </div>
          <div className='items-center hidden md:flex gap-x-4 '>
            <CarouselPrevious className='relative inset-0 w-10 h-10 translate-x-0 translate-y-0 shadow-lg xl:w-14 xl:h-14 dark:bg-white dark:text-black dark:border-none' />
            <CarouselNext className='relative inset-0 w-10 h-10 translate-x-0 translate-y-0 shadow-lg xl:w-14 xl:h-14 dark:bg-white dark:text-black dark:border-none' />
          </div>
        </div>
        <CarouselContent className='mt-6'>
          {type === 'product' &&
            products &&
            products.map((product) => (
              <CarouselItem key={product.id} className='basis-1/2 sm:basis-1/3 lg:basis-1/4 2xl:basis-1/5'>
                <div className='p-1' onClick={() => navigate('/product_detail')}>
                  <ProductItem product={product}></ProductItem>
                </div>
              </CarouselItem>
            ))}
          {type === 'category' &&
            categories &&
            categories.map((category) => (
              <CarouselItem key={category.id} className='sm:basis-1/2 md:basis-1/3 lg:basis-1/4 2xl:basis-1/5'>
                <div className='p-1'>
                  <Card className='flex flex-col items-center justify-between p-6 border-2 cursor-pointer hover:border-black dark:bg-white'>
                    <div className='w-[100px] h-[100px] '>
                      <img src={category.imageUrl} alt='CategoryImg' className='w-full h-full object-cover' />
                    </div>
                    <h4 className='font-semibold dark:text-black'>{category.name}</h4>
                  </Card>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <div className='block md:hidden'>
          <CarouselPrevious className='left-0 w-10 h-10 translate-y-1/2 shadow-lg xl:w-14 xl:h-14 dark:bg-white dark:text-black dark:border-none' />
          <CarouselNext className='right-0 w-10 h-10 translate-y-1/2 shadow-lg xl:w-14 xl:h-14 dark:bg-white dark:text-black dark:border-none' />
        </div>
      </Carousel>
      <div className='flex justify-center pb-8 mt-10 border-b-2'>
        {showViewAll && <Button className='px-10 py-6'>{t('home.product.view_all')}</Button>}
      </div>
    </Fragment>
  )
}

export default CarouselHighlight
