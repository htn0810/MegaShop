import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { CartAPI } from '@/apis/cart/cart'
import { useEffect, useState } from 'react'
import { ICart, ICartProduct } from '@/apis/cart/cartInterface'
import CartProductsGroup from '@/modules/cart/cart_products_group'
import { useNavigate } from 'react-router-dom'

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
      {isLoadingCart && <>Loading Cart...</>}
      {!isLoadingCart && cart && productsGroup && productsGroup.length > 0 && (
        <section className='py-6'>
          {productsGroup.map((group) => (
            <CartProductsGroup key={group.shopId} shop={group} />
          ))}

          <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-2 md:gap-x-6 mt-10 items-start'>
            <div></div>
            <div className='w-full'>
              <div className='p-4 border border-gray-200 rounded-md shadow-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
                <h2 className='font-bold text-lg mb-3'>{t('checkout.order_summary')}</h2>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600 dark:text-gray-400'>{t('cart.quantity')}:</span>
                    <span className='font-medium'>{cart.totalQuantity}</span>
                  </div>
                  <div className='flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2 mt-2'>
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
        <section className='py-6'>
          <div className='container'></div>
        </section>
      )}
    </>
  )
}

export default Cart
