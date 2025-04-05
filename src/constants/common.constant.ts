export const COLORS: Color[] = ['red', 'blue', 'black', 'pink', 'white']
export type Color = 'red' | 'blue' | 'black' | 'pink' | 'white'

export const DEFAULT_USER_AVATAR = 'https://res.cloudinary.com/drma1gq4h/image/upload/v1743518097/user_rfgejn.avif'
export const DEFAULT_SHOP_AVATAR = 'https://res.cloudinary.com/drma1gq4h/image/upload/v1743525359/shop_yamggl.png'

export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
  SHOPOWNER = 'shopOwner',
}

export type Role = 'admin' | 'user' | 'shopOwner'
