import { CategoryApi } from '@/apis/category/category'
import { ICategoryResponse, ICreateUpdateCategory } from '@/apis/category/categoryInterface'
import ImageUploader from '@/components/image_uploader/ImageUploader'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { convertImageUrlToFile } from '@/utils/convertImageUrlToFile'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { ReactNode, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { z } from 'zod'

type AddProps = {
  type: 'add'
  children: ReactNode
  onRerender: () => void
}

type EditProps = {
  type: 'edit'
  category: ICategoryResponse
  children: ReactNode
  onRerender: () => void
}

type FormData = {
  name: string
}

const ModalCategory = (props: AddProps | EditProps) => {
  const { type, children, onRerender } = props
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [categoryImage, setCategoryImage] = useState<File[]>([])

  const formSchema = z.object({
    name: z.string().min(1, { message: t('login.err_input_need_filled') }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  useEffect(() => {
    handleApplyDataWhenEdit()
  }, [isOpen, type])

  const handleApplyDataWhenEdit = async () => {
    if (isOpen && type === 'edit' && 'category' in props) {
      form.reset({
        name: props.category.name,
      })
      const image = await convertImageUrlToFile(props.category.imageUrl)
      setCategoryImage([image])
    }
  }

  const onSubmit = (data: FormData) => {
    if (categoryImage.length === 0) {
      toast.error('Please upload an image')
      return
    }
    const categoryData = {
      name: data.name,
      categoryImg: categoryImage[0],
    }
    if (type === 'add') {
      handleAddCategory(categoryData)
    } else {
      handleUpdateCategory(categoryData)
    }
  }

  const handleAddCategory = async (data: ICreateUpdateCategory) => {
    setIsLoading(true)
    toast.promise(CategoryApi.createCategory(data), {
      loading: 'Adding category...',
      success: (response) => {
        handleCloseModalAndResetForm()
        onRerender()
        return response.data.message
      },
      finally: () => {
        setIsLoading(false)
      },
    })
  }

  const handleUpdateCategory = async (data: ICreateUpdateCategory) => {
    setIsLoading(true)
    if (type === 'edit' && 'category' in props) {
      toast.promise(CategoryApi.updateCategory(props.category.id, data), {
        loading: 'Updating category...',
        success: (response) => {
          handleCloseModalAndResetForm()
          onRerender()
          return response.data.message
        },
        finally: () => {
          setIsLoading(false)
        },
      })
    }
  }

  const handleCloseModalAndResetForm = () => {
    setIsOpen(false)
    setCategoryImage([])
    form.reset()
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
            <div className='mt-[8px_!important]'>
              <div className='mb-4'>
                <ImageUploader files={categoryImage} setFiles={setCategoryImage} multiple={false} />
              </div>
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
            <Button type='submit' className='w-full flex justify-center items-center' disabled={isLoading}>
              {isLoading ? <Loader2Icon className='w-4 h-4 animate-spin' /> : type === 'edit' ? 'Update' : 'Add'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ModalCategory
