<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
      <div>
        <h2 class="text-3xl font-bold text-gray-800">User Management</h2>
        <p class="text-gray-600 mt-2">Manage your system users and permissions</p>
      </div>
      <router-link
        to="/users/create"
        class="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center mt-4 sm:mt-0"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        Create User
      </router-link>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div class="flex flex-col sm:flex-row gap-4 items-center">
        <div class="relative flex-1">
          <svg
            class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="Search by name or email..."
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          />
        </div>

        <select
          v-model="roleFilter"
          class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
        >
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
        </select>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div v-if="usersStore.loading" class="p-8 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="text-gray-600 mt-4">Loading users...</p>
      </div>

      <div v-else-if="filteredUsers.length === 0" class="p-8 text-center">
        <svg
          class="w-16 h-16 text-gray-400 mx-auto"
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
        <h3 class="text-lg font-medium text-gray-900 mt-4">No users found</h3>
        <p class="text-gray-600 mt-2">Try adjusting your search or create a new user.</p>
      </div>

      <table v-else class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              @click="sortBy('name')"
            >
              <div class="flex items-center">
                Name
                <svg
                  class="w-4 h-4 ml-1"
                  :class="sortField === 'name' ? 'text-blue-600' : 'text-gray-400'"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                  ></path>
                </svg>
              </div>
            </th>
            <th
              class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              @click="sortBy('email')"
            >
              <div class="flex items-center">
                Email
                <svg
                  class="w-4 h-4 ml-1"
                  :class="sortField === 'email' ? 'text-blue-600' : 'text-gray-400'"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                  ></path>
                </svg>
              </div>
            </th>
            <th
              class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              @click="sortBy('role')"
            >
              <div class="flex items-center">
                Role
                <svg
                  class="w-4 h-4 ml-1"
                  :class="sortField === 'role' ? 'text-blue-600' : 'text-gray-400'"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                  ></path>
                </svg>
              </div>
            </th>
            <th
              class="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="user in paginatedUsers"
            :key="user.id"
            class="hover:bg-gray-50 transition-colors duration-150"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div
                  class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center"
                >
                  <span class="text-blue-800 font-medium">{{
                    user.name.charAt(0).toUpperCase()
                  }}</span>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                  <div class="text-sm text-gray-500">ID: {{ user.id }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ user.email }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="[
                  'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                  user.role === 'Admin'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-green-100 text-green-800',
                ]"
              >
                {{ user.role }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex items-center justify-end space-x-3">
                <router-link
                  :to="`/users/edit/${user.id}`"
                  class="text-blue-600 hover:text-blue-900 transition-colors duration-200 flex items-center"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>
                  Edit
                </router-link>
                <button
                  @click="deleteUser(user)"
                  class="text-red-600 hover:text-red-900 transition-colors duration-200 flex items-center"
                  :disabled="usersStore.loading"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        v-if="filteredUsers.length > 0 && !usersStore.loading"
        class="bg-white px-6 py-4 border-t border-gray-200"
      >
        <div class="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div class="text-sm text-gray-700">
            Showing {{ startItem }} to {{ endItem }} of {{ filteredUsers.length }} results
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              :class="[
                'px-3 py-2 rounded-md border border-gray-300 text-sm font-medium',
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50',
              ]"
            >
              Previous
            </button>
            <span class="text-sm text-gray-700"> Page {{ currentPage }} of {{ totalPages }} </span>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              :class="[
                'px-3 py-2 rounded-md border border-gray-300 text-sm font-medium',
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50',
              ]"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useUsersStore } from '@/stores/users'
import type { User } from '@/types/user'

const usersStore = useUsersStore()
const search = ref('')
const roleFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const sortField = ref<'name' | 'email' | 'role'>('name')
const sortDirection = ref<'asc' | 'desc'>('asc')

onMounted(() => {
  usersStore.fetchUsers()
})

watch([search, roleFilter], () => {
  currentPage.value = 1
})

const filteredUsers = computed(() => {
  let users = usersStore.users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.value.toLowerCase()) ||
      user.email.toLowerCase().includes(search.value.toLowerCase()),
  )

  if (roleFilter.value) {
    users = users.filter((user) => user.role === roleFilter.value)
  }

  return users.sort((a, b) => {
    let modifier = 1
    if (sortDirection.value === 'desc') modifier = -1

    if (a[sortField.value] < b[sortField.value]) return -1 * modifier
    if (a[sortField.value] > b[sortField.value]) return 1 * modifier
    return 0
  })
})

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredUsers.value.slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage.value))
const startItem = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1)
const endItem = computed(() =>
  Math.min(currentPage.value * itemsPerPage.value, filteredUsers.value.length),
)

const sortBy = (field: 'name' | 'email' | 'role') => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const deleteUser = async (user: User) => {
  if (!confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
    return
  }

  try {
    await usersStore.deleteUser(user.id)
  } catch (error) {
    console.error('Failed to delete user:', error)
    alert('Failed to delete user. Please try again.')
  }
}
</script>
