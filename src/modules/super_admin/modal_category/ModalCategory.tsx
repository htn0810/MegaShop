// import ImageUploader from '@/components/image_uploader/ImageUploader'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

type Category = {
  image: string
  name: string
}

type AddProps = {
  type: 'add'
  children: ReactNode
}

type EditProps = {
  type: 'edit'
  category: Category
  children: ReactNode
}

type FormData = {
  name: string
  image: string
}

const ModalCategory = (props: AddProps | EditProps) => {
  const { type, children } = props
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const formSchema = z.object({
    name: z.string().min(1, { message: t('login.err_input_need_filled') }),
    image: z.string(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      image: '',
    },
  })

  useEffect(() => {
    if (isOpen && type === 'edit') {
      form.reset({
        name: props.category.name,
        image: props.category.image || '',
      })
    }
  }, [isOpen, type])

  const onSubmit = (data: FormData) => {
    console.log(data)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='w-[360px] sm:min-w-[400px] md:w-[600px] xl:w-[700px] max-w-2xl'>
        <DialogTitle className='hidden' />
        <DialogDescription className='hidden' />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <h6 className='md:text-lg text-base font-bold text-left capitalize'>{type} Category</h6>
            {/* {isOpen && (
              <ImageUploader
                form={form}
                name='image'
                multiple={false}
                maxFiles={1}
                defaultImages={type === 'edit' && props.category.image ? [props.category.image] : []}
              />
            )} */}
            <div className='mt-[8px_!important]'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='text-black dark:text-white text-sm md:text-base'>Name</FormLabel>
                    <FormControl>
                      <Input {...field} className='focus-visible:ring-offset-0 text-xs md:text-sm' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit' className='w-full'>
              {type === 'edit' ? 'Update' : 'Add'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ModalCategory
