<template>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in filterProducts" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text">{{item.content}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <del class="h6" v-if="!item.origin_price">{{item.origin_price}}</del>
              <del class="h6" v-if="item.origin_price">{{item.origin_price}}</del>
              <div class="h5" v-if="item.price">{{item.price}}</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm"
              @click="getProductDetail(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="loadingItem === item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
              @click="addToCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'ProductList',
    props: ['productList'],
    computed: {
      ...mapGetters({
        loadingItem: 'loadingItem',
        products: 'productsModule/products',
        filterProducts: 'productsModule/filterProducts'
      })
    }
}
</script>