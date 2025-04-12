import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AddressResponse } from '@/apis/address/addressInterfaces'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import OrderSummary from './OrderSummary'
import { useCartStore } from '@/store/cartStore'
import { Skeleton } from '@/components/ui/skeleton'

interface ReviewTabProps {
  addresses: AddressResponse[]
  selectedAddressId: number | null
  isLoading: boolean
  onBack: () => void
  onContinue: () => void
}

const ReviewTab = ({ addresses, selectedAddressId, isLoading, onBack, onContinue }: ReviewTabProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { cart } = useCartStore()

  const formatAddress = (address: AddressResponse) => {
    return `${address.street}, ${address.ward.full_name}, ${address.district.full_name}, ${address.province.full_name}`
  }

  const isContinueDisabled = isLoading || !cart || cart.cartProducts.length === 0

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId)

  const renderSkeletonItems = () => {
    // Generate random number of shop skeletons (1-2)
    const shopCount = Math.floor(Math.random() * 2) + 1

    return (
      <div className='space-y-6'>
        {/* Shop product skeletons */}
        {Array.from({ length: shopCount }).map((_, shopIndex) => {
          // Generate random number of products per shop (1-3)
          const productCount = Math.floor(Math.random() * 3) + 1

          return (
            <Card key={`shop-skeleton-${shopIndex}`}>
              <CardHeader className='pb-2 pt-4 md:pt-6'>
                <Skeleton className='h-6 w-48' />
              </CardHeader>
              <CardContent className='px-2 md:px-4'>
                <div className='space-y-2 md:space-y-4'>
                  {Array.from({ length: productCount }).map((_, productIndex) => (
                    <div key={`product-skeleton-${productIndex}`} className='flex items-center gap-4 py-2'>
                      {/* Product image skeleton */}
                      <Skeleton className='h-16 w-16 rounded-md' />

                      {/* Product details skeleton */}
                      <div className='flex-1 min-w-0 space-y-2'>
                        <Skeleton className='h-4 w-3/4' />
                        <Skeleton className='h-3 w-24' />
                      </div>

                      {/* Price skeleton */}
                      <div className='text-right'>
                        <Skeleton className='h-4 w-16 ml-auto' />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}

        {/* Shipping address skeleton */}
        <Card>
          <CardHeader className='pb-2 pt-4 md:pt-6 px-4 md:px-6'>
            <CardTitle className='text-base md:text-lg xl:text-xl font-semibold'>
              {t('checkout.shipping_address')}
            </CardTitle>
          </CardHeader>
          <CardContent className='px-4 md:px-6'>
            <div className='space-y-2'>
              <Skeleton className='h-5 w-48' />
              <Skeleton className='h-4 w-full max-w-md' />
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-9 w-24 mt-4' />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <h2 className='text-xl font-semibold'>{t('checkout.review_your_order')}</h2>

      {isLoading ? (
        renderSkeletonItems()
      ) : cart && cart.cartProducts.length > 0 ? (
        <div className='space-y-6'>
          {/* Group products by shop */}
          {cart.cartProductsGroupByShop.map((item) => {
            const shopProducts = item.products.filter((product) => product.isChecked)
            const shopName = item.shopName

            if (shopProducts.length === 0) return null

            return (
              <Card key={item.shopId}>
                <CardHeader className='pb-2 pt-4 md:pt-6'>
                  <CardTitle className='text-base md:text-lg xl:text-xl font-semibold'>{shopName}</CardTitle>
                </CardHeader>
                <CardContent className='px-2 md:px-4'>
                  <div className='space-y-2 md:space-y-4'>
                    {shopProducts.map((product) => (
                      <div key={product.id} className='flex items-center gap-4 py-2'>
                        <div className='h-16 w-16 rounded-md overflow-hidden'>
                          <img src={product.image} alt={product.name} className='h-full w-full object-cover' />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='font-medium truncate text-sm md:text-base'>{product.name}</p>
                          <p className='text-xs md:text-sm text-gray-500 dark:text-gray-400'>
                            Quantity: {product.quantity}
                          </p>
                        </div>
                        <div className='text-right'>
                          <p className='font-medium text-sm md:text-base'>${product.price.toLocaleString()}</p>
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
            <CardHeader className='pb-2 pt-4 md:pt-6 px-4 md:px-6'>
              <CardTitle className='text-base md:text-lg xl:text-xl font-semibold'>
                {t('checkout.shipping_address')}
              </CardTitle>
            </CardHeader>
            <CardContent className='px-4 md:px-6'>
              {selectedAddress ? (
                <div>
                  <p className='font-medium text-sm md:text-base'>{selectedAddress.name}</p>
                  <p className='text-xs md:text-sm mt-1'>{formatAddress(selectedAddress)}</p>
                  <p className='text-xs md:text-sm mt-2'>{selectedAddress.phoneNumber}</p>
                  <Button variant='outline' className='mt-4 text-xs md:text-sm' onClick={onBack}>
                    {t('checkout.change')}
                  </Button>
                </div>
              ) : (
                <CardDescription className='text-xs md:text-sm'>{t('checkout.no_address_selected')}</CardDescription>
              )}
            </CardContent>
          </Card>

          {/* Order Summary */}
          <OrderSummary cart={cart} isLoading={isLoading} showCoupon={false} />
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
