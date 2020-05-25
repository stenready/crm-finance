import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'mein' },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'auth' },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { layout: 'mein' },
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'auth' },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { layout: 'mein' },
    component: () => import('../views/Planning.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: { layout: 'mein' },
    component: () => import('../views/Record.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'mein' },
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    meta: { layout: 'mein' },
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: 'mein' },
    component: () => import('../views/History.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
