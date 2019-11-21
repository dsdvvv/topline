import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入UI
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less' // 引入样式
import axios from 'axios'
import 'nprogress/nprogress.css' // 加载nprogress(第三方包)的样式文件
import moment from 'moment'
// 加载第三方包中的具体文件不需要写具体路径,直接书写包名即可
import JSONbig from 'json-bigint' // 用来解决后端返回数据中数字超出 JS 安全整数范围问题
// 使用json-bigint对数据进行处理
axios.defaults.transformResponse = [function (data, headers) {
  // Do whatever you want to transform the data

  // axios 默认使用 JSON.parse(data)
  // 我们这里手动配置使用 JSONbig.parse(data)
  try {
    return JSONbig.parse(data)
  } catch (err) {
    console.log(err)
    // 一旦 try 里面的代码执行引发异常，那么就进入 catch 执行
    return {}
  }
  // console.log(data)
  // return JSONbig.parse(data)
}]

// axios请求拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 在请求拦截器函数中的config是本次请求相关的配置对象(发送给后端的配置对象)
  // console.log(config)
  const token = window.localStorage.getItem('user-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// axios响应拦截器
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // console.log('响应拦截器')
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

Vue.prototype.$axios = axios // 将axios共享给所有实例使用
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置axios的常态地址
Vue.use(ElementUI) // 注册整个elementUI组件 Vue.js调用了elementUI里面的install方法(调用时传入了Vue对象)

/*
  全局过滤器:任何组件模板都可直接访问
  参数1:过滤器名称
  参数2:函数
  调用方式:在模板中{{ 数据 | 过滤器 }}
  |:管道符:前面的数据回座位参数传递给过滤器函数
*/
Vue.filter('dateFormat', (value, format = 'YYYY-MM-DD') => {
  return moment(value).format(format)
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
