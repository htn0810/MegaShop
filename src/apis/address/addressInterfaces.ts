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
