import { useState } from 'react'

const useDragDropImg = () => {
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File>()

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const files = event.dataTransfer.files
    if (files && files.length > 0) {
      handleFiles(files)
    }
  }

  const handleFiles = (files: FileList) => {
    const file = files[0]
    setFile(file)
    const displayUrl = URL.createObjectURL(file)
    setPreview(displayUrl)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      handleFiles(files)
    }
  }
  return { file, preview, setPreview, handleDrop, handleDragOver, handleChange }
}

export default useDragDropImg
