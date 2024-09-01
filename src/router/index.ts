import { createRouter, createWebHistory } from 'vue-router'
import CartView from '@/views/CartView.vue'
import PerfumeView from '@/views/PerfumeView.vue'
import LoginView from '@/views/LoginView.vue'
import UserView from '../views/UserView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/perfume'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/perfume',
      name: 'perfume',
      component: PerfumeView
     },
    
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/user',
      name: 'user',
      component: UserView
    },
  ]
})

export default router
