import AuthAPI from '@/apis/auth/auth'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

type FormData = {
  email: string
}

const ForgotPassword = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: t('login.err_input_need_filled') })
      .email(t('login.err_unvalid_email')),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (data: FormData) => {
    setIsLoading(true)
    toast.promise(AuthAPI.forgotPassword({ ...data }), {
      loading: 'Sending email...',
      success: (_response) => {
        navigate('/login')
        return 'Password reset email sent'
      },
      description: () => {
        return 'Please check your email to get new password!'
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
          className='p-4 sm:p-10 mt-10 md:mt-20 mb-4 space-y-8 border rounded-md shadow-md w-[360px] sm:min-w-[400px] dark:shadow-gray-600'
        >
          <h6 className='text-xl font-bold text-center'>Forgot Password</h6>
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

          <Button type='submit' className='w-full flex items-center justify-center gap-x-1' disabled={isLoading}>
            <span>{isLoading ? <Loader2Icon className='w-4 h-4 animate-spin' /> : ''}</span>
            {t('login.submit_btn')}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ForgotPassword
