<template>
  <header>
    <div class="container">
      <div class="row justify-content-between">
        <nav class="index-nav">
          <router-link class="nav-logo p-0" to="/">
            <img src="@/assets/haseiyo.png" class="logo" alt />
          </router-link>
          <ul class="navbar-list px-1">
            <li class="nav-item">
              <router-link to="/" class="nav-link">首頁</router-link>
            </li>
            <li class="nav-item">
              <a href="javascript:;" class="nav-link" data-toggle="togglemenu">
                上身
                <i class="fas fa-caret-down fa-xs"></i>
              </a>
              <div class="sub-menu">
                <div class="menu-inner">
                  <ul>
                    <li>
                      <router-link to="/product/t-shirt" href="#">全部上衣</router-link>
                    </li>
                    <li>
                      <router-link to="/product/t-shirt/longsleeve" href="#">長袖上衣</router-link>
                    </li>
                    <li>
                      <router-link to="/product/t-shirt/shortsleeve" href="#">短袖上衣</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li class="nav-item">
              <router-link to="/product/shirts" class="nav-link">襯衫</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/product/outer" class="nav-link">外套</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/product/pants" class="nav-link">長褲</router-link>
            </li>
          </ul>
          <a href="#" class="menu-toggler" @click.prevent="toggleMenu">
            <div class="line line-top"></div>
            <div class="line line-mid"></div>
            <div class="line line-btm"></div>
          </a>
          <div class="cover" @click="closeMenu"></div>
        </nav>
        <shoppingBag />
      </div>
    </div>
  </header>
</template>

<script>
import $ from "jquery";
import ShoppingBag from "./ShoppingBag";

export default {
  components: {
    ShoppingBag
  },
  methods: {
    toggleMenu() {
      const top = $(".line-top");
      const mid = $(".line-mid");
      const btm = $(".line-btm");
      const menu = $(".navbar-list");
      const cover = $(".cover");
      top.toggleClass("top-rotate");
      mid.toggleClass("slide-out");
      btm.toggleClass("btm-rotate");
      menu.toggleClass("show");
      cover.toggleClass("show");
    },
    closeMenu() {
      const top = $(".line-top");
      const mid = $(".line-mid");
      const btm = $(".line-btm");
      const menu = $(".navbar-list");
      const cover = $(".cover");
      top.removeClass("top-rotate");
      mid.removeClass("slide-out");
      btm.removeClass("btm-rotate");
      menu.removeClass("show");
      cover.removeClass("show");
    }
  },
  watch: {
    $route() {
      this.closeMenu();
    }
  },
  mounted() {
    const $sub = $(".sub-menu");
    $("a[data-toggle='togglemenu']")
      .click(() => {
        $sub.slideToggle("fast");
      })
      .blur(() => {
        $sub.slideUp();
      });
  }
};
</script>