<template>
  <div class="row">
    <Sidebar />
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4 mt-4">
      <ProductList v-if="filterProducts.length > 0" :products="filterProducts" :loadingItem="loadingItem" @getProductDetail="getProductDetail" @addToCart="addToCart" />
      <NoResults v-else />
      <ProductModal :product="product" />
      <Pagination v-if="filterProducts.length > 0" :pagination="pagination" @switchPagination="getClientAllProducts"/>
    </main>
  </div>

</template>

<script>
import Sidebar from './Sidebar'
import Pagination from '../../common/Pagination'
import ProductModal from '../../common/ProductModal'
import ProductList from '../../common/ProductList.vue'
import NoResults from '../../common/NoResults.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Sidebar,
    Pagination,
    ProductModal,
    ProductList,
    NoResults
  },
  data () {
    return {
      pagination: {}
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    ...mapGetters({
      loadingItem: 'loadingItem',
      products: 'productsModule/products',
      filterProducts: 'productsModule/filterProducts',
      product: 'productsModule/product'
    })
  },
  methods: {
    ...mapActions('productsModule', ['getClientAllProducts']),
    getProduct (id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`
      const vm = this
      this.$store.commit('LOADINGITEM', id)
      this.$http.get(api).then((response) => {
        response.data.product.num = 1
        vm.product = response.data.product
        this.$store.commit('LOADINGITEM', '')
      })
    },
    getProductDetail (productId) {
      const vm = this
      vm.$store.dispatch('productsModule/getProduct', productId)
      vm.$router.push({path: `/FrontDashboard/ProductDetail/${productId}`})
    },
    addToCart (id, qty = 1) {
      this.$store.dispatch('cartModule/addToCart', {id, qty})
    },
    getCart () {
      this.$store.dispatch('cartModule/getCart')
    }
  },
  created () {
    this.getClientAllProducts()
    this.getCart()
  }
}
</script>
