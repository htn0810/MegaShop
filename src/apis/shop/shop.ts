import { ShopStatus } from '@/apis/shop/shopInterfaces'
import { http } from '@/utils/interceptor'

export default class ShopAPI {
  public static getShops = async (page = 1, limit = 10, status: ShopStatus | 'all' = 'all') => {
    return http.get(`/shops?page=${page}&limit=${limit}&status=${status}`)
  }

  public static getShopById = async (shopId: number) => {
    return http.get(`/shops/${shopId}`)
  }

  public static getProductsByShopId = async (shopId: number, page = 1, limit = 10) => {
    return http.get(`/shops/${shopId}/products?page=${page}&limit=${limit}`)
  }

  public static updateShopCoverImage = async (shopId: number, coverImage: File) => {
    const formData = new FormData()
    formData.append('coverImage', coverImage)
    return http.put(`/shops/${shopId}/cover-image`, formData)
  }

  public static updateShopProfileImage = async (shopId: number, profileImage: File) => {
    const formData = new FormData()
    formData.append('profileImage', profileImage)
    return http.put(`/shops/${shopId}/profile-image`, formData)
  }

  public static updateShopInfo = async (shopId: number, name: string, description: string, status: ShopStatus) => {
    return http.put(`/shops/${shopId}/update`, { name, description, status })
  }

  public static approveShop = async (shopId: number) => {
    return http.put(`/shops/approve/${shopId}`)
  }

  public static rejectShop = async (shopId: number) => {
    return http.put(`/shops/reject/${shopId}`)
  }

  public static disableShop = async (shopId: number) => {
    return http.put(`/shops/disable/${shopId}`)
  }

  public static enableShop = async (shopId: number) => {
    return http.put(`/shops/enable/${shopId}`)
  }

  // Get all products by shop id (user)
  public static getAllProductsByShopId_User = async (shopId: number) => {
    return http.get(`/products/shop/${shopId}/products`)
  }

  // Get all products by shop id (admin)
  public static getAllProductsByShopId_Admin = async (shopId: number, page = 1, limit = 10) => {
    return http.get(`/shops/admin/${shopId}/products?page=${page}&limit=${limit}`)
  }
}
