import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { AddressResponse } from '@/apis/address/addressInterfaces'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import OrderSummary from './OrderSummary'
import { useCartStore } from '@/store/cartStore'
import { Skeleton } from '@/components/ui/skeleton'

interface AddressTabProps {
  addresses: AddressResponse[]
  selectedAddressId: number | null
  setSelectedAddressId: (id: number) => void
  isLoading: boolean
  onContinue: () => void
}

const AddressTab = ({ addresses, selectedAddressId, setSelectedAddressId, isLoading, onContinue }: AddressTabProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { cart } = useCartStore()

  const formatAddress = (address: AddressResponse) => {
    return `${address.street}, ${address.ward.full_name}, ${address.district.full_name}, ${address.province.full_name}`
  }

  const isContinueDisabled = !selectedAddressId || isLoading || !cart || cart.cartProducts.length === 0

  const AddressTabSkeleton = () => (
    <div className='space-y-3 md:space-y-4'>
      {[1, 2, 3].map((item) => (
        <div key={item} className='border rounded-md p-3 md:p-4 animate-pulse border-gray-200 dark:border-gray-700'>
          <div className='flex items-start gap-2 md:gap-4'>
            <Skeleton className='h-4 w-4 rounded-full mt-1' />
            <div className='flex-1 space-y-2'>
              <div className='flex justify-between'>
                <Skeleton className='h-5 w-32 md:w-40' />
                {item === 1 && <Skeleton className='h-5 w-16 rounded-full' />}
              </div>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-4/5' />
              <Skeleton className='h-4 w-24 mt-1' />
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8'>
      <div className='md:col-span-2'>
        <div className='space-y-2 md:space-y-4 lg:space-y-6'>
          <h2 className='text-base md:text-lg xl:text-xl font-semibold'>{t('checkout.select_shipping_address')}</h2>
          {isLoading ? (
            <AddressTabSkeleton />
          ) : addresses.length === 0 ? (
            <Card>
              <CardContent className='pt-6'>
                <CardDescription>{t('checkout.no_addresses')}</CardDescription>
                <Button onClick={() => navigate('/user/address')} className='mt-4'>
                  {t('checkout.add_address')}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <RadioGroup
              value={selectedAddressId?.toString()}
              onValueChange={(value) => setSelectedAddressId(Number(value))}
              className='space-y-2 md:space-y-4'
            >
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`border rounded-md p-2 md:p-4 cursor-pointer transition-all
                    ${
                      selectedAddressId === address.id
                        ? 'border-black dark:border-gray-400 bg-gray-50 dark:bg-gray-800'
                        : 'border-gray-200 dark:border-gray-700'
                    }
                  `}
                  onClick={() => setSelectedAddressId(address.id)}
                >
                  <div className='flex items-start gap-2 md:gap-4'>
                    <RadioGroupItem value={address.id.toString()} id={`address-${address.id}`} className='mt-1' />
                    <div className='flex-1'>
                      <div className='flex justify-between'>
                        <p className='text-sm md:text-base font-semibold'>{address.name}</p>
                        {address.isDefault && (
                          <span className='text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full'>
                            {t('checkout.default')}
                          </span>
                        )}
                      </div>
                      <p className='text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1'>
                        {formatAddress(address)}
                      </p>
                      <p className='text-xs md:text-sm mt-2'>{address.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>
      </div>

      <div className='md:col-span-1'>
        <OrderSummary
          cart={cart}
          isLoading={isLoading}
          showContinueButton
          onContinue={onContinue}
          continueDisabled={isContinueDisabled}
        />
      </div>
    </div>
  )
}

export default AddressTab
