import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/edit/:id',
    name: 'Edit',
    component: () => import('@/views/Edit'),
    props: true
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('@/views/Create')
  },
  {
    path: '/picker',
    name: 'Picker',
    component: () => import('@/components/Select')
  },
  {
    path: '/:search',
    name: 'Secrch',
    component: () => import('@/views/Home'),
    props: true
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
