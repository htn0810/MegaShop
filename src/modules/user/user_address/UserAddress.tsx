import { useState } from 'react'
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

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  createdAt: '2023-01-01',
  addresses: [
    {
      id: '1',
      title: 'Home',
      fullName: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
      phone: '+1 234 567 8901',
      isDefault: true,
    },
    {
      id: '2',
      title: 'Work',
      fullName: 'John Doe',
      street: '456 Office Ave',
      city: 'Boston',
      state: 'MA',
      postalCode: '02108',
      country: 'USA',
      phone: '+1 234 567 8902',
      isDefault: false,
    },
  ],
  orders: [
    {
      id: 'ORD-001',
      date: '2023-05-15',
      status: 'delivered',
      total: 159.99,
      items: [
        {
          id: '1',
          name: 'Wireless Headphones',
          price: 99.99,
          quantity: 1,
          image: 'https://placehold.co/60x60',
        },
        {
          id: '2',
          name: 'Smart Watch',
          price: 60.0,
          quantity: 1,
          image: 'https://placehold.co/60x60',
        },
      ],
    },
    {
      id: 'ORD-002',
      date: '2023-06-20',
      status: 'processing',
      total: 249.99,
      items: [
        {
          id: '3',
          name: 'Bluetooth Speaker',
          price: 79.99,
          quantity: 1,
          image: 'https://placehold.co/60x60',
        },
        {
          id: '4',
          name: 'Wireless Charger',
          price: 35.0,
          quantity: 2,
          image: 'https://placehold.co/60x60',
        },
        {
          id: '5',
          name: 'Phone Case',
          price: 25.0,
          quantity: 4,
          image: 'https://placehold.co/60x60',
        },
      ],
    },
  ],
}

const UserAddress = () => {
  const [addressDialogOpen, setAddressDialogOpen] = useState(false)
  const [editAddressId, setEditAddressId] = useState<string | null>(null)

  const addressFormSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    fullName: z.string().min(2, { message: 'Full name is required' }),
    street: z.string().min(2, { message: 'Street address is required' }),
    city: z.string().min(2, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    postalCode: z.string().min(1, { message: 'Postal code is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
    phone: z.string().min(6, { message: 'Phone number is required' }),
    isDefault: z.boolean().default(false),
  })

  // Address form
  const addressForm = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      title: '',
      fullName: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      phone: '',
      isDefault: false,
    },
  })

  // Edit address
  const handleEditAddress = (address: (typeof mockUser.addresses)[0]) => {
    setEditAddressId(address.id)
    addressForm.reset({
      title: address.title,
      fullName: address.fullName,
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      phone: address.phone,
      isDefault: address.isDefault,
    })
    setAddressDialogOpen(true)
  }

  // Add new address
  const handleAddAddress = () => {
    setEditAddressId(null)
    addressForm.reset({
      title: '',
      fullName: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      phone: '',
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
                      {address.title}
                      {address.isDefault && (
                        <Badge variant='outline' className='ml-2'>
                          Default
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{address.fullName}</CardDescription>
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
                    {address.city}, {address.state} {address.postalCode}
                  </p>
                  <p>{address.country}</p>
                  <p className='pt-2'>{address.phone}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Address Dialog Form */}
      <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
        <DialogContent className='sm:max-w-[500px]'>
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
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={addressForm.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Title</FormLabel>
                      <FormControl>
                        <Input placeholder='Home, Work, etc.' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addressForm.control}
                  name='fullName'
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
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={addressForm.control}
                  name='city'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addressForm.control}
                  name='state'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State/Province</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={addressForm.control}
                  name='postalCode'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addressForm.control}
                  name='country'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={addressForm.control}
                name='phone'
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
