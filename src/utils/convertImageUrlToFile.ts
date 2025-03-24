export const convertImageUrlToFile = async (imageUrl: string) => {
  const response = await fetch(imageUrl)
  const blob = await response.blob()
  return new File([blob], 'image.jpg', { type: blob.type })
}
