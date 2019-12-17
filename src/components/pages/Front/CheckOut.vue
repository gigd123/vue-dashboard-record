<template>
  <div>
    <div class="my-5 row justify-content-center" v-if="step === 1 && cart.carts">
      <div class="my-5 row justify-content-center w-75">
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
        <!-- <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
              套用優惠碼
            </button>
          </div>
        </div> -->
        <div class="col"><button @click="step = 2">下一步</button></div>
      </div>
    </div>
    <div class="my-5 row justify-content-center" v-if="step === 2">
      <form class="col-md-6" @submit.prevent="createOrder">
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
    </div>
    <div class="my-5 row justify-content-center" v-if="step === 3">
      step33333
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
      }
    }
  },
  computed: {
    ...mapGetters('cartModule', ['cart'])
  },
  methods: {
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
            if (response.data.success) {
              vm.step = 3
            }
            this.$store.commit('LOADINGITEM', false)
          })
        } else {
          console.log('欄位不完整')
        }
      })
    }
  }
}
</script>
