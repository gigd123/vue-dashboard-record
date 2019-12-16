import axios from 'axios'

export default {
  strict: true,
  namespaced: true,
  state: {
    cart: {},
    cartsLen: 0
  },
  actions: {
    getCart (context) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      context.commit('LOADING', true, {root: true})
      axios.get(api).then((response) => {
        context.commit('CART', response.data.data)
        context.commit('CART_LEN', response.data.data.carts.length)
        context.commit('LOADING', false, {root: true})
      })
    },
    removeCartItem (context, id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
      context.commit('LOADING', true, {root: true})
      axios.delete(api).then((response) => {
        context.dispatch('getCart')
        context.commit('LOADING', false, {root: true})
      })
    },
    // 在傳參數進入 action 時候，一次只能傳入一個參數 (context, id, qty = 1)， qty 會變成 undefined
    addToCart (context, {id, qty}) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      context.commit('LOADINGITEM', id, {root: true})
      axios.post(api, {data: cart}).then((response) => {
        console.log('response====', response)
        context.commit('LOADINGITEM', '', {root: true})
        context.dispatch('getCart')
      })
    }
  },
  mutations: {
    CART (state, payload) {
      state.cart = payload
    },
    CART_LEN (state, payload) {
      state.cartsLen = payload
    }
  },
  getters: {
    cart: state => state.cart,
    cartsLen: state => state.cartsLen
  }
}
