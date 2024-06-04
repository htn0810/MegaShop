import { Fragment } from 'react'
import CarouselBanner from '@/modules/carousel_banner/CarouselBanner'
import PrimaryLayout from '@/layouts/primary_layout'

const Home = () => {
  return (
    <Fragment>
      <PrimaryLayout>
        <CarouselBanner></CarouselBanner>
      </PrimaryLayout>
    </Fragment>
  )
}

export default Home
