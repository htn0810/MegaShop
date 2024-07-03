import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { PencilSimpleLine } from '@phosphor-icons/react'
import { Switch } from '@/components/ui/switch'

type FormData = {
  name: string
}

const AdminProfile = () => {
  const { t } = useTranslation()
  const formSchema = z.object({
    name: z.string().min(1, { message: t('login.err_input_need_filled') }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <div className='mt-4 flex flex-col md:flex-row items-center md:items-start justify-center gap-y-6 gap-x-10 px-4 md:px-10 py-6 border rounded-md'>
      <div className='w-52 h-52 rounded-full overflow-hidden'>
        <img
          src='https://images.unsplash.com/photo-1719727033346-00f93d18d7e8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='ShopAvatar'
        />
      </div>
      <div>
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
                      <Input {...field} className='focus-visible:ring-offset-0' />
                    </FormControl>
                    <PencilSimpleLine size={20} className='absolute top-1/2 -translate-y-1/5 right-4 cursor-pointer' />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex gap-x-4 mt-[8px_!important]'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='flex gap-x-4 items-center mt-4 space-y-[0_!important]'>
                    <FormLabel className='text-black dark:text-white' htmlFor='active-mode'>
                      Active Shop
                    </FormLabel>
                    <FormControl>
                      <Switch id='active-mode' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit' className='w-full'>
              Save changes
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default AdminProfile
