<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top bg-dark flex-md-nowrap shadow">
    <a class="navbar-brand bg-dark" href="#">Decathlon 迪卡儂</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse text-white" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link class="nav-link" to="/FrontDashboard/Home">
            首頁
        </router-link>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="searchText('m')">男士</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="searchText('f')">女士</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="searchText('kid')">兒童</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="searchText('acc')">運動配件</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
      <div class="cart dropdown ml-2">
        <a class="btn btn-dark dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fas fa-shopping-cart text-white"></i>
        </a>
        <div class="cartNumber bg-dark d-flex justify-content-center align-items-center position-absolute rounded-circle">{{cartsLen}}</div>
        <div class="dropdown-menu cartMenu" aria-labelledby="dropdownMenuLink"
          v-if="cart.carts">
            <table class="table">
              <thead>
                <th>品名</th>
                <th width="80">尺寸</th>
                <th width="60">數量</th>
                <th width="50"></th>
              </thead>
              <tbody>
              <tr v-for="cart in cart.carts" :key="cart.id">
                <td>{{cart.product.title}}</td>
                <td></td>
                <td>{{cart.product.num}}</td>
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm"
                  @click="removeCartItem(cart.id)">
                  <i class="far fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
            </table>
            <!-- <div class="dropdown-item border-bottom d-flex">
              <div class="mr-2"></div>
              <div></div>
            </div> -->
          <a class="dropdown-item text-center text-danger" href="#" @click.prevent="goToCheckOut">直接去結帳</a>
        </div>
        <div class="cartMenu" aria-labelledby="dropdownMenuLink"
          v-else>
          <div class="dropdown-item">0 個商品</div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  methods: {
    searchText (text) {
      const curUrl = window.location.href.split('/')
      if (curUrl.indexOf('ProductSort') === -1) {
        this.$router.push('/FrontDashboard/ProductSort')
      }
      this.$store.commit('productsModule/SEARCH_CATEGORY', '')
      this.$store.commit('productsModule/SEARCH_TEXT', text)
    },
    removeCartItem (id) {
      this.$store.dispatch('cartModule/removeCartItem', id)
    },
    goToCheckOut () {
      this.$router.push({path: '/FrontDashboard/CheckOut'})
    }
  },
  computed: {
    ...mapGetters({
      categories: 'productsModule/categories',
      cart: 'cartModule/cart',
      cartsLen: 'cartModule/cartsLen'
    })
  }
}
</script>

<style>
  @import url("@fortawesome/fontawesome-free/css/all.css");
  .cartMenu {
    left: unset;
    right: 0;
    min-width: 350px;
  }
  .cartNumber {
    top: -5px;
    right: 5px;
    border: 1px solid;
    width: 18px;
    height: 18px;
  }
</style>
