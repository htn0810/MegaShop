import { ShopStatus } from '@/apis/shop/shopInterfaces'
import { http } from '@/utils/interceptor'

export default class ShopAPI {
  public static getShops = async (page = 1, limit = 10, status: ShopStatus | 'all' = 'all') => {
    return http.get(`/shops?page=${page}&limit=${limit}&status=${status}`)
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
}
