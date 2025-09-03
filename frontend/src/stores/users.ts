import { defineStore } from 'pinia'
import type { User, UserCreate, UserUpdate } from '@/types/user'
import * as usersApi from '@/api/users'
import type { Error } from '@/types/error.ts'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getUserById: (state) => (id: number) => {
      return state.users.find((user) => user.id === id)
    },
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null,
  },

  actions: {
    async fetchUsers() {
      this.loading = true
      this.error = null

      try {
        this.users = await usersApi.getUsers()
        return { success: true }
      } catch (error: unknown) {
        const err = error as Error

        console.error('Fetch users failed:', error)
        this.error = err.response?.data?.message || 'Failed to fetch users'
        return {
          success: false,
          message: this.error,
        }
      } finally {
        this.loading = false
      }
    },
    async createUser(user: UserCreate) {
      this.loading = true
      this.error = null

      try {
        const createdUser = await usersApi.createUser(user)
        this.users.push(createdUser)
        return { success: true, user: createdUser }
      } catch (error: unknown) {
        const err = error as Error

        console.error('Create user failed:', error)
        this.error = err.response?.data?.message || 'Failed to create user'
        return {
          success: false,
          message: this.error,
        }
      } finally {
        this.loading = false
      }
    },
    async updateUser(id: number, user: UserUpdate) {
      this.loading = true
      this.error = null

      try {
        const updatedUser = await usersApi.updateUser(id, user)
        const index = this.users.findIndex((u) => u.id === id)
        if (index !== -1) {
          this.users[index] = updatedUser
        }
        return { success: true, user: updatedUser }
      } catch (error: unknown) {
        const err = error as Error

        console.error('Update user failed:', error)
        this.error = err.response?.data?.message || 'Failed to update user'
        return {
          success: false,
          message: this.error,
        }
      } finally {
        this.loading = false
      }
    },
    async deleteUser(id: number) {
      this.loading = true
      this.error = null

      try {
        await usersApi.deleteUser(id)
        this.users = this.users.filter((u) => u.id !== id)
        return { success: true }
      } catch (error: unknown) {
        const err = error as Error

        console.error('Delete user failed:', error)
        this.error = err.response?.data?.message || 'Failed to delete user'
        return {
          success: false,
          message: this.error,
        }
      } finally {
        this.loading = false
      }
    },
    async fetchUser(id: number) {
      this.loading = true
      this.error = null

      try {
        const user = await usersApi.getUser(id)
        const index = this.users.findIndex((u) => u.id === id)
        if (index !== -1) {
          this.users[index] = user
        } else {
          this.users.push(user)
        }
        return { success: true, user }
      } catch (error: unknown) {
        const err = error as Error

        console.error('Fetch user failed:', error)
        this.error = err.response?.data?.message || 'Failed to fetch user'
        return {
          success: false,
          message: this.error,
        }
      } finally {
        this.loading = false
      }
    },
    clearError() {
      this.error = null
    },
    reset() {
      this.users = []
      this.loading = false
      this.error = null
    },
  },
})
