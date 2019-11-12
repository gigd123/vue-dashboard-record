<template>
  <div>
    <loading :active.sync="isLoading"></loading>
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
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary"
              @click="addToCart(product.id, product.num)">
              <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <hr class="pt-3 pb-3">
    <div class="my-5 row justify-content-center" v-if="cart.carts">
      <div class="my-5 row justify-content-center">
        <table class="table">
          <thead>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm"
                  @click="removeCartItem(item.id)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td class="align-middle">
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">
                  已套用優惠券
                </div>
              </td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{ cart.total }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ cart.final_total }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
              套用優惠碼
            </button>
          </div>
        </div>
      </div>
      <div class="my-5 row justify-content-center">
        <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form" @submit.prevent="submit">
          <ValidationProvider
            name="Email"
            rules="required|email"
            v-slot="{ valid, errors }"
            ref="emailField"
          >
            <input class="textField" v-model="user.email" type="text" placeholder="請輸入 Email..." />
            <span class="errorText">{‌{ errors[0] }}</span>
          </ValidationProvider>
          <br />
          <div class="label">密碼</div>
          <ValidationProvider name="密碼" rules="required|min:3" v-slot="{ errors }">
            <input class="textField" v-model="user.pw" type="password" placeholder="請輸入密碼..." />
            <span class="errorText">{‌{ errors[0] }}</span>
          </ValidationProvider>
          <br />
          <div class="label">確認密碼</div>
          <ValidationProvider name="確認密碼" rules="required|min:3|confirmed:密碼" v-slot="{ errors }">
            <input class="textField" type="password" v-model="user.pwConfirm" placeholder="再輸入一次密碼..." />
            <span class="errorText">{‌{ errors[0] }}</span>
          </ValidationProvider>

          <!-- button 的 invalid 樣式是綁定 ValidationObserver 的 v-slot="{invalid}" -->
          <button class="submitBtn" :class="{button__unactive:invalid}" :disabled="invalid">Submit</button>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      products: [],
      product: {},
      cart: {},
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
  methods: {
    getProducts () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        vm.products = response.data.products
        vm.isLoading = false
      })
    },
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
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      const vm = this
      const cart = {
        product_id: id,
        qty
      }
      vm.status.loadingItem = id
      this.$http.post(api, {data: cart}).then((response) => {
        console.log('response~~~~~~', response)
        vm.status.loadingItem = ''
        $('#productModal').modal('hide')
        this.getCart()
      })
    },
    getCart () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      const vm = this
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data
      })
    },
    removeCartItem (id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
      const vm = this
      vm.isLoading = true
      this.$http.delete(api).then((response) => {
        vm.getCart()
        vm.isLoading = false
      })
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
      vm.isLoading = true
      this.$http.post(api, {data: order}).then((response) => {
        console.log('訂單已建立====', response)
        vm.isLoading = false
      })
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
