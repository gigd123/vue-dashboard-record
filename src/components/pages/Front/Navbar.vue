<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top flex-md-nowrap bg-primary">
    <a class="navbar-brand bg-primary shadow-none" href="#" @click.prevent="goToHome">Decathlon</a>
    <button class="navbar-toggler" @click="toggleMenu()">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse text-white" id="navbarSupportedContent" :class="{'show': !!menuToggle}">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="goToHome()">首頁</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="searchCat('m')" data-toggle="collapse" data-target="#maleSubNavbar" aria-controls="maleSubNavbar" aria-expanded="false">男士</a>
          <SubNavbar :itemId="'maleSubNavbar'" />
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="searchCat('f')" data-toggle="collapse" data-target="#femaleSubNavbar" aria-controls="femaleSubNavbar" aria-expanded="false">女士</a>
          <SubNavbar :itemId="'femaleSubNavbar'" />
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="searchCat('kid')" data-toggle="collapse" data-target="#childSubNavbar" aria-controls="childSubNavbar" aria-expanded="false">兒童</a>
          <SubNavbar :itemId="'childSubNavbar'" />
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="searchCat('acc')">運動配件</a>
        </li>
      </ul>
      <div class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="searchText" @keyup.enter="search(searchText)">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click="search(searchText)">搜尋</button>
      </div>
      <div class="cart dropdown ml-2 d-none d-sm-block">
        <a class="btn btn-primary dropdown-toggle position-relative" href="#" role="button" id="cartMenuLink__desktop" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fas fa-shopping-cart text-white"></i>
          <div class="cartNumber__desktop bg-dark d-flex justify-content-center align-items-center position-absolute rounded-circle">{{cartsLen}}</div>
        </a>
        <div class="dropdown-menu cartMenu__desktop" aria-labelledby="cartMenuLink__desktop">
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
            <a class="dropdown-item text-center text-danger" href="#" @click.prevent="goToCheckOut">直接去結帳</a>
          </div>
          <div class="cartMenu" aria-labelledby="dropdownMenuLink"
          v-else>
          <div class="dropdown-item">0 個商品</div>
        </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import SubNavbar from './SubNavbar'

export default {
  components: {
    SubNavbar
  },
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    searchCat (text) {
      if (text === 'acc') {
        this.$store.commit('MENU_TOGGLE', !this.menuToggle)
      }
      const curUrl = window.location.href.split('/')
      if (curUrl.indexOf('ProductSort') === -1) {
        this.$router.push('/FrontDashboard/ProductSort')
      }
      this.$store.dispatch('updateLoading', true)
      this.$store.commit('productsModule/SEARCH_SUBCAT', '')
      this.$store.commit('productsModule/SEARCH_CAT', text)
      this.$store.dispatch('updateLoading', false)
      this.$store.commit('paginationModule/GET_PAGE', {page: 1, products: this.filterProducts})
    },
    search (text) {
      this.$store.commit('MENU_TOGGLE', !this.menuToggle)
      const curUrl = window.location.href.split('/')
      if (curUrl.indexOf('Home') === -1) {
        this.$router.push('/FrontDashboard/Home')
      }
      this.$store.commit('productsModule/SEARCH_TEXT', text)
      this.$store.commit('paginationModule/GET_PAGE', {page: 1, products: this.searchProducts})
    },
    removeCartItem (id) {
      this.$store.dispatch('cartModule/removeCartItem', id)
    },
    goToCheckOut () {
      this.$router.push({path: '/FrontDashboard/CheckOut'})
    },
    goToHome () {
      this.$store.commit('MENU_TOGGLE', !this.menuToggle)
      const curUrl = window.location.href.split('/')
      if (curUrl.indexOf('Home') === -1) {
        this.$router.push('/FrontDashboard/Home')
      }
      this.searchText = ''
      this.$store.commit('productsModule/SEARCH_TEXT', '')
      this.$store.commit('paginationModule/GET_PAGE', {page: 1, products: this.searchProducts})
    },
    toggleMenu () {
      this.$store.commit('MENU_TOGGLE', !this.menuToggle)
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      menuToggle: 'menuToggle',
      categories: 'productsModule/categories',
      cart: 'cartModule/cart',
      cartsLen: 'cartModule/cartsLen',
      filterProducts: 'productsModule/filterProducts',
      searchProducts: 'productsModule/searchProducts'
    })
  }
}
</script>

<style lang="scss">
  .cartMenu__desktop {
    left: unset !important;
    right: 0 !important;
    min-width: 450px !important;
    font-size: 14px !important;
  }
  .cartNumber__desktop {
    top: -5px;
    right: 5px;
    border: 1px solid;
    width: 18px;
    height: 18px;
  }
  .table {
    &--height {
        max-height: 75vh;
    }
  }
</style>
