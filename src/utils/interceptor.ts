import AuthAPI from '@/apis/auth/auth'
import { RefreshTokenResponse } from '@/apis/auth/authInterfaces'
import axios from 'axios'
import { toast } from 'sonner'

const BE_DOMAIN =
  import.meta.env.VITE_MODE === 'production' ? import.meta.env.VITE_BE_DOMAIN_PROD : import.meta.env.VITE_BE_DOMAIN_DEV

export const http = axios.create({
  baseURL: `${BE_DOMAIN}/mega/v1`,
  withCredentials: true,
  timeout: 1000 * 60 * 10,
})

let refreshTokenPromise: Promise<RefreshTokenResponse> | null = null

// Catching error
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error)
    const originalRequests = error.config
    if (error.response?.status === 410 && !originalRequests._retry) {
      originalRequests._retry = true
      if (!refreshTokenPromise) {
        refreshTokenPromise = AuthAPI.refreshToken()
          .then((data) => data)
          .catch((error) => {
            return Promise.reject(error)
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }
      return refreshTokenPromise.then((_data) => {
        return http(originalRequests)
      })
    }
    let errorMessage = error?.message
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message
    }
    toast.error(errorMessage)
    return Promise.reject(error)
  },
)
