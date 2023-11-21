import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import { useSessionDetailsStore } from "../stores/SessionDetailsStore";

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
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('../views/GameView.vue')
    },
    {
      path: '/users/add',
      name: 'add-user',
      component: () => import('../views/AddUserView.vue')
    },
    {
      path: '/users/edit/:id',
      name: 'edit-user',
      component: () => import('../views/EditUserView.vue')
    },
  ]
})

// So as to only load stores once initially.
var hasInitialLoadCompleted = false;

var sessionDetailsStore;

router.beforeEach(async (to) => {
  // Make sure certain initial data has been loaded to the store before the home page opens.              
  sessionDetailsStore = useSessionDetailsStore();
  // Run the API call.
  if (sessionDetailsStore.isLoggedIn != true) {
    await sessionDetailsStore.getSessionDetails();
  }

  if (
    hasInitialLoadCompleted == false &&
    sessionDetailsStore.isLoggedIn == false &&
    // Avoid an infinite redirect
    to.name !== 'login'
  ) {
    // redirect the user to the login page.
    return { name: 'login' }
  }
})
export default router
