import MegaLazyLoad from '@/components/lazy_load/MegaLazyLoad'
import { AppRoute, AppRouteBlock } from '@/types/route.type'

export const BASE_ROUTE_PATH = '/'

export const HOME_PAGE_ROUTE: AppRoute = {
  pageTitleKey: 'PageTitle_HomePage',
  path: BASE_ROUTE_PATH,
  component: MegaLazyLoad(import('@/pages/home_page/Home')),
}

export const LOGIN_PAGE_ROUTE: AppRoute = {
  pageTitleKey: 'PageTitle_LoginPage',
  path: BASE_ROUTE_PATH + 'login',
  component: MegaLazyLoad(import('@/pages/login_page/Login')),
}

export const SIGN_UP_PAGE_ROUTE: AppRoute = {
  pageTitleKey: 'PageTitle_SingUpPage',
  path: BASE_ROUTE_PATH + 'signup',
  component: MegaLazyLoad(import('@/pages/sign_up_page/SignUp')),
}

export const PRODUCTS_PAGE_ROUTE: AppRoute = {
  pageTitleKey: 'PageTitle_ProductsPage',
  path: BASE_ROUTE_PATH + 'products',
  component: MegaLazyLoad(import('@/pages/products_page/Products')),
}

export const PRODUCT_DETAIL_PAGE_ROUTE: AppRoute = {
  pageTitleKey: 'PageTitle_ProductDetailPage',
  path: BASE_ROUTE_PATH + 'product_detail',
  component: MegaLazyLoad(import('@/pages/product_detail_page/ProductDetail')),
}

export const DEFAULT_ROUTE_BLOCK: AppRouteBlock = {
  parentRoute: HOME_PAGE_ROUTE,
}

export const LOGIN_ROUTE_BLOCK: AppRouteBlock = {
  parentRoute: LOGIN_PAGE_ROUTE,
}

export const SIGN_UP_ROUTE_BLOCK: AppRouteBlock = {
  parentRoute: SIGN_UP_PAGE_ROUTE,
}

export const PRODUCTS_ROUTE_BLOCK: AppRouteBlock = {
  parentRoute: PRODUCTS_PAGE_ROUTE,
}

export const PRODUCT_DETAIL_ROUTE_BLOCK: AppRouteBlock = {
  parentRoute: PRODUCT_DETAIL_PAGE_ROUTE,
}
