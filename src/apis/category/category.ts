import { ICreateUpdateCategory } from '@/apis/category/categoryInterface'
import { http } from '@/utils/interceptor'

export class CategoryApi {
  public static async getCategories() {
    return http.get('/categories')
  }

  public static createCategory(data: ICreateUpdateCategory) {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('categoryImg', data.categoryImg)
    return http.post('/categories', formData)
  }

  public static updateCategory(id: number, data: ICreateUpdateCategory) {
    return http.put(`/categories/${id}`, data)
  }

  public static deleteCategory(id: number) {
    return http.delete(`/categories/${id}`)
  }
}
