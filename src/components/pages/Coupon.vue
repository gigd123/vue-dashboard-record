<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary"
        @click="openModal(true)">
        建立新的優惠券</button>
      <table class="table mt-4 text-left">
        <thead>
          <tr>
            <th width="120">分類</th>
            <th>產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="80">是否啟用</th>
            <th width="130">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(coupon, i) in coupons" :key="i">
            <td>{{ coupon.category }}</td>
            <td>{{ coupon.title }}</td>
            <td class="text-right">
              {{ coupon.origin_price | currency }}
            </td>
            <td class="text-right">
              {{ coupon.price | currency }}
            </td>
            <td>
              <span v-if="coupon.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, coupon)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="openModalDelete(coupon)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="modal fade text-left" id="CouponModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg w-25" role="document">
          <div class="modal-content border-0">
            <div class="modal-header text-dark">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>新增優惠券</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="title">標題</label>
                <input type="text" class="form-control" id="title"
                  placeholder="請輸入標題">
              </div>

              <div class="form-row">
                  <label for="category">優惠碼</label>
                  <input type="text" class="form-control" id="category"
                    placeholder="請輸入分類">
              </div>

              <div class="form-row">
                <label for="due_date">到期日</label>
              <input type="date" class="form-control" id="due_date"
                v-model="due_date">
              </div>

              <div class="form-row">
                <label for="origin_price">折扣百分比</label>
                  <input type="number" class="form-control" id="origin_price"
                    placeholder="請輸入原價">
              </div>
              <hr>

              <div class="form-group">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox"
                    id="is_enabled">
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary">確認</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      coupons: [],
      isLoading: false
    }
  },
  methods: {
    getCoupon (page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`
      const vm = this
      this.$http.get(api).then((response) => {
        console.log('json.response=====', response)
        vm.coupons = response.data.coupons
        // vm.pagination = response.data.pagination
      })
    },
    addCoupon () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`
      const vm = this
      this.$http.post(api).then((response) => {
        console.log('json.response=====', response)
        vm.coupons = response.data.coupons
        // vm.pagination = response.data.pagination
      })
    },
    openModal (isNew, item) {
      // if (isNew) {
      //   this.tempProduct = {}
      //   this.isNew = true
      // } else {
      //   this.tempProduct = {...item}
      //   this.isNew = false
      // }
      $('#CouponModal').modal('show')
    }
  },
  created () {
    this.getCoupon()
  }
}
</script>
