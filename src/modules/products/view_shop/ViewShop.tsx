import { IShop } from '@/apis/shop/shopInterfaces'
import { Button } from '@/components/ui/button'
import { DEFAULT_SHOP_AVATAR } from '@/constants/common.constant'
import { Storefront } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

type Props = {
  shop: IShop
}

const ViewShop = ({ shop }: Props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <div className='flex md:gap-x-8 gap-x-2'>
      <div className='flex items-center md:gap-x-6 gap-x-2 md:pr-24 pr-2 border-r border-r-gray-200'>
        <div className='md:w-28 md:h-28 w-16 h-16 rounded-full overflow-hidden'>
          <img src={shop?.avatarUrl || DEFAULT_SHOP_AVATAR} alt='' className='w-full h-full bg-cover' />
        </div>
        <div className='flex flex-col gap-y-4'>
          <h4 className='font-bold md:text-lg text-md'>{shop.name}</h4>
          <Button className='flex gap-x-1' onClick={() => navigate(`/shop/${shop.id}`)}>
            <Storefront size={18} />
            <span className='text-sm'>{t('product_detail.view_shop')}</span>
          </Button>
        </div>
      </div>
      <div className='flex flex-col gap-y-2 justify-center flex-1'>
        <div className='flex text-gray-500 gap-x-2'>
          <span className='md:basis-1/6'>{t('product_detail.reviews')}</span>
          <span className='text-black font-semibold dark:text-white'>4,6k</span>
        </div>
        <div className='flex text-gray-500 gap-x-2'>
          <span className='md:basis-1/6'>{t('product_detail.products')}</span>
          <span className='text-black font-semibold dark:text-white'>22</span>
        </div>
      </div>
    </div>
  )
}

export default ViewShop
