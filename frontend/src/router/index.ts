import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Dashboard from '@/views/Dashboard.vue'
import Profile from '@/views/Profile.vue'
import UsersList from '@/views/UsersList.vue'
import UserForm from '@/views/UserForm.vue'
import { useAuthStore } from '@/stores/auth.ts'

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/dashboard/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
  {
    path: '/users',
    name: 'Users',
    component: UsersList,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/users/create',
    name: 'CreateUser',
    component: UserForm,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/users/edit/:id',
    name: 'EditUser',
    component: UserForm,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  { path: '/', redirect: '/login' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  if (!auth.checked) {
    await auth.fetchMe()
  }

  if (to.meta.requiresAuth && !auth.loggedIn) {
    return next('/login')
  }

  if (to.meta.requiresAdmin && auth.user?.role !== 'Admin') {
    return next('/dashboard')
  }

  if ((to.path === '/login' || to.path === '/register') && auth.loggedIn) {
    return next('/dashboard')
  }

  next()
})

export default router
