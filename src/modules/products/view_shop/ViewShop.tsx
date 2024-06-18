import { Button } from '@/components/ui/button'
import { Storefront } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'

const ViewShop = () => {
  const { t } = useTranslation()
  return (
    <div className='flex gap-x-8'>
      <div className='flex items-center gap-x-6 pr-24 border-r border-r-gray-200'>
        <div className='w-28 h-28 rounded-full overflow-hidden'>
          <img
            src='https://images.unsplash.com/photo-1656077217715-bdaeb06bd01f?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
            className='w-full h-full bg-cover'
          />
        </div>
        <div className='flex flex-col gap-y-4'>
          <h4 className='font-bold text-lg'>Modaz</h4>
          <Button className='flex gap-x-2'>
            <Storefront size={18} />
            <span>{t('product_detail.view_shop')}</span>
          </Button>
        </div>
      </div>
      <div className='flex flex-col gap-y-2 justify-center flex-1'>
        <div className='flex text-gray-500'>
          <span className='basis-1/6'>{t('product_detail.reviews')}</span>
          <span className='text-black font-semibold dark:text-white'>4,6k</span>
        </div>
        <div className='flex text-gray-500'>
          <span className='basis-1/6'>{t('product_detail.products')}</span>
          <span className='text-black font-semibold dark:text-white'>22</span>
        </div>
      </div>
    </div>
  )
}

export default ViewShop
