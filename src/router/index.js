import Vue from 'vue'
import VueRouter from 'vue-router'

import firebase from 'firebase/app'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'mein', auth: true },
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
    meta: { layout: 'mein', auth: true },
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
    meta: { layout: 'mein', auth: true },
    component: () => import('../views/Planning.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: { layout: 'mein', auth: true },
    component: () => import('../views/Record.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'mein', auth: true },
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: { layout: 'mein', auth: true },
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: 'mein', auth: true },
    component: () => import('../views/History.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( (to, from, next) => {
  const user = firebase.auth().currentUser
  const requireAuth = to.matched.some( record => record.meta.auth )

  if(requireAuth && !user) {
    next('/login?message=login')
  } else if(!requireAuth && user) {
    next('/')
  } else {
    next()
  }

} )

export default router
