export interface IUser {
  fullName: string
  email: string
  createdAt: Date
  updatedAt: Date
  role: IRole
}

export interface IRole {
  id: number
  name: string
}
