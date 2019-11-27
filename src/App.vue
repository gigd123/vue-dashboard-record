<template>
  <div id="app">
    <loading :active.sync="isLoading"></loading>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    isLoading () {
      // 直接呼叫儲存在 store 的 isLoading 屬性
      return this.$store.state.isLoading
    }
  }
}
</script>

<style lang="scss">
@import "./assets/all";
@import url("@fortawesome/fontawesome-free/css/all.css");
</style>
