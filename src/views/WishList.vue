<template>
  <div>
    <loading :active.sync="this.$store.state.isLoading"></loading>
    <h2 class="py-3 h5 text-center">
      <span style="border-bottom:2px solid; padding-bottom:5px">我的願望清單</span>
    </h2>
    <div class="row">
      <div
        class="wishlist-info mx-auto text-center"
        v-if="this.$store.state.wishlist.length < 1"
        style="height:50vh; display:flex; flex-direction:column; justify-content:center;"
      >
        <i
          class="fas fa-heart"
          style="font-size:65px; display:block; color: rgba(149, 149, 149, 0.2);"
        ></i>
        <span class="my-2">尚無收藏的商品唷 !</span>
        <a class="btn btn-dark rounded-0 text-white my-2" @click="$router.back()">返回上一頁</a>
      </div>
      <productcard
        v-for="item in filterWish"
        :carddata="item"
        :key="item.id"
      ></productcard>
    </div>
  </div>
</template>
<script>
import Productcard from "../components/ProductCard";

export default {
  components: {
    Productcard
  },
  methods: {
    clickWishList(id) {
      this.$store.commit("WISHLIST", id);
    }
  },
  computed: {
    filterWish() {
      return this.$store.state.productModule.products.filter(item => {
        return this.$store.state.wishlist.indexOf(item.id) !== -1;
      });
    }
  },
  created() {
    this.$store.dispatch("getProducts");
    this.$store.commit("WISHLIST_ITEM");
  }
};
</script>