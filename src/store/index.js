import Vue from 'vue'
import Vuex from 'vuex'
import productsModule from './product'
import cartModule from './cart'
import paginationModule from './pagination'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict 嚴謹模式，如果語法不符合 vue 規範就會有警告
  strict: true,
  state: {
    isLoading: false,
    loadingItem: '',
    menuToggle: false
  },
  // 操作行為，如ajax，但是不用於操作資料狀態
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
    updateLoadingItem (context, status) {
      context.commit('LOADINGITEM', status)
    }
  },
  // 操作資料狀態，非同步行為不要在這邊執行，會導致 state 和 mutation 資料狀態不同步，除錯可能會有困難
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    LOADINGITEM (state, payload) {
      state.loadingItem = payload
    },
    MENU_TOGGLE (state, payload) {
      state.menuToggle = payload
    }
  },
  // 取代 computed
  getters: {
    isLoading: state => state.isLoading,
    loadingItem: state => state.loadingItem,
    menuToggle: state => state.menuToggle
  },
  modules: {
    productsModule,
    cartModule,
    paginationModule
  }
})
