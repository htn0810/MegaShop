import { Fragment } from 'react'
import CarouselBanner from '@/modules/home/carousel_banner/CarouselBanner'
import PrimaryLayout from '@/layouts/primary_layout'
import FlashSale from '@/modules/home/flash_sales'

const Home = () => {
  return (
    <Fragment>
      <PrimaryLayout>
        <CarouselBanner />
        <FlashSale />
      </PrimaryLayout>
    </Fragment>
  )
}

export default Home
