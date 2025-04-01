import { http } from '@/utils/interceptor'

export default class ShopAPI {
  public static getShops = async (page = 1, limit = 10) => {
    return http.get(`/shops?page=${page}&limit=${limit}`)
  }
}
