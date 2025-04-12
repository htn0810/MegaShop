import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { CustomCartType } from '@/types/cart.type'
import { Skeleton } from '@/components/ui/skeleton'

interface OrderSummaryProps {
  cart: CustomCartType | undefined
  isLoading: boolean
  showCoupon?: boolean
  showContinueButton?: boolean
  onContinue?: () => void
  continueButtonText?: string
  continueDisabled?: boolean
  shippingFee?: number
}

const OrderSummary = ({
  cart,
  isLoading,
  showCoupon = true,
  showContinueButton = false,
  onContinue,
  continueButtonText,
  continueDisabled = false,
  shippingFee = 15,
}: OrderSummaryProps) => {
  const { t } = useTranslation()

  if (isLoading || !cart) {
    return (
      <Card className='sticky top-6'>
        <CardHeader className='pt-4 md:pt-6 px-4 md:px-6'>
          <CardTitle className='text-base md:text-lg xl:text-xl font-bold'>{t('checkout.order_summary')}</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2 md:space-y-4 px-4 md:px-6'>
          {showCoupon && (
            <div className='flex gap-x-2 items-center mb-6'>
              <Skeleton className='h-9 w-full' />
              <Skeleton className='h-9 w-24 md:w-32' />
            </div>
          )}

          <div className='flex justify-between py-1'>
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-4 w-16' />
          </div>
          <div className='flex justify-between py-1'>
            <Skeleton className='h-4 w-16' />
            <Skeleton className='h-4 w-10' />
          </div>
          <Separator />
          <div className='flex justify-between py-1'>
            <Skeleton className='h-5 w-12' />
            <Skeleton className='h-5 w-20' />
          </div>

          {showContinueButton && (
            <div className='flex flex-col gap-2 pt-4 mt-2'>
              <Skeleton className='h-9 w-full' />
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  const priceOfSelectedProducts = cart.cartProductsGroupByShop.reduce((acc, curr) => {
    return acc + curr.products.reduce((acc, curr) => acc + (curr.isChecked ? curr.price * curr.quantity : 0), 0)
  }, 0)

  return (
    <Card className='sticky top-6'>
      <CardHeader className='pt-4 md:pt-6 px-4 md:px-6'>
        <CardTitle className='text-base md:text-lg xl:text-xl font-bold'>{t('checkout.order_summary')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2 md:space-y-4 px-4 md:px-6'>
        {showCoupon && (
          <div className='flex gap-x-2 items-center mb-6'>
            <Input
              placeholder={t('cart.coupon')}
              className='text-xs md:text-sm dark:bg-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0 border-black'
            />
            <Button
              variant='outline'
              className='text-xs md:text-sm bg-black text-white hover:bg-gray-800 hover:text-white dark:bg-gray-700 dark:hover:bg-gray-500 whitespace-nowrap'
            >
              {t('cart.apply_coupoun')}
            </Button>
          </div>
        )}

        <div className='flex justify-between text-xs md:text-sm'>
          <span>{t('cart.subtotal')}:</span>
          <span>${priceOfSelectedProducts.toLocaleString()}</span>
        </div>
        <div className='flex justify-between text-xs md:text-sm'>
          <span>{t('cart.shipping')}:</span>
          <span>${shippingFee}</span>
        </div>
        <Separator />
        <div className='flex justify-between font-bold text-sm md:text-base'>
          <span>{t('cart.total')}:</span>
          <span>${(priceOfSelectedProducts + shippingFee).toLocaleString()}</span>
        </div>

        {showContinueButton && (
          <div className='flex flex-col gap-2 pt-4 mt-2'>
            <Button
              onClick={onContinue}
              disabled={continueDisabled}
              className='text-xs md:text-sm w-full bg-black text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
            >
              {continueButtonText || t('checkout.continue')}
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default OrderSummary
