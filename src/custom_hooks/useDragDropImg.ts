import { useState } from 'react'

type UseDragDropImgOptions = {
  maxFiles?: number
  multiple?: boolean
}

const useDragDropImg = (options: UseDragDropImgOptions = {}) => {
  const { maxFiles = 1, multiple = false } = options
  const [previews, setPreviews] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFiles = event.dataTransfer.files

    if (droppedFiles && droppedFiles.length > 0) {
      await handleFiles(droppedFiles)
    }
  }

  const handleFiles = async (newFiles: FileList) => {
    const totalFiles = previews.length + (multiple ? newFiles.length : 1)
    if (totalFiles > maxFiles) {
      alert(`Maximum ${maxFiles} image${maxFiles > 1 ? 's' : ''} allowed`)
      return
    }

    const newFilesArray = Array.from(multiple ? newFiles : [newFiles[0]])
    setFiles((prev) => (multiple ? [...prev, ...newFilesArray] : newFilesArray))

    const newPreviewUrls = newFilesArray.map((file) => URL.createObjectURL(file))
    setPreviews((prev) => (multiple ? [...prev, ...newPreviewUrls] : newPreviewUrls))
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      await handleFiles(selectedFiles)
    }
  }

  const removeImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index))
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return {
    files,
    previews,
    setPreviews,
    setFiles,
    handleDrop,
    handleDragOver,
    handleChange,
    removeImage,
    maxFiles,
    multiple
  }
}

export default useDragDropImg
