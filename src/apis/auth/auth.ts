import { RegisterResponse } from '@/apis/auth/authInterfaces'
import { http } from '@/utils/interceptor'

export default class AuthAPI {
  public static login = async ({ email, password }: { email: string; password: string }) => {
    return http.post('/users/login', { email, password })
  }

  public static register = async ({
    email,
    fullName,
    password
  }: {
    email: string
    fullName: string
    password: string
  }): Promise<RegisterResponse> => {
    return http.post('/auth/register', { email, fullName, password })
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
    newPassword
  }: {
    userId: number
    currentPassword: string
    newPassword: string
  }) => {
    return http.put(`/users/change-password/${userId}`, { currentPassword, newPassword })
  }
}
