import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入UI
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less' // 引入样式
import axios from 'axios'
import 'nprogress/nprogress.css' // 加载nprogress(第三方包)的样式文件
// 加载第三方包中的具体文件不需要写具体路径,直接书写包名即可
Vue.prototype.$axios = axios // 将axios共享给所有实例使用
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置axios的常态地址
Vue.use(ElementUI) // 注册整个elementUI组件 Vue.js调用了elementUI里面的install方法(调用时传入了Vue对象)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
