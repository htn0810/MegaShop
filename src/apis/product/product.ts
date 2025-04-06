import { IAddUpdateProduct } from '@/apis/product/productInterface'
import { http } from '@/utils/interceptor'

export class ProductApi {
  public static async getProducts(queryParams: {
    page: number
    limit: number
    categoryIds?: number[]
    rating?: number
    minPrice?: number
    maxPrice?: number
    bestSelling?: boolean
    newest?: boolean
    sortPrice: 'asc' | 'desc' | null
  }) {
    let query = `page=${queryParams.page}&limit=${queryParams.limit}`
    if (queryParams.categoryIds && queryParams.categoryIds.length > 0) {
      query += `&categoryIds=${queryParams.categoryIds.join(',')}`
    }
    if (queryParams.rating) {
      query += `&rating=${queryParams.rating}`
    }
    if (queryParams.minPrice) {
      query += `&minPrice=${queryParams.minPrice}`
    }
    if (queryParams.maxPrice) {
      query += `&maxPrice=${queryParams.maxPrice}`
    }
    if (queryParams.bestSelling) {
      query += `&bestSelling=${queryParams.bestSelling}`
    }
    if (queryParams.newest) {
      query += `&newest=${queryParams.newest}`
    }
    if (queryParams.sortPrice) {
      query += `&sortPrice=${queryParams.sortPrice}`
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
