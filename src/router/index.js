import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/views/layout'
import login from '@/views/login/login.vue'
import Home from '@/views/home' // @指向src目录
import ArtiCle from '@/views/article' // 文章列表
import PubLish from '@/views/publish' // 发表文章
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: layout,
    children: [
      // 首页
      {
        path: '', // 默认子路由(只能有一个)
        component: Home
      },
      // 文章列表
      {
        path: '/article',
        component: ArtiCle
      },
      // 发布文章
      {
        path: '/publish',
        component: PubLish
      }
    ]
  },
  // 一级路由(登录页)
  {
    path: '/login',
    component: login
  }

]

const router = new VueRouter({
  routes
})

export default router
