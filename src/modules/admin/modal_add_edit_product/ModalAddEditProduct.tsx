import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ImageUploader from '../../../components/image_uploader/ImageUploader'
import { formAddEditProductSchema } from '@/utils/formValidator'
import { useForm } from 'react-hook-form'

type Product = {
  id?: number
  name: string
  description: string
  imageUrls: string
  price: number
  stock: number
  rating?: number
  slug: string
  shopId: number
  categoryId: number
}

type FormData = z.infer<typeof formAddEditProductSchema>

type Props = {
  type: 'add' | 'edit'
  product?: Product
}

const ModalAddEditProduct = (props: Props) => {
  const { type, product } = props

  const form = useForm<FormData>({
    resolver: zodResolver(formAddEditProductSchema),
    defaultValues: {
      name: product?.name || '',
      category: '',
      description: '',
      price: product?.price || 0,
      stock: product?.stock || 0,
      slug: product?.slug || '',
      images: product?.imageUrls?.split(',') || [],
    },
  })

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data)
    // Xử lý submit form ở đây
  }

  return (
    <div className='flex items-center justify-center'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='md:p-4 space-y-8 w-full'>
          <h6 className='md:text-lg text-base font-bold text-left capitalize'>{type} product</h6>
          <ScrollArea className='max-h-[400px] flex flex-col gap-y-4 pr-4'>
            <ImageUploader files={[]} setFiles={() => {}} multiple maxFiles={5} />
            <div className='grid grid-cols-1 md:grid-cols-6 gap-x-4 mt-[8px_!important]'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='col-span-1 md:col-span-4'>
                    <FormLabel className=' text-sm md:text-base'>Name</FormLabel>
                    <FormControl>
                      <Input {...field} className='focus-visible:ring-offset-0 text-xs md:text-sm' />
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
                    <FormLabel className=' text-sm md:text-base'>Category</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className='w-full text-xs md:text-sm'>
                          <SelectValue placeholder='Select category' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value='apple' className='text-xs md:text-sm'>
                              Apple
                            </SelectItem>
                            <SelectItem value='banana' className='text-xs md:text-sm'>
                              Banana
                            </SelectItem>
                            <SelectItem value='blueberry' className='text-xs md:text-sm'>
                              Blueberry
                            </SelectItem>
                            <SelectItem value='grapes' className='text-xs md:text-sm'>
                              Grapes
                            </SelectItem>
                            <SelectItem value='pineapple' className='text-xs md:text-sm'>
                              Pineapple
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid sm:grid-cols-3 grid-cols-1 gap-4 '>
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem className='mt-[8px_!important]'>
                    <FormLabel className='text-sm md:text-base'>Price</FormLabel>
                    <FormControl>
                      <Input {...field} className='focus-visible:ring-offset-0  text-xs md:text-sm' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='stock'
                render={({ field }) => (
                  <FormItem className='mt-[8px_!important]'>
                    <FormLabel className='text-sm md:text-base'>Stock</FormLabel>
                    <FormControl>
                      <Input {...field} className='focus-visible:ring-offset-0  text-xs md:text-sm' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='slug'
                render={({ field }) => (
                  <FormItem className='mt-[8px_!important]'>
                    <FormLabel className='text-sm md:text-base'>Slug</FormLabel>
                    <FormControl>
                      <Input {...field} className='focus-visible:ring-offset-0  text-xs md:text-sm' />
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
                  <FormLabel className='  text-sm md:text-base'>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className='focus-visible:ring-offset-0  text-xs md:text-sm' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </ScrollArea>
          <Button type='submit' className='w-full'>
            Add
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ModalAddEditProduct
