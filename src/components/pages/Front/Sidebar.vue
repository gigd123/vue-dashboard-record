<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item active">
          <a class="nav-link" href="#" @click.prevent="searchSubCat('tops')">運動上衣</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="#" @click.prevent="searchSubCat('pants')">運動褲</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="#" @click.prevent="searchSubCat('jackets')">運動外套</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="#" @click.prevent="searchSubCat('swimwear')">泳裝</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="#" @click.prevent="searchSubCat('shoes')">鞋子</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      filterProducts: 'productsModule/filterProducts'
    })
  },
  methods: {
    searchSubCat (text) {
      const curUrl = window.location.href.split('/')
      if (curUrl.indexOf('ProductSort') === -1) {
        this.$router.push('/FrontDashboard/ProductSort')
      }
      this.$store.dispatch('updateLoading', true)
      this.$store.commit('productsModule/SEARCH_SUBCAT', text)
      this.$store.dispatch('updateLoading', false)
      this.$store.commit('paginationModule/GET_PAGE', {page: 1, products: this.filterProducts})
    }
  }
}
</script>
