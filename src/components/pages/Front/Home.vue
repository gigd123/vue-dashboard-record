<template>
  <div>
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
    <ProductList />
    <ProductModal :product="product" />
    <Pagination :pagination="pagination" @switchPagination="getClientAllProducts"/>
  </div>

</template>

<script>
import $ from 'jquery'
import Pagination from '../../common/Pagination'
import ProductModal from '../../common/ProductModal'
import ProductList from '../../common/ProductList.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Pagination,
    ProductModal,
    ProductList
  },
  data () {
    return {
      pagination: {},
      product: {},
      categories: [],
      status: {
        loadingItem: ''
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      isLoading: false,
      coupon_code: ''
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    ...mapGetters({
      loadingItem: 'loadingItem',
      products: 'productsModule/products',
      filterProducts: 'productsModule/filterProducts'
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
        $('#productModal').modal('show')
        this.$store.commit('LOADINGITEM', '')
      })
    },
    getProductDetail (productId) {
      const vm = this
      vm.$store.dispatch('productsModule/getProduct', productId)
      vm.$router.push({path: `/FrontDashboard/ProductDetail/${productId}`})
    },
    addToCart (id, qty = 1) {
      this.$store.dispatch('addToCart', {id, qty})
      // 待修正---------確認加入成功才關閉 modal
      $('#productModal').modal('hide')
    },
    getCart () {
      this.$store.dispatch('cartModule/getCart')
    },
    removeCartItem (id) {
      this.$store.dispatch('removeCartItem', id)
    },
    addCouponCode () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`
      const vm = this
      const coupon = {
        code: vm.coupon_code
      }
      vm.isLoading = true
      this.$http.post(api, {data: coupon}).then((response) => {
        console.log('response====', response)
        vm.getCart()
        vm.isLoading = false
      })
    },
    createOrder () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`
      const vm = this
      const order = vm.form
      // vm.isLoading = true
      this.$validator.validate().then((result) => {
        console.log('result====', result)
        if (result) {
          // do stuff if not valid
          this.$http.post(api, {data: order}).then((response) => {
            console.log('訂單已建立====', response)
            if (response.data.success) {
              vm.$router.push(`/customer_checkout/${response.data.orderId}`)
            }
            vm.isLoading = false
          })
        } else {
          console.log('欄位不完整')
        }
      })
    }
    // getUnique () {
    //   const vm = this
    //   vm.products.forEach((item) => {
    //     vm.categories.push(item.category)
    //   })
    //   console.log('categories====', vm.categories)
    // }
  },
  created () {
    this.getClientAllProducts()
    this.getCart()
  }
}
</script>
