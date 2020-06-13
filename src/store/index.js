import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import productModule from "./product";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    couponModalStatus: false,
    wishlist: [],
    cartItemCounter: "",
    alertMsg: [],
    myCarts: {}
  },
  actions: {
    showCouponModal(context, status) {
      context.commit("COUPON_MODAL", status);
      setTimeout(() => {
        context.commit("COUPON_MODAL", false);
      }, 5000);
    },
    addToCart(context, itemInfo) {
      const url = `${process.env.VUE_APP_SERVERPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.post(url, { data: itemInfo }).then(res => {
        if (res.data.success) {
          context.dispatch("updateCartQty");
          context.dispatch("updateAlertMsg", res.data.message);
        }
      });
    },
    updateCartQty(context) {
      const url = `${process.env.VUE_APP_SERVERPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.get(url).then(res => {
        context.commit("CART_ITEM_QTY", res);
      });
    },
    updateAlertMsg(context, msg) {
      const timestamp = Math.floor(new Date() / 1000);
      context.commit("ALT_MESSAGE", { msg, timestamp });
      setTimeout(() => {
        if (context.state.alertMsg.length) {
          context.commit("REMOVE_MESSAGE", timestamp);
        }
      }, 5000);
    },
    getCart(context) {
      context.commit("LOADING", true);
      const url = `${process.env.VUE_APP_SERVERPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.get(url).then(res => {
        context.commit("MY_CART", res.data.data);
        context.commit("LOADING", false);
      });
    },
    removeCart(context, id) {
      const url = `${process.env.VUE_APP_SERVERPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      axios.delete(url).then(() => {
        context.dispatch("updateCartQty");
        context.dispatch("getCart");
      });
    },
    modifyQty(context, { product_id, qty, size, id }) {
      context.commit("LOADING", true);
      const newCartApi = `${process.env.VUE_APP_SERVERPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const delCartApi = `${process.env.VUE_APP_SERVERPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      const itemData = {
        product_id,
        qty,
        size
      };
      axios
        .all([
          axios.delete(delCartApi),
          axios.post(newCartApi, { data: itemData })
        ])
        .then(
          axios.spread(function () {
            context.dispatch("getCart");
            context.commit("LOADING", false);
          })
        );
    }
  },
  mutations: {
    COUPON_MODAL(state, status) {
      state.couponModalStatus = status;
    },
    LOADING(state, status) {
      state.isLoading = status;
    },
    WISHLIST_ITEM(state) {
      if (localStorage.wishlist) {
        state.wishlist = JSON.parse(localStorage.wishlist) || [];
      }
    },
    WISHLIST(state, id) {
      if (state.wishlist.includes(id)) {
        state.wishlist.splice(state.wishlist.indexOf(id), 1);
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
      } else {
        state.wishlist.push(id);
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
      }
    },
    CART_ITEM_QTY(state, res) {
      state.cartItemCounter = res.data.data.carts.length;
    },
    MY_CART(state, cartItem) {
      state.myCarts = cartItem;
    },
    ALT_MESSAGE(state, { msg, timestamp }) {
      state.alertMsg.push({ msg, timestamp });
    },
    REMOVE_MESSAGE(state, times) {
      state.alertMsg.forEach((item, i) => {
        if (item.timestamp === times) {
          state.alertMsg.splice(i, 1);
        }
      });
    }
  },
  modules: {
    productModule
  }
});