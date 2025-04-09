import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { ICart } from '@/apis/cart/cartInterface'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'
import { Check, CreditCard, Truck } from 'lucide-react'
import OrderSummary from './OrderSummary'

interface PaymentTabProps {
  paymentMethod: string
  setPaymentMethod: (method: string) => void
  isLoading: boolean
  cart: ICart | null
  onBack: () => void
  onContinue: () => void
}

const PaymentTab = ({ paymentMethod, setPaymentMethod, isLoading, cart, onBack, onContinue }: PaymentTabProps) => {
  const { t } = useTranslation()

  const paymentMethods = [
    {
      id: 'credit-card',
      name: t('checkout.payment_methods.credit_card'),
      description: t('checkout.payment_methods.credit_card'),
      icon: <CreditCard className='h-5 w-5' />,
    },
    {
      id: 'bank-transfer',
      name: t('checkout.payment_methods.bank_transfer'),
      description: t('checkout.payment_methods.bank_transfer'),
      icon: <Check className='h-5 w-5' />,
    },
    {
      id: 'cod',
      name: t('checkout.payment_methods.cod'),
      description: t('checkout.payment_methods.cod'),
      icon: <Truck className='h-5 w-5' />,
    },
  ]

  const isContinueDisabled = isLoading || !cart || cart.cartProducts.length === 0

  return (
    <div className='space-y-6'>
      <h2 className='text-xl font-semibold'>{t('checkout.select_payment_method')}</h2>

      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className='space-y-4'>
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`border rounded-md p-4 cursor-pointer transition-all
              ${
                paymentMethod === method.id
                  ? 'border-black dark:border-gray-400 bg-gray-50 dark:bg-gray-800'
                  : 'border-gray-200 dark:border-gray-700'
              }
            `}
            onClick={() => setPaymentMethod(method.id)}
          >
            <div className='flex items-start gap-4'>
              <RadioGroupItem value={method.id} id={`payment-${method.id}`} className='mt-1' />
              <div className='flex-1'>
                <div className='flex justify-between items-center'>
                  <p className='font-semibold'>{method.name}</p>
                  <span className='flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-700'>
                    {method.icon}
                  </span>
                </div>
                <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>{method.description}</p>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>

      {/* Order Summary */}
      <Card className='mt-6'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-lg'>{t('checkout.order_summary')}</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderSummary cart={cart} isLoading={isLoading} showCoupon={false} />
        </CardContent>
      </Card>

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
          {t('checkout.place_order')}
        </Button>
      </div>
    </div>
  )
}

export default PaymentTab
