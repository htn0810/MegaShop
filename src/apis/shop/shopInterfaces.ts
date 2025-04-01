export enum ShopStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}

export interface Shop {
  id: string
  name: string
  avatarUrl?: string
  coverUrl?: string
  description: string
  userId: number
  status: ShopStatus
  createdAt: string
  updatedAt: string
}
