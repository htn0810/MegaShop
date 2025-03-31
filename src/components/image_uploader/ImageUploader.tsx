import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { FilePlus, XIcon } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

type Props = {
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
} & (
  | {
      multiple: false
    }
  | {
      multiple: true
      maxFiles: number
    }
)

const ImageUploader = (props: Props) => {
  const { files, setFiles, multiple } = props
  const maxFiles = multiple ? props.maxFiles : 1

  useEffect(() => {
    if (files?.length > maxFiles) {
      toast.error(`Maximum files allowed is ${maxFiles}`)
    }
  }, [files?.length])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (files?.length && files.length >= maxFiles) {
      toast.error(`Maximum files allowed is ${maxFiles}`)
      return
    }
    const file = event.target.files?.[0]
    if (file) {
      setFiles((prev) => [...(prev ?? []), file])
    }
  }

  const handleRemoveImage = (index: number) => {
    setFiles((prev) => prev?.filter((_, idx) => idx !== index))
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFiles = event.dataTransfer.files
    if (droppedFiles && droppedFiles.length > 0) {
      console.log(droppedFiles)
    }
  }
  return (
    <div className='w-full h-full'>
      <label className='text-black dark:text-white text-sm md:text-base font-medium'>Image</label>
      <div className='flex gap-x-2 justify-start'>
        {files.length < maxFiles && (
          <div className='relative h-full'>
            <label className='text-black dark:text-white text-sm md:text-base cursor-pointer'>
              <Input
                type='file'
                className='size-24 rounded-md focus-visible:ring-offset-0 text-xs md:text-sm'
                multiple={multiple}
                onChange={handleChange}
              />
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className='bg-white dark:bg-gray-800 size-24 absolute inset-0 rounded-md border-2 border-black dark:border-white border-dashed hover:border-solid flex items-center justify-center'
              >
                <FilePlus size={28} />
              </div>
            </label>
          </div>
        )}
        {files?.length > 0 &&
          files.map((file, idx) => (
            <div key={idx} className='relative h-full'>
              <Avatar className='size-24 rounded-md'>
                <AvatarImage src={URL.createObjectURL(file)} className='object-cover' />
                <AvatarFallback className='rounded-none'>Mega</AvatarFallback>
              </Avatar>
              <XIcon
                className='absolute -top-2 -right-2 bg-red-400 text-white rounded-full p-1 cursor-pointer hover:bg-red-500'
                size={16}
                onClick={() => handleRemoveImage(idx)}
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default ImageUploader
