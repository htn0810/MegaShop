import { useState, useEffect } from 'react'
import { X, Edit2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Address, AddressResponse, District, Province, Ward } from '@/apis/address/addressInterfaces'
import AddressAPI from '@/apis/address/address'
import AutoComplete from '@/components/autocomplete/AutoComplete'
import { Option } from '@/types/common.type'

const UserAddress = () => {
  const [addresses, setAddresses] = useState<AddressResponse[]>([])
  const [addressDialogOpen, setAddressDialogOpen] = useState(false)
  const [editAddressId, setEditAddressId] = useState<number | null>(null)
  const [provinces, setProvinces] = useState<Province[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [wards, setWards] = useState<Ward[]>([])
  const [selectedProvince, setSelectedProvince] = useState<Option | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<Option | null>(null)
  const [selectedWard, setSelectedWard] = useState<Option | null>(null)

  const addressFormSchema = z.object({
    name: z.string().min(2, { message: 'Full name is required' }),
    phoneNumber: z.string().min(6, { message: 'Phone number is required' }),
    street: z.string().min(2, { message: 'Street address is required' }),
    isDefault: z.boolean().default(false),
  })

  // Address form
  const addressForm = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      street: '',
      isDefault: false,
    },
  })

  const getAllProvinces = async () => {
    try {
      const response = await AddressAPI.getAllProvinces()
      if (response?.data?.data) {
        setProvinces(response.data.data)
      } else {
        console.error('Invalid response format:', response)
        setProvinces([])
      }
    } catch (error) {
      console.error('Error fetching provinces:', error)
      setProvinces([])
    }
  }

  const getDistricts = async (provinceCode: string) => {
    try {
      const response = await AddressAPI.getAllDistrictsByProvinceId(provinceCode)
      if (response?.data?.data) {
        setDistricts(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching districts:', error)
    }
  }

  const getWards = async (provinceCode: string, districtCode: string) => {
    try {
      const response = await AddressAPI.getAllWardsByDistrictId(provinceCode, districtCode)
      if (response?.data?.data) {
        setWards(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching wards:', error)
    }
  }

  const getAllAddresses = async () => {
    const response = await AddressAPI.getAllAddresses()
    console.log('Addresses:', response)
    if (response?.data?.data) {
      setAddresses(response?.data?.data)
    }
  }

  useEffect(() => {
    getAllAddresses()
    getAllProvinces()
  }, [])

  // Update districts when province changes
  useEffect(() => {
    if (selectedProvince && selectedProvince?.value) {
      getDistricts(selectedProvince.value)
    } else {
      setDistricts([])
      setSelectedDistrict(null)
    }
  }, [selectedProvince])

  // Update wards when district changes
  useEffect(() => {
    if (selectedProvince && selectedDistrict && selectedDistrict?.value) {
      getWards(selectedProvince.value, selectedDistrict.value)
    } else {
      setWards([])
      setSelectedWard(null)
    }
  }, [selectedDistrict, selectedProvince])
  // Edit address
  const handleEditAddress = (address: AddressResponse) => {
    setEditAddressId(address.id)
    addressForm.reset({
      name: address.name,
      phoneNumber: address.phoneNumber,
      street: address.street,
      isDefault: address.isDefault,
    })
    setSelectedProvince({ value: address.provinceCode, label: address.province.full_name })
    setSelectedDistrict({ value: address.districtCode, label: address.district.full_name })
    setSelectedWard({ value: address.wardCode, label: address.ward.full_name })
    setAddressDialogOpen(true)
  }

  // Add new address
  const handleAddAddress = () => {
    setEditAddressId(null)
    addressForm.reset({
      name: '',
      phoneNumber: '',
      street: '',
      isDefault: false,
    })
    setAddressDialogOpen(true)
  }

  // Delete address
  const handleDeleteAddress = (id: number) => {
    console.log('Delete address:', id)
    // In a real app, send a delete request to your API
  }

  // Handle address form
  const onAddressSubmit = async (data: z.infer<typeof addressFormSchema>) => {
    console.log('Address submitted:', data, 'Edit mode:', editAddressId)
    if (selectedProvince && selectedDistrict && selectedWard) {
      const address: Address = {
        ...data,
        provinceCode: selectedProvince.value,
        districtCode: selectedDistrict.value,
        wardCode: selectedWard.value,
      }
      console.log('Address:', address)
      const response = await AddressAPI.createAddress(address)
      if (response?.data?.data) {
        resetAndCloseForm()
      } else {
        console.error('Error creating address:', response)
      }
    }
  }

  const resetAndCloseForm = () => {
    addressForm.reset()
    setEditAddressId(null)
    setAddressDialogOpen(false)
    setSelectedProvince(null)
    setSelectedDistrict(null)
    setSelectedWard(null)
    setAddressDialogOpen(false)
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-bold'>My Addresses</h2>
        <Button onClick={handleAddAddress}>
          <Plus className='mr-2 h-4 w-4' /> Add Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <Alert>
          <AlertDescription>
            You haven't added any addresses yet. Add your first address to make checkout easier.
          </AlertDescription>
        </Alert>
      ) : (
        <div className='grid gap-4 md:grid-cols-2'>
          {addresses.length > 0 &&
            addresses.map((address) => (
              <Card key={address.id} className={address.isDefault ? 'border-blue-500' : ''}>
                <CardHeader className='pb-2'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <CardTitle className='flex items-center'>
                        {address.isDefault && (
                          <Badge variant='outline' className='ml-2'>
                            Default
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{address.name}</CardDescription>
                    </div>
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
                    <p>{address.street}</p>
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

      {/* Address Dialog Form */}
      <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
        <DialogContent className='sm:max-w-[700px]'>
          <DialogHeader>
            <DialogTitle>{editAddressId ? 'Edit Address' : 'Add New Address'}</DialogTitle>
            <DialogDescription>
              {editAddressId
                ? 'Update your shipping address details.'
                : 'Fill in the details for your new shipping address.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...addressForm}>
            <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={addressForm.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addressForm.control}
                  name='phoneNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='province'>Province</label>
                  <AutoComplete
                    selectedOption={selectedProvince ?? null}
                    onSelect={setSelectedProvince}
                    options={provinces.map((province) => ({
                      value: province.code,
                      label: province.full_name,
                    }))}
                    placeholder='Select Province'
                  ></AutoComplete>
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='district'>District</label>
                  <AutoComplete
                    selectedOption={selectedDistrict ?? null}
                    onSelect={setSelectedDistrict}
                    options={districts.map((district) => ({
                      value: district.code,
                      label: district.full_name,
                    }))}
                    placeholder='Select District'
                  ></AutoComplete>
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='ward'>Ward</label>
                  <AutoComplete
                    selectedOption={selectedWard ?? null}
                    onSelect={setSelectedWard}
                    options={wards.map((ward) => ({
                      value: ward.code,
                      label: ward.full_name,
                    }))}
                    placeholder='Select Ward'
                  ></AutoComplete>
                </div>
              </div>
              <FormField
                control={addressForm.control}
                name='street'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addressForm.control}
                name='isDefault'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                    <FormControl>
                      <input
                        type='checkbox'
                        checked={field.value}
                        onChange={field.onChange}
                        className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Make this my default address</FormLabel>
                      <FormDescription>This address will be pre-selected during checkout</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type='submit'>{editAddressId ? 'Save Changes' : 'Add Address'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UserAddress
