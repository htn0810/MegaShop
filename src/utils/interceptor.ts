import AuthAPI from '@/apis/auth/auth'
import { RefreshTokenResponse } from '@/apis/auth/authInterfaces'
import axios, { AxiosRequestConfig } from 'axios'
import { toast } from 'sonner'
import { StoreApi } from 'zustand/vanilla'
import { MegaState } from '@/store/store'

let axiosStore: StoreApi<MegaState>
export const injectStore = (store: StoreApi<MegaState>) => {
  axiosStore = store
}
const BE_DOMAIN =
  import.meta.env.VITE_MODE === 'production' ? import.meta.env.VITE_BE_DOMAIN_PROD : import.meta.env.VITE_BE_DOMAIN_DEV

export const http = axios.create({
  baseURL: `${BE_DOMAIN}/mega/v1`,
  withCredentials: true,
  timeout: 1000 * 60 * 10,
})

let refreshTokenPromise: Promise<RefreshTokenResponse> | null = null

// // Store for tracking requests and errors
// const requestTracker = new Map()

// // Axios Request Interceptor
// http.interceptors.request.use(
//   (config) => {
//     // Generate a unique key for the request (e.g., method + URL + params/body)
//     const requestKey = generateRequestKey(config)

//     // If this is a new request, initialize its tracking
//     if (!requestTracker.has(requestKey)) {
//       requestTracker.set(requestKey, { pending: true, errorReported: false })
//     }

//     return config
//   },
//   (error) => Promise.reject(error),
// )

// Catching error
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error)

    if (error.response?.status === 401) {
      const logoutUser = axiosStore.getState().clearAllData
      logoutUser()
    }

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

// // Helper function to generate a unique key for each request
// function generateRequestKey(config: AxiosRequestConfig) {
//   const { method, url, params, data } = config
//   return `${method}-${url}-${JSON.stringify(params)}-${JSON.stringify(data)}`
// }
