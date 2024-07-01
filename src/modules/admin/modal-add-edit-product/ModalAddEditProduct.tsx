import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

type Product = {
  id: string
  quantity: number
  name: string
  status: 'in stock' | 'out of stock'
  isDisabled: boolean
  saleOff: number
  image: string
  price: number
}

type Props = {
  type: 'add' | 'edit'
  product?: Product
}

type FormData = {
  name: string
  category: string
  quantity: number
  price: number
  saleOff: number
  description: string
}

const ModalAddEditProduct = (props: Props) => {
  const { type, product } = props
  const { t } = useTranslation()
  const formSchema = z.object({
    name: z.string().min(1, { message: t('login.err_input_need_filled') }),
    category: z.string(),
    quantity: z.number(),
    price: z.number(),
    saleOff: z.number(),
    description: z.string(),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: product ?? {
      name: '',
      category: '',
      quantity: 0,
      price: 0,
      saleOff: 0,
      description: '',
    },
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }
  return (
    <div className='flex items-center justify-center'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='p-4 space-y-8'>
          <h6 className='text-xl font-bold text-left'>{type.toUpperCase()} product</h6>
          <div className='grid grid-cols-1 md:grid-cols-6 gap-x-4 mt-[8px_!important]'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='col-span-1 md:col-span-4'>
                  <FormLabel className='text-black dark:text-white'>Name</FormLabel>
                  <FormControl>
                    <Input {...field} className='focus-visible:ring-offset-0' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='category'
              render={() => (
                <FormItem className='col-span-1 md:col-span-2'>
                  <FormLabel className='text-black dark:text-white'>Category</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select category' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value='apple'>Apple</SelectItem>
                          <SelectItem value='banana'>Banana</SelectItem>
                          <SelectItem value='blueberry'>Blueberry</SelectItem>
                          <SelectItem value='grapes'>Grapes</SelectItem>
                          <SelectItem value='pineapple'>Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-3 gap-x-4 mt-[8px_!important]'>
            <FormField
              control={form.control}
              name='quantity'
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel className='text-black dark:text-white'>Quantity</FormLabel>
                  <FormControl>
                    <Input {...field} className='focus-visible:ring-offset-0' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel className='text-black dark:text-white'>Price</FormLabel>
                  <FormControl>
                    <Input {...field} className='focus-visible:ring-offset-0' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='saleOff'
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel className='text-black dark:text-white'>Sale off</FormLabel>
                  <FormControl>
                    <Input {...field} className='focus-visible:ring-offset-0' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='mt-[8px_!important]'>
                <FormLabel className='text-black dark:text-white'>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} className='focus-visible:ring-offset-0' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full'>
            Add
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ModalAddEditProduct
