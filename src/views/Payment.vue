<template>
  <div>
    <loading :active.sync="this.$store.state.isLoading"></loading>
    <div class="row justify-content-center mb-3">
      <div class="col-md-10 text-center">
        <ul class="shop-steps list-unstyled d-flex">
          <li>
            <span>1.CHECK ORDER 確認購買清單</span>
          </li>
          <li>
            <span>2.SHIPPING ORDER 填寫訂單</span>
          </li>
          <li class="active">
            <span>3.ALL DONE! 訂單完成</span>
          </li>
        </ul>
        <table class="table pay-table table-borderless">
          <tbody>
            <tr>
              <th scope="row">訂單編號</th>
              <td class="text-danger">{{ orderid }}</td>
            </tr>
            <tr>
              <th scope="row">Email:</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th scope="row">姓名:</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th scope="row">收件人電話:</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th scope="row">收件人地址:</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th scope="row">訂單金額:</th>
              <td>{{ order.total | currency }}</td>
            </tr>
            <tr>
              <th scope="row">訂單時間:</th>
              <td>{{ order.create_at | date }}</td>
            </tr>
            <tr></tr>
            <tr>
              <th scope="row">付款狀態</th>
              <td class="text-danger font-weight-bold" v-if="!order.is_paid">尚未付款</td>
              <td class="text-info font-weight-bold" v-if="order.is_paid">付款成功</td>
            </tr>
          </tbody>
        </table>
        <div class="text-center">
          <button
            v-if="order.is_paid === false"
            class="btn btn-dark rounded-0 w-40"
            style="width:100px;"
            @click="payCheck"
          >確認付款去</button>
          <router-link
            v-if="order.is_paid === true"
            class="btn btn-dark rounded-0"
            to="/"
            style="width:100px; margin-right:10px"
          >回首頁</router-link>
          <router-link
            v-if="order.is_paid === true"
            class="btn btn-dark rounded-0"
            to="/product/t-shirt"
            style="width:100px"
          >繼續購物</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderid: "",
      order: {
        user: {}
      }
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_SERVERPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderid}`;
      vm.$http.get(url).then(response => {
        vm.order = response.data.order;
      });
    },
    payCheck() {
      const vm = this;
      const url = `${process.env.VUE_APP_SERVERPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderid}`;
      vm.$store.commit("LOADING", true);
      vm.$http.post(url).then(response => {
        if (response.data.success) {
          vm.getOrder();
          vm.$store.commit("LOADING", false);
        }
      });
    }
  },
  created() {
    this.orderid = this.$route.params.orderid;
    this.getOrder();
  }
};
</script>