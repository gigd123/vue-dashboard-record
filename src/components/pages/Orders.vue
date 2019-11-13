<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4 text-left">
        <thead>
          <tr>
            <th width="150">購買時間</th>
            <th>Email</th>
            <th width="150">購買款項</th>
            <th width="120">應付金額</th>
            <th width="120">是否付款</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.create_at | date }}</td>
            <td>{{ order.user.email }}</td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(order_product, i) in order.products" :key="i">
                  {{order_product.product.title}}:{{order_product.qty}}
                  {{order_product.product.unit}}
                </li>
              </ul>
            </td>
            <td class="text-right">
              {{ order.total | currency }}
            </td>
            <td>
              <strong class="text-success" v-if="order.is_paid">已付款</strong>
              <span class="text-muted" v-else>尚未付款</span>
            </td>
          </tr>
        </tbody>
    </table>
    <Pagination :pagination="pagination" @switchPagination="getOrders"/>
  </div>
</template>
<script>
import Pagination from '../Pagination'

export default {
  components: {
    Pagination
  },
  data () {
    return {
      orders: [],
      pagination: {},
      isLoading: false
    }
  },
  methods: {
    getOrders (page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        vm.isLoading = false
        vm.orders = response.data.orders
        vm.pagination = response.data.pagination
        console.log('json.response=====', response)
      })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
