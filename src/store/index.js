import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import ProductsModule from './product'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict 嚴謹模式，如果語法不符合 vue 規範就會有警告
  strict: true,
  state: {
    isLoading: false,
    cart: {}
  },
  // 操作行為，如ajax，但是不用於操作資料狀態
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
    getCart (context) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      context.commit('LOADING', true)
      axios.get(api).then((response) => {
        context.commit('CART', response.data.data)
        context.commit('LOADING', false)
      })
    },
    removeCartItem (context, id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
      context.commit('LOADING', true)
      axios.delete(api).then((response) => {
        context.dispatch('getCart')
        context.commit('LOADING', false)
      })
    },
    // 在傳參數進入 action 時候，一次只能傳入一個參數 (context, id, qty = 1)， qty 會變成 undefined
    addToCart (context, {id, qty}) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      // vm.status.loadingItem = id
      axios.post(api, {data: cart}).then((response) => {
        // vm.status.loadingItem = ''
        context.dispatch('getCart')
      })
    }
  },
  // 操作資料狀態，非同步行為不要在這邊執行，會導致 state 和 mutation 資料狀態不同步，除錯可能會有困難
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    CART (state, payload) {
      state.cart = payload
    }
  },
  // 取代 computed
  getters: {
    isLoading: state => state.isLoading,
    cart: state => state.cart
  }
})
