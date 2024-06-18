import Footer from '@/modules/home/footer'
import Header from '@/modules/home/header'
import { Fragment } from 'react'

type Props = {
  children: React.ReactNode
}

const PrimaryLayout = (props: Props) => {
  return (
    <Fragment>
      <Header />
      <div className='md:mt-[140px] z-10 mt-[70px] px-4 sm:px-10 xl:px-40 md:px-20'>{props.children}</div>
      <div className='mt-6'>
        <Footer />
      </div>
    </Fragment>
  )
}

export default PrimaryLayout
