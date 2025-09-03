<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
    <h2 class="text-3xl font-semibold mb-6 text-center text-gray-800">Profile</h2>

    <Form
      @submit="onSubmit"
      :validation-schema="profileSchema"
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
          placeholder="Enter your name"
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
          placeholder="Enter your email"
        />
        <ErrorMessage name="email" class="text-red-500 text-sm mt-1 block" />
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        :class="[
          'w-full text-white font-semibold py-3 rounded-lg transition duration-200',
          isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700',
        ]"
      >
        {{ isSubmitting ? 'Updating...' : 'Update Profile' }}
      </button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUsersStore } from '@/stores/users'
import { Form, Field, ErrorMessage, type SubmissionHandler } from 'vee-validate'
import { profileSchema } from '@/utils/validation-schemas.ts'

const authStore = useAuthStore()
const usersStore = useUsersStore()

const form = reactive({
  name: '',
  email: '',
})

onMounted(() => {
  if (authStore.user) {
    form.name = authStore.user.name
    form.email = authStore.user.email
  }
})

const onSubmit: SubmissionHandler = async (values, { resetForm }) => {
  try {
    if (!authStore.user) return

    await usersStore.updateUser(authStore.user.id, {
      name: values.name,
      email: values.email,
    })

    authStore.user.name = values.name
    authStore.user.email = values.email

    resetForm({ values: { name: values.name, email: values.email } })

    alert('Profile updated successfully!')
  } catch (error) {
    console.error('Update failed:', error)
    alert('Failed to update profile. Please try again.')
  }
}
</script>
