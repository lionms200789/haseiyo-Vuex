import Vue from "vue";
import App from "./App";
import router from "./router";
import "bootstrap";
import axios from "axios";
import VueAxios from "vue-axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import VeeValidate from "vee-validate";

import currencyFilter from "./filters/currency";
import dateFilter from "./filters/date";
import store from "./store";

Vue.use(VueAxios, axios);
Vue.use(VeeValidate, {
  events: "input|blur"
});
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

Vue.component("loading", Loading);
Vue.filter("currency", currencyFilter);
Vue.filter("date", dateFilter);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const url = `${process.env.VUE_APP_SERVERPATH}/api/user/check`;
    axios.post(url).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: "/login"
        });
      }
    });
  } else {
    next();
  }
});