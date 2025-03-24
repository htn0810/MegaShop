import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import ModalSelectDiscountProduct from '@/modules/admin/modal_select_discount_product'
import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar as CalendarIcon, Plus } from '@phosphor-icons/react'
import { format } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
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

type Discount = {
  startDate: Date
  endDate: Date
  products: []
  percent: number
  limit: number | undefined
}

// type Props = {
//   kind: 'all' | 'specific'
//   type: 'add' | 'edit'
//   discount?: Discount
// }

type AddProps = {
  type: 'add'
  kind: 'all' | 'specific'
}

type EditProps = {
  type: 'edit'
  kind: 'all' | 'specific'
  discount: Discount
}

const ModalDiscountProduct = (props: AddProps | EditProps) => {
  const [isLimitVoucher, setIsLimitVoucher] = useState<boolean>(false)
  const { kind, type } = props

  const formSchema = z.object({
    startDate: z.date({
      required_error: 'Start date is required.'
    }),
    endDate: z.date({
      required_error: 'End date is required.'
    }),
    products: z.custom<Product[]>(),
    percent: z.number().min(1),
    limit: z.number().optional()
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      type === 'edit'
        ? props.discount
        : {
            startDate: undefined,
            endDate: undefined,
            products: [],
            percent: 0,
            limit: 0
          }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }
  return (
    <div>
      <h3 className='text-base md:text-lg xl:text-xl font-bold capitalize'>
        {type === 'add' ? 'Tạo' : 'Thêm'} mã giảm giá trực tiếp cho sản phẩm
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='p-4 space-y-8'>
          <div className='grid grid-cols-2 gap-x-4 mt-[8px_!important]'>
            <FormField
              control={form.control}
              name='startDate'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel className='text-sm md:text-base'>Bắt đầu</FormLabel>
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal md:text-sm text-xs',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='endDate'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel className='text-sm md:text-base'>Kết thúc</FormLabel>
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal md:text-sm text-xs',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        className='md:text-sm text-xs'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) => date < form.getValues('startDate')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='percent'
            render={({ field }) => (
              <FormItem className='mt-[8px_!important]'>
                <FormLabel className='text-black dark:text-white text-sm md:text-base'>Mức giảm (%)</FormLabel>
                <FormControl>
                  <Input {...field} className='focus-visible:ring-offset-0 md:text-sm text-xs' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='limit'
            render={({ field }) => (
              <FormItem className='mt-[8px_!important]'>
                <div className='flex items-center gap-x-2'>
                  <FormLabel className='text-black dark:text-white text-sm md:text-base'>Giới hạn số lượng</FormLabel>
                  <Switch id='limit-voucher' onCheckedChange={() => setIsLimitVoucher((prev) => !prev)} />
                </div>
                <FormControl>
                  <Input
                    {...field}
                    className='focus-visible:ring-offset-0 md:text-sm text-xs'
                    placeholder='Không giới hạn số lượng'
                    disabled={isLimitVoucher}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {kind === 'specific' && (
            <FormField
              control={form.control}
              name='products'
              render={() => (
                <FormItem className='mt-[8px_!important] flex flex-col'>
                  <FormLabel className='text-black dark:text-white'>Sản phẩm áp dụng</FormLabel>
                  <FormControl></FormControl>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className='w-[160px]' type='button'>
                        <Plus className='ml-auto size-4 mr-2' />
                        Thêm sản phẩm
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='w-[360px] sm:min-w-[400px] md:w-[600px] xl:w-[700px] max-w-2xl'>
                      <DialogTitle>Chọn Sản Phẩm</DialogTitle>
                      <DialogDescription className='hidden' />
                      <ModalSelectDiscountProduct />
                    </DialogContent>
                  </Dialog>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className='flex gap-x-2 justify-end'>
            <DialogClose asChild>
              <Button type='reset' variant={'outline'} className='bg-gray-50 text-sm md:text-base'>
                Hủy
              </Button>
            </DialogClose>
            <Button className='text-sm md:text-base' type='submit'>
              {type === 'add' ? 'Thêm' : 'Cập nhật'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ModalDiscountProduct
