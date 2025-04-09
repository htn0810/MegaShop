import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AddressResponse } from '@/apis/address/addressInterfaces'
import AddressAPI from '@/apis/address/address'
import { CartAPI } from '@/apis/cart/cart'
import { ICart } from '@/apis/cart/cartInterface'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Check, MapPin, CreditCard } from 'lucide-react'

// Import tab components
import AddressTab from '@/modules/order/AddressTab'
import ReviewTab from '@/modules/order/ReviewTab'
import PaymentTab from '@/modules/order/PaymentTab'

enum CheckoutStep {
  ADDRESS = 'address',
  REVIEW = 'review',
  PAYMENT = 'payment',
}

const Order = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState<CheckoutStep>(CheckoutStep.ADDRESS)
  const [addresses, setAddresses] = useState<AddressResponse[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>('credit-card')
  const [cart, setCart] = useState<ICart | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Fetch addresses
  const getAllAddresses = async () => {
    setIsLoading(true)
    try {
      const response = await AddressAPI.getAllAddresses()
      if (response?.data?.data) {
        setAddresses(response.data.data)
        // Select the default address if available
        const defaultAddress = response.data.data.find((addr: AddressResponse) => addr.isDefault)
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id)
        } else if (response.data.data.length > 0) {
          setSelectedAddressId(response.data.data[0].id)
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch cart data
  const getCartData = async () => {
    setIsLoading(true)
    try {
      const response = await CartAPI.getCart()
      setCart(response.data.data)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAllAddresses()
    getCartData()
  }, [])

  const handleContinue = () => {
    if (activeStep === CheckoutStep.ADDRESS && selectedAddressId) {
      setActiveStep(CheckoutStep.REVIEW)
    } else if (activeStep === CheckoutStep.REVIEW) {
      setActiveStep(CheckoutStep.PAYMENT)
    } else if (activeStep === CheckoutStep.PAYMENT) {
      // Process order
      // In a real application, this would call an API to create the order
      navigate('/') // Navigate to home or order confirmation page
    }
  }

  const handleBack = () => {
    if (activeStep === CheckoutStep.REVIEW) {
      setActiveStep(CheckoutStep.ADDRESS)
    } else if (activeStep === CheckoutStep.PAYMENT) {
      setActiveStep(CheckoutStep.REVIEW)
    }
  }

  return (
    <section className='py-6 px-4 md:px-8'>
      <div className='container mx-auto max-w-6xl'>
        <h1 className='text-3xl font-bold mb-8'>{t('checkout.title')}</h1>

        {/* Progress Steps */}
        <Tabs value={activeStep} className='w-full mb-8'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger
              value={CheckoutStep.ADDRESS}
              className='data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-gray-700'
              disabled
            >
              <MapPin className='h-4 w-4 mr-2' />
              {t('checkout.address')}
            </TabsTrigger>
            <TabsTrigger
              value={CheckoutStep.REVIEW}
              className='data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-gray-700'
              disabled
            >
              <Check className='h-4 w-4 mr-2' />
              {t('checkout.review')}
            </TabsTrigger>
            <TabsTrigger
              value={CheckoutStep.PAYMENT}
              className='data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-gray-700'
              disabled
            >
              <CreditCard className='h-4 w-4 mr-2' />
              Payment Method
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Tab Content */}
        {activeStep === CheckoutStep.ADDRESS && (
          <AddressTab
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            setSelectedAddressId={setSelectedAddressId}
            isLoading={isLoading}
            cart={cart}
            onContinue={handleContinue}
          />
        )}

        {activeStep === CheckoutStep.REVIEW && (
          <ReviewTab
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            isLoading={isLoading}
            cart={cart}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        )}

        {activeStep === CheckoutStep.PAYMENT && (
          <PaymentTab
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            isLoading={isLoading}
            cart={cart}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        )}
      </div>
    </section>
  )
}

export default Order
