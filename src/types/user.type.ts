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

export interface IShop {
  id: number
  name: string
  avatarUrl?: string
  coverUrl?: string
  description: string
  userId: number
}
