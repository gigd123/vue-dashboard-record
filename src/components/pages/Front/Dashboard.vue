<template>
  <div>
    <Navbar />
      <div class="cart dropdown cart__mobile position-fixed ml-2 d-block d-sm-none">
        <a class="btn btn-primary dropdown-toggle position-relative" href="#" @click.prevent="cartMenu = !cartMenu">
          <i class="fas fa-shopping-cart text-white"></i>
          <div class="cartNumber__mobile bg-dark d-flex justify-content-center align-items-center position-absolute rounded-circle">{{cartsLen}}</div>
        </a>
        <div class="cartMenu__mobile w-100 position-fixed" v-if="!!cartMenu">
          <div v-if="cartsLen !== 0">
            <table class="table table--height d-block overflow-auto">
              <thead>
                <th>品名</th>
                <th width="80">尺寸</th>
                <th width="60">數量</th>
                <th width="50"></th>
              </thead>
              <tbody>
                <tr v-for="cart in cart.carts" :key="cart.id">
                  <td>{{cart.product.title}}</td>
                  <td>{{cart.size}}</td>
                  <td>{{cart.qty}}</td>
                  <td>
                    <button type="button" class="btn btn-outline-danger btn-sm"
                    @click="removeCartItem(cart.id)">
                    <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
            </tbody>
            </table>
            <a class="dropdown-item text-center text-white bg-danger" href="#" @click.prevent="goToCheckOut">直接去結帳</a>
          </div>
          <div class="cartMenu" aria-labelledby="dropdownMenuLink"
          v-else>
            <div class="dropdown-item">0 個商品</div>
          </div>
        </div>
      </div>
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Home from './Home'
import { mapGetters } from 'vuex'

export default {
  components: {
    Navbar,
    Home
  },
  data () {
    return {
      cartMenu: false
    }
  },
  methods: {
    removeCartItem (id) {
      this.$store.dispatch('cartModule/removeCartItem', id)
    },
    goToCheckOut () {
      this.cartMenu = !this.cartMenu
      this.$router.push({path: '/FrontDashboard/CheckOut'})
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      cart: 'cartModule/cart',
      cartsLen: 'cartModule/cartsLen'
    })
  }
}
</script>

<style lang="scss">
@import "./../../../assets/all.scss";
  .cart__mobile {
    bottom: 10px;
    right: 10px;
    z-index: 20;
  }
  .cartNumber__mobile {
    top: -5px;
    right: 5px;
    border: 1px solid;
    width: 18px;
    height: 18px;
  }
  .cartMenu__mobile {
    left: 0;
    right: 0;
    top: 60px;
    background: $white;
  }
</style>
