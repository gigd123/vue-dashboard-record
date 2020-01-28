<template>
  <div class="row pt-5 pl-3 pr-3">
    <!-- <div id="carouselExampleControls" class="carousel slide pt-3 h-75" data-ride="carousel">
      <div class="carousel-inner h-75">
        <div class="carousel-item active">
          <img src="../../../assets/images/climbing1.jpg" class="d-block w-100" alt="">
        </div>
        <div class="carousel-item">
          <img src="../../../assets/images/climbing1.jpg" class="d-block w-100" alt="">
        </div>
        <div class="carousel-item">
          <img src="../../../assets/images/climbing1.jpg" class="d-block w-100" alt="">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div> -->
    <ProductList v-if="!!curProductPage && curProductPage.length > 0"
      :products="curProductPage"
      :loadingItem="loadingItem"
      @getProductDetail="getProductDetail"
      @addToCart="addToCart" />
    <NoResults v-else />
    <div class="col-12">
      <Pagination v-if="searchProducts.length > 0"
        :pagination="pages"
        @switchPagination="searchProducts"
        :products="searchProducts"/>
    </div>
  </div>

</template>

<script>
import Pagination from '../../common/Pagination'
import ProductList from '../../common/ProductList.vue'
import NoResults from '../../common/NoResults.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Pagination,
    ProductList,
    NoResults
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    ...mapGetters({
      loadingItem: 'loadingItem',
      searchProducts: 'productsModule/searchProducts',
      product: 'productsModule/product',
      curProductPage: 'paginationModule/getCurProductPage'
    }),
    pages () {
      let pages = Math.ceil(this.searchProducts.length / 9)
      return pages
    }
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
