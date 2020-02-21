<template>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="product w-75 card border-4 m-auto shadow-sm">
          <div class="d-flex justify-content-center">
            <div class="productCard" style="{backgroundImage: `url(${item.imageUrl})`}"></div>
            <!-- <img class="productImage" :src="item.imageUrl" alt=""> -->
          </div>
          <div class="card-body">
            <h6 class="card-title text-truncate">
              <a class="text-dark stretched-link" href="#" @click.prevent="getProductDetail(item.id)">
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
  .product:hover {
    transition: all 1s;
    box-shadow: 0px 0px 20px 1px rgb(40, 119, 238) !important;
  }
  .productImage {
    width: 160px;
    height: 160px;
  }
  .productCard {
    width: 160px;
    height: 160px;
  }
</style>
