import { IShop } from '@/apis/shop/shopInterfaces'

export interface IUserInfor {
  id: number
  name: string
  avatarUrl?: string
  email: string
  isDeleted: boolean
}

export interface IUser extends IUserInfor {
  roles: IRole[]
  shop: IShop
}

export interface IRole {
  id: number
  name: string
}
