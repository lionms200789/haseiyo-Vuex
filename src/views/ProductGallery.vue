<template>
  <div>
    <loading :active.sync="this.$store.state.isLoading"></loading>
    <div class="row py-3">
      <div class="col-12">
        <h2 class="productTitle">{{ productTitle }}</h2>
        <div
          class="searchResult mb-4"
          v-if="this.$store.state.productModule.routePath.name === 'Search' "
        >
          <strong>共找到{{ productCategory.length }}項＂{{ searchKeyword }}＂相關商品</strong>
        </div>
        <div class="toolBox">
          <div class="changeView">
            <a href="#" class="oneCol" @click.prevent="grid ='col-12'">
              <i class="fas fa-square fa-lg"></i>
            </a>
            <a href="#" class="twoCol-mobile" @click.prevent="grid ='col-6'">
              <i class="fas fa-th-large fa-lg"></i>
            </a>
            <a href="#" class="twoCol-desktop" @click.prevent="grid ='col-lg-6'">
              <i class="fas fa-th-large fa-lg"></i>
            </a>
            <a href="#" class="fourCol" @click.prevent="grid ='col-lg-3'">
              <i class="fas fa-th fa-lg"></i>
            </a>
          </div>
          <div class="sorting">
            <select id="sortby" v-model="sortby">
              <option :value="''">商品排序</option>
              <option :value="'priceAsc'">價格由低至高</option>
              <option :value="'priceDesc'">價格由高至低</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        class="noRelatedItem mx-auto text-center"
        v-if="!productCategory.length && this.$router.currentRoute.name === 'Search' "
        style="height:50vh; display:flex; flex-direction:column; justify-content:center;"
      >
        <i
          class="fa fa-frown"
          style="font-size:65px; display:block; color: rgba(149, 149, 149, 0.1);"
        ></i>
        <div class="my-2">查無與＂{{ searchKeyword }}＂相關的結果</div>
        <a
          class="btn btn-dark rounded-0 mx-auto text-white my-2"
          style="width:120px"
          @click="$router.back()"
        >返回上一頁</a>
      </div>
      <productcard :carddata="item" v-for="item in sortItem" :key="item.id" :view="grid"></productcard>
    </div>
  </div>
</template>

<script>
import Productcard from "../components/ProductCard";

export default {
  components: {
    Productcard
  },
  data() {
    return {
      sortby: "",
      grid: ""
    };
  },
  computed: {
    productCategory() {
      return this.$store.state.productModule.productCategory;
    },
    searchKeyword() {
      return this.$store.state.productModule.routePath.params.keyword;
    },
    productTitle() {
      let path = this.$store.state.productModule.routePath.path;
      switch (path) {
        case "/product/shirts":
          return "襯衫";

        case "/product/outer":
          return "外套";

        case "/product/pants":
          return "長褲";

        case "/product/t-shirt":
          return "全系列上衣";

        case "/product/t-shirt/longsleeve":
          return "長袖上衣";

        case "/product/t-shirt/shortsleeve":
          return "短袖上衣";
        default:
          return " ";
      }
    },
    sortItem() {
      if (this.sortby === "priceDesc") {
        return this.productCategory.slice(0).sort((a, b) => {
          return b.price - a.price;
        });
      } else if (this.sortby === "priceAsc") {
        return this.productCategory.slice(0).sort((a, b) => {
          return a.price - b.price;
        });
      } else {
        return this.productCategory;
      }
    }
  },
  created() {
    this.$store.commit("ROUTE");
    this.$store.dispatch("getProducts");
    this.$store.commit("WISHLIST_ITEM");
  },
  beforeDestroy() {
    this.$store.commit("RESET_PRODUCTS");
  },
  watch: {
    $route() {
      this.$store.commit("ROUTE");
      this.$store.commit("PRODUCT_FILTER");
    }
  }
};
</script>