type HeaderNameLng = 'home_nav' | 'products_nav' | 'about_nav' | 'admin_nav' | 'super_admin_nav'

type HeaderNav = {
  id: number
  name: HeaderNameLng
  path: string
}
export const HEADER_NAV: HeaderNav[] = [
  { id: 1, name: 'home_nav', path: '/' },
  { id: 2, name: 'products_nav', path: '/products' },
  { id: 3, name: 'about_nav', path: '/about' },
  { id: 4, name: 'admin_nav', path: '/admin' },
  { id: 5, name: 'super_admin_nav', path: '/super-admin' }
]
