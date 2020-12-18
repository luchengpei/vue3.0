import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      title: '登陆',
      hidden:true
    }
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '首页',
      hidden:false
    }
  },
  {
    path: '/tip',
    component: () => import('@/views/tips/tips.vue'),
    meta: {
      title: '引导页',
      hidden:false
    }
  },
  {
    path: '/user',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '用户管理',
      hidden:false
    },
    children: [
      {
        path: '/user1',
        component: () => import('@/views/user/user1.vue'),
        meta: {
          title: '用户一',
          hidden:false
        }
      },
      {
        path: '/user2',
        component: () => import('@/views/user/user2.vue'),
        meta: {
          title: '用户二',
          hidden:false
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
