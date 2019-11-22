import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/views/layout'
import login from '@/views/login/login.vue'
import Home from '@/views/home' // @指向src目录
import ArtiCle from '@/views/article' // 文章列表
import PubLish from '@/views/publish' // 发表文章
import Comment from '@/views/comment'
import NProgress from 'nprogress'
import CommentDetail from '@/views/comment-detail'
import Media from '@/views/media'
import Account from '@/views/account'

Vue.use(VueRouter)

const routes = [{
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
    },
    // 频道列表组件
    {
      path: '/publish/:articleId',
      component: PubLish
    },
    // 评论组件
    {
      path: '/comment',
      component: Comment
    },
    // 评论详情
    {
      path: '/comment/:articleId',
      component: CommentDetail,
      props: true
    },
    // 素材管理
    {
      path: '/media',
      component: Media
    },
    // 账户信息
    {
      path: '/account',
      component: Account
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
// 路由的拦截器
/*
  该方法接收一个函数作为参数
  参数1(to):表示去哪里的路由信息
  参数2(from):表示来自哪里的路由信息
  参数3(next):表示放行,允许通过
  判断用户的登陆状态(本地token),如果有就通过,没有就跳转至登录页(login)
*/
router.beforeEach((to, from, next) => {
  // 开启顶部导航进度条
  NProgress.start()
  console.log('所有页面都要经过这里')
  // console.log(to)
  // 1.如果访问的为登录页直接放行
  if (to.path === '/login') {
    next()
    // 停止代码执行
    return
  }
  // 2.如果是非登陆页面才校验登陆状态
  // 2.1获取用户token,判断是否存在
  const token = window.localStorage.getItem('user-token')
  if (token) {
    // 2.2存在token,允许通过
    next()
  } else {
    // 2.3不存在token,跳转登录页
    next('/login')
    NProgress.done()
  }
})
// 路由导航结束以后触发的函数
router.afterEach((to, from) => {
  // 结束顶部导航进度条
  NProgress.done()
})

export default router
