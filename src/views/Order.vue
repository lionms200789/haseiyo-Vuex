<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <ul class="shop-steps list-unstyled d-flex">
          <li>
            <span>1.CHECK ORDER 確認購買清單</span>
          </li>
          <li class="active">
            <span>2.SHIPPING ORDER 填寫訂單</span>
          </li>
          <li>
            <span>3.ALL DONE! 訂單完成</span>
          </li>
        </ul>
        <table class="table order-table">
          <thead class="order-head">
            <tr>
              <th scope="col"></th>
              <th scope="col">商品資訊</th>
              <th scope="col">數量</th>
              <th scope="col">價格</th>
              <th scope="col">折扣價</th>
            </tr>
          </thead>
          <tbody class="order-body">
            <tr v-for="(item ,i) in myCarts.carts" :key="i">
              <td width="5%" scope="row" style="text-align:center">
                <a href="#" @click.prevent="goDetail(item.product_id)">
                  <img :src="item.product.imageUrl" class="img-fluid" style="min-width:50px;" />
                </a>
              </td>
              <td width="25%">
                <a href="#" @click.prevent="goDetail(item.product_id)">
                  <p>{{ item.product.title }}</p>
                  <p>尺寸 : {{ item.size}}</p>
                </a>
              </td>
              <td width="10%" class="px-0">{{ item.qty }}</td>
              <td width="10%">{{ item.total | currency }}</td>
              <td width="10%">{{ item.final_total | currency }}</td>
            </tr>
          </tbody>
        </table>
        <div class="cart-total mb-5">
          <div class="row border-bottom justify-content-between">
            <div class="col-12 mb-3">
              <ul class="pay-container">
                <li class="cart-pay">
                  <span>付款方式</span>
                  <select name="pay-type" id="payment" v-model="payType">
                    <option value>請選擇付款方式</option>
                    <option value="creditCard">信用卡線上刷卡</option>
                    <option value="cod">貨到付款</option>
                  </select>
                </li>
                <li class="cart-pay">
                  <span>運送方式</span>
                  <select name="transfer-type" id="transfer" v-model="transferType">
                    <option value>請選擇運送方式</option>
                    <option value="logistic" selected>貨運宅配</option>
                    <option value="711">7-11超商取貨</option>
                  </select>
                </li>
              </ul>
            </div>
            <div class="col-12">
              <ul class="list-unstyled text-left price-content" style="float:right">
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
                </li>
                <li class="price-item">
                  <span>應付金額 :</span>
                  <span>NT{{ myCarts.final_total | currency}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-7">
            <h3 class="text-center h5 mb-3">購物須知</h3>
            <div class="notice">
              <p>若您訂的商品無法於正常期限內出貨，我們將以e-mail通知您調貨狀況，如商品無法順利出貨或缺貨，為避免您久候商品，也將主動提醒您建議取消該品項。</p>
              <p>請務必檢查並確認訂購人之姓名、聯絡電話、地址，以確保商品到貨後可快速且正確的通知到您本人。</p>
              <p>如遇特殊狀況或其他不可抗力之因素或貨量不足，導致商品無法送抵，本公司得保留出貨與否之權利。</p>
              <p>訂單填寫完畢後，即表示確認且同意上述事項，日後如有爭議依本公司規定辦理。</p>
              <p>如發現惡意取消訂單達三次者，本公司將停止提供您的預訂服務。</p>
            </div>
          </div>
          <form class="col-lg-5 mb-3" @submit.prevent="establishOrder">
            <h2 class="text-center h5 mb-3">訂單填寫</h2>
            <div class="form-group">
              <label for="useremail">Email</label>
              <input
                v-validate="'required'"
                type="email"
                class="form-control"
                name="email"
                id="useremail"
                v-model="form.user.email"
                placeholder="請輸入 Email"
              />
              <span class="text-danger" v-if=" errors.has('email')">請填寫正寫完整E-mail格式</span>
            </div>
            <div class="form-group">
              <label for="username">收件人姓名</label>
              <input
                v-validate="'required'"
                type="text"
                class="form-control"
                name="name"
                id="username"
                v-model="form.user.name"
                placeholder="輸入完整姓名"
              />
              <span class="text-danger" v-if=" errors.has('name')">姓名欄為必填</span>
            </div>
            <div class="form-group">
              <label for="usertel">收件人電話</label>
              <input
                v-validate="'required'"
                type="tel"
                class="form-control"
                id="usertel"
                name="tel"
                v-model="form.user.tel"
                placeholder="請輸入電話"
              />
              <span class="text-danger" v-if=" errors.has('tel') ">電話號碼欄位不得留空</span>
            </div>
            <div class="form-group">
              <label for="useraddress">收件人地址</label>
              <input
                v-validate="'required'"
                type="text"
                class="form-control"
                name="address"
                id="useraddress"
                v-model="form.user.address"
                placeholder="請輸入地址"
              />
              <span class="text-danger" v-if=" errors.has('address') ">地址欄位不得留空</span>
            </div>
            <div class="form-group">
              <label for="comment">備註(選填)</label>
              <textarea
                name
                id="comment"
                class="form-control"
                cols="30"
                rows="3"
                v-model="form.message"
              ></textarea>
            </div>
            <div class="text-right">
              <button class="btn btn-dark rounded-0 w-100">建立訂單</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      payType: "",
      transferType: ""
    };
  },
  methods: {
    goDetail(id) {
      this.$router.push(`/productdetail/${id}`);
    },
    establishOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_SERVERPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      vm.$validator.validate().then(valid => {
        if (valid) {
          vm.$http.post(url, { data: vm.form }).then(res => {
            if (res.data.success) {
              let orderid = res.data.orderId;
              vm.$store.dispatch("updateCartQty");
              vm.$router.push(`/customer/payment/${orderid}`);
            }
          });
        }
      });
    }
  },
  computed: {
    myCarts() {
      return this.$store.state.myCarts;
    }
  },
  created() {
    this.$store.dispatch("getCart");
  }
};
</script>