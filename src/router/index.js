import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  if (
    1 == 1 &&
    // Avoid an infinite redirect
    to.name !== 'login'
  ) {
    // redirect the user to the login page.
    return { name: 'login' }
  }
})
export default router
