<template>
  <div>
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ 'disabled' : !childPagination.has_pre}">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="changePage(childPagination.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in childPagination.total_pages"
        :key="page"
        :class="{ active : childPagination.current_page === page}"
      >
        <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ 'disabled' : childPagination.has_pre}">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="changePage(childPagination.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["childPagination"],
  methods: {
    changePage(page) {
      this.$emit("emitHandler", page);
    }
  }
};
</script>