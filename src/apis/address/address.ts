import { ProvinceResponse } from '@/apis/address/addressInterfaces'
import { http } from '@/utils/interceptor'

export default class AddressAPI {
  public static getAddress = async () => {
    return http.get('/addresses')
  }

  public static getAllProvinces = async (): Promise<ProvinceResponse> => {
    return http.get('/addresses/provinces')
  }

  public static getAllDistrictsByProvinceId = async (provinceId: string) => {
    return http.get(`/addresses/provinces/${provinceId}/districts`)
  }

  public static getAllWardsByDistrictId = async (provinceId: string, districtId: string) => {
    return http.get(`/addresses/provinces/${provinceId}/districts/${districtId}/wards`)
  }
}
