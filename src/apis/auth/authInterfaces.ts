export interface RegisterResponse {
  accessToken: string
  expiresIn: number
}

export interface RegisterResquest {
  email: string
  fullName: string
  password: string
}
