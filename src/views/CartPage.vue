<template>
  <div>
    <loading :active.sync="this.$store.state.isLoading"></loading>
    <div class="cart">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <ul class="shop-steps list-unstyled d-flex">
            <li class="active">
              <span>1.CHECK ORDER 確認購買清單</span>
            </li>
            <li>
              <span>2.SHIPPING ORDER 填寫訂單</span>
            </li>
            <li>
              <span>3.ALL DONE! 訂單完成</span>
            </li>
          </ul>
          <table class="table cart-table" v-if="myCarts.final_total">
            <thead class="cart-head">
              <tr>
                <th scope="col" class="px-0"></th>
                <th scope="col">商品資訊</th>
                <th scope="col" class="px-0">數量</th>
                <th scope="col">價格</th>
                <th scope="col">折扣價</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody class="cart-body">
              <tr v-for="item in myCarts.carts" :key="item.id">
                <td width="5%" scope="row" class="px-0">
                  <a href="#" @click.prevent="goDetail(item.product_id)">
                    <img :src="item.product.imageUrl" alt class="img-fluid" style="min-width:50px;" />
                  </a>
                </td>
                <td width="25%">
                  <a href="#" @click.prevent="goDetail(item.product_id)">
                    <p>{{ item.product.title }}</p>
                    <p>尺寸 : {{ item.size}}</p>
                  </a>
                </td>
                <td width="10%" class="px-0">
                  <select
                    class="productQty"
                    v-model="item.qty"
                    @change="modifyQty(item.product_id, item.qty,item.size, item.id)"
                  >
                    <option :value="qty" v-for="qty in 10" :key="qty">{{qty}}</option>
                  </select>
                </td>
                <td width="10%">{{ item.total | currency }}</td>
                <td width="10%">{{ item.final_total | currency }}</td>
                <td width="5%">
                  <a href="#" class="cartcross" @click.prevent="delCartItem(item.id)">
                    <i class="fas fa-times"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="!itemCounter" class="py-5 text-center">
            <div>
              <i class="fa fa-cart-arrow-down cart-info"></i>
            </div>購物車空空的唷 !
          </div>
          <div class="cart-total">
            <div class="row border-bottom">
              <div class="col-md-6">
                <div class="input-group mb-3 coupon">
                  <input
                    type="text"
                    v-model="couponCode"
                    @keyup.enter="getDiscount"
                    class="form-control rounded-0 coupon-input"
                    placeholder="請輸入電子優惠券碼"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <div class="input-group-append">
                    <button
                      @click="getDiscount"
                      class="btn btn-outline-dark rounded-0"
                      type="button"
                      id="button-addon2"
                    >套用</button>
                  </div>
                </div>
                <p style="font-size:13px; color:#ff5252">{{ couponResponse }}</p>
              </div>
              <div class="col-md-6">
                <ul
                  class="list-unstyled ml-auto text-left price-content"
                  v-if="myCarts.final_total >= 0"
                >
                  <li class="price-item">
                    <span>總金額 :</span>
                    <span>{{ myCarts.total | currency }}</span>
                  </li>
                  <li class="price-item">
                    <span>共折抵:</span>
                    <span>{{ (myCarts.total - myCarts.final_total) | currency }}</span>
                  </li>
                  <li class="price-item">
                    <span></span>
                    <span></span>
                  </li>
                  <li class="price-item">
                    <span>應付金額 :</span>
                    <span>NT{{ myCarts.final_total | currency}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="row py-4 justify-content-end">
              <div class="col-md-3 mb-2">
                <router-link class="btn btn-outline-dark rounded-0 w-100" to="/product/t-shirt">繼續逛逛</router-link>
              </div>
              <div class="col-md-3 mb-2" v-if="myCarts.final_total">
                <a href="#" @click.prevent="fillOrder" class="btn btn-dark rounded-0 w-100">前往結帳</a>
              </div>
            </div>
          </div>
          <div class="cart-total"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      couponCode: "",
      couponResponse: ""
    };
  },
  methods: {
    delCartItem(id) {
      this.$store.dispatch("removeCart", id);
    },
    goDetail(id) {
      this.$router.push(`/productdetail/${id}`);
    },
    getDiscount() {
      const vm = this;
      let code = {
        code: vm.couponCode
      };
      const url = `${process.env.VUE_APP_SERVERPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      vm.$http.post(url, { data: code }).then(res => {
        if (res.data.success) {
          vm.couponResponse = res.data.message;
          this.$store.dispatch("getCart");
        } else {
          vm.couponResponse = res.data.message;
        }
      });
    },
    fillOrder() {
      this.$router.push("/customer/order_page");
    },
    modifyQty(product_id, qty, size, id) {
      this.$store.dispatch("modifyQty", { product_id, qty, size, id });
    }
  },
  computed: {
    myCarts() {
      return JSON.parse(JSON.stringify(this.$store.state.myCarts));
    },
    itemCounter() {
      return this.$store.state.cartItemCounter;
    }
  },
  created() {
    this.$store.dispatch("getCart");
  }
};
</script>