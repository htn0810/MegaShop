import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import ImageUploader from '@/components/image_uploader/ImageUploader'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { IUser } from '@/types/user.type'
import { useEffect, useState } from 'react'
import { convertImageUrlToFile } from '@/utils/convertImageUrlToFile'
import { toast } from 'sonner'
import AuthAPI from '@/apis/auth/auth'
import { useMegaStore } from '@/store/store'

type Props = {
  user: IUser
}

const UserProfile = (props: Props) => {
  const { user } = props
  const setUser = useMegaStore((state) => state.setUser)
  useEffect(() => {
    handleLoadCurrentAvatar()
  }, [user.avatarUrl])

  const handleLoadCurrentAvatar = async () => {
    let currentAvatar: File[] = []
    if (user.avatarUrl) {
      const file = await convertImageUrlToFile(user.avatarUrl)
      currentAvatar = [file]
    }
    setUserAvatar(currentAvatar)
  }

  const [userAvatar, setUserAvatar] = useState<File[]>([])
  // Validation schemas
  const profileFormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  })

  const passwordFormSchema = z
    .object({
      currentPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
      newPassword: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .max(32, 'Password must be at most 32 characters long')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/\d/, 'Password must contain at least one number')
        .regex(/[@$!%*?&]/, 'Password must contain at least one special character (@$!%*?&)'),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    })

  // Profile form
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name,
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
    if (userAvatar.length === 0) {
      toast.error('Please upload an avatar')
      return
    }
    toast.promise(AuthAPI.updateUser({ avatar: userAvatar[0], name: data.name, userId: user.id }), {
      loading: 'Updating profile...',
      success: (response) => {
        const updatedUser = response.data.data
        setUser(updatedUser)
        const message = response.data.message
        return message
      },
    })
  }

  // Handle password update
  const onPasswordSubmit = (data: z.infer<typeof passwordFormSchema>) => {
    toast.promise(
      AuthAPI.changePassword({ userId: user.id, currentPassword: data.currentPassword, newPassword: data.newPassword }),
      {
        loading: 'Updating password...',
        success: (response) => {
          const message = response.data.message
          passwordForm.reset()
          return message
        },
      },
    )
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
                <ImageUploader files={userAvatar} setFiles={setUserAvatar} multiple={false} />
                <FormField
                  control={profileForm.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled value={user.email} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
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
                        <Input type='text' {...field} />
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
                        <Input type='text' {...field} />
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
                        <Input type='text' {...field} />
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
