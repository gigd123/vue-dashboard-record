<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item active">
          <a class="nav-link" href="#" @click.prevent="searchText('TOPS')">運動上衣</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <span data-feather="file"></span>
            Orders
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <span data-feather="shopping-cart"></span>
            <i class="fal fa-shopping-cart"></i>
            Products
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <span data-feather="users"></span>
            Customers
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <span data-feather="bar-chart-2"></span>
            Reports
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <span data-feather="layers"></span>
            Integrations
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  methods: {
    searchText (text) {
      const curUrl = window.location.href.split('/')
      if (curUrl.indexOf('Home') === -1) {
        this.$router.push('/FrontDashboard/Home')
      }
      this.$store.commit('productsModule/SEARCH_TEXT', text)
    }
  },
  computed: {
    ...mapGetters('productsModule', ['filterProducts'])
  }
}
</script>
