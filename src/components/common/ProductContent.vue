<template>
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img :src="product.imageUrl" class="img-fluid" alt="">
          <blockquote class="blockquote mt-3">
            <p class="mb-0">{{ product.content }}</p>
            <footer class="blockquote-footer text-right">{{ product.description }}</footer>
          </blockquote>
          <div class="d-flex justify-content-between align-items-baseline">
            <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
            <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
            <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
          </div>
          <select name="" class="form-control mt-3" v-model="product.num">
            <option :value="num" v-for="num in 10" :key="num">
              選購 {{num}} {{product.unit}}
            </option>
          </select>
        </div>
        <div class="modal-footer">
          <div class="text-muted text-nowrap mr-3">
            小計 <strong>{{ product.num * product.price }}</strong> 元
          </div>
          <button type="button" class="btn btn-primary"
            @click="addToCart(product.id, product.num)">
            <i class="fas fa-spinner fa-spin" v-if="product.id === loadingItem"></i>
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
  props: ['product'],
  computed: {
    ...mapGetters(['loadingItem'])
  },
  methods: {
    addToCart (id, qty) {
      this.$store.dispatch('addToCart', {id, qty})
    }
  }
}
</script>
