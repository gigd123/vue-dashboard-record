// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import App from './App'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

// withCredentials 會自動將 cookie 存在前端，每次發送 api 也會往後端送
axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})

// to 要去的網址，from 來自哪個網址， next
router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next)
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`
    axios.post(api).then((response) => {
    // this.$http.post(api).then((response) => { 由於現在是在 router 上面，並非直接在 vue 原件上，無法直接使用 $http，必須直接呼叫 Axios
      console.log(response.data)
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/Login'
        })
      }
    })
  } else {
    next()
  }
})
