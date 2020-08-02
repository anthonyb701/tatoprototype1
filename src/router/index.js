import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../components/List.vue'
import { auth } from '../../firebase'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'List',
    component: List,
    meta: {
      requiresAuth: true
    }
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
    path: '/appointmentRelease/:id',
    name: 'AppointmentRelease',
    props: true,
    component: () => import('../components/appointmentRelease.vue')
  },
  {
    path: '/auth',
    name: 'authentification',
    component: () => import('../views/LLogin.vue')

  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../components/Profile.vue'),
    meta: {
      requiresAuth: true
    }

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
