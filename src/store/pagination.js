export default {
  namespaced: true,
  state: {
    curPage: 0,
    getCurProductPage: []
  },
  mutations: {
    GET_PAGE (state, payload) {
      console.log(payload)
      let showProducts = Array.from({ length: Math.ceil(payload.products.length / 9) }, (v, i) =>
        payload.products.slice(i * 9, i * 9 + 9)
      )
      console.log('showProducts===', showProducts)
      state.curPage = payload.page
      state.getCurProductPage = showProducts[payload.page - 1]
      console.log('state.getCurProductPage===', state.getCurProductPage)
    }
  },
  getters: {
    curPage: state => state.curPage,
    getCurProductPage: state => state.getCurProductPage
  }
}
