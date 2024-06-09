import { Fragment } from 'react'
import CarouselBanner from '@/modules/home/carousel_banner/CarouselBanner'
import PrimaryLayout from '@/layouts/primary_layout'
import CarouselHighlight from '@/modules/home/carousel_highlight'
import { BestSellingProducts, FlashSaleProducts } from '@/assets/dummyDatas/products'
import { DUMMY_CATEGORY } from '@/assets/dummyDatas/category'
import Policies from '@/modules/home/policies'
import Footer from '@/modules/home/footer'
import NewArrival from '@/modules/home/new_arrival'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { t } = useTranslation()
  const flashSalesProducts = FlashSaleProducts
  const categories = DUMMY_CATEGORY
  const bestSellingProducts = BestSellingProducts
  return (
    <Fragment>
      <PrimaryLayout>
        <CarouselBanner />
        <div className='mt-6'>
          <CarouselHighlight
            isFlashSales
            time={t('home.product.today')}
            title={t('home.product.flash_sale')}
            showViewAll
            type='product'
            products={flashSalesProducts}
          />
        </div>
        <div className='mt-6'>
          <CarouselHighlight
            time={t('home.product.categories')}
            title={t('home.product.browse_categories')}
            type='category'
            categories={categories}
          />
        </div>
        <div className='mt-6'>
          <CarouselHighlight
            time={t('home.product.this_month')}
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
        <div className='mt-6'>
          <Footer />
        </div>
      </PrimaryLayout>
    </Fragment>
  )
}

export default Home
