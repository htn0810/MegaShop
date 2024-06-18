import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeSlash } from '@phosphor-icons/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type FormData = {
  password: string
  confirm: string
  email: string
}

const SignUp = () => {
  const { t } = useTranslation()
  const [isHiddenPassword, setIsHiddenPassword] = useState({ password: true, confirm: true })
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

  const onSubmit = (data: FormData) => {
    console.log(data)
  }
  return (
    <div className='flex items-center justify-center'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='p-4 sm:p-10 mt-10 mb-4 space-y-8 border rounded-md shadow-md w-[360px] sm:min-w-[400px]'
        >
          <h6 className='text-xl font-bold text-center'>{t('sign_up.page_title_key').toUpperCase()}</h6>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='mt-[8px_!important]'>
                <FormLabel className='text-black'>Email</FormLabel>
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
                <FormLabel className='text-black'>{t('sign_up.password')}</FormLabel>
                <div className='relative'>
                  <FormControl>
                    <Input
                      {...field}
                      className='focus-visible:ring-offset-0'
                      type={isHiddenPassword.password ? 'password' : 'text'}
                    />
                  </FormControl>
                  {isHiddenPassword.password && (
                    <Eye
                      size={18}
                      className='cursor-pointer absolute right-4 top-0 translate-y-1/2 hover:text-gray-700'
                      onClick={() => setIsHiddenPassword((prev) => ({ ...prev, password: false }))}
                    />
                  )}
                  {!isHiddenPassword.password && (
                    <EyeSlash
                      size={18}
                      className='cursor-pointer absolute right-4 top-0 translate-y-1/2 hover:text-gray-700'
                      onClick={() => setIsHiddenPassword((prev) => ({ ...prev, password: true }))}
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
                <FormLabel className='text-black'>{t('sign_up.confirm_password')}</FormLabel>
                <div className='relative'>
                  <FormControl>
                    <Input
                      {...field}
                      className='focus-visible:ring-offset-0'
                      type={isHiddenPassword.confirm ? 'password' : 'text'}
                    />
                  </FormControl>
                  {isHiddenPassword.confirm && (
                    <Eye
                      size={18}
                      className='cursor-pointer absolute right-4 top-0 translate-y-1/2 hover:text-gray-700'
                      onClick={() => setIsHiddenPassword((prev) => ({ ...prev, confirm: false }))}
                    />
                  )}
                  {!isHiddenPassword.confirm && (
                    <EyeSlash
                      size={18}
                      className='cursor-pointer absolute right-4 top-0 translate-y-1/2 hover:text-gray-700'
                      onClick={() => setIsHiddenPassword((prev) => ({ ...prev, confirm: true }))}
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full'>
            {t('sign_up.submit_btn')}
          </Button>
          <div className='text-end text-gray-500 text-sm font-semibold'>
            <span>
              Already have an account?{' '}
              <Link to='/login' className='text-black hover:text-cyan-800'>
                Login
              </Link>
            </span>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SignUp
