import axios from "axios";
import router from "@/router";

export default {
  state: {
    products: [],
    productCategory: [],
    routePath: {}
  },
  actions: {
    getProducts(context) {
      const url = `${process.env.VUE_APP_SERVERPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      context.commit("LOADING", true);
      axios.get(url).then(res => {
        context.commit("PRODUCTS", res.data.products);
        context.commit("PRODUCT_FILTER");
        context.commit("LOADING", false);
      });
    }
  },
  mutations: {
    PRODUCTS(state, products) {
      state.products = products;
    },
    RESET_PRODUCTS(state) {
      state.products = [];
      state.productCategory = [];
    },
    PRODUCT_FILTER(state) {
      let category = router.currentRoute.params.category;
      let subtype = router.currentRoute.params.subtype;

      if (router.currentRoute.name === "Search") {
        let keyword = router.currentRoute.params.keyword;
        state.productCategory = state.products.filter(item => {
          return item.title.indexOf(keyword) !== -1;
        });
      } else if (category && subtype) {
        state.productCategory = state.products.filter(item => {
          return item.category.includes(subtype);
        });
      } else {
        state.productCategory = state.products.filter(item => {
          return item.category === category || item.category.includes(category);
        });
      }
    },
    ROUTE(state) {
      state.routePath = router.currentRoute;
    }
  }
};