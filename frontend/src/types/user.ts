import type { Role } from '@/types/role.ts'

export interface User {
  id: number
  name: string
  email: string
  role: Role
}

export interface UserCreate {
  name: string
  email: string
  role: Role
  password: string
}

export interface UserUpdate {
  name: string
  email: string
  role?: Role
  password?: string
}
