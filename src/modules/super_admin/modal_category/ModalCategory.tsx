import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useDragDropImg from '@/custom_hooks/useDragDropImg'
import { zodResolver } from '@hookform/resolvers/zod'
import { FilePlus } from '@phosphor-icons/react'
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

  const [openModal, setOpenModal] = useState<boolean>(true)
  const { preview, setPreview, handleDrop, handleDragOver, handleChange } = useDragDropImg()

  useEffect(() => {
    if (type === 'edit') {
      console.log(props.category.image)
      setPreview(props.category.image)
    }
  }, [])

  const formSchema = z.object({
    name: z.string().min(1, { message: t('login.err_input_need_filled') }),
    image: z.string(),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      type === 'add'
        ? {
            name: '',
            image: '',
          }
        : props.category,
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  const handleClose = () => {
    if (!openModal) {
      setPreview('')
      form.reset()
    } else {
      if (type === 'edit') {
        setPreview(props.category.image)
      }
    }
    setOpenModal((prev) => !prev)
  }

  return (
    <Dialog onOpenChange={handleClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='w-[360px] sm:min-w-[400px] md:w-[600px] xl:w-[700px] max-w-2xl'>
        <DialogTitle className='hidden' />
        <DialogDescription className='hidden' />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <h6 className='md:text-lg text-base font-bold text-left capitalize'>{type} Category</h6>
            <FormField
              control={form.control}
              name='image'
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem className='w-full'>
                  <FormLabel className='text-black dark:text-white text-sm md:text-base'>Image</FormLabel>
                  <div className='flex gap-x-2 justify-start'>
                    <div className='relative h-full'>
                      <FormControl>
                        <Input
                          {...rest}
                          type='file'
                          className='w-24 h-24 rounded-md focus-visible:ring-offset-0 text-xs md:text-sm'
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormLabel className='text-black dark:text-white text-sm md:text-base cursor-pointer'>
                        <div
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          className='bg-white w-24 h-24 absolute inset-0 rounded-md  border-2 border-black border-dashed hover:border-solid hover:border-blue-500 flex items-center justify-center'
                        >
                          <FilePlus size={28} />
                        </div>
                      </FormLabel>
                    </div>
                    {preview && (
                      <Avatar className='w-24 h-24 rounded-md'>
                        <AvatarImage src={preview} />
                        <AvatarFallback className='rounded-none'>Mega</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

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
        {/* </div> */}
      </DialogContent>
    </Dialog>
  )
}

export default ModalCategory
