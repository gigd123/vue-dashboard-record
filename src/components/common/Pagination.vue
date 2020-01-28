<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{'disabled': curPage <= 1}">
        <a class="page-link" href="#" aria-label="Previous"
          @click.prevent="getPage(curPage - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="index in pagination" :key="index"
        :class="{'active': pagination.current_page == 1}">
        <a class="page-link" href="#" @click.prevent="getPage(index)">{{index}}</a>
      </li>
      <li class="page-item" :class="{'disabled': curPage >= pagination}">
        <a class="page-link" href="#" aria-label="Next"
        @click.prevent="getPage(curPage + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Pagination',
  props: ['pagination', 'products'],
  computed: {
    ...mapGetters('paginationModule', ['curPage'])
  },
  methods: {
    getAllProducts (page) {
      this.$emit('switchPagination', page)
    },
    getPage (page = 1) {
      let vm = this
      vm.$store.commit('paginationModule/GET_PAGE', {page: page, products: this.products})
    }
  },
  created () {
    this.getPage()
  }
}
</script>
