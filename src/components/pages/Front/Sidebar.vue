<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item active">
          <a class="nav-link" href="#" @click.prevent="searchText('tops')">運動上衣</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="#" @click.prevent="searchText('pants')">運動褲</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="#" @click.prevent="searchText('jackets')">運動外套</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="#" @click.prevent="searchText('swimwear')">泳裝</a>
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
export default {
  methods: {
    searchText (text) {
      const curUrl = window.location.href.split('/')
      if (curUrl.indexOf('ProductSort') === -1) {
        this.$router.push('/FrontDashboard/ProductSort')
      }
      this.$store.commit('productsModule/SEARCH_CATEGORY', text)
    }
  }
}
</script>
