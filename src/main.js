// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
import VeeValidate from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n'

import router from './router'
import App from './App'
import './bus'
import currencyFilter from './filters/currency'
import dateFilter from '@/filters/date'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

// withCredentials 會自動將 cookie 存在前端，每次發送 api 也會往後端送
axios.defaults.withCredentials = true

// 全域啟用該元件，不必在其他 component 再度載入
Vue.component('Loading', Loading)
// 全域啟用
Vue.filter('currency', currencyFilter)
Vue.filter('date', dateFilter)

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  events: 'input|blur', // 這是為了讓使用者離開該欄位時觸發驗證
  i18n,
  dictionary: {
    zhTW
  }
})

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})

// to 要去的網址，from 來自哪個網址， next
router.beforeEach((to, from, next) => {
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
