import { ICreateUpdateCategory } from '@/apis/category/categoryInterface'
import { http } from '@/utils/interceptor'

export class CategoryApi {
  public static async getAllCategories() {
    return http.get('/categories/all')
  }

  public static async getCategories(pageIndex: number, pageSize: number) {
    return http.get(`/categories?page=${pageIndex}&limit=${pageSize}`)
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
