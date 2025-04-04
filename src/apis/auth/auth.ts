import { RefreshTokenResponse, UserStatus } from '@/apis/auth/authInterfaces'
import { http } from '@/utils/interceptor'

export default class AuthAPI {
  public static getUsers = async (pageIndex = 1, pageSize = 10, status: UserStatus | 'all' = 'all') => {
    return http.get(`/users?page=${pageIndex}&limit=${pageSize}&status=${status}`)
  }

  public static login = async ({ email, password }: { email: string; password: string }) => {
    return http.post('/users/login', { email, password })
  }

  public static register = async ({ email, password }: { email: string; password: string }) => {
    return http.post('/users/register', { email, password })
  }

  public static verifyAccount = async ({ email, token }: { email: string; token: string }) => {
    return http.put('/users/verify', { email, token })
  }

  public static forgotPassword = async ({ email }: { email: string }) => {
    return http.put('/users/forgot-password', { email })
  }

  public static logout = async () => {
    return http.post('/users/logout')
  }

  public static refreshToken = async (): Promise<RefreshTokenResponse> => {
    return http.get('/users/refresh-token')
  }

  public static updateUser = async ({ avatar, name, userId }: { avatar: File; name: string; userId: number }) => {
    const formData = new FormData()
    formData.append('avatar', avatar)
    formData.append('name', name)
    return http.put(`/users/update/${userId}`, formData)
  }

  public static changePassword = async ({
    userId,
    currentPassword,
    newPassword,
  }: {
    userId: number
    currentPassword: string
    newPassword: string
  }) => {
    return http.put(`/users/change-password/${userId}`, { currentPassword, newPassword })
  }

  public static disableUser = async (userId: number) => {
    return http.put(`/users/disable/${userId}`)
  }

  public static enableUser = async (userId: number) => {
    return http.put(`/users/enable/${userId}`)
  }
}
