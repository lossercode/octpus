import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'
import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue')
    },
    {
      path: '/create/:id',
      name: 'create',
      meta: {
        requiredAuth: true
      },
      component: () => import('@/views/Create/index.vue')
    },
    {
      path: '/user',
      name: 'user',
      redirect: '/user/tasks',
      meta: {
        requiredAuth: true
      },
      component: () => import('@/views/User/index.vue'),
      children: [
        {
          path: '/user/tasks',
          name: 'tasks',
          component: () => import('@/views/User/main/tasks.vue')
        },
        {
          path: '/user/log',
          name: 'log',
          component: () => import('@/views/User/main/log.vue')
        }
      ]
    },
    {
      path: '/taskStatus/:id',
      name: 'taskStatus',
      meta: {
        requiredAuth: true
      },
      component: () => import('@/views/TaskStatus/index.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/404/index.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem('token') || ''
  if (to.meta.requiredAuth && !isAuth) {
    ElMessage.warning('请先登录')
    setTimeout(() => {
      next('/login')
    }, 2000)
  } else {
    next()
  }
})

export default router
