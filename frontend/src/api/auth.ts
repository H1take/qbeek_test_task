import api from './index'
import type { LoginData, LoginResponse, RegisterData, RegisterResponse } from '@/types/auth'
import type { User } from '@/types/user.ts'

export const login = async (data: LoginData): Promise<LoginResponse> => {
  return (await api.post('/auth/login', data)).data
}

export const register = async (data: RegisterData): Promise<RegisterResponse> => {
  return (await api.post('/auth/register', data)).data
}

export const logout = async (): Promise<{ message: string }> => {
  return (await api.post('/auth/logout')).data
}

export const refresh = async (): Promise<{ message: string }> => {
  return (await api.post('/auth/refresh')).data
}
