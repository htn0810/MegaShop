import AuthAPI from '@/apis/auth/auth'
import { RegisterResquest } from '@/apis/auth/authInterfaces'
import { useMutation } from '@tanstack/react-query'

export const useRegister = () => {
  return useMutation({
    mutationFn: (queryParams: RegisterResquest) => AuthAPI.register(queryParams),
  })
}
