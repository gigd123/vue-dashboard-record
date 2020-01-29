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
          <div class="d-block">
            <h5 class="card-title col-8">{{product.title}}</h5>
            <div class="col">
              <h5 class="col">原價：<span>{{ product.origin_price }}</span></h5>
              <h5 class="col">現價：<span>{{ product.price }}</span></h5>
            </div>
          </div>
          <div class="p-2">
            <ul class="productSize d-flex justify-content-between text-center p-0 text-secondary"
            v-if="product.category.indexOf(('tops' || 'pants' || 'jackets' || 'swimwear')) !== -1">
              <li class="border border-secondary"
              @click.prevent="productSize = 'S'"
              :class="{'border-primary bg-primary': productSize === 'S'}">
                <a href="#" :class="{'text-white': productSize === 'S'}">S</a>
              </li>
              <li class="border border-secondary"
              @click.prevent="productSize = 'M'"
              :class="{'border-primary bg-primary': productSize === 'M'}">
                <a href="#" :class="{'text-white': productSize === 'M'}">M</a>
              </li>
              <li class="border border-secondary"
              @click.prevent="productSize = 'L'"
              :class="{'border-primary bg-primary': productSize === 'L'}">
                <a href="#" :class="{'text-white': productSize === 'L'}">L</a>
              </li>
              <li class="border border-secondary"
              @click.prevent="productSize = 'XL'"
              :class="{'border-primary bg-primary': productSize === 'XL'}">
                <a href="#" :class="{'text-white': productSize === 'XL'}">XL</a>
              </li>
              <li class="border border-secondary"
              @click.prevent="productSize = 'XXL'"
              :class="{'border-primary bg-primary': productSize === 'XXL'}">
                <a href="#" :class="{'text-white': productSize === 'XXL'}">XXL</a>
              </li>
            </ul>
            <ul class="productSize d-flex justify-content-between text-center p-0 text-secondary"
            v-if="product.category.indexOf('shoes') !== -1">
              <li class="border border-secondary"
              @click.prevent="productSize = '36-37'"
              :class="{'border-primary bg-primary': productSize === '36-37'}">
                <a href="#" :class="{'text-white': productSize === '36-37'}">36-37</a>
              </li>
              <li class="border border-secondary"
              @click.prevent="productSize = '38-39'"
              :class="{'border-primary bg-primary': productSize === '38-39'}">
                <a href="#" :class="{'text-white': productSize === '38-39'}">38-39</a>
              </li>
              <li class="border border-secondary"
              @click.prevent="productSize = '40-41'"
              :class="{'border-primary bg-primary': productSize === '40-41'}">
                <a href="#" :class="{'text-white': productSize === '40-41'}">40-41</a>
              </li>
              <li class="border border-secondary"
              @click.prevent="productSize = '42-43'"
              :class="{'border-primary bg-primary': productSize === '42-43'}">
                <a href="#" :class="{'text-white': productSize === '42-43'}">42-43</a>
              </li>
              <li class="border border-secondary"
              @click.prevent="productSize = '44-45'"
              :class="{'border-primary bg-primary': productSize === '44-45'}">
                <a href="#" :class="{'text-white': productSize === '44-45'}">44-45</a>
              </li>
              <li class="border border-secondary"
              @click.prevent="productSize = '46-47'"
              :class="{'border-primary bg-primary': productSize === '46-47'}">
                <a href="#" :class="{'text-white': productSize === '46-47'}">46-47</a>
              </li>
            </ul>
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
            :disabled="!!isLoading"
            @click="addToCart(product.id, productNum, productSize)">加入購物車</button>
            </div>
        </div>
      </div>
    </div>
    <div class="row no-gutters d-block">
      <h3>產品描述</h3>
      <p class="card-text">{{ product.description }}</p>
    </div>
  </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Sidebar from './Sidebar'

export default {
  components: {
    Sidebar
  },
  data () {
    return {
      productSize: 'S',
      productNum: 1
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      product: 'productsModule/product',
      productId: 'productsModule/productId',
      categories: 'productsModule/categories'
    })
  },
  methods: {
    ...mapActions('cartModule', ['getCart']),
    addToCart (id, qty, size) {
      this.$store.dispatch('cartModule/addToCart', {id, qty, size})
      this.productNum = 1
    },
    addProductNum (num) {
      this.productNum = this.productNum + num
    }
  },
  created () {
    console.log('1')
    const strUrl = window.location.href
    const urlArr = strUrl.split('/')
    this.$store.dispatch('productsModule/getProduct', urlArr[urlArr.length - 1])
    this.getCart()
    console.log('2')
  }
}
</script>

<style lang="scss">
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
  .productSize {
    width: 350px;
    list-style: none;
    li {
      cursor: pointer;
      width: 50px;
      height: 26px;
      line-height: 26px;
      font-size: 14px;
      a {
        text-decoration: none;
      }
    }
  }
</style>
