import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../components/List.vue'


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
    component: () => import('../components/Create.vue')
  },
  {
    path: '/:id',
    name: 'Appointment',
    props: true,
    component: () => import('../components/appointment.vue')
  }
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
