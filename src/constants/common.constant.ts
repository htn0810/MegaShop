import { Pagination } from '@/types/common.type'

export const COLORS: Color[] = ['red', 'blue', 'black', 'pink', 'white']
export type Color = 'red' | 'blue' | 'black' | 'pink' | 'white'

export const DEFAULT_USER_AVATAR = 'https://res.cloudinary.com/drma1gq4h/image/upload/v1743518097/user_rfgejn.avif'
export const DEFAULT_SHOP_AVATAR = 'https://res.cloudinary.com/drma1gq4h/image/upload/v1743525359/shop_yamggl.png'
export const DEFAULT_SHOP_COVER =
  'https://res.cloudinary.com/drma1gq4h/image/upload/v1744123447/twitter-cover-photo-18_agybqw.jpg'
export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
  SHOPOWNER = 'shopOwner',
}

export type Role = 'admin' | 'user' | 'shopOwner'

export const MAX_PRICE_SLIDER = 50000000
export const MIN_PRICE_SLIDER = 0
export const STEP_PRICE_SLIDER = 100000

export const DEFAULT_PAGINATION: Pagination = {
  page: 1,
  pageSize: 12,
  totalPages: 0,
}

export const enum InputCounter {
  PRODUCT_DETAIL = 'product_detail',
  CART = 'cart',
}
