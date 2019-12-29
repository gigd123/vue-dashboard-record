<template>
  <div class="row">
    <Sidebar />
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4 mt-4">
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
          <div class="p-2 d-flex">
            <h5>數量</h5>
            <a class="changeNum text-center" href="#" @click.prevent="addProductNum(-1)">
              <i class="fas fa-minus"></i>
            </a>
            <input class="productNum text-center" type="text" v-model="productNum">
            <a class="changeNum text-center" href="#" @click.prevent="addProductNum(1)">
              <i class="fas fa-plus"></i>
            </a>
          </div>
          <div class="p-2">
            <button type="button" class="btn btn-danger"
            @click="addToCart(product.id, productNum)">加入購物車</button>
            </div>
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
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Sidebar from './Sidebar'

export default {
  components: {
    Sidebar
  },
  data () {
    return {
      productNum: 1
    }
  },
  computed: {
    ...mapGetters('productsModule', ['product', 'productId'])
  },
  methods: {
    addToCart (id, qty) {
      this.$store.dispatch('cartModule/addToCart', {id, qty})
    },
    addProductNum (num) {
      this.productNum = this.productNum + num
    }
  },
  created () {
    const strUrl = window.location.href
    const urlArr = strUrl.split('/')
    console.log('this===', urlArr)
    this.$store.dispatch('productsModule/getProduct', urlArr[urlArr.length - 1])
  }
}
</script>

<style>
  .productNum {
    width: 30px;
    height: 30px;
  }
  .changeNum {
    display: inline-block;
    height: 30px;
    width: 30px;
    cursor: pointer;
  }
</style>
