export interface RegisterResponse {
  accessToken: string
  expiresIn: number
}

export interface RegisterResquest {
  email: string
  fullName: string
  password: string
}

export interface LoginResquest {
  email: string
  password: string
}
