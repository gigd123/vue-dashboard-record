<template>
  <div class="card mb-3 p-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="product.imageUrl" class="card-img" alt="">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <div class="d-flex">
            <h2 class="card-title col-8">{{product.title}}</h2>
            <div class="col">
              <div class="col">原價：<span>{{ product.origin_price }}</span></div>
              <div class="col">現價：<span>{{ product.price }}</span></div>
            </div>
          </div>
          <div class="p-2"><h5>數量</h5><input type="text"></div>
          <div class="p-2"><button type="button" class="btn btn-danger">加入購物車</button></div>
        </div>
      </div>
    </div>
    <div class="row no-gutters">
      <h3>產品描述</h3>
      <p class="card-text">{{ product.description }}</p>
      <h3>內容說明</h3>
      <p class="card-text">{{ product.content }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('productsModule', ['product'])
  }
}
</script>
