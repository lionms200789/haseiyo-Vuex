<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="d-flex mt-2">
      <span class="h4 font-weight-bold text-muted pt-1">DASHBOARD</span>
      <button class="btn btn-dark ml-auto" @click="modalopen(true)">
        <i class="fas fa-plus mr-1"></i>新增產品
      </button>
    </div>
    <table class="table mt-5">
      <thead>
        <tr>
          <th width="90">分類</th>
          <th width="150">品名</th>
          <th width="70">原價</th>
          <th width="70">售價</th>
          <th width="80">是否啟用</th>
          <th width="100">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in allProduct" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.origin_price | currency }}</td>
          <td>{{ item.price | currency }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="modalopen(false, item)">編輯</button>
            <button class="btn btn-outline-primary btn-sm" @click="DelProduct(item)">移除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :childPagination="pagination" @emitHandler="getproduct" />
    <!--modal-->
    <div class="modal fade" id="productModal">
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{ isNew ? '新增產品' : '編輯產品' }}</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row justify-content-center">
              <div class="col-sm-10">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="imgLoading"></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  alt
                  :src="tempProduct.imageUrl"
                />
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempProduct.title"
                  />
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="tempProduct.category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit"
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model="tempProduct.origin_price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model="tempProduct.price"
                    />
                  </div>
                </div>
                <hr />
                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model="tempProduct.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="tempProduct.content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
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
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
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
      allProduct: [],
      tempProduct: {},
      pagination: {},
      isNew: false,
      imgLoading: false,
      isLoading: false
    };
  },
  methods: {
    getproduct(page = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_SERVERPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`;
      vm.isLoading = true;
      vm.$http.get(url).then(response => {
        vm.allProduct = response.data.products;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
    modalopen(value, item) {
      if (value) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.isNew = false;
        this.tempProduct = Object.assign({}, item);
      }
      $("#productModal").modal("show");
    },
    updateProduct() {
      const vm = this;
      let url = `${process.env.VUE_APP_SERVERPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let httpmethod = "post";
      if (!vm.isNew) {
        url = `${process.env.VUE_APP_SERVERPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpmethod = "put";
      }
      vm.$http[httpmethod](url, { data: vm.tempProduct }).then(response => {
        if (response.data.success) {
          $("#productModal").modal("hide");
          vm.getproduct();
        } else {
          $("#productModal").modal("hide");
          vm.getproduct();
        }
      });
    },
    DelProduct(item) {
      const vm = this;
      const api = `${process.env.VUE_APP_SERVERPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${item.id}`;
      vm.$http.delete(api).then(() => {
        vm.getproduct();
      });
    },
    uploadFile() {
      const Files = this.$refs.files.files[0];
      const vm = this;
      vm.imgLoading = true;
      const url = `${process.env.VUE_APP_SERVERPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      let formData = new FormData();
      formData.append("file-to-upload", Files);
      vm.$http
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          if (response.data.success) {
            vm.imgLoading = false;
            const image = response.data.imageUrl;
            vm.$set(vm.tempProduct, "imageUrl", image);
          } else {
            vm.$bus.$emit("errorMsg", response.data.message, "danger");
            vm.imgLoading = false;
          }
        });
    }
  },
  created() {
    this.getproduct();
  }
};
</script>