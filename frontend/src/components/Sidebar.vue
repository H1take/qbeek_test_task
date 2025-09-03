<template>
  <aside
    class="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-xl transform transition-transform duration-300 z-50"
  >
    <div class="p-6 border-b border-blue-700">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div>
          <h1 class="text-xl font-bold">User Manager</h1>
          <p class="text-blue-200 text-xs">Admin Panel</p>
        </div>
      </div>
    </div>

    <nav class="p-4">
      <div class="mb-6">
        <p class="text-blue-300 text-xs uppercase font-semibold mb-3 px-3">Main Navigation</p>
        <ul class="space-y-2">
          <li v-if="auth.user">
            <router-link
              to="/dashboard/profile"
              class="flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 hover:bg-blue-700 group"
              :class="{ 'bg-blue-600 shadow-lg': $route.path === '/dashboard/profile' }"
            >
              <svg
                class="w-5 h-5 group-hover:text-white"
                :class="{
                  'text-white': $route.path === '/dashboard/profile',
                  'text-blue-300': $route.path !== '/dashboard/profile',
                }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              <span class="font-medium">My Profile</span>
            </router-link>
          </li>

          <li v-if="auth.user?.role === 'Admin'">
            <router-link
              to="/users"
              class="flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 hover:bg-blue-700 group"
              :class="{ 'bg-blue-600 shadow-lg': $route.path.startsWith('/users') }"
            >
              <svg
                class="w-5 h-5 group-hover:text-white"
                :class="{
                  'text-white': $route.path.startsWith('/users'),
                  'text-blue-300': !$route.path.startsWith('/users'),
                }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                ></path>
              </svg>
              <span class="font-medium">User Management</span>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="mt-8 border-t border-blue-700 pt-6">
        <div class="px-3 mb-4">
          <p class="text-blue-300 text-xs uppercase font-semibold">Account</p>
        </div>
        <ul class="space-y-2">
          <li class="px-3 py-2">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span class="text-sm font-semibold">{{ getUserInitials }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate">{{ auth.user?.name }}</p>
                <p class="text-xs text-blue-300 truncate">{{ auth.user?.email }}</p>
              </div>
            </div>
          </li>

          <li>
            <button
              @click="logout"
              class="w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 hover:bg-red-600 group text-left"
            >
              <svg
                class="w-5 h-5 text-red-400 group-hover:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              <span class="font-medium text-red-400 group-hover:text-white">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" v-if="false"></div>
  </aside>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const auth = useAuthStore()
const router = useRouter()

const getUserInitials = computed(() => {
  if (!auth.user?.name) return 'U'
  return auth.user.name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2)
})

const logout = async () => {
  if (confirm('Are you sure you want to logout?')) {
    await auth.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
.router-link-active {
  background-color: rgb(37 99 235);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.router-link-active span {
  color: white;
}

.router-link-active svg {
  color: white;
}
</style>
