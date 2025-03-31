export interface ICreateUpdateCategory {
  name: string
  categoryImg: File
}

export interface ICategoryResponse {
  id: number
  name: string
  imageUrl: string
}
