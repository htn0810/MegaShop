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
import { toast } from 'sonner'
import AuthAPI from '@/apis/auth/auth'
import { Loader2Icon } from 'lucide-react'

type FormData = {
  password: string
  confirm: string
  email: string
}

const SignUp = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isHiddenPassword, setIsHiddenPassword] = useState({ password: true, confirm: true })
  const [isLoading, setIsLoading] = useState(false)
  const formSchema = z
    .object({
      email: z
        .string()
        .min(1, { message: t('sign_up.err_input_need_filled') })
        .email(t('sign_up.err_unvalid_email')),
      password: z
        .string()
        .min(6, { message: t('sign_up.err_min_length_password') })
        .max(20, { message: t('sign_up.err_max_length_password') })
        .regex(/[A-Z]/, { message: t('sign_up.err_miss_upper_character') })
        .regex(/[a-z]/, { message: t('sign_up.err_miss_lower_character') })
        .regex(/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/, { message: t('sign_up.err_miss_special_character') })
        .regex(/[\d]/, { message: t('sign_up.err_miss_digit') }),
      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
      message: t('sign_up.err_password_not_match'),
      path: ['confirm'], // path of error
    })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
    },
  })

  const onSubmit = (formData: FormData) => {
    setIsLoading(true)
    toast.promise(AuthAPI.register(formData), {
      loading: 'Signing up...',
      success: (_response) => {
        navigate('/login')
        return 'Signed up successfully'
      },
      description: (_response) => {
        return 'Please check your email to verify your account'
      },
      finally: () => {
        setIsLoading(false)
      },
    })
  }
  return (
    <div className='flex items-center justify-center'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='p-4 sm:p-10 mt-10 mb-4 space-y-8 border rounded-md shadow-md w-[360px] sm:min-w-[400px] dark:shadow-gray-600'
        >
          <h6 className='text-xl font-bold text-center'>{t('sign_up.page_title_key').toUpperCase()}</h6>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='mt-[8px_!important]'>
                <FormLabel className='text-black dark:text-white'>Email</FormLabel>
                <FormControl>
                  <Input {...field} className='focus-visible:ring-offset-0 ' />
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
                <FormLabel className='text-black dark:text-white'>{t('sign_up.password')}</FormLabel>
                <div className='relative'>
                  <FormControl>
                    <Input
                      {...field}
                      className='focus-visible:ring-offset-0'
                      type={isHiddenPassword.password ? 'password' : 'text'}
                      autoComplete='off'
                    />
                  </FormControl>
                  {!isHiddenPassword.password && (
                    <Eye
                      size={18}
                      className='cursor-pointer absolute right-4 top-0 translate-y-1/2 hover:text-gray-700'
                      onClick={() => setIsHiddenPassword((prev) => ({ ...prev, password: true }))}
                    />
                  )}
                  {isHiddenPassword.password && (
                    <EyeSlash
                      size={18}
                      className='cursor-pointer absolute right-4 top-0 translate-y-1/2 hover:text-gray-700'
                      onClick={() => setIsHiddenPassword((prev) => ({ ...prev, password: false }))}
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirm'
            render={({ field }) => (
              <FormItem className='mt-[8px_!important]'>
                <FormLabel className='text-black dark:text-white'>{t('sign_up.confirm_password')}</FormLabel>
                <div className='relative'>
                  <FormControl>
                    <Input
                      {...field}
                      className='focus-visible:ring-offset-0'
                      type={isHiddenPassword.confirm ? 'password' : 'text'}
                      autoComplete='off'
                    />
                  </FormControl>
                  {!isHiddenPassword.confirm && (
                    <Eye
                      size={18}
                      className='cursor-pointer absolute right-4 top-0 translate-y-1/2 hover:text-gray-700'
                      onClick={() => setIsHiddenPassword((prev) => ({ ...prev, confirm: true }))}
                    />
                  )}
                  {isHiddenPassword.confirm && (
                    <EyeSlash
                      size={18}
                      className='cursor-pointer absolute right-4 top-0 translate-y-1/2 hover:text-gray-700'
                      onClick={() => setIsHiddenPassword((prev) => ({ ...prev, confirm: false }))}
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full' disabled={isLoading}>
            {!isLoading && t('sign_up.submit_btn')}
            {isLoading && (
              <span className='ml-2 flex items-center gap-x-2'>
                {<Loader2Icon className='w-4 h-4 animate-spin' />} Signing up...
              </span>
            )}
          </Button>
          <div className='text-end text-gray-500 text-sm font-semibold'>
            <span>
              {t('sign_up.have_account')}{' '}
              <Link to='/login' className='text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-600'>
                {t('sign_up.login')}
              </Link>
            </span>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SignUp
