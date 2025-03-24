import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Menu, User as UserIcon, MapPin, ShoppingBag, X, Edit2, ChevronRight, Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import ImageUploader from '@/components/image_uploader/ImageUploader'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

// Mock data for demo purposes
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

// Validation schemas
const profileFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  avatar: z.string().optional(),
})

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    newPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

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

const User = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [addressDialogOpen, setAddressDialogOpen] = useState(false)
  const [editAddressId, setEditAddressId] = useState<string | null>(null)

  // Profile form
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: mockUser.name,
      email: mockUser.email,
      avatar: mockUser.avatar,
    },
  })

  // Password form
  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
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

  // Handle profile update
  const onProfileSubmit = (data: z.infer<typeof profileFormSchema>) => {
    console.log('Profile updated:', data)
    // In a real app, send this data to your API
  }

  // Handle password update
  const onPasswordSubmit = (data: z.infer<typeof passwordFormSchema>) => {
    console.log('Password updated:', data)
    // In a real app, send this data to your API
    passwordForm.reset()
  }

  // Handle address form
  const onAddressSubmit = (data: z.infer<typeof addressFormSchema>) => {
    console.log('Address submitted:', data, 'Edit mode:', editAddressId)
    // In a real app, send this data to your API
    setAddressDialogOpen(false)
    addressForm.reset()
    setEditAddressId(null)
  }

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

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className='bg-green-500'>Delivered</Badge>
      case 'processing':
        return <Badge className='bg-blue-500'>Processing</Badge>
      case 'shipped':
        return <Badge className='bg-yellow-500'>Shipped</Badge>
      case 'cancelled':
        return <Badge className='bg-red-500'>Cancelled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Mobile menu button */}
      <div className='flex lg:hidden items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>My Account</h1>
        <Button variant='outline' size='icon' onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className='h-6 w-6' />
        </Button>
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Sidebar - Desktop */}
        <div className='hidden lg:block w-64 shrink-0'>
          <div className='sticky'>
            <div className='flex items-center space-x-4 mb-8'>
              <Avatar className='h-12 w-12'>
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback>{mockUser.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className='font-medium'>{mockUser.name}</p>
                <p className='text-sm text-gray-500'>{mockUser.email}</p>
              </div>
            </div>
            <nav className='space-y-2'>
              <Button
                variant={activeTab === 'profile' ? 'default' : 'ghost'}
                className='w-full justify-start'
                onClick={() => setActiveTab('profile')}
              >
                <UserIcon className='mr-2 h-5 w-5' />
                Profile
              </Button>
              <Button
                variant={activeTab === 'addresses' ? 'default' : 'ghost'}
                className='w-full justify-start'
                onClick={() => setActiveTab('addresses')}
              >
                <MapPin className='mr-2 h-5 w-5' />
                Addresses
              </Button>
              <Button
                variant={activeTab === 'orders' ? 'default' : 'ghost'}
                className='w-full justify-start'
                onClick={() => setActiveTab('orders')}
              >
                <ShoppingBag className='mr-2 h-5 w-5' />
                Orders
              </Button>
            </nav>
          </div>
        </div>

        {/* Sidebar - Mobile */}
        {isMenuOpen && (
          <div className='fixed inset-0 z-50 bg-white dark:bg-gray-950 lg:hidden'>
            <div className='flex flex-col h-full'>
              <div className='flex items-center justify-between p-4 border-b'>
                <h2 className='font-semibold'>Navigation</h2>
                <Button variant='ghost' size='icon' onClick={() => setIsMenuOpen(false)}>
                  <X className='h-5 w-5' />
                </Button>
              </div>
              <div className='flex-1 overflow-auto p-4'>
                <div className='flex items-center space-x-4 mb-8'>
                  <Avatar className='h-12 w-12'>
                    <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                    <AvatarFallback>{mockUser.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='font-medium'>{mockUser.name}</p>
                    <p className='text-sm text-gray-500'>{mockUser.email}</p>
                  </div>
                </div>
                <nav className='space-y-2'>
                  <Button
                    variant={activeTab === 'profile' ? 'default' : 'ghost'}
                    className='w-full justify-start'
                    onClick={() => {
                      setActiveTab('profile')
                      setIsMenuOpen(false)
                    }}
                  >
                    <UserIcon className='mr-2 h-5 w-5' />
                    Profile
                  </Button>
                  <Button
                    variant={activeTab === 'addresses' ? 'default' : 'ghost'}
                    className='w-full justify-start'
                    onClick={() => {
                      setActiveTab('addresses')
                      setIsMenuOpen(false)
                    }}
                  >
                    <MapPin className='mr-2 h-5 w-5' />
                    Addresses
                  </Button>
                  <Button
                    variant={activeTab === 'orders' ? 'default' : 'ghost'}
                    className='w-full justify-start'
                    onClick={() => {
                      setActiveTab('orders')
                      setIsMenuOpen(false)
                    }}
                  >
                    <ShoppingBag className='mr-2 h-5 w-5' />
                    Orders
                  </Button>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className='flex-1'>
          {/* Profile Section */}
          {activeTab === 'profile' && (
            <div>
              <h2 className='text-2xl font-bold mb-6'>My Profile</h2>
              <div className='grid gap-8 md:grid-cols-2'>
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className='space-y-6'>
                        <FormField
                          control={profileForm.control}
                          name='avatar'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Profile Picture</FormLabel>
                              <FormControl>
                                <ImageUploader
                                  form={profileForm}
                                  name='avatar'
                                  label='Profile Picture'
                                  defaultImages={[mockUser.avatar]}
                                />
                              </FormControl>
                              <FormDescription>Upload a profile picture.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
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
                          control={profileForm.control}
                          name='email'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type='submit'>Save Changes</Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Update your password</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...passwordForm}>
                      <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className='space-y-6'>
                        <FormField
                          control={passwordForm.control}
                          name='currentPassword'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Password</FormLabel>
                              <FormControl>
                                <Input type='password' {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={passwordForm.control}
                          name='newPassword'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <Input type='password' {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={passwordForm.control}
                          name='confirmPassword'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm New Password</FormLabel>
                              <FormControl>
                                <Input type='password' {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type='submit'>Update Password</Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Addresses Section */}
          {activeTab === 'addresses' && (
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
          )}

          {/* Orders Section */}
          {activeTab === 'orders' && (
            <div>
              <h2 className='text-2xl font-bold mb-6'>My Orders</h2>

              {mockUser.orders.length === 0 ? (
                <Alert>
                  <AlertDescription>You haven't placed any orders yet.</AlertDescription>
                </Alert>
              ) : (
                <div className='space-y-6'>
                  {mockUser.orders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader className='pb-2'>
                        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                          <div>
                            <CardTitle className='text-lg'>Order #{order.id}</CardTitle>
                            <CardDescription>Placed on {new Date(order.date).toLocaleDateString()}</CardDescription>
                          </div>
                          <div className='flex items-center space-x-4 mt-2 sm:mt-0'>
                            {getStatusBadge(order.status)}
                            <p className='font-medium'>{formatCurrency(order.total)}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className='h-[220px] w-full rounded-md border p-4'>
                          {order.items.map((item) => (
                            <div key={item.id} className='flex items-center py-3 first:pt-0 last:pb-0'>
                              <div className='h-16 w-16 rounded-md overflow-hidden shrink-0'>
                                <img src={item.image} alt={item.name} className='h-full w-full object-cover' />
                              </div>
                              <div className='ml-4 flex-1'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-2'>
                                  <div>
                                    <h4 className='font-medium'>{item.name}</h4>
                                    <p className='text-sm text-gray-500'>Qty: {item.quantity}</p>
                                  </div>
                                  <div className='text-right sm:text-right'>
                                    <p className='font-medium'>{formatCurrency(item.price)}</p>
                                    <p className='text-sm text-gray-500'>
                                      {formatCurrency(item.price * item.quantity)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </ScrollArea>
                      </CardContent>
                      <CardFooter className='flex justify-between'>
                        <div>
                          <p className='text-sm text-gray-500'>{order.items.length} items</p>
                        </div>
                        <Button variant='outline' className='flex items-center'>
                          View Details <ChevronRight className='ml-2 h-4 w-4' />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default User
