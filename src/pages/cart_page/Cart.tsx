import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { CartAPI } from '@/apis/cart/cart'
import { useEffect, useState } from 'react'
import { ICart, ICartProduct } from '@/apis/cart/cartInterface'
import CartProductsGroup from '@/modules/cart/cart_products_group'
import { CartProductsGroupSkeleton } from '@/modules/cart/cart_products_group'
import { useNavigate } from 'react-router-dom'
import { ShoppingCartSimple } from '@phosphor-icons/react'

type ProductsGroup = {
  shopId: number
  shopName: string
  products: ICartProduct[]
}

const Cart = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [cart, setCart] = useState<ICart | null>(null)
  const [productsGroup, setProductsGroup] = useState<ProductsGroup[]>([])
  const [isLoadingCart, setIsLoadingCart] = useState(false)

  const handleGetCart = async () => {
    setIsLoadingCart(true)
    try {
      const response = await CartAPI.getCart()
      setCart(response.data.data)
      const productsGroup = response.data.data.cartProducts.reduce((acc: ProductsGroup[], product: ICartProduct) => {
        const shopId = product.shopId
        const shopName = product.shopName
        const existingGroup = acc.find((group) => group.shopId === shopId)
        if (existingGroup) {
          existingGroup.products.push(product)
        } else {
          acc.push({ shopId, shopName, products: [product] })
        }
        return acc
      }, [])
      setProductsGroup(productsGroup)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingCart(false)
    }
  }

  const handleContinueToCheckout = () => {
    navigate('/order')
  }

  useEffect(() => {
    handleGetCart()
  }, [])

  return (
    <>
      {isLoadingCart && (
        <section className='py-4 md:py-6'>
          <CartProductsGroupSkeleton />

          {/* Skeleton for order summary */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-2 md:gap-x-6  mt-4 md:mt-6 lg:mt-10 items-start'>
            <div></div>
            <div className='w-full'>
              <div className='p-4 border border-gray-200 rounded-md shadow-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
                <h2 className='font-bold text-base lg:text-lg mb-3'>{t('checkout.order_summary')}</h2>
                <div className='space-y-2'>
                  <div className='flex justify-between text-xs lg:text-sm'>
                    <span className='text-gray-600 dark:text-gray-400'>{t('cart.quantity')}:</span>
                    <span className='font-medium animate-pulse bg-gray-200 dark:bg-gray-700 h-5 w-10 rounded'></span>
                  </div>
                  <div className='flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2 mt-2 text-xs lg:text-sms'>
                    <span className='font-bold'>{t('cart.total')}:</span>
                    <span className='animate-pulse bg-gray-200 dark:bg-gray-700 h-6 w-20 rounded'></span>
                  </div>
                </div>
              </div>
              <div className='flex justify-end mt-4'>
                <div className='animate-pulse bg-gray-300 dark:bg-gray-600 h-10 w-28 rounded-md'></div>
              </div>
            </div>
          </div>
        </section>
      )}
      {!isLoadingCart && cart && productsGroup && productsGroup.length > 0 && (
        <section className='py-6'>
          {productsGroup.map((group) => (
            <CartProductsGroup key={group.shopId} shop={group} />
          ))}

          <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-2 md:gap-x-6 mt-10 items-start'>
            <div></div>
            <div className='w-full'>
              <div className='p-4 border border-gray-200 rounded-md shadow-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
                <h2 className='font-bold text-base lg:text-lg mb-3'>{t('checkout.order_summary')}</h2>
                <div className='space-y-2'>
                  <div className='flex justify-between text-xs lg:text-sm'>
                    <span className='text-gray-600 dark:text-gray-400'>{t('cart.quantity')}:</span>
                    <span className='font-medium'>{cart.totalQuantity}</span>
                  </div>
                  <div className='flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2 mt-2 text-xs lg:text-sm'>
                    <span className='font-bold'>{t('cart.total')}:</span>
                    <span className='font-bold text-red-600'>
                      {t('cart.currency')}
                      {cart.totalPrice?.toLocaleString() || 0}
                    </span>
                  </div>
                </div>
              </div>
              <div className='flex justify-end mt-4'>
                <Button
                  className='bg-black text-white hover:bg-gray-800 hover:text-white dark:bg-gray-700 dark:hover:bg-gray-500'
                  onClick={handleContinueToCheckout}
                >
                  {t('cart.checkout')}
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
      {!isLoadingCart && cart && cart.cartProducts.length === 0 && (
        <div className='mt-4 md:mt-6 flex flex-col items-center justify-center space-y-2 lg:space-y-4 text-center p-8 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-900'>
          <div className='w-16 h-16 md:w-24 md:h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2'>
            <ShoppingCartSimple size={24} />
          </div>
          <h2 className='text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white'>
            {t('cart.empty_cart_title')}
          </h2>
          <p className='text-xs md:text-sm text-gray-600 dark:text-gray-400 max-w-md'>
            {t('cart.empty_cart_description')}
          </p>
          <Button
            className='mt-4 text-xs md:text-sm bg-black hover:bg-gray-800 text-white dark:bg-gray-700 dark:hover:bg-gray-600'
            onClick={() => navigate('/')}
          >
            {t('cart.continue_shopping')}
          </Button>
        </div>
      )}
    </>
  )
}

export default Cart
