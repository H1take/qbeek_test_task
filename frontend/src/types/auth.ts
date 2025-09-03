import type { Role } from '@/types/role.ts'

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface LoginResponse {
  message: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: Role;
  }
}

export interface RegisterResponse {
  message: string;
  user: {
    id: number;
    email: string;
  }
}
