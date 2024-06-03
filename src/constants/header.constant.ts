type HeaderNameLng = 'home_nav' | 'products_nav' | 'about_nav'

type HeaderNav = {
  id: number
  name: HeaderNameLng
  path: string
}
export const HEADER_NAV: HeaderNav[] = [
  { id: 1, name: 'home_nav', path: '/' },
  { id: 2, name: 'products_nav', path: '/products' },
  { id: 3, name: 'about_nav', path: '/about' },
]
