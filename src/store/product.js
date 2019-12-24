import axios from 'axios'

export default {
  strict: true,
  // state 屬於模組區域變數
  // actions, mutations, getters 預設是屬於全域變數
  // 若是設定 namespaced 為 true，則會將 actions, mutations, getters 轉為區域變數
  namespaced: true,
  state: {
    products: [],
    product: {},
    productId: '',
    categories: [],
    searchText: '',
    searchCategory: '',
    filterProducts: []
  },
  // 操作行為，如ajax，但是不用於操作資料狀態
  actions: {
    getAllProducts (context, page) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`
      // 由於 LOADING 是屬於 global，必須加上 {root: true} 判斷為 global
      console.log('get products~~~!')
      context.commit('LOADING', true, {root: true})
      // 由於這邊的 this 不是指向原本 vue 的元件，無法使用 this 直接去使用 $http中的 方法，必須另行導入 axios
      // this.$http.get(api).then((response) => {
      axios.get(api).then((response) => {
        console.log('response=====', response)
        context.commit('PRODUCTS', response.data.products)
        context.commit('CATEGORIES', response.data.products)
        // vm.pagination = response.data.pagination
        context.commit('LOADING', false, {root: true})
      })
    },
    // get all client products
    getClientAllProducts (context) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`
      context.commit('LOADING', true, {root: true})
      // 由於這邊的 this 不是指向原本 vue 的元件，無法使用 this 直接去使用 $http中的 方法，必須另行導入 axios
      // this.$http.get(api).then((response) => {
      axios.get(api).then((response) => {
        response.data.products.forEach((item) => {
          let newCategory = item.category.split('/')
          item.category = newCategory
        })
        context.commit('PRODUCTS', response.data.products)
        context.commit('CATEGORIES', response.data.products)
        // vm.pagination = response.data.pagination
        context.commit('LOADING', false, {root: true})
      })
    },
    getProduct (context, id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`
      // this.$store.commit('LOADINGITEM', id)
      axios.get(api).then((response) => {
        response.data.product.num = 1
        context.commit('PRODUCT', response.data.product)
        // this.$store.commit('LOADINGITEM', '')
      })
    }
  },
  // 操作資料狀態，非同步行為不要在這邊執行，會導致 state 和 mutation 資料狀態不同步，除錯可能會有困難
  mutations: {
    PRODUCTS (state, payload) {
      state.products = payload
    },
    PRODUCT (state, payload) {
      state.product = payload
    },
    PRODUCT_ID (state, payload) {
      state.productId = payload
    },
    CATEGORIES (state, payload) {
      console.log('payload===', payload)
      payload.forEach((item) => {
        state.categories.push(item.category)
      })
    },
    SEARCH_TEXT (state, payload) {
      state.searchText = payload
    },
    SEARCH_CATEGORY (state, payload) {
      state.searchCategory = payload
    }
  },
  // 取代 computed
  getters: {
    products: state => state.products,
    product: state => state.product,
    productId: state => state.productId,
    categories: state => state.categories,
    filterProducts: (state) => {
      if (state.products) {
        return state.products.filter((item) => {
          if (item.category.indexOf(state.searchText) !== -1) {
            const data = item
            return data
          }
        })
      }
      return this.products
    }
  }
}
