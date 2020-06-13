import Vue from "vue";
import router from "vue-router";

Vue.use(router);

export default new router({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  linkExactActiveClass: "active",
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/login",
      component: () => import("@/components/AdminPages/Login.vue")
    },
    {
      path: "/admin",
      component: () => import("@/components/AdminPages/Dashboard.vue"),
      children: [
        {
          path: "product",
          component: () => import("@/components/AdminPages/Product.vue"),
          meta: { requireAuth: true }
        },
        {
          path: "coupon",
          component: () => import("@/components/AdminPages/Coupon.vue"),
          meta: { requireAuth: true }
        },
        {
          path: "orders",
          component: () => import("@/components/AdminPages/Orders.vue"),
          meta: { requireAuth: true }
        }
      ]
    },
    {
      path: "/",
      component: () => import("@/views/Index.vue"),
      children: [
        {
          name: "landingpage",
          path: "",
          component: () => import("@/views/LandingPage.vue"),
        },
        {
          name: "productgallery",
          path: "product/:category/:subtype?",
          component: () => import("@/views/ProductGallery.vue"),
        },
        {
          name: "ProductDetail",
          path: "productdetail/:productid",
          component: () => import("@/views/ProductDetail.vue"),
        },
        {
          name: "CartPage",
          path: "myshoppingcart/cart",
          component: () => import("@/views/CartPage.vue"),
        },
        {
          name: "Order",
          path: "customer/order_page",
          component: () => import("@/views/Order.vue"),
        }, {
          name: "Payment",
          path: "customer/payment/:orderid",
          component: () => import("@/views/Payment.vue"),
        },
        {
          name: "Search",
          path: "search/keyword/:keyword",
          component: () => import("@/views/ProductGallery.vue"),
        },
        {
          name: "WishList",
          path: "wishlist",
          component: () => import("@/views/WishList.vue"),
        },
      ]
    },
  ]
});