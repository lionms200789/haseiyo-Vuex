<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-3">
      <button class="btn btn-primary" @click="couponModal(true)">建立新優惠券</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="100">名稱</th>
          <th width="80">折扣(%)</th>
          <th width="100">到期日</th>
          <th width="100">是否啟用</th>
          <th width="100">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item ,index) in couponList" :key="index">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }} %</td>
          <td class="text-left">{{ item.due_date }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span v-if="!item.is_enabled">未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="couponModal(false ,item)">編輯</button>
            <button class="btn btn-outline-primary btn-sm" @click="delCoupons(item.id)">移除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :childPagination="pagination"
      @emitHandler="getCoupons"
      v-if="pagination.total_pages > 1"
    />
    <!--優惠券modal-->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">管理優惠券</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="title" class="col-form-label">名稱</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model.trim="couponData.title"
                    id="title"
                    placeholder="請輸入優惠券名稱"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="percent" class="col-form-label">折扣%數</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model.number="couponData.percent"
                    id="percent"
                    placeholder="請輸入折扣百分比"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="due_date" class="col-form-label">到期日</label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="couponData.due_date"
                    id="due_date"
                    placeholder="請設定到期日"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="code" class="col-form-label">折扣碼</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model.trim="couponData.code"
                    id="code"
                    placeholder="請設定折扣碼"
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="couponData.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">送出</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "./Pagination";

export default {
  components: {
    Pagination
  },
  data() {
    return {
      couponData: {},
      couponList: [],
      pagination: {},
      isLoading: false,
      ifNew: true
    };
  },
  methods: {
    couponModal(newCoupon, item) {
      if (newCoupon) {
        this.couponData = {};
        this.ifNew = true;
      } else {
        this.couponData = item;
        this.ifNew = false;
      }
      $("#couponModal").modal("show");
    },
    updateCoupon() {
      const vm = this;
      let method = "post";
      let api = `${process.env.VUE_APP_SERVERPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      vm.isLoading = true;
      if (!vm.ifNew) {
        method = "put";
        api = `${process.env.VUE_APP_SERVERPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.couponData.id}`;
      }
      vm.$http[method](api, { data: vm.couponData }).then(() => {
        vm.isLoading = false;
        $("#couponModal").modal("hide");
        vm.getCoupons();
      });
    },
    getCoupons(page = 1) {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.VUE_APP_SERVERPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      vm.$http.get(url).then(response => {
        vm.isLoading = false;
        vm.couponList = response.data.coupons;
        vm.pagination = response.data.pagination;
      });
    },
    delCoupons(id) {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.VUE_APP_SERVERPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${id}`;
      vm.$http.delete(url).then(() => {
        vm.isLoading = false;
        vm.getCoupons();
      });
    }
  },
  created() {
    this.getCoupons();
  }
};
</script>