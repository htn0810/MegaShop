// export interface RegisterResponse {
//   accessToken: string
//   expiresIn: number
// }
export enum UserStatus {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
}

export interface RegisterResquest {
  email: string
  password: string
}

export interface LoginResquest {
  email: string
  password: string
}

export interface RefreshTokenResponse {
  message: string
  data: { accessToken: string }
}
