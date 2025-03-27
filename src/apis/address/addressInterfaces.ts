export interface Province {
  code: string
  name: string
  name_en: string
  full_name: string
  full_name_en: string
  code_name: string
  administrative_unit_id: number
  administrative_region_id: number
}

export interface ProvinceResponse {
  data: {
    message: string
    data: Province[]
  }
}

export interface District {
  code: string
  name: string
  name_en: string
  full_name: string
  full_name_en: string
  code_name: string
  administrative_unit_id: number
  province_code: string
}

export interface Ward {
  code: string
  name: string
  name_en: string
  full_name: string
  full_name_en: string
  code_name: string
  administrative_unit_id: number
  district_code: string
}

export interface Address {
  name: string
  phoneNumber: string
  provinceCode: string
  districtCode: string
  wardCode: string
  isDefault: boolean
  street: string
}

export interface AddressResponse {
  id: number
  userId: number
  name: string
  phoneNumber: string
  provinceCode: string
  districtCode: string
  wardCode: string
  street: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
  province: Province
  district: District
  ward: Ward
}
