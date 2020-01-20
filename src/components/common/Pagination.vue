<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{'disabled': !pagination.has_pre}">
        <a class="page-link" href="#" aria-label="Previous"
          @click.prevent="getPage(pagination.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="index in pagination" :key="index"
        :class="{'active': pagination.current_page == 1}">
        <a class="page-link" href="#" @click.prevent="getPage(index)">{{index}}</a>
      </li>
      <li class="page-item" :class="{'disabled': !pagination.has_next}">
        <a class="page-link" href="#" aria-label="Next"
        @click.prevent="getPage(1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pagination', 'products'],
  methods: {
    getAllProducts (page) {
      this.$emit('switchPagination', page)
    },
    getPage (page = 1) {
      console.log('this.products', this.products)
      let showProducts = this.chunk(this.products, 9)
      console.log(showProducts)
      return showProducts[page - 1]
    },
    chunk (arr, size) {
      return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
      )
    }
  }
}
</script>
