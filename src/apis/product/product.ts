import { IAddUpdateProduct } from '@/apis/product/productInterface'
import { http } from '@/utils/interceptor'

export class ProductApi {
  public static async getProducts(params: { page: number; limit: number }) {
    return http.get(`/products?page=${params.page}&limit=${params.limit}`)
  }

  public static async addProduct(data: IAddUpdateProduct, images: File[]) {
    const formData = new FormData()
    formData.append('productData', JSON.stringify(data))
    images.forEach((image) => {
      formData.append('images', image)
    })
    return http.post('/products', formData)
  }

  public static async updateProduct(id: number, data: IAddUpdateProduct, images: File[]) {
    const formData = new FormData()
    formData.append('productData', JSON.stringify(data))
    images.forEach((image) => {
      formData.append('images', image)
    })
    return http.put(`/products/${id}`, formData)
  }

  public static async disableProduct(id: number) {
    return http.put(`/products/disable/${id}`)
  }

  public static async enableProduct(id: number) {
    return http.put(`/products/enable/${id}`)
  }

  public static async deleteProduct(id: number) {
    return http.delete(`/products/${id}`)
  }
}
