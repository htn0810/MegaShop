import { IProduct } from '@/apis/product/productInterface'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import Rating from '@/components/ui/rating'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ShoppingCart } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'

type Props = {
  product: IProduct
  showType?: 'grid' | 'list'
}

const ProductItem = (props: Props) => {
  const { t } = useTranslation()
  const { product, showType = 'grid' } = props
  return (
    <Card className='overflow-hidden border-none shadow-none cursor-pointer'>
      {showType === 'grid' ? (
        <>
          <div className='relative w-full group'>
            <img
              src={product?.imageUrls?.split(',')[0]}
              alt='productImg'
              className={`w-full aspect-portrait object-cover`}
            />
            <Button className='absolute bottom-0 left-0 right-0 w-full py-4 transition-all duration-500 ease-in-out rounded-none opacity-0 group-hover:opacity-100'>
              {t('product_detail.add_to_cart')}
            </Button>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CardTitle className='my-2 text-lg font-semibold truncate'>{product.name}</CardTitle>
              </TooltipTrigger>
              <TooltipContent>
                <p>{product.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <CardDescription className='flex items-center justify-between '>
            <span className='font-bold text-red-500'>
              {t('product_detail.currency')}
              {product.price}
            </span>
            <Rating val={product.rating} />
          </CardDescription>
        </>
      ) : (
        <div className='grid grid-cols-10 gap-x-4'>
          <div className='w-full col-span-3'>
            <img
              src={product?.imageUrls?.split(',')[0]}
              alt='productImg'
              className='w-full h-[140px] sm:h-[200px] md:h-[230px] xl:h-[260px] 2xl:h-[300px] object-cover rounded-xl'
            />
          </div>
          <div className='col-span-7 bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-2'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CardTitle className='my-0 py-0 2xl:my-2 text-sm md:text-base xl:text-lg font-semibold truncate'>
                    {product.name}
                  </CardTitle>
                </TooltipTrigger>
                <TooltipContent>
                  <h4>{product.name}</h4>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className='xl:mt-2 flex md:gap-x-4 gap-x-2 items-baseline'>
              <Rating val={product.rating} />
              <span className='font-semibold text-gray-400 text-xs md:text-base'>0 {t('product_detail.reviews')}</span>
            </div>
            <div className='sm:mt-1 xl:mt-2 flex md:gap-x-4 gap-x-2 items-baseline'>
              <span className='font-bold text-red-500 md:text-lg xl:text-xl'>
                {t('product_detail.currency')}
                {product.price}
              </span>
              <span className='line-through text-sm xl:text-base text-gray-400 font-semibold'>
                {t('product_detail.currency')}
                {Math.round(product.price * 0.8)}
              </span>
              <span className='font-bold text-sm md:text-base xl:text-lg'>24% OFF</span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className='sm:mt-1 xl:mt-4 text-xs md:text-sm xl:text-base text-gray-600 dark:text-gray-400 line-clamp-1 sm:line-clamp-2 md:line-clamp-3 leading-5'>
                    {product.description}
                  </p>
                </TooltipTrigger>
                <TooltipContent className='w-[300px] md:w-[400px]'>
                  <span>{product.description}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              variant='outline'
              className='sm:mt-4 2xl:mt-6 flex gap-x-2 px-2 sm:px-4 py-1 h-8 md:h-10 items-center bg-black text-white hover:bg-gray-700 hover:text-white dark:bg-gray-300 dark:text-black dark:hover:text-black dark:hover:bg-gray-500'
            >
              <ShoppingCart size={14} weight='bold' />
              <span className='text-xs sm:text-base'>{t('product_detail.add_to_cart')}</span>
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}

export default ProductItem
