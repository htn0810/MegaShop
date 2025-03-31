import { Fragment, useEffect, useState } from 'react'
import CarouselBanner from '@/modules/home/carousel_banner/CarouselBanner'
import CarouselHighlight from '@/modules/home/carousel_highlight'
import { BestSellingProducts, FlashSaleProducts } from '@/assets/dummyDatas/products'
import Policies from '@/modules/home/policies'
import NewArrival from '@/modules/home/new_arrival'
import { useTranslation } from 'react-i18next'
import { CategoryApi } from '@/apis/category/category'
import { ICategoryResponse } from '@/apis/category/categoryInterface'

const Home = () => {
  const { t } = useTranslation()
  const [categories, setCategories] = useState<ICategoryResponse[]>([])
  const flashSalesProducts = FlashSaleProducts
  const bestSellingProducts = BestSellingProducts

  const handleGetAllCategories = async () => {
    const response = await CategoryApi.getAllCategories()
    if (response.status === 200) {
      setCategories(response.data.data)
    }
  }

  useEffect(() => {
    handleGetAllCategories()
  }, [])

  return (
    <Fragment>
      <CarouselBanner />
      <div className='mt-6'>
        <CarouselHighlight
          isFlashSales
          subTitle={t('home.product.today')}
          title={t('home.product.flash_sale')}
          showViewAll
          type='product'
          products={flashSalesProducts}
        />
      </div>
      <div className='mt-6'>
        {categories && categories.length > 0 && (
          <CarouselHighlight
            subTitle={t('home.product.categories')}
            title={t('home.product.browse_categories')}
            type='category'
            categories={categories}
          />
        )}
      </div>
      <div className='mt-6'>
        <CarouselHighlight
          subTitle={t('home.product.this_month')}
          title={t('home.product.best_selling')}
          type='product'
          products={bestSellingProducts}
          showViewAll
        />
      </div>
      <div className='my-6'>
        <NewArrival />
      </div>
      <div className='flex flex-col justify-around my-10 md:flex-row gap-y-6 md:gap-y-0'>
        <Policies />
      </div>
    </Fragment>
  )
}

export default Home
