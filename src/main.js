import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from '../src/http/request'

moment.locale('zh-cn')

Vue.filter('date', function (t) {
  return moment(t).format('YYYY-MM-DD h:mm:ss a')
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  const token = localStorage.getItem('token')
  if (to.meta.Authorition) {
    if (token) {
      next()
    } else {
      router.push({ name: 'Login' })
    }
  } else {
    next()
  }
})

Vue.use(ElementUI)

Vue.prototype.$http = http
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
