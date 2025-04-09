import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AddressResponse } from '@/apis/address/addressInterfaces'
import { ICart } from '@/apis/cart/cartInterface'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import OrderSummary from './OrderSummary'

interface ReviewTabProps {
  addresses: AddressResponse[]
  selectedAddressId: number | null
  isLoading: boolean
  cart: ICart | null
  onBack: () => void
  onContinue: () => void
}

const ReviewTab = ({ addresses, selectedAddressId, isLoading, cart, onBack, onContinue }: ReviewTabProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const formatAddress = (address: AddressResponse) => {
    return `${address.street}, ${address.ward.full_name}, ${address.district.full_name}, ${address.province.full_name}`
  }

  const isContinueDisabled = isLoading || !cart || cart.cartProducts.length === 0

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId)

  return (
    <div className='space-y-6'>
      <h2 className='text-xl font-semibold'>{t('checkout.review_your_order')}</h2>

      {isLoading ? (
        <div className='flex justify-center items-center h-40'>
          <p>{t('checkout.loading', 'Loading...')}</p>
        </div>
      ) : cart && cart.cartProducts.length > 0 ? (
        <div className='space-y-6'>
          {/* Group products by shop */}
          {Array.from(new Set(cart.cartProducts.map((item) => item.shopId))).map((shopId) => {
            const shopProducts = cart.cartProducts.filter((item) => item.shopId === shopId)
            const shopName = shopProducts[0]?.shopName || ''

            return (
              <Card key={shopId}>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-lg'>{shopName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {shopProducts.map((product) => (
                      <div key={product.id} className='flex items-center gap-4 py-2'>
                        <div className='h-16 w-16 rounded-md overflow-hidden'>
                          <img src={product.image} alt={product.name} className='h-full w-full object-cover' />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='font-medium truncate'>{product.name}</p>
                          <p className='text-sm text-gray-500 dark:text-gray-400'>Quantity: {product.quantity}</p>
                        </div>
                        <div className='text-right'>
                          <p className='font-medium'>${product.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {/* Shipping address */}
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg'>{t('checkout.shipping_address')}</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedAddress ? (
                <div>
                  <p className='font-medium'>{selectedAddress.name}</p>
                  <p className='text-sm mt-1'>{formatAddress(selectedAddress)}</p>
                  <p className='text-sm mt-2'>{selectedAddress.phoneNumber}</p>
                  <Button variant='outline' className='mt-4' onClick={onBack}>
                    {t('checkout.change')}
                  </Button>
                </div>
              ) : (
                <CardDescription>{t('checkout.no_address_selected')}</CardDescription>
              )}
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg'>{t('checkout.order_summary')}</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderSummary cart={cart} isLoading={isLoading} showCoupon={false} />
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className='pt-6'>
            <CardDescription>{t('checkout.no_items')}</CardDescription>
            <Button onClick={() => navigate('/cart')} className='mt-4'>
              {t('checkout.back_to_cart')}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Navigation buttons */}
      <div className='flex justify-between'>
        <Button variant='outline' onClick={onBack}>
          <ArrowLeft className='mr-2 h-4 w-4' />
          {t('checkout.back')}
        </Button>
        <Button
          onClick={onContinue}
          disabled={isContinueDisabled}
          className='bg-black text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
        >
          {t('checkout.continue')}
          <ArrowRight className='ml-2 h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}

export default ReviewTab
