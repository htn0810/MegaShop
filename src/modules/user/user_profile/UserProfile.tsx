import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import ImageUploader from '@/components/image_uploader/ImageUploader'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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

const UserProfile = () => {
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

  return (
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
  )
}

export default UserProfile
