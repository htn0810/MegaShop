import Header from '@/modules/header'
import { Fragment } from 'react'

type Props = {
  children: React.ReactNode
}

const PrimaryLayout = (props: Props) => {
  return (
    <Fragment>
      <Header />
      <div className='md:mt-[142px] z-10 mt-[70px]'>{props.children}</div>
    </Fragment>
  )
}

export default PrimaryLayout
