<template>
  <div>
    <template>
      <div>
        <loading :active.sync="isLoading"></loading>
        <table class="table mt-4">
          <thead>
            <tr>
              <th>購買時間</th>
              <th>Email</th>
              <th>購買款項</th>
              <th>應付金額</th>
              <th>是否付款</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item , i ) in orderList" :key="i">
              <td>{{ item.create_at | date }}</td>
              <td>
                <span>{{ item.user.email }}</span>
              </td>
              <td>
                <ul class="list-unstyled" v-for="(product, i) in item.products" :key="i">
                  <li>{{ product.product.title }}</li>
                  <li>
                    <small>數量：{{ product.qty }} {{ product.product.unit }}</small>
                  </li>
                </ul>
              </td>
              <td class="text-left">{{ item.total | currency }} TWD</td>
              <td>
                <span class="text-success" v-if="item.is_paid">已付款</span>
                <span class="text-danger" v-if="!item.is_paid">尚未啟用</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination my-3">
          <Pagination class="mx-auto" :childPagination="pagination" @emitHandler="getOrderList" />
        </div>
      </div>
    </template>
  </div>
</template>


<script>
import Pagination from "./Pagination";

export default {
  components: {
    Pagination
  },
  data() {
    return {
      isLoading: false,
      orderList: [],
      pagination: {}
    };
  },
  methods: {
    getOrderList(page) {
      const vm = this;
      const url = `${process.env.VUE_APP_SERVERPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/orders?page=${page}`;
      vm.isLoading = true;
      vm.$http.get(url).then(response => {
        vm.orderList = response.data.orders;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.getOrderList();
  }
};
</script>