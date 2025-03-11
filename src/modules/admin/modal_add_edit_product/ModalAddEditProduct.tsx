import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import VariationInfo from '@/modules/admin/variation_info/VariationInfo'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import ImageUploader from '../../../components/image_uploader/ImageUploader'
import { formAddEditProductSchema } from '@/utils/formValidator'

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

type RealProduct = {
  id: string
  name: string
  slug: string
  description: string
  category: Category
  image: string
  variants: Variant[]
  attributes: Attribute[]
}

type Category = {
  id: string
  name: string
  image: string
  parentId: string
}

type Variant = {
  id?: string
  price: number
  stock: number
  images: string[]
  sku: string
  attributes: Attribute[]
}

type Attribute = {
  id?: string
  name: string
  values: string[]
}

type Props = {
  type: 'add' | 'edit'
  product?: Product
}

type FormData = {
  name: string
  category: string
  description: string
  attributes: Attribute[]
}

type VariantCombination = {
  id: string
  combinations: Record<string, string> // { size: 'S', color: 'Red' }
  price: number
  stock: number
  saleOff: number
}

const ModalAddEditProduct = (props: Props) => {
  const { type, product } = props
  console.log('🚀 ~ ModalAddEditProduct ~ product:', product)

  // Thêm state để quản lý các combination
  const [variantCombinations, setVariantCombinations] = useState<VariantCombination[]>([])
  const [showVariantInfo, setShowVariantInfo] = useState(false)
  const form = useForm<z.infer<typeof formAddEditProductSchema>>({
    resolver: zodResolver(formAddEditProductSchema),
    defaultValues: product ?? {
      name: '',
      category: '',
      description: '',
      images: [],
    },
  })

  const {
    fields: attributes,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: 'attributes',
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
    console.log(variantCombinations)
  }

  const handleRemoveValue = (attrIndex: number, valueIndex: number) => {
    const currentValues = form.watch(`attributes.${attrIndex}.values`) || []
    const newValues = currentValues.filter((_, index) => index !== valueIndex)
    form.setValue(`attributes.${attrIndex}.values`, newValues)
  }

  const handleValidateAttribute = (attributes: Attribute[]) => {
    if (attributes.length === 0 || !form.formState.isValid) {
      return false
    }
    return true
  }

  const handleShowVariantInfo = () => {
    console.log('🚀 ~ handleShowVariantInfo ~ form.getValues().attributes:', form.getValues().attributes)
    if (handleValidateAttribute(form.getValues().attributes)) {
      setShowVariantInfo(true)
    }
  }

  return (
    <div className='flex items-center justify-center'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='p-4 space-y-8 w-full'>
          <h6 className='md:text-lg text-base font-bold text-left capitalize'>{type} product</h6>
          <ScrollArea className='max-h-[400px] flex flex-col gap-y-4 pr-4'>
            <ImageUploader form={form} name='images' multiple maxFiles={5} />
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
            <Button
              type='button'
              className='w-fit my-4 bg-black text-white dark:bg-white dark:text-black'
              onClick={() => append({ name: '', values: [''] })}
              disabled={attributes.length >= 2}
            >
              Add variant
            </Button>
            {attributes?.map((attribute, attrIndex) => (
              <div className='grid grid-cols-4 gap-x-4 border border-dashed border-gray-300 rounded-md p-2 mb-2'>
                <div className='col-span-1 h-full content-center pr-2 border-r border-dashed border-gray-300'>
                  <FormField
                    control={form.control}
                    name={`attributes.${attrIndex}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=' text-sm md:text-base'>Variant</FormLabel>
                        <div className='flex items-center gap-x-2'>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder='Variant Name'
                              className='focus-visible:ring-offset-0  text-xs md:text-sm'
                            />
                          </FormControl>
                          <Trash2 size={20} className='cursor-pointer' onClick={() => remove(attrIndex)} />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid grid-cols-3 col-span-3 gap-2'>
                  {form.watch(`attributes.${attrIndex}.values`).map((_, valIndex) => (
                    <FormField
                      key={valIndex}
                      control={form.control}
                      name={`attributes.${attrIndex}.values.${valIndex}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Option</FormLabel>
                          <div className='flex items-center gap-x-2'>
                            <FormControl>
                              <Input {...field} placeholder='Option value' />
                            </FormControl>
                            <Plus
                              size={20}
                              className='cursor-pointer'
                              onClick={() => {
                                const currentValues = form.watch(`attributes.${attrIndex}.values`) || []
                                form.setValue(`attributes.${attrIndex}.values`, [...currentValues, ''])
                              }}
                            />
                            <Trash2
                              size={20}
                              className='cursor-pointer'
                              onClick={() => handleRemoveValue(attrIndex, valIndex)}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
            ))}
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
            <div className='mt-2'>
              {attributes.length > 0 && <Button onClick={handleShowVariantInfo}>Variant Info</Button>}
              {showVariantInfo && (
                <VariationInfo
                  form={form}
                  variantCombinations={variantCombinations}
                  setVariantCombinations={setVariantCombinations}
                />
              )}
            </div>
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
