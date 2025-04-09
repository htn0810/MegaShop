export enum ShopStatus {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

export interface IShop {
  id: number
  name: string
  avatarUrl?: string
  coverUrl?: string
  description: string
  userId: number
  status: ShopStatus
  createdAt: string
  updatedAt: string
}
