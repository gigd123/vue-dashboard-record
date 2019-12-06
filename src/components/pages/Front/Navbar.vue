<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top bg-dark flex-md-nowrap shadow">
    <a class="navbar-brand bg-dark" href="#">Decathlon 迪卡儂</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse text-white" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-for="(item, index) in categories" :key="index">
          <a class="nav-link" href="#"
            @click.prevent="searchText(item)"
            v-if="item === 'M' | item === 'F' | item === 'C'">{{ item === 'M' ? '男士' : item === 'F' ? '女士' : '兒童'}}</a>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link" href="#">運動配件</a>
        </li> -->
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  methods: {
    searchText (text) {
      console.log(text)
      this.$store.commit('productsModule/SEARCHTEXT', text)
    }
  },
  computed: {
    ...mapGetters('productsModule', ['categories'])
  }
}
</script>
