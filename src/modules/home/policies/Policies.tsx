import { Headset, ShieldCheck } from '@phosphor-icons/react'
import { Truck } from '@phosphor-icons/react/dist/ssr'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

const Policies = () => {
  const { t } = useTranslation()
  return (
    <Fragment>
      <div className='flex flex-col items-center gap-y-2'>
        <div className='w-20 h-20 p-4 bg-black border-8 border-gray-300 rounded-full'>
          <Truck size={32} className='text-white ' />
        </div>
        <h6 className='font-bold'>{t('home.policy.delivery')}</h6>
        <span className='font-semibold text-gray-800 dark:text-gray-500'>{t('home.policy.delivery_desc')}</span>
      </div>
      <div className='flex flex-col items-center gap-y-2'>
        <div className='w-20 h-20 p-4 bg-black border-8 border-gray-300 rounded-full'>
          <Headset size={32} className='text-white ' />
        </div>
        <h6 className='font-bold'>{t('home.policy.customer')}</h6>
        <span className='font-semibold text-gray-800 dark:text-gray-500'>{t('home.policy.customer_desc')}</span>
      </div>
      <div className='flex flex-col items-center gap-y-2'>
        <div className='w-20 h-20 p-4 bg-black border-8 border-gray-300 rounded-full'>
          <ShieldCheck size={32} className='text-white ' />
        </div>
        <h6 className='font-bold'>{t('home.policy.guaranty')}</h6>
        <span className='font-semibold text-gray-800 dark:text-gray-500'>{t('home.policy.guaranty_desc')}</span>
      </div>
    </Fragment>
  )
}

export default Policies
