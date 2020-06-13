<template>
  <div class="toolbar">
    <dialogmodal :modalshow="modalstatus" @closehandler="modalstatus = false" />
    <div class="cart-outer">
      <div class="search">
        <a href="#" class="btn submit" @click.prevent="goSearch">
          <i class="fa fa-search"></i>
        </a>
        <input
          type="text"
          class="search-input"
          v-model.trim="keyword"
          @keyup.enter="goSearch"
          placeholder="找尋什麼商品呢 ?"
        />
      </div>
      <ul class="cart-inner d-flex">
        <li class="pb-0 home">
          <router-link
            to="/"
            class="btn icon-btn shadow-none"
            :class="{'activeNav' : currentRoute === 'landingpage' }"
          >
            <i class="fas fa-home fa-lg"></i>
            <div class="cart-text">首頁</div>
          </router-link>
        </li>
        <li class="pb-0">
          <a
            href="javascript:;"
            class="searchToggle btn icon-btn shadow-none"
            :class="{'activeNav' : currentRoute === 'Search' }"
          >
            <i class="fa fa-search fa-lg"></i>
            <div class="cart-text">搜尋商品</div>
          </a>
        </li>
        <li class="pb-0 wishlist">
          <router-link
            to="/wishlist"
            class="btn icon-btn shadow-none"
            :class="{'activeNav' : currentRoute === 'WishList' }"
          >
            <i class="far fa-heart fa-lg"></i>
            <div class="cart-text">我的收藏</div>
          </router-link>
        </li>

        <li class="pb-0 cart">
          <a
            href="#"
            class="btn icon-btn shadow-none"
            :class="{'activeNav' : currentRoute === 'CartPage' }"
            @click.prevent="goCart"
          >
            <i class="fa fa-shopping-cart fa-lg">
              <span v-if="cartItemQty">{{ cartItemQty }}</span>
            </i>
            <div class="cart-text">購物車</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Dialogmodal from "./DialogModal";

export default {
  components: {
    Dialogmodal
  },
  data() {
    return {
      keyword: "",
      modalstatus: false,
      currentRoute: ""
    };
  },
  methods: {
    goCart() {
      if (this.$route.path !== "/myshoppingcart/cart") {
        this.$router.push("/myshoppingcart/cart");
      }
    },
    goSearch() {
      if (!this.keyword) {
        this.modalstatus = true;
        return;
      } else {
        const keyword = this.keyword;
        this.keyword = "";
        $(".search").hide();
        this.$router.push(`/search/keyword/${keyword}`);
      }
    }
  },
  computed: {
    cartItemQty() {
      return this.$store.state.cartItemCounter;
    }
  },
  created() {
    this.$store.dispatch("updateCartQty");
    this.currentRoute = this.$route.name;
  },
  mounted() {
    $(".searchToggle").click(() => {
      $(".search").fadeToggle("fast");
    });
  },
  watch: {
    $route() {
      this.keyword = "";
      $(".search").hide();
      this.currentRoute = this.$route.name;
    }
  }
};
</script>