import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      Authorition: true
    },
    children: [
      {
        path: '/userlist',
        name: 'UserList',
        component: () => import('@/views/userlist/index')
      },
      {
        path: '/permission',
        name: 'Permission',
        component: () => import('@/views/permission/index')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
