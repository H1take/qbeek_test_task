<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br py-8 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
      <div class="text-center mb-8">
        <div
          class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            ></path>
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-gray-800">Create Account</h2>
        <p class="text-gray-600 mt-2">Join us to get started</p>
      </div>

      <Form
        @submit="onSubmit"
        :validation-schema="registerSchema"
        v-slot="{ errors, isSubmitting }"
        class="space-y-5"
      >
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-5 w-5 text-gray-400"
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
            </div>
            <Field
              name="name"
              type="text"
              placeholder="Enter your full name"
              :class="[
                'w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200',
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
              ]"
            />
          </div>
          <ErrorMessage name="name" class="text-red-500 text-sm mt-1 block" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <Field
              name="email"
              type="email"
              placeholder="Enter your email"
              :class="[
                'w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200',
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
              ]"
            />
          </div>
          <ErrorMessage name="email" class="text-red-500 text-sm mt-1 block" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
            </div>
            <Field
              name="password"
              type="password"
              placeholder="Create a password"
              :class="[
                'w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200',
                errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
              ]"
            />
          </div>
          <ErrorMessage name="password" class="text-red-500 text-sm mt-1 block" />
          <p class="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
        </div>

        <button
          type="submit"
          :disabled="isSubmitting || auth.loading"
          :class="[
            'w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors duration-200 flex items-center justify-center',
            isSubmitting || auth.loading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700',
          ]"
        >
          <span v-if="auth.loading" class="animate-spin mr-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
          </span>
          {{ auth.loading ? 'Creating Account...' : 'Create Account' }}
        </button>
      </Form>

      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white text-gray-500">Already have an account?</span>
        </div>
      </div>

      <div class="text-center">
        <router-link
          to="/login"
          class="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 flex items-center justify-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            ></path>
          </svg>
          Sign in to your account
        </router-link>
      </div>

      <div v-if="auth.error" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-700 text-sm">{{ auth.error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { Form, Field, ErrorMessage, type SubmissionHandler } from 'vee-validate'
import { registerSchema } from '@/utils/validation-schemas'
import { watch } from 'vue'
import type { RegisterData } from '@/types/auth.ts'

const auth = useAuthStore()

const onSubmit: SubmissionHandler = async (values) => {
  const result = await auth.register(values as RegisterData)
  if (!result.success) {
    console.error('Registration failed:', result.message)
  }
}

watch(
  () => auth.error,
  (error) => {
    if (error) {
      setTimeout(() => {
        auth.clearError()
      }, 5000)
    }
  },
)
</script>

<style scoped>
button {
  transition: all 0.2s ease-in-out;
}

input {
  transition: all 0.2s ease-in-out;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
