import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/edit',
    name: 'Edit',
    component: () => import('@/views/Edit')
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('@/views/Create')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
