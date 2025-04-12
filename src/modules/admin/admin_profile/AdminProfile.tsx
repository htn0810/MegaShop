import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { PencilSimpleLine, Camera } from '@phosphor-icons/react'
import { Switch } from '@/components/ui/switch'
import { useState, useRef } from 'react'
import { toast } from 'sonner'
import { useMegaStore } from '@/store/store'
import ShopAPI from '@/apis/shop/shop'
import { DEFAULT_SHOP_AVATAR, DEFAULT_SHOP_COVER } from '@/constants/common.constant'
import { Skeleton } from '@/components/ui/skeleton'
import { ShopStatus } from '@/apis/shop/shopInterfaces'
import { useUserStore } from '@/store/userStore'

type FormData = {
  name: string
  isActive: boolean
}

const AdminProfile = () => {
  const { t } = useTranslation()
  const shop = useMegaStore((state) => state.user?.shop)!
  const { updateShop } = useUserStore()
  const [profileImage, setProfileImage] = useState<string>(shop.avatarUrl || DEFAULT_SHOP_AVATAR)
  const [coverImage, setCoverImage] = useState<string>(shop.coverUrl || DEFAULT_SHOP_COVER)
  const [isCoverLoading, setIsCoverLoading] = useState(false)
  const [isProfileLoading, setIsProfileLoading] = useState(false)
  const [isFormLoading, setIsFormLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const coverFileInputRef = useRef<HTMLInputElement>(null)

  const formSchema = z.object({
    name: z.string().min(1, { message: t('login.err_input_need_filled') }),
    isActive: z.boolean().default(false),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: shop.name || '',
      isActive: shop.status === ShopStatus.ACTIVE,
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsFormLoading(true)
    toast.promise(
      ShopAPI.updateShopInfo(
        shop.id,
        data.name,
        shop.description,
        data.isActive ? ShopStatus.ACTIVE : ShopStatus.DISABLED,
      ),
      {
        loading: 'Updating shop information...',
        success: (response) => {
          updateShop(response.data.data)
          return 'Shop information updated successfully'
        },
        finally: () => {
          setIsFormLoading(false)
        },
      },
    )
  }

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleUpdateProfileImage(file)
    }
  }

  const handleUpdateProfileImage = async (profileImage: File) => {
    setIsProfileLoading(true)
    toast.promise(ShopAPI.updateShopProfileImage(shop.id, profileImage), {
      loading: 'Updating profile image...',
      success: (response) => {
        setProfileImage(response.data.data)
        updateShop({ avatarUrl: response.data.data })
        return 'Profile image updated successfully'
      },
      finally: () => {
        setIsProfileLoading(false)
      },
    })
  }

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleUpdateCoverImage(file)
    }
  }

  const handleUpdateCoverImage = async (coverImage: File) => {
    setIsCoverLoading(true)
    toast.promise(ShopAPI.updateShopCoverImage(shop.id, coverImage), {
      loading: 'Updating cover image...',
      success: (response) => {
        setCoverImage(response.data.data)
        updateShop({ coverUrl: response.data.data })
        return 'Cover image updated successfully'
      },
      finally: () => {
        setIsCoverLoading(false)
      },
    })
  }

  const handleCameraClick = () => {
    fileInputRef.current?.click()
  }

  const handleCoverCameraClick = () => {
    coverFileInputRef.current?.click()
  }

  return (
    <div className='mt-4'>
      <div className='border rounded-md overflow-hidden'>
        {/* Cover Image */}
        <div className='relative h-48 w-full'>
          {isCoverLoading ? (
            <Skeleton className='w-full h-full' />
          ) : (
            <img src={coverImage} alt='Shop Cover' className='w-full h-full object-cover' />
          )}
          <div
            className='absolute top-4 right-4 bg-black/40 p-2 rounded-full cursor-pointer hover:bg-black/60 transition-colors'
            onClick={handleCoverCameraClick}
          >
            <Camera size={24} weight='fill' className='text-white' />
          </div>
          <input
            type='file'
            ref={coverFileInputRef}
            className='hidden'
            accept='image/*'
            onChange={handleCoverImageChange}
          />
        </div>

        {/* Profile Content */}
        <div className='flex flex-col md:flex-row items-center md:items-start gap-y-6 gap-x-10 px-4 md:px-10 py-6 relative'>
          {/* Avatar - positioned to overlap the cover image */}
          <div className='relative w-52 h-52 rounded-full overflow-hidden group -mt-24 border-4 border-white dark:border-gray-800'>
            {isProfileLoading ? (
              <Skeleton className='w-full h-full rounded-full' />
            ) : (
              <img src={profileImage} alt='ShopAvatar' className='w-full h-full object-cover' />
            )}
            <div
              className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
              onClick={handleCameraClick}
            >
              <Camera size={32} weight='fill' className='text-white' />
            </div>
            <input
              type='file'
              ref={fileInputRef}
              className='hidden'
              accept='image/*'
              onChange={handleProfileImageChange}
            />
          </div>

          {/* Form */}
          <div className='w-full md:w-auto md:pt-6'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <div className='flex gap-x-4'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem className='relative w-60 md:w-80'>
                        <FormLabel className='text-black dark:text-white'>Name</FormLabel>
                        <FormControl>
                          <Input {...field} className='focus-visible:ring-offset-0' disabled={isFormLoading} />
                        </FormControl>
                        <PencilSimpleLine
                          size={20}
                          className='absolute top-1/2 -translate-y-1/5 right-4 cursor-pointer'
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='flex gap-x-4 mt-[8px_!important]'>
                  <FormField
                    control={form.control}
                    name='isActive'
                    render={({ field }) => (
                      <FormItem className='flex gap-x-4 items-center mt-4 space-y-[0_!important]'>
                        <FormLabel className='text-black dark:text-white' htmlFor='active-mode'>
                          Active Shop
                        </FormLabel>
                        <FormControl>
                          <Switch
                            id='active-mode'
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isFormLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type='submit' className='w-full' disabled={isFormLoading}>
                  {isFormLoading ? 'Saving...' : 'Save changes'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile
