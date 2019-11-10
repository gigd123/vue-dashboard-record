<template>
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
          <tr v-for="item in products" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="text-right">
              {{ item.origin_price | currency }}
            </td>
            <td class="text-right">
              {{ item.price | currency }}
            </td>
            <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
          </tr>
        </tbody>
    </table>
</template>
<script>
export default {
  data () {}
}
</script>
