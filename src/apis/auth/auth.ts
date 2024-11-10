import { RegisterResponse } from '@/apis/auth/authInterfaces'
import { http } from '@/utils/interceptor'

export default class AuthAPI {
  public static login = async ({ email, password }: { email: string; password: string }) => {
    return http.post('/auth/login', { email, password })
  }

  public static register = async ({
    email,
    fullName,
    password,
  }: {
    email: string
    fullName: string
    password: string
  }): Promise<RegisterResponse> => {
    const { data } = await http.post('/auth/register', { email, fullName, password })
    return data
  }
}
