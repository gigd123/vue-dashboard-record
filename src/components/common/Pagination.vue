<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{'disabled': !pagination.has_pre}">
        <a class="page-link" href="#" aria-label="Previous"
          @click.prevent="getAllProducts(pagination.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="index in pagination" :key="index"
        :class="{'active': pagination.current_page == 1}">
        <a class="page-link" href="#" @click.prevent="getAllProducts(pagination)">{{pagination}}</a>
      </li>
      <li class="page-item" :class="{'disabled': !pagination.has_next}">
        <a class="page-link" href="#" aria-label="Next"
        @click.prevent="getAllProducts(1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pagination'],
  methods: {
    getAllProducts (page) {
      this.$emit('switchPagination', page)
    }
  }
}
</script>
