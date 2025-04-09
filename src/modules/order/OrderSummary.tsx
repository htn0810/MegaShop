import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ICart } from '@/apis/cart/cartInterface'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface OrderSummaryProps {
  cart: ICart | null
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
        <CardHeader>
          <CardTitle>{t('checkout.order_summary')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{t('checkout.loading', 'Loading...')}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='sticky top-6'>
      <CardHeader>
        <CardTitle>{t('checkout.order_summary')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {showCoupon && (
          <div className='flex gap-x-2 items-center mb-6'>
            <Input
              placeholder={t('cart.coupon')}
              className='dark:bg-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0 border-black'
            />
            <Button
              variant='outline'
              className='bg-black text-white hover:bg-gray-800 hover:text-white dark:bg-gray-700 dark:hover:bg-gray-500 whitespace-nowrap'
            >
              {t('cart.apply_coupoun')}
            </Button>
          </div>
        )}

        <div className='flex justify-between'>
          <span>{t('cart.subtotal')}:</span>
          <span>${cart.totalPrice.toLocaleString()}</span>
        </div>
        <div className='flex justify-between'>
          <span>{t('cart.shipping')}:</span>
          <span>${shippingFee}</span>
        </div>
        <Separator />
        <div className='flex justify-between font-bold'>
          <span>{t('cart.total')}:</span>
          <span>${(cart.totalPrice + shippingFee).toLocaleString()}</span>
        </div>

        {showContinueButton && (
          <div className='flex flex-col gap-2 pt-4 mt-2'>
            <Button
              onClick={onContinue}
              disabled={continueDisabled}
              className='w-full bg-black text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
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
