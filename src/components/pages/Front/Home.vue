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
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text">{{item.content}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <del class="h6" v-if="!item.origin_price">{{item.origin_price}}</del>
              <del class="h6" v-if="item.origin_price">{{item.origin_price}}</del>
              <div class="h5" v-if="item.price">{{item.price}}</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
              @click="addToCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <Pagination :pagination="pagination" @switchPagination="getProducts"/>
  </div>

</template>

<script>
import $ from 'jquery'
import Pagination from '../../common/Pagination'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Pagination
  },
  data () {
    return {
      pagination: {},
      product: {},
      categories: [],
      searchText: '',
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
    filterData () {
      const vm = this
      if (vm.searchText) {
        return vm.products.filter((item) => {
          const data = item.title.toLowerCase().includes(vm.searchText.toLowerCase())
          return data
        })
      }
      return this.products
    },
    ...mapGetters('productsModule', ['products'])
  },
  methods: {
    ...mapActions('productsModule', ['getProducts']),
    getProduct (id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`
      const vm = this
      vm.status.loadingItem = id
      this.$http.get(api).then((response) => {
        response.data.product.num = 1
        vm.product = response.data.product
        $('#productModal').modal('show')
        vm.status.loadingItem = ''
      })
    },
    addToCart (id, qty = 1) {
      this.$store.dispatch('addToCart', {id, qty})
      // 待修正---------確認加入成功才關閉 modal
      $('#productModal').modal('hide')
    },
    getCart () {
      this.$store.dispatch('getCart')
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
    },
    getUnique () {
      const vm = this
      vm.products.forEach((item) => {
        vm.categories.push(item.category)
      })
      console.log('categories====', vm.categories)
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
