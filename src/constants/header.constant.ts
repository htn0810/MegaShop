import { Role } from '@/constants/common.constant'

export type HeaderNameLng = 'home_nav' | 'products_nav' | 'about_nav' | 'admin_nav' | 'super_admin_nav'

export type HeaderNav = {
  id: number
  icon: JSX.Element
  name: HeaderNameLng
  path: string
  role: Role
}
