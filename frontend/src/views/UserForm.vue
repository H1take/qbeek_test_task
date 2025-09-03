<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
    <h2 class="text-3xl font-semibold mb-6 text-center text-gray-800">
      {{ isEdit ? 'Edit User' : 'Create User' }}
    </h2>

    <Form
      @submit="onSubmit"
      :validation-schema="userSchema"
      v-slot="{ errors, isSubmitting }"
      class="space-y-5"
    >
      <div>
        <label class="block text-sm font-medium mb-1 text-gray-700">Name</label>
        <Field
          name="name"
          v-model="form.name"
          type="text"
          :class="[
            'w-full border rounded-lg p-3 transition-colors duration-200',
            errors.name
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500',
          ]"
          placeholder="Enter user's name"
        />
        <ErrorMessage name="name" class="text-red-500 text-sm mt-1 block" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1 text-gray-700">Email</label>
        <Field
          name="email"
          v-model="form.email"
          type="email"
          :class="[
            'w-full border rounded-lg p-3 transition-colors duration-200',
            errors.email
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500',
          ]"
          placeholder="Enter user's email"
        />
        <ErrorMessage name="email" class="text-red-500 text-sm mt-1 block" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1 text-gray-700">Role</label>
        <Field
          name="role"
          v-model="form.role"
          as="select"
          :class="[
            'w-full border rounded-lg p-3 transition-colors duration-200',
            errors.role
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500',
          ]"
        >
          <option value="" disabled>Select a role</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
        </Field>
        <ErrorMessage name="role" class="text-red-500 text-sm mt-1 block" />
      </div>

      <div v-if="!isEdit">
        <label class="block text-sm font-medium mb-1 text-gray-700">Password</label>
        <Field
          name="password"
          v-model="form.password"
          type="password"
          :class="[
            'w-full border rounded-lg p-3 transition-colors duration-200',
            errors.password
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500',
          ]"
          placeholder="Enter password"
        />
        <ErrorMessage name="password" class="text-red-500 text-sm mt-1 block" />
      </div>

      <div v-if="!isEdit">
        <label class="block text-sm font-medium mb-1 text-gray-700">Confirm Password</label>
        <Field
          name="confirmPassword"
          v-model="form.confirmPassword"
          type="password"
          :class="[
            'w-full border rounded-lg p-3 transition-colors duration-200',
            errors.confirmPassword
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500',
          ]"
          placeholder="Confirm password"
        />
        <ErrorMessage name="confirmPassword" class="text-red-500 text-sm mt-1 block" />
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        :class="[
          'w-full text-white font-semibold py-3 rounded-lg transition duration-200',
          isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700',
        ]"
      >
        {{ isSubmitting ? 'Processing...' : isEdit ? 'Update User' : 'Create User' }}
      </button>

      <button
        type="button"
        @click="router.push('/users')"
        class="w-full border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition duration-200"
      >
        Cancel
      </button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/users'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { userSchema } from '@/utils/validation-schemas.ts'
import type { Error } from '@/types/error'
import type { SubmissionHandler } from 'vee-validate'

const usersStore = useUsersStore()
const route = useRoute()
const router = useRouter()

const isEdit = computed(() => !!route.params.id)

const form = reactive({
  name: '',
  email: '',
  role: '' as 'Admin' | 'Manager' | '',
  password: '',
  confirmPassword: '',
})

onMounted(async () => {
  const id = route.params.id as string
  if (id && isEdit.value) {
    try {
      const user = usersStore.users.find((u) => u.id === Number(id))
      if (user) {
        form.name = user.name
        form.email = user.email
        form.role = user.role
      }
    } catch (error) {
      console.error('Failed to load user:', error)
      alert('Failed to load user data')
      router.push('/users')
    }
  }
})

const onSubmit: SubmissionHandler = async (values, { resetForm }) => {
  try {
    if (isEdit.value && route.params.id) {
      await usersStore.updateUser(Number(route.params.id), {
        name: values.name,
        email: values.email,
        role: values.role,
      })
    } else {
      await usersStore.createUser({
        name: values.name,
        email: values.email,
        role: values.role!,
        password: values.password!,
      })
      resetForm()
    }

    router.push('/users')
  } catch (error: unknown) {
    const err = error as Error

    console.error('Operation failed:', error)
    alert(err.response?.data?.message || 'Operation failed. Please try again.')
  }
}
</script>
