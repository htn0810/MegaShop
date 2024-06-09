import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
const NewArrival = () => {
  const { t } = useTranslation()
  return (
    <Fragment>
      <h3 className='mb-4 text-lg font-bold xl:text-xl'>{t('home.product.new_arrival')}</h3>
      <div className='grid grid-cols-1 gap-2 md:gap-6 lg:grid-cols-2'>
        <div className='relative w-full h-[400px] lg:h-[600px]'>
          <img
            className='w-full h-full bg-cover'
            src='https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
          />
          <div className='absolute inset-0 flex flex-col justify-end md:p-10 p-4 text-white bg-[linear-gradient(0deg,_rgba(0,0,0,0.7),_rgba(0,0,0,0.01))]'>
            <h6 className='text-lg font-bold'>Play Station 5</h6>
            <p className='text-sm text-gray-300'>Black and white version of the PS5 coming out on sale</p>
            <span className='mt-2 font-semibold underline cursor-pointer hover:text-gray-300'>
              {t('home.product.shop_now')}
            </span>
          </div>
        </div>
        <div className='grid grid-rows-1 md:grid-rows-2 gap-y-2 md:gap-y-6 lg:h-[600px] md:h-[800px] h-[1200px]'>
          <div className='relative h-full'>
            <img
              className='w-full h-full bg-cover'
              src='https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt=''
            />
            <div className='absolute inset-0 flex flex-col justify-end md:p-10 p-4 text-white bg-[linear-gradient(0deg,_rgba(0,0,0,0.7),_rgba(0,0,0,0.01))]'>
              <h6 className='text-lg font-bold'>Play Station 5</h6>
              <p className='text-sm text-gray-300'>Black and white version of the PS5 coming out on sale</p>
              <span className='mt-2 font-semibold underline cursor-pointer hover:text-gray-300'>
                {t('home.product.shop_now')}
              </span>
            </div>
          </div>
          <div className='grid h-full grid-cols-1 gap-2 overflow-hidden md:grid-cols-2 md:gap-x-6'>
            <div className='h-[400px] md:h-[calc(600px_/_2)] relative'>
              <img
                className='w-full h-full bg-cover'
                src='https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt=''
              />
              <div className='absolute inset-0 flex flex-col justify-end md:p-10 p-4 text-white bg-[linear-gradient(0deg,_rgba(0,0,0,0.7),_rgba(0,0,0,0.01))]'>
                <h6 className='text-lg font-bold'>Play Station 5</h6>
                <p className='text-sm text-gray-300'>Black and white version of the PS5 coming out on sale</p>
                <span className='mt-2 font-semibold underline cursor-pointer hover:text-gray-300'>
                  {t('home.product.shop_now')}
                </span>
              </div>
            </div>
            <div className='h-[400px] md:h-[calc(600px_/_2)] relative'>
              <img
                className='w-full h-full bg-cover'
                src='https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt=''
              />
              <div className='absolute inset-0 flex flex-col justify-end md:p-10 p-4 text-white bg-[linear-gradient(0deg,_rgba(0,0,0,0.7),_rgba(0,0,0,0.01))]'>
                <h6 className='text-lg font-bold'>Play Station 5</h6>
                <p className='text-sm text-gray-300'>Black and white version of the PS5 coming out on sale</p>
                <span className='mt-2 font-semibold underline cursor-pointer hover:text-gray-300'>
                  {t('home.product.shop_now')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default NewArrival
