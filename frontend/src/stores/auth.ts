import { defineStore } from 'pinia'
import * as authApi from '@/api/auth'
import * as userApi from '@/api/users'
import router from '@/router'
import type { LoginData, RegisterData } from '@/types/auth'
import type { User } from '@/types/user'
import type { Error } from '@/types/error.ts'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loggedIn: false,
    checked: false,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => state.loggedIn,
    isAdmin: (state) => state.user?.role === 'Admin',
    isManager: (state) => state.user?.role === 'Manager',
  },

  actions: {
    async login(data: LoginData) {
      try {
        this.user = (await authApi.login(data)).user
        this.loggedIn = true
        router.push('/dashboard')
        return { success: true }
      } catch (error: unknown) {
        const err = error as Error

        console.error('Login failed:', error)
        return {
          success: false,
          message: err.response?.data?.message || 'Login failed',
        }
      }
    },

    async register(data: RegisterData) {
      try {
        await authApi.register(data)
        return await this.login({
          email: data.email,
          password: data.password,
        })
      } catch (error: unknown) {
        const err = error as Error

        console.error('Registration failed:', error)
        return {
          success: false,
          message: err.response?.data?.message || 'Registration failed',
        }
      }
    },
    async logout() {
      try {
        await authApi.logout()

        this.user = null
        this.loggedIn = false

        router.push('/login')
        return { success: true }
      } catch (error: unknown) {
        const err = error as Error

        console.error('Logout failed:', error)
        return {
          success: false,
          message: err.response?.data?.message || 'Logout failed',
        }
      }
    },
    async fetchMe() {
      try {
        this.user = (await userApi.me()).user

        this.loggedIn = true

        return { success: true }
      } catch (error: unknown) {
        const err = error as Error

        console.error('Fetch me failed:', error)

        this.user = null
        this.loggedIn = false

        return {
          success: false,
          message: err.response?.data?.message || 'Failed to fetch user data',
        }
      } finally {
        this.checked = true
      }
    },
    clearAuth() {
      this.user = null
      this.loggedIn = false
      this.checked = false
    },
    clearError() {
      this.error = null
    },
  },
})
