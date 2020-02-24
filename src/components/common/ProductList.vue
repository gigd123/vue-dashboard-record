<template>
  <div class="container-fluid">
    <div class="row mt-4">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" v-for="item in products" :key="item.id">
        <div class="product col-12 col-lg-10 card border-4 m-auto shadow-sm">
          <div class="d-flex justify-content-center">
            <div class="productCard" :style="{backgroundImage: `url(${item.imageUrl})`, backgroundSize: 'cover'}"></div>
            <!-- <img class="productImage" :src="item.imageUrl" alt=""> -->
          </div>
          <div class="card-body">
            <div class="card-title card-title--size mb-4">
              <a class="text-dark stretched-link" href="#" @click.prevent="getProductDetail(item.id)">
                {{item.title}}
              </a>
            </div>
            <div class="card__price--size">
              <!-- <del class="h6" v-if="!item.origin_price">原價{{item.origin_price}}元</del> -->
              <del v-if="item.origin_price && item.origin_price !== item.price">原價{{item.origin_price}}元</del>
              <div v-if="item.price">現價{{item.price}}元</div>
            </div>
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
    width: 230px;
    height: 230px;
  }
  .card-title--size {
    height: 60px;
  }
  .card__price--size {
    height: 40px;
  }
</style>
