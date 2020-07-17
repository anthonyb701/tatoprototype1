import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../components/List.vue'
import { auth } from '../../firebase'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'List',
    component: List
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('../components/Create.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/appointment/:id',
    name: 'Appointment',
    props: true,
    component: () => import('../components/appointment.vue')
  },
  {
    path: '/auth',
    name: 'authentification',
    component: () => import('../views/LLogin.vue')

  }
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/auth')
  } else {
    next()
  }
})

export default router
