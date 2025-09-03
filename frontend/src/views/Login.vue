<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-sm p-6 bg-white rounded-xl shadow-lg">
      <div class="text-center mb-6">
        <h2 class="text-3xl font-bold text-gray-800">Welcome Back</h2>
        <p class="text-gray-600 mt-2">Sign in to your account</p>
      </div>

      <Form
        @submit="onSubmit"
        :validation-schema="loginSchema"
        v-slot="{ errors, isSubmitting }"
        class="space-y-5"
      >
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Email</label>
          <Field
            name="email"
            type="email"
            placeholder="Enter your email"
            :class="[
              'w-full border rounded-lg p-3 transition-colors duration-200',
              errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500',
            ]"
          />
          <ErrorMessage name="email" class="text-red-500 text-sm mt-1 block" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Password</label>
          <Field
            name="password"
            type="password"
            placeholder="Enter your password"
            :class="[
              'w-full border rounded-lg p-3 transition-colors duration-200',
              errors.password
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500',
            ]"
          />
          <ErrorMessage name="password" class="text-red-500 text-sm mt-1 block" />
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          :class="[
            'w-full text-white font-semibold py-3 rounded-lg transition duration-200',
            isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700',
          ]"
        >
          {{ isSubmitting ? 'Signing in...' : 'Sign in' }}
        </button>
      </Form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Don't have an account?
        <router-link
          to="/register"
          class="text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          Register now
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { Form, Field, ErrorMessage, type SubmissionHandler } from 'vee-validate'
import { loginSchema } from '@/utils/validation-schemas.ts'
import type { Error } from '@/types/error.ts'
import type { LoginData } from '@/types/auth.ts'

const auth = useAuthStore()

const onSubmit: SubmissionHandler = async (values) => {
  try {
    await auth.login(values as LoginData)
  } catch (error: unknown) {
    const err = error as Error

    alert(err.response?.data?.message || 'Invalid credentials')
  }
}
</script>
