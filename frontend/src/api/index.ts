import axios, { type AxiosError, type AxiosRequestConfig } from 'axios'
import * as authApi from '@/api/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError & { config: AxiosRequestConfig & { _retry?: boolean } }) => {
    const originalRequest = err.config

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await authApi.refresh()
        return api(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(err)
  },
)

export default api
