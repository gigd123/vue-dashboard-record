export default {
  namespaced: true,
  state: {
    curPage: 0,
    getCurProductPage: []
  },
  mutations: {
    GET_PAGE (state, payload) {
      let showProducts = Array.from({ length: Math.ceil(payload.products.length / 12) }, (v, i) =>
        payload.products.slice(i * 12, i * 12 + 12)
      )
      state.curPage = payload.page
      state.getCurProductPage = showProducts[payload.page - 1]
    }
  },
  getters: {
    curPage: state => state.curPage,
    getCurProductPage: state => state.getCurProductPage
  }
}
