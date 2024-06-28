import { Button } from '@/components/ui/button'
import ProductCounter from '@/modules/products/product_counter'
import { Trash } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useTranslation } from 'react-i18next'
const Cart = () => {
  const { t } = useTranslation()
  return (
    <section className='py-6'>
      <ul className='hidden md:grid grid-cols-8 p-4 shadow-gray-200 shadow-sm rounded-md font-semibold'>
        <li className='col-span-3'>{t('cart.product')}</li>
        <li className='text-center'>{t('cart.price')}</li>
        <li className='text-center col-span-2'>{t('cart.quantity')}</li>
        <li className='text-center'>{t('cart.subtotal')}</li>
        <li className='text-right'>{t('cart.action')}</li>
      </ul>
      <div className='mt-6 px-2 md:px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md font-bold flex justify-between items-center'>
        <div className='flex items-center gap-x-2 md:gap-x-4'>
          <Checkbox id='terms' />
          <Link to={'/cart'}>Panasonic</Link>
        </div>
        <Trash size={18} weight='bold' className='hover:text-red-500 cursor-pointer' />
      </div>
      <div className='grid grid-cols-8 p-2 md:p-4 shadow-gray-200 shadow-sm rounded-md mt-4 items-center'>
        <div className='hidden md:flex col-span-3 gap-x-2 md:gap-x-4 items-center'>
          <Checkbox id='product' />
          <img
            src='https://images.unsplash.com/photo-1718871395011-32cafdd68d4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8'
            alt='ProductImg'
            className='w-20 h-20'
          />
          <span className='truncate font-semibold'>LCD Monitor</span>
        </div>
        <div className='hidden md:block text-center'>$650</div>
        <ProductCounter value={5} className='hidden md:flex justify-center col-span-2' />
        <div className='hidden md:block text-center'>$650</div>
        <div className='hidden md:block text-end'>
          <Button className='bg-red-500 px-3 py-1 hover:bg-red-300'>
            <Trash size={18} weight='bold' />
          </Button>
        </div>

        {/* Screen tablet -> mobile */}
        <div className='flex md:hidden col-span-8 gap-x-2'>
          <div className='flex items-center gap-x-2'>
            <Checkbox id='product' />
            <img
              src='https://images.unsplash.com/photo-1718871395011-32cafdd68d4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8'
              alt='ProductImg'
              className='w-16 h-16'
            />
          </div>
          <div className='flex flex-col gap-y-2 w-full'>
            <div className='grid grid-cols-8 gap-x-2 items-center'>
              <span className='font-semibold col-span-7 truncate'>
                LCD Monitorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
              </span>
              <div className='flex justify-end'>
                <Trash size={18} weight='bold' className='col-span-1  hover:text-red-500' />
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-sm font-semibold text-gray-600'>$650</span>
              <ProductCounter value={5} className='justify-center' />
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-2 md:gap-x-6 mt-10 items-start'>
        <div className='flex gap-x-2 md:gap-x-4 items-center'>
          <Input
            placeholder={t('cart.coupon')}
            className='dark:bg-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0 border-black'
          ></Input>
          <Button
            variant='outline'
            className='bg-black text-white hover:bg-gray-800 hover:text-white dark:bg-gray-700 dark:hover:bg-gray-500'
          >
            {t('cart.apply_coupoun')}
          </Button>
        </div>
        <div className='w-full'>
          <div className='w-full xl:w-4/5 border border-gray-900 rounded-md p-4 float-right'>
            <p className='flex gap-x-2 items-center'>
              <h4 className='font-bold'>{t('cart.cart_total')}</h4>
              <span className='text-gray-500 font-semibold text-sm'>(5)</span>
            </p>
            <p className='mt-2 flex justify-between pb-2 border-b border-gray-400'>
              <span>{t('cart.subtotal')}:</span>
              <span>$1750</span>
            </p>
            <p className='mt-2 flex justify-between pb-2 border-b border-gray-400'>
              <span>{t('cart.shipping')}:</span>
              <span>$1750</span>
            </p>
            <p className='mt-2 flex justify-between'>
              <span>{t('cart.total')}:</span>
              <span>$1750</span>
            </p>
            <div className='float-right'>
              <Button
                variant='outline'
                className='bg-black text-white hover:bg-gray-800 hover:text-white dark:bg-gray-700 dark:hover:bg-gray-500 mt-4'
              >
                {t('cart.checkout')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
