import AuthAPI from '@/apis/auth/auth'
import axios from 'axios'
import { toast } from 'sonner'

export const http = axios.create({
  baseURL: 'http://localhost:8080/mega/v1',
  withCredentials: true,
  timeout: 1000 * 60 * 10,
})

let refreshTokenPromise: Promise<{ message: string; data: { accessToken: string } }> | null = null

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
