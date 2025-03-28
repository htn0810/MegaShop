import { Input } from '@/components/ui/input'
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
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Option } from '@/types/common.type'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'

type Props = {
  open: boolean
  onOpen: (open: boolean) => void
  addressToEdit?: AddressResponse | null
  onParentRerender: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalAddEditAddress = (props: Props) => {
  const { open, onOpen, addressToEdit, onParentRerender } = props
  const [isLoading, setIsLoading] = useState(false)
  const [provinces, setProvinces] = useState<Province[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [wards, setWards] = useState<Ward[]>([])
  const [selectedProvince, setSelectedProvince] = useState<Option | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<Option | null>(null)
  const [selectedWard, setSelectedWard] = useState<Option | null>(null)

  const addressFormSchema = z.object({
    name: z.string().min(2, { message: 'Full name is required' }),
    phoneNumber: z
      .string()
      .min(6, { message: 'Phone number is required' })
      .refine(
        (phoneNumber) => {
          // check regex phone number VietNam just include number
          return /(?:\+84|0084|0)[235789][0-9]{1,2}[0-9]{7}(?:[^\d]+|$)/g.test(phoneNumber)
        },
        {
          message: 'Phone number is not valid',
        },
      ),
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
        setProvinces([])
      }
    } catch (error) {
      setProvinces([])
    }
  }

  const getDistricts = async (provinceCode: string) => {
    const response = await AddressAPI.getAllDistrictsByProvinceId(provinceCode)
    if (response?.data?.data) {
      setDistricts(response.data.data)
    }
  }

  const getWards = async (provinceCode: string, districtCode: string) => {
    const response = await AddressAPI.getAllWardsByDistrictId(provinceCode, districtCode)
    if (response?.data?.data) {
      setWards(response.data.data)
    }
  }

  useEffect(() => {
    getAllProvinces()
    if (addressToEdit) {
      setSelectedProvince({ value: addressToEdit.province.code, label: addressToEdit.province.full_name })
      setSelectedDistrict({ value: addressToEdit.district.code, label: addressToEdit.district.full_name })
      setSelectedWard({ value: addressToEdit.ward.code, label: addressToEdit.ward.full_name })

      // Make sure to populate the form fields as well
      addressForm.reset({
        name: addressToEdit.name,
        phoneNumber: addressToEdit.phoneNumber,
        street: addressToEdit.street,
        isDefault: addressToEdit.isDefault,
      })
    }
  }, [addressToEdit])

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

  // Handle address form
  const onAddressSubmit = async (data: z.infer<typeof addressFormSchema>) => {
    if (selectedProvince && selectedDistrict && selectedWard) {
      const address: Address = {
        ...data,
        provinceCode: selectedProvince.value,
        districtCode: selectedDistrict.value,
        wardCode: selectedWard.value,
      }
      if (addressToEdit) {
        handleEditAddress(addressToEdit.id, address)
      } else {
        handleAddAddress(address)
      }
    } else {
      toast.error('Please select province/district/ward')
    }
  }

  const resetAndCloseForm = () => {
    addressForm.reset({
      name: '',
      phoneNumber: '',
      street: '',
      isDefault: false,
    })
    setSelectedProvince(null)
    setSelectedDistrict(null)
    setSelectedWard(null)
    onOpen(false)
  }

  // Edit address
  const handleEditAddress = async (addressId: number, address: Address) => {
    setIsLoading(true)
    toast.promise(AddressAPI.updateAddress(addressId, address), {
      loading: 'Updating address...',
      success: (response) => {
        onParentRerender((prev) => !prev)
        resetAndCloseForm()
        return response?.data?.message
      },
      finally: () => {
        setIsLoading(false)
      },
    })
  }

  // Add new address
  const handleAddAddress = async (address: Address) => {
    setIsLoading(true)
    toast.promise(AddressAPI.createAddress(address), {
      loading: 'Adding address...',
      success: (response) => {
        onParentRerender((prev) => !prev)
        resetAndCloseForm()
        return response?.data?.message
      },
      finally: () => {
        setIsLoading(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={resetAndCloseForm}>
      <DialogContent className='sm:max-w-[700px]'>
        <DialogHeader>
          <DialogTitle>{addressToEdit ? 'Edit Address' : 'Add New Address'}</DialogTitle>
          <DialogDescription>
            {addressToEdit
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
              <Button type='submit' disabled={isLoading}>
                {isLoading && (
                  <span className='flex items-center gap-2'>
                    <Loader2Icon className='animate-spin' />
                    Saving...
                  </span>
                )}
                {!isLoading && (addressToEdit ? 'Save Changes' : 'Add Address')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default ModalAddEditAddress
