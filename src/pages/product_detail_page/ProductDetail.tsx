import { ProductApi } from '@/apis/product/product'
import { IProduct } from '@/apis/product/productInterface'
import { Button } from '@/components/ui/button'
import Rating from '@/components/ui/rating'
import CarouselHighlight from '@/modules/home/carousel_highlight'
import DoubleCarousel from '@/modules/products/double_carousel'
import ProductCounter from '@/modules/products/product_counter'
import ViewShop from '@/modules/products/view_shop'
import { ShoppingCart } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useParams } from 'react-router-dom'
import ProductDetailSkeleton from './ProductDetailSkeleton'
import { IShop } from '@/types/user.type'
import { CategoryApi } from '@/apis/category/category'
import CarouselHighlightSkeleton from '@/modules/home/carousel_highlight/CarouselHighlightSkeleton'

const ProductDetail = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const [product, setProduct] = useState<IProduct | null>(null)
  const [shop, setShop] = useState<IShop | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingRelatedProducts, setIsLoadingRelatedProducts] = useState(false)

  const handleGetProductById = async () => {
    setIsLoading(true)
    try {
      const response = await ProductApi.getProductById(Number(id))
      setProduct(response.data.data)
      setShop(response.data.data.shop)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGetRelatedProducts = async (categoryId: number) => {
    try {
      setIsLoadingRelatedProducts(true)
      const response = await CategoryApi.getProductsByCategory(categoryId)
      setRelatedProducts(response.data.data)
    } finally {
      setIsLoadingRelatedProducts(false)
    }
  }

  useEffect(() => {
    handleGetProductById()
  }, [id])

  useEffect(() => {
    if (product?.categoryId) {
      handleGetRelatedProducts(product.categoryId)
    }
  }, [product?.categoryId])

  if (!id) {
    return <Navigate to='/not_found' />
  }

  if (isLoading) {
    return <ProductDetailSkeleton />
  }

  return (
    <div className='py-2 md:py-6 lg:py-10'>
      <div className='flex md:flex-row flex-col gap-6'>
        <DoubleCarousel images={product?.imageUrls.split(',') || []} />
        <div>
          <h4 className='font-bold text-lg'>{product?.name}</h4>
          <div className='flex gap-6 mt-4 pb-6 border-b-2 border-b-gray-100 items-center'>
            <Rating val={product?.rating || 0} />
            <span className='font-semibold text-gray-400 block pl-4 border-l-gray-200 border-l-2'>
              {0} {t('product_detail.reviews')}
            </span>
          </div>
          <div className='flex gap-6 mt-4 items-center'>
            <span className='text-xl font-bold'>{product?.price}</span>
            {/* <span className='text-gray-400 font-semibold line-through'>$534,33</span>
            <span className='font-semibold text-red-500'>24% Off</span> */}
          </div>
          <div className='grid grid-flow-row mt-2 gap-y-2 pb-6 border-b-2 border-b-gray-100'>
            <div className='flex gap-x-1'>
              <span className='basis-1/5'>{t('product_detail.availability')}</span>
              <span>{product?.stock} in stock</span>
            </div>
            <div className='flex'>
              <span className='basis-1/5'>{t('product_detail.category')}</span>
              <span>{product?.category?.name}</span>
            </div>
            <span>{t('product_detail.free_ship')}</span>
          </div>
          <div className='mt-2 py-4 flex gap-x-4 md:gap-x-14 items-center'>
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
      <div className='mt-6 md:p-6 px-2 py-4 rounded-md border border-gray-200'>{shop && <ViewShop shop={shop} />}</div>
      <div className='mt-6 py-2 md:p-6'>
        <h5 className='font-bold'>CHI TIẾT SẢN PHẨM</h5>
        <p className='mt-2'>{product?.description}</p>
      </div>
      <div className='mt-6 py-2 md:p-6'>
        {isLoadingRelatedProducts ? (
          <CarouselHighlightSkeleton />
        ) : (
          <CarouselHighlight
            subTitle={t('product_detail.products')}
            type='product'
            title={t('product_detail.related_products')}
            products={relatedProducts}
          />
        )}
      </div>
    </div>
  )
}

export default ProductDetail
