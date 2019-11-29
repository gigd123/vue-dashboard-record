<template>
  <div id="app">
    <loading :active.sync="isLoading"></loading>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isLoading'])
  }
}
</script>

<style lang="scss">
@import "./assets/all";
@import url("@fortawesome/fontawesome-free/css/all.css");
</style>
