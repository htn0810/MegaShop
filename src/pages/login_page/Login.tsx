import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeSlash } from '@phosphor-icons/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import AuthAPI from '@/apis/auth/auth'
import { toast } from 'sonner'
import { CartAPI } from '@/apis/cart/cart'
import { useUserStore } from '@/store/userStore'
import { useCartStore } from '@/store/cartStore'
import { groupProductsByShop } from '@/utils/groupProductsByShop'
import { connectSocket, getSocket } from '@/configs/socket'

type FormData = {
  email: string
  password: string
}

const Login = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setUser } = useUserStore()
  const { setCart } = useCartStore()
  const [isHiddenPassword, setIsHiddenPassword] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const socket = getSocket()
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: t('login.err_input_need_filled') })
      .email(t('login.err_unvalid_email')),
    password: z
      .string()
      .min(6, { message: t('login.err_min_length_password') })
      .max(20, { message: t('login.err_max_length_password') })
      .regex(/[A-Z]/, { message: t('login.err_miss_upper_character') })
      .regex(/[a-z]/, { message: t('login.err_miss_lower_character') })
      .regex(/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/, { message: t('login.err_miss_special_character') })
      .regex(/[\d]/, { message: t('login.err_miss_digit') }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: FormData) => {
    setIsLoading(true)
    toast.promise(AuthAPI.login({ ...data }), {
      loading: 'Logging in...',
      success: (response) => {
        setIsLoading(false)
        const { user } = response.data.data
        setUser(user)
        connectSocket({ userId: user.id })
        handleGetCart()
        const message = response.data.message
        socket.emit('setStatus', {
          userId: user.id,
          status: 'ONLINE',
        })
        // Join conversation
        socket.emit('registerUser', { userId: user.id })
        navigate('/')
        return message
      },
      finally: () => {
        setIsLoading(false)
      },
    })
  }

  const handleGetCart = async () => {
    try {
      const response = await CartAPI.getCart()
      const productsGroup = groupProductsByShop(response.data.data.cartProducts)
      setCart({
        cartProductsGroupByShop: productsGroup,
        totalQuantity: response.data.data.totalQuantity,
        totalPrice: response.data.data.totalPrice,
        id: response.data.data.id,
        userId: response.data.data.userId,
        cartProducts: response.data.data.cartProducts,
      })
    } catch (error) {
      toast.error('Error getting user cart')
    }
  }

  return (
    <div className='flex items-center justify-center'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='p-4 sm:p-10 mt-10 mb-4 space-y-8 border rounded-md shadow-md w-[360px] sm:min-w-[400px] dark:shadow-gray-600'
        >
          <h6 className='text-xl font-bold text-center'>{t('login.page_title_key').toUpperCase()}</h6>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='mt-[8px_!important]'>
                <FormLabel className='text-black dark:text-white'>Email</FormLabel>
                <FormControl>
                  <Input {...field} className='focus-visible:ring-offset-0' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='mt-[8px_!important]'>
                <FormLabel className='text-black dark:text-white'>{t('login.password')}</FormLabel>
                <div className='relative'>
                  <FormControl>
                    <Input
                      {...field}
                      className='focus-visible:ring-offset-0'
                      type={isHiddenPassword ? 'password' : 'text'}
                    />
                  </FormControl>
                  {isHiddenPassword && (
                    <Eye
                      size={18}
                      className='cursor-pointer absolute right-4 top-0 translate-y-1/2 hover:text-gray-700'
                      onClick={() => setIsHiddenPassword(false)}
                    />
                  )}
                  {!isHiddenPassword && (
                    <EyeSlash
                      size={18}
                      className='cursor-pointer absolute right-4 top-0 translate-y-1/2 hover:text-gray-700'
                      onClick={() => setIsHiddenPassword(true)}
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full' disabled={isLoading}>
            {t('login.submit_btn')}
          </Button>
          <div className='text-end text-gray-500 text-sm font-semibold'>
            <span>
              {t('login.have_account')}{' '}
              <Link to='/signup' className='text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-600'>
                {t('login.sign_up')}
              </Link>
            </span>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Login
