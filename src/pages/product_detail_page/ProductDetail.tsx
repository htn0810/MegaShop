import { RelatedProducts } from '@/assets/dummyDatas/products'
import { Button } from '@/components/ui/button'
import Rating from '@/components/ui/rating'
import CarouselHighlight from '@/modules/home/carousel_highlight'
import DoubleCarousel from '@/modules/products/double_carousel'
import ProductCounter from '@/modules/products/product_counter'
import SelectColor from '@/modules/products/select_color'
import SelectSize from '@/modules/products/select_size'
import ViewShop from '@/modules/products/view_shop'
import { ShoppingCart } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'

const RELATEDPRODUCTS = RelatedProducts

const ProductDetail = () => {
  const { t } = useTranslation()
  return (
    <div className='py-10'>
      <div className='flex gap-6'>
        <DoubleCarousel />
        <div>
          <h4 className='font-bold text-lg'>
            Set đồ đôi nam nữ quà tặng người yêu áo sơ mi và trễ vai nhún nơ 3 tầng vài đũi mát đi biển du lịch [SM1]
          </h4>
          <div className='flex gap-6 mt-4 pb-6 border-b-2 border-b-gray-100 items-center'>
            <Rating val={4} />
            <span className='font-semibold text-gray-400 block pl-4 border-l-gray-200 border-l-2'>
              0 {t('product_detail.reviews')}
            </span>
          </div>
          <div className='flex gap-6 mt-4 items-center'>
            <span className='text-xl font-bold'>$299,43</span>
            <span className='text-gray-400 font-semibold line-through'>$534,33</span>
            <span className='font-semibold text-red-500'>24% Off</span>
          </div>
          <div className='grid grid-flow-row mt-2 gap-y-2 pb-6 border-b-2 border-b-gray-100'>
            <div className='flex'>
              <span className='basis-1/5'>{t('product_detail.availability')}</span>
              <span>{t('product_detail.in_stock')}</span>
            </div>
            <div className='flex'>
              <span className='basis-1/5'>{t('product_detail.category')}</span>
              <span>Accessories</span>
            </div>
            <span>{t('product_detail.free_ship')}</span>
          </div>
          <div className='grid grid-flow-row mt-2 gap-y-2 pb-6 border-b-2 border-b-gray-100 py-2'>
            <SelectColor />
            <SelectSize />
          </div>
          <div className='mt-2 py-4 flex gap-x-14 items-center'>
            <ProductCounter />
            <Button
              variant='outline'
              className='flex gap-x-2 items-center bg-black text-white hover:bg-gray-700 hover:text-white dark:bg-gray-300 dark:text-black dark:hover:text-black dark:hover:bg-gray-500'
            >
              <ShoppingCart size={14} weight='bold' />
              <span>{t('product_detail.add_to_cart')}</span>
            </Button>
          </div>
        </div>
      </div>
      <div className='mt-6 p-6 rounded-md border border-gray-200'>
        <ViewShop />
      </div>
      <div className='mt-6 p-6'>
        <h5 className='font-bold'>CHI TIẾT SẢN PHẨM</h5>
      </div>
      <div className='mt-6 p-6'>
        <CarouselHighlight
          subTitle={t('product_detail.products')}
          type='product'
          title={t('product_detail.related_products')}
          products={RELATEDPRODUCTS}
        />
      </div>
    </div>
  )
}

export default ProductDetail
