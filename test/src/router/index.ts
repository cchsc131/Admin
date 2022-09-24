import { createRouter, createWebHistory,createWebHashHistory, RouteRecordRaw } from 'vue-router'
import {
  User,Grid,TrendCharts
} from '@element-plus/icons-vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/home/index.vue'),
    children:[
      { 
        path: '/echarts',
        name: 'echarts',
        component: () => import('../views/home/childrens/EchartsView.vue'),
        meta: {
          title: "数据展示",
          icon:TrendCharts
        }
     },
     { 
        path: '/pay',
        name: 'pay',
        component: () => import('../views/home/childrens/PayList.vue'),
        meta: {
          title: "缴费管理",
          icon:Grid
        }
     },
     { 
        path: '/user',
        name: 'user',
        component: () => import('../views/home/childrens/UserOne.vue'),
        meta: {
          title: "住户信息",
          icon:User
        },
        children:[
          { 
            path: '/list',
            name: 'list',
            component: () => import('../views/home/childrens/UserList.vue'),
            meta: {
              classifyTitle: "住户信息",
              title: "住户信息列表"
            }
          },
          { 
              path: '/update',
              name: 'update',
              component: () => import('../views/home/childrens/UserUpdate.vue'),
              meta: {
                  classifyTitle: "住户信息",
                  title: "住户信息修改"
                }
          }
        ]
     }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
