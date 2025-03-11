import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useDragDropImg from '@/custom_hooks/useDragDropImg'
import { FilePlus, X } from 'lucide-react'
import { useEffect } from 'react'
import { Path, PathValue, UseFormReturn } from 'react-hook-form'

type ImageUploaderProps<T extends Record<string, unknown>> = {
  form: UseFormReturn<T>
  name: Path<T>
  label?: string
  multiple?: boolean
  maxFiles?: number
  defaultImages?: string[]
}

const ImageUploader = <T extends Record<string, unknown>>({
  form,
  name,
  label = 'Image',
  multiple = false,
  maxFiles = 1,
  defaultImages = [],
}: ImageUploaderProps<T>) => {
  const { previews, setPreviews, setFiles, handleDrop, handleDragOver, handleChange } = useDragDropImg({
    multiple,
    maxFiles,
  })

  const handleRemoveImage = (index: number, fieldOnChange: (value: PathValue<T, Path<T>>) => void) => {
    setPreviews((prev) => {
      const newPreviews = prev.filter((_, i) => i !== index)
      fieldOnChange(
        multiple ? (newPreviews as PathValue<T, Path<T>>) : ((newPreviews[0] || '') as PathValue<T, Path<T>>),
      )
      return newPreviews
    })
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  useEffect(() => {
    if (defaultImages.length > 0) {
      setPreviews(defaultImages)
      form.setValue(
        name,
        multiple ? (defaultImages as PathValue<T, Path<T>>) : (defaultImages[0] as PathValue<T, Path<T>>),
      )
    } else {
      setPreviews([])
      setFiles([])
    }
  }, [defaultImages, setPreviews, setFiles, form, name, multiple])

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full'>
          <FormLabel className='text-black dark:text-white text-sm md:text-base'>
            {label} {multiple && `(${previews.length || 0}/${maxFiles})`}
          </FormLabel>
          <div className='flex flex-wrap gap-2'>
            {(!multiple || previews.length < maxFiles) && (
              <div className='relative h-full'>
                <FormControl>
                  <Input
                    type='file'
                    multiple={multiple}
                    accept='image/*'
                    className='w-24 h-24 rounded-md focus-visible:ring-offset-0 text-xs md:text-sm'
                    onChange={(e) => {
                      handleChange(e)
                      field.onChange(multiple ? previews : previews[0] || '')
                    }}
                  />
                </FormControl>
                <FormLabel className='text-black dark:text-white text-sm md:text-base cursor-pointer'>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => {
                      handleDrop(e)
                      field.onChange(multiple ? previews : previews[0] || '')
                    }}
                    className='bg-white w-24 h-24 absolute inset-0 rounded-md border-2 border-black border-dashed hover:border-solid hover:border-blue-500 flex items-center justify-center'
                  >
                    <FilePlus size={28} />
                  </div>
                </FormLabel>
              </div>
            )}
            {previews.map((preview, index) => (
              <div key={index} className='relative'>
                <Avatar className='w-24 h-24 rounded-md object-cover'>
                  <AvatarImage src={preview} />
                  <AvatarFallback className='rounded-none'>MegaShop</AvatarFallback>
                </Avatar>
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index, field.onChange)}
                  className='absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600'
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ImageUploader
