<template>
  <div class="pt-5">
    <ul class="checkStep row pt-5 m-auto justify-content-center">
      <li class="step">
        <div class="step_circle m-auto border border-primary rounded-circle"
        :class="{'bg-primary': step === 1, 'text-white':  step === 1}">1</div>
        <p>確認購物清單</p>
      </li>
      <li class="step">
        <div class="step_circle m-auto border border-primary rounded-circle"
        :class="{'bg-primary': step === 2, 'text-white':  step === 2}">2</div>
        <p>填寫資料</p>
      </li>
      <li class="step">
        <div class="step_circle m-auto border border-primary rounded-circle"
        :class="{'bg-primary': step === 3, 'text-white':  step === 3}">3</div>
        <p>金流付款</p>
      </li>
    </ul>
    <div class="row justify-content-center" v-if="step === 1 && cart.carts">
      <div class="my-5 row justify-content-center w-75 pb-2">
        <table class="table">
          <thead>
            <th>商品資訊</th>
            <th>數量</th>
            <th>單價</th>
            <th>刪除</th>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="align-middle">
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">
                  已套用優惠券
                </div>
              </td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total }}</td>
              <td class="align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm"
                  @click="removeCartItem(item.id)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
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
        <div class="col"><button @click="step = 2">下一步</button></div>
      </div>
    </div>
    <div class="row justify-content-center" v-if="step === 2">
      <form class="col-md-6 pb-2" @submit.prevent="createOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input type="email" class="form-control" name="email" id="useremail"
            v-validate="'required|email'"
            required
            v-model="form.user.email" placeholder="請輸入 Email">
          <span class="text-danger" v-if="errors.has('email')">
            {{errors.first('email')}}
          </span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input type="text" class="form-control" name="name" id="username"
            :class="{'is-invalid':errors.has('name')}"
            v-model="form.user.name" v-validate="'required'" placeholder="輸入姓名">
          <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input type="tel" class="form-control" name="tel" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
          <span class="text-danger" v-if="errors.has('tel')">電話必須輸入</span>
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
            v-validate="'required'"
            placeholder="請輸入地址">
          <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
      <div class="col-12 d-flex">
        <div class="col-6 d-flex justify-content-center"><button @click="step = 1">上一步</button></div>
      </div>
    </div>
    <div class="row justify-content-center" v-if="step === 3">
      <form class="col-md-6" @submit.prevent="payOrder">
        <table class="table">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">總計</td>
              <td class="text-right">{{ order.total }}</td>
            </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
            <tr>
              <th width="100">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right" v-if="order.is_paid === false">
          <button class="btn btn-danger">確認付款去</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      step: 1,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      order: {
        user: {}
      },
      orderId: '',
      coupon_code: ''
    }
  },
  computed: {
    ...mapGetters({
      cart: 'cartModule/cart',
      product: 'productsModule/product'
    })
  },
  methods: {
    ...mapActions('cartModule', ['getCart']),
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
            this.orderId = response.data.orderId
            if (response.data.success) {
              vm.step = 3
            }
            this.$store.commit('LOADINGITEM', false)
            this.getOrder()
          })
        } else {
          console.log('欄位不完整')
        }
      })
    },
    getOrder () {
      console.log('getOrder')
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        vm.order = response.data.order
        console.log('get order response====', response)
        vm.isLoading = false
      })
    },
    payOrder () {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`
      vm.isLoading = true
      this.$http.post(api).then((response) => {
        console.log('pay order response====', response)
        if (response.data.success) {
          vm.getOrder()
        }
        vm.isLoading = false
      })
    },
    addCouponCode () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`
      const vm = this
      const coupon = {
        code: vm.coupon_code
      }
      this.$http.post(api, {data: coupon}).then((response) => {
        console.log('response====', response)
        this.$store.dispatch('cartModule/getCart')
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang="scss">
@import "./../../../assets/all.scss";
  .checkStep {
    max-width: 1200px;
    list-style: none;
    .step {
      width: 250px;
      height: 100px;
      line-height: 50px;
      text-align: center;
      .step_circle {
        width: 50px;
        height: 50px;
        line-height: 50px;
      }
    }
  }
</style>
