<template>
  <div class="row row--small">
    <div id="carouselExampleControls" class="carousel--size slide pt-3 w-100" data-ride="carousel">
      <div class="carousel-inner carousel-inne--size h-100">
        <div class="carousel-item active carousel--image slide1 h-100 "></div>
        <div class="carousel-item carousel--image slide2 h-100 "></div>
        <div class="carousel-item carousel--image slide3 h-100 "></div>
        <div class="carousel-item carousel--image slide4 h-100 "></div>
      </div>
      <!-- <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a> -->
    </div>
    <ProductList v-if="!!curProductPage && curProductPage.length > 0"
      :products="curProductPage"
      :loadingItem="loadingItem"
      @getProductDetail="getProductDetail" />
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
    getProductDetail (productId) {
      const vm = this
      vm.$store.dispatch('productsModule/getProduct', productId)
      vm.$router.push(`/FrontDashboard/ProductDetail/${productId}`)
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

<style lang="scss">
  .row {
    &--small {
      padding: 3rem 5rem 0 5rem;
    }
    .carousel {
      &--size {
        height: 450px;
        max-width: 1200px;
        margin: 0 auto;
      }
      &--image {
        background-size: cover;
        background-position: center;
      }
    }
    .slide1 {
      background-image: url(../../../assets/images/carousel1.jpg);
    }
    .slide2 {
      background-image: url(../../../assets/images/carousel2.jpg);
    }
    .slide3 {
      background-image: url(../../../assets/images/carousel3.jpg);
    }
    .slide4 {
      background-image: url(../../../assets/images/carousel4.jpg);
    }
  }
</style>
