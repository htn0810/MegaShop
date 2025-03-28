import { useState, useEffect } from 'react'
import { X, Edit2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AddressResponse } from '@/apis/address/addressInterfaces'
import AddressAPI from '@/apis/address/address'
import { Skeleton } from '@/components/ui/skeleton'
import ModalAddEditAddress from './modal_add_edit_address/ModalAddEditAddress'
import { toast } from 'sonner'
const UserAddress = () => {
  const [addresses, setAddresses] = useState<AddressResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRerender, setIsRerender] = useState(false)
  const [addressDialogOpen, setAddressDialogOpen] = useState(false)
  const [editAddress, setEditAddress] = useState<AddressResponse | null>(null)

  const getAllAddresses = async () => {
    setIsLoading(true)
    const response = await AddressAPI.getAllAddresses()
    if (response?.data?.data) {
      setAddresses(response?.data?.data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getAllAddresses()
  }, [isRerender])

  // Delete address
  const handleDeleteAddress = async (id: number) => {
    setIsLoading(true)
    toast.promise(AddressAPI.deleteAddress(id), {
      loading: 'Deleting address...',
      success: (response) => {
        setIsRerender((prev) => !prev)
        return response?.data?.message
      },
      finally: () => {
        setIsLoading(false)
      },
    })
  }

  const handleEditAddress = (address: AddressResponse) => {
    setEditAddress(address)
    setAddressDialogOpen(true)
  }

  const handleAddAddress = () => {
    setEditAddress(null)
    setAddressDialogOpen(true)
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-base lg:text-xl font-bold'>My Addresses</h2>
        <Button onClick={handleAddAddress}>
          <Plus className='mr-2 h-4 w-4' /> Add Address
        </Button>
      </div>
      {isLoading && (
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}
      {!isLoading && addresses.length === 0 && (
        <Alert>
          <AlertDescription>
            You haven't added any addresses yet. Add your first address to make checkout easier.
          </AlertDescription>
        </Alert>
      )}
      {!isLoading && addresses.length > 0 && (
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
          {addresses.length > 0 &&
            addresses.map((address) => (
              <Card key={address.id} className={address.isDefault ? 'border-blue-500' : ''}>
                <CardHeader className='pb-2'>
                  <div className='flex justify-between items-start'>
                    <CardDescription className='font-bold text-black dark:text-white'>{address.name}</CardDescription>
                    <div className='flex space-x-2'>
                      <Button variant='ghost' size='icon' onClick={() => handleEditAddress(address)}>
                        <Edit2 className='h-4 w-4' />
                      </Button>
                      <Button variant='ghost' size='icon' onClick={() => handleDeleteAddress(address.id)}>
                        <X className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='text-sm space-y-1'>
                    <p>
                      {address.province.full_name}, {address.district.full_name} {address.ward.full_name}
                    </p>
                    <p>{address.street}</p>
                    <p className='pt-2'>{address.phoneNumber}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}
      <ModalAddEditAddress
        open={addressDialogOpen}
        onOpen={setAddressDialogOpen}
        addressToEdit={editAddress}
        onParentRerender={setIsRerender}
      />
    </div>
  )
}

const SkeletonCard = () => {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <div className='flex gap-2 justify-between items-start'>
          <div className='flex-1'>
            <CardTitle className='flex items-center'>
              <Skeleton className='h-8 w-full' />
            </CardTitle>
          </div>
          <div className='flex space-x-2'>
            <Skeleton className='h-8 w-8' />
            <Skeleton className='h-8 w-8' />
          </div>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <Skeleton className='h-20 w-full' />
        <Skeleton className='h-4 w-20' />
      </CardContent>
    </Card>
  )
}

export default UserAddress
