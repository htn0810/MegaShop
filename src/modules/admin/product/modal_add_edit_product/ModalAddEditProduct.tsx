import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ImageUploader from '../../../../components/image_uploader/ImageUploader'
import { formAddEditProductSchema } from '@/utils/formValidator'
import { useForm } from 'react-hook-form'
import { IProduct } from '@/apis/product/productInterface'
import { ICategoryResponse } from '@/apis/category/categoryInterface'
import { ReactNode, useEffect, useState } from 'react'
import { CategoryApi } from '@/apis/category/category'
import { ProductApi } from '@/apis/product/product'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { convertImageUrlToFile } from '@/utils/convertImageUrlToFile'

type FormData = z.infer<typeof formAddEditProductSchema>

type AddProps = {
  type: 'add'
  children: ReactNode
  onRerender: () => void
}

type EditProps = {
  type: 'edit'
  product: IProduct
  children: ReactNode
  onRerender: () => void
}

const ModalAddEditProduct = (props: AddProps | EditProps) => {
  const { type, children, onRerender } = props
  const product = props.type === 'edit' ? props.product : null
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState<ICategoryResponse[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imageError, setImageError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formAddEditProductSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0,
      stock: product?.stock || 0,
      slug: product?.slug || '',
      categoryId: product?.categoryId || 0,
    },
  })

  useEffect(() => {
    if (isOpen) {
      handleGetAllCategories()
      handleFetchImagesWhenEdit()
    }
  }, [isOpen])

  const handleFetchImagesWhenEdit = async () => {
    if (props.type === 'edit') {
      const listImages = await Promise.all(
        props.product.imageUrls.split(',').map((imageUrl) => {
          return convertImageUrlToFile(imageUrl)
        }),
      )
      setImageFiles(listImages)
    }
  }

  const handleGetAllCategories = async () => {
    const response = await CategoryApi.getAllCategories()
    setCategories(response.data.data)
  }

  const onSubmit = async (data: FormData) => {
    if (imageFiles.length === 0) {
      setImageError('At least one image is required')
      return
    }

    if (type === 'add') {
      handleCreateProduct(data)
    } else {
      handleUpdateProduct(data)
    }
  }

  const handleCreateProduct = async (data: FormData) => {
    setIsLoading(true)
    toast.promise(ProductApi.addProduct({ ...data, shopId: 2 }, imageFiles), {
      loading: 'Adding product...',
      success: (_response) => {
        resetAndCloseDialog()
        return 'Product added successfully'
      },
      finally: () => {
        setIsLoading(false)
      },
    })
  }

  const handleUpdateProduct = async (data: FormData) => {
    setIsLoading(true)
    toast.promise(ProductApi.updateProduct(product!.id, { ...data, shopId: 2 }, imageFiles), {
      loading: 'Updating product...',
      success: (_response) => {
        resetAndCloseDialog()
        return 'Product updated successfully'
      },
      finally: () => {
        setIsLoading(false)
      },
    })
  }

  const resetAndCloseDialog = () => {
    form.reset()
    setImageFiles([])
    setIsOpen(false)
    onRerender()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='min-w-5xl max-w-5xl'>
        <DialogTitle className='hidden' />
        <DialogDescription className='hidden' />
        <div className='flex items-center justify-center'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='md:p-4 space-y-8 w-full'>
              <h6 className='md:text-lg text-base font-bold text-left capitalize'>{type} product</h6>
              <ScrollArea className='max-h-[400px] flex flex-col gap-y-4 pr-4'>
                <ImageUploader files={imageFiles} setFiles={setImageFiles} multiple maxFiles={5} />
                {imageError && <p className='text-sm text-red-500 mt-1'>{imageError}</p>}
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
                    name='categoryId'
                    render={({ field }) => (
                      <FormItem className='col-span-1 md:col-span-2'>
                        <FormLabel className=' text-sm md:text-base'>Category</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(Number(value))}
                            value={field.value?.toString()}
                          >
                            <SelectTrigger className='w-full text-xs md:text-sm'>
                              <SelectValue placeholder='Select category' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup className='h-fit max-h-[200px] overflow-y-auto'>
                                {categories?.length > 0 &&
                                  categories.map((category) => (
                                    <SelectItem
                                      key={category.id}
                                      value={category.id.toString()}
                                      className='text-xs md:text-sm'
                                    >
                                      {category.name}
                                    </SelectItem>
                                  ))}
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
                          <Input
                            {...field}
                            type='number'
                            onChange={(e) => {
                              const value = e.target.value
                              field.onChange(value === '' ? '' : Number(value))
                            }}
                            value={field.value}
                            className='focus-visible:ring-offset-0 text-xs md:text-sm'
                          />
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
                          <Input
                            {...field}
                            type='number'
                            onChange={(e) => {
                              const value = e.target.value
                              field.onChange(value === '' ? '' : Number(value))
                            }}
                            value={field.value}
                            className='focus-visible:ring-offset-0 text-xs md:text-sm'
                          />
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
              <Button type='submit' className='w-full flex items-center justify-center gap-x-2' disabled={isLoading}>
                {isLoading ? <Loader2Icon className='size-4 animate-spin' /> : type === 'add' ? 'Add' : 'Update'}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalAddEditProduct
