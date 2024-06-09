import { Input } from '@/components/ui/input'
import { Copyright, PaperPlaneRight } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <div className='pt-10 pb-6 -mx-4 text-white bg-black xl:-mx-40 md:-mx-20 sm:-mx-10 xl:px-40'>
      <div className='grid grid-cols-1 px-10 md:px-0 md:grid-cols-3 xl:grid-cols-4 md:place-items-center xl:gap-x-10 gap-x-2 gap-y-6'>
        <div className='flex flex-row items-center w-full md:gap-6 md:w-2/3 xl:w-full col-span-full xl:flex-col xl:col-span-1'>
          <div className='w-full'>
            <h5 className='text-xl font-bold xl:text-3xl'>MegaShop</h5>
            <span className='block mt-4 font-semibold xl:text-lg text-md'>{t('home.footer.subscribe')}</span>
          </div>
          <div className='w-full flex-grow-1'>
            <span className='mt-6 text-sm text-gray-300 xl:text-md'>{t('home.footer.get_voucher')}</span>
            <div className='relative w-full'>
              <Input
                className='w-full pr-10 mt-4 text-white bg-black outline-none focus:border-none focus:outline-none focus-visible:outline-none'
                placeholder={t('home.footer.email_placeholder')}
              />
              <PaperPlaneRight
                size={24}
                className='absolute top-0 translate-y-1/2 cursor-pointer right-4 hover:text-red-500'
              />
            </div>
          </div>
        </div>
        <ul>
          <h6 className='text-lg font-semibold xl:text-2xl'>{t('home.footer.support')}</h6>
          <li className='mt-3 text-sm text-gray-300 xl:text-md'>Hồ Chí Minh, Việt Nam</li>
          <li className='mt-3 text-sm text-gray-300 xl:text-md'>htn********@gmail.com</li>
          <li className='mt-3 text-sm text-gray-300 xl:text-md'>09*******7</li>
        </ul>
        <ul>
          <h6 className='text-lg font-semibold xl:text-2xl'>{t('home.footer.account')}</h6>
          <li className='mt-3 text-sm text-gray-300 xl:text-md'>{t('home.footer.my_account')}</li>
          <li className='mt-3 text-sm text-gray-300 xl:text-md'>{t('home.footer.cart')}</li>
          <li className='mt-3 text-sm text-gray-300 xl:text-md'>{t('home.footer.shop')}</li>
        </ul>
        <ul>
          <h6 className='text-lg font-semibold xl:text-2xl'>{t('home.footer.quick_link')}</h6>
          <li className='mt-3 text-sm text-gray-300 xl:text-md'>{t('home.footer.private_policy')}</li>
          <li className='mt-3 text-sm text-gray-300 xl:text-md'>{t('home.footer.term')}</li>
          <li className='mt-3 text-sm text-gray-300 xl:text-md'>{t('home.footer.faq')}</li>
        </ul>
      </div>
      <div className='flex items-center justify-center mt-8 text-sm font-semibold text-gray-700 gap-x-2 md:text-md'>
        <Copyright size={20} />
        <span className='text-center'>{t('home.footer.copyright')}</span>
      </div>
    </div>
  )
}

export default Footer
