export interface IUser {
  id: number
  name: string
  avatarUrl?: string
  email: string
  role: IRole[]
}

export interface IRole {
  id: number
  name: string
}
