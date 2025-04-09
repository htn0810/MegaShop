import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { AddressResponse } from '@/apis/address/addressInterfaces'
import { ICart } from '@/apis/cart/cartInterface'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import OrderSummary from './OrderSummary'

interface AddressTabProps {
  addresses: AddressResponse[]
  selectedAddressId: number | null
  setSelectedAddressId: (id: number) => void
  isLoading: boolean
  cart: ICart | null
  onContinue: () => void
}

const AddressTab = ({
  addresses,
  selectedAddressId,
  setSelectedAddressId,
  isLoading,
  cart,
  onContinue,
}: AddressTabProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const formatAddress = (address: AddressResponse) => {
    return `${address.street}, ${address.ward.full_name}, ${address.district.full_name}, ${address.province.full_name}`
  }

  const isContinueDisabled = !selectedAddressId || isLoading || !cart || cart.cartProducts.length === 0

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
      <div className='md:col-span-2'>
        <div className='space-y-6'>
          <h2 className='text-xl font-semibold'>{t('checkout.select_shipping_address')}</h2>
          {isLoading ? (
            <div className='flex justify-center items-center h-40'>
              <p>{t('checkout.loading', 'Loading...')}</p>
            </div>
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
              className='space-y-4'
            >
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`border rounded-md p-4 cursor-pointer transition-all
                    ${
                      selectedAddressId === address.id
                        ? 'border-black dark:border-gray-400 bg-gray-50 dark:bg-gray-800'
                        : 'border-gray-200 dark:border-gray-700'
                    }
                  `}
                  onClick={() => setSelectedAddressId(address.id)}
                >
                  <div className='flex items-start gap-4'>
                    <RadioGroupItem value={address.id.toString()} id={`address-${address.id}`} className='mt-1' />
                    <div className='flex-1'>
                      <div className='flex justify-between'>
                        <p className='font-semibold'>{address.name}</p>
                        {address.isDefault && (
                          <span className='text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full'>
                            {t('checkout.default')}
                          </span>
                        )}
                      </div>
                      <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>{formatAddress(address)}</p>
                      <p className='text-sm mt-2'>{address.phoneNumber}</p>
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
