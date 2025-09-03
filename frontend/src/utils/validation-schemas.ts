import * as yup from 'yup'

export const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

export const registerSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

export const profileSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Invalid email format'),
})

export const userSchema = (isEdit: boolean = false) => {
  const baseSchema = yup.object({
    name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
    email: yup.string().required('Email is required').email('Invalid email format'),
    role: yup.string().required('Role is required').oneOf(['Admin', 'Manager'], 'Invalid role'),
  })

  if (!isEdit) {
    return baseSchema.shape({
      password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
      confirmPassword: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], 'Passwords must match'),
    })
  }

  return baseSchema
}
