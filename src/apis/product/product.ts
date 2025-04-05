import { IAddUpdateProduct } from '@/apis/product/productInterface'
import { http } from '@/utils/interceptor'

export class ProductApi {
  public static async getProducts(
    page: number,
    limit: number,
    categoryIds?: number[],
    rating?: number,
    minPrice?: number,
    maxPrice?: number,
  ) {
    let query = `page=${page}&limit=${limit}`
    if (categoryIds && categoryIds.length > 0) {
      query += `&categoryIds=${categoryIds.join(',')}`
    }
    if (rating) {
      query += `&rating=${rating}`
    }
    if (minPrice) {
      query += `&minPrice=${minPrice}`
    }
    if (maxPrice) {
      query += `&maxPrice=${maxPrice}`
    }
    return http.get(`/products?${query}`)
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
