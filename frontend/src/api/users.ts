import api from './index'
import type { User, UserCreate, UserUpdate } from '@/types/user'

export const getUsers = async (): Promise<User[]> => {
  return (await api.get<User[]>('/users')).data
}

export const getUser = async (id: number): Promise<User> => {
  return (await api.get<User>(`/users/${id}`)).data
}

export const createUser = async (data: UserCreate): Promise<User> => {
  return (await api.post<User>('/users', data)).data
}

export const updateUser = async (id: number, data: UserUpdate): Promise<User> => {
  return (await api.put<User>(`/users/${id}`, data)).data
}

export const deleteUser = async (id: number) => {
  return (await api.delete(`/users/${id}`)).data
}

export const me = async (): Promise<{ user: User }> => {
  return (await api.get('/users/me')).data
}
