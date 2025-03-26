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
import { Combobox } from '@/components/ui/combobox'
import { District, Province, Ward } from '@/apis/address/addressInterfaces'
import AddressAPI from '@/apis/address/address'
import { AutoComplete } from '@/components/autocomplete/AutoComplete'
// import { provinces, getDistricts, getWards } from '@/data/location-data'

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  createdAt: '2023-01-01',
  addresses: [
    {
      id: '1',
      name: 'John Doe',
      phoneNumber: '+1 234 567 8901',
      province: 'New York',
      district: 'NY',
      ward: '10001',
      street: '123 Main St',
      isDefault: true,
    },
  ],
}

const UserAddress = () => {
  const [addressDialogOpen, setAddressDialogOpen] = useState(false)
  const [editAddressId, setEditAddressId] = useState<string | null>(null)
  const [provinces, setProvinces] = useState<Province[]>([])
  const [availableDistricts, setAvailableDistricts] = useState([])
  const [availableWards, setAvailableWards] = useState([])

  const addressFormSchema = z.object({
    name: z.string().min(2, { message: 'Full name is required' }),
    phoneNumber: z.string().min(6, { message: 'Phone number is required' }),
    province: z.string().min(2, { message: 'Province is required' }),
    district: z.string().min(2, { message: 'District address is required' }),
    ward: z.string().min(2, { message: 'Ward address is required' }),
    street: z.string().min(2, { message: 'Street address is required' }),
    isDefault: z.boolean().default(false),
  })

  // Address form
  const addressForm = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      province: '',
      district: '',
      ward: '',
      street: '',
      isDefault: false,
    },
  })

  // Watch for province and district changes to update available options
  const selectedProvince = addressForm.watch('province')
  const selectedDistrict = addressForm.watch('district')

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

  useEffect(() => {
    getAllProvinces()
  }, [])

  // Update districts when province changes
  useEffect(() => {
    const getDistricts = async () => {
      if (selectedProvince) {
        try {
          const response = await AddressAPI.getAllDistrictsByProvinceId(selectedProvince)
          if (response?.data?.data) {
            const districts = response.data.data.map((district: District) => ({
              value: district.code,
              label: district.name,
            }))
            setAvailableDistricts(districts)
          } else {
            setAvailableDistricts([])
          }
        } catch (error) {
          console.error('Error fetching districts:', error)
          setAvailableDistricts([])
        }

        // Reset district and ward if province changes
        if (addressForm.getValues('district')) {
          addressForm.setValue('district', '')
          addressForm.setValue('ward', '')
          setAvailableWards([])
        }
      } else {
        setAvailableDistricts([])
        setAvailableWards([])
      }
    }

    getDistricts()
  }, [selectedProvince, addressForm])

  // Update wards when district changes
  useEffect(() => {
    const getWards = async () => {
      if (selectedProvince && selectedDistrict) {
        try {
          const response = await AddressAPI.getAllWardsByDistrictId(selectedProvince, selectedDistrict)
          if (response?.data?.data) {
            const wards = response.data.data.map((ward: Ward) => ({
              value: ward.code,
              label: ward.name,
            }))
            setAvailableWards(wards)
          } else {
            setAvailableWards([])
          }
        } catch (error) {
          console.error('Error fetching wards:', error)
          setAvailableWards([])
        }

        // Reset ward if district changes
        if (addressForm.getValues('ward')) {
          addressForm.setValue('ward', '')
        }
      } else {
        setAvailableWards([])
      }
    }

    getWards()
  }, [selectedProvince, selectedDistrict, addressForm])

  // Edit address
  const handleEditAddress = (address: (typeof mockUser.addresses)[0]) => {
    setEditAddressId(address.id)
    addressForm.reset({
      name: address.name,
      phoneNumber: address.phoneNumber,
      province: address.province,
      district: address.district,
      ward: address.ward,
      street: address.street,
      isDefault: address.isDefault,
    })
    setAddressDialogOpen(true)
  }

  // Add new address
  const handleAddAddress = () => {
    setEditAddressId(null)
    addressForm.reset({
      name: '',
      phoneNumber: '',
      province: '',
      district: '',
      ward: '',
      street: '',
      isDefault: false,
    })
    setAddressDialogOpen(true)
  }

  // Delete address
  const handleDeleteAddress = (id: string) => {
    console.log('Delete address:', id)
    // In a real app, send a delete request to your API
  }

  // Handle address form
  const onAddressSubmit = (data: z.infer<typeof addressFormSchema>) => {
    console.log('Address submitted:', data, 'Edit mode:', editAddressId)
    // In a real app, send this data to your API
    setAddressDialogOpen(false)
    addressForm.reset()
    setEditAddressId(null)
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-bold'>My Addresses</h2>
        <Button onClick={handleAddAddress}>
          <Plus className='mr-2 h-4 w-4' /> Add Address
        </Button>
      </div>

      {mockUser.addresses.length === 0 ? (
        <Alert>
          <AlertDescription>
            You haven't added any addresses yet. Add your first address to make checkout easier.
          </AlertDescription>
        </Alert>
      ) : (
        <div className='grid gap-4 md:grid-cols-2'>
          {mockUser.addresses.map((address) => (
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
                    {address.province}, {address.district} {address.ward}
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
                <FormField
                  control={addressForm.control}
                  name='province'
                  render={({ field: _field }) => (
                    <FormItem>
                      <FormLabel>Province</FormLabel>
                      <FormControl>
                        <AutoComplete
                          options={provinces.map((province) => ({
                            value: province.code,
                            label: province.name,
                          }))}
                          emptyMessage='No provinces found.'
                          placeholder='Select Province'
                        ></AutoComplete>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addressForm.control}
                  name='district'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District</FormLabel>
                      <FormControl>
                        <Combobox
                          options={availableDistricts}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder='Select District'
                          emptyMessage={!selectedProvince ? 'Select province first' : 'No districts found.'}
                          disabled={!selectedProvince}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addressForm.control}
                  name='ward'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ward</FormLabel>
                      <FormControl>
                        <Combobox
                          options={availableWards}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder='Select Ward'
                          emptyMessage={!selectedDistrict ? 'Select district first' : 'No wards found.'}
                          disabled={!selectedDistrict}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
