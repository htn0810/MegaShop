import axios from 'axios'
import { toast } from 'sonner'

export const http = axios.create({
  baseURL: 'http://localhost:8080/mega/v1',
  withCredentials: true,
  timeout: 1000 * 60 * 10
})

// Catching error
http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error)
    let errorMessage = error?.message
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message
    }
    toast.error(errorMessage)
    return Promise.reject(error)
  }
)
