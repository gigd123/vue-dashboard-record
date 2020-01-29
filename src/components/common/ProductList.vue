<template>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div class="d-flex justify-content-center">
            <img class="productImage" :src="item.imageUrl" alt="">
          </div>
          <div class="card-body">
            <!-- <span class="badge badge-secondary float-right ml-2">{{item.category}}</span> -->
            <h6 class="card-title text-truncate">
              <a class="text-dark stretched-link" href="" @click="getProductDetail(item.id)">
                {{item.title}}
              </a>
            </h6>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <del class="h6" v-if="!item.origin_price">原價{{item.origin_price}}元</del> -->
              <del class="h6" v-if="item.origin_price && item.origin_price !== item.price">原價{{item.origin_price}}元</del>
              <div class="h5 float-right" v-if="item.price">{{item.price}}元</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProductList',
  props: ['products', 'loadingItem'],
  methods: {
    getProductDetail (id) {
      this.$emit('getProductDetail', id)
    },
    addToCart (id) {
      this.$emit('addToCart', id)
    }
  },
  computed: {
    ...mapGetters({
      searchSubCat: 'productsModule/searchSubCat'
    })
  }
}
</script>

<style>
  a {
    text-decoration:none;
  }
  .productImage {
    width: 160px;
    height: 160px;
  }
</style>
