<template>
  <div>
    <div class="container">
      <div class="row pt-3">
        <div class="col-12">
          <ol class="breadcrumb bg-white mb-0 px-0">
            <li class="breadcrumb-item">
              <router-link to="/">首頁</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link :to="`/product/${product.category}`">{{ categoryCompute }}</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
          </ol>
        </div>
      </div>
      <div class="row">
        <div class="col-md-7">
          <div class="ProductDetail">
            <img :src="product.imageUrl" alt />
          </div>
        </div>
        <div class="col-md-5">
          <div class="product-content">
            <h1 class="h4 pt-2">{{product.title}}</h1>
            <div v-if="product.id" class="product-price py-2">
              <del v-if="product.price">原價 NT {{product.origin_price | currency}}</del>
              <div v-if="!product.price">原價 NT {{product.origin_price | currency}}</div>
              <div class="text-danger" v-if="product.price">優惠價 NT {{product.price | currency}}</div>
            </div>
            <div class="row border-top border-bottom mt-3 pb-4">
              <div class="col-6 py-3">
                <select class="form-control rounded-0 select-size" v-model="product.size">
                  <option value="請選擇尺寸">請選擇尺寸</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                </select>
              </div>
              <div class="col-6 py-3">
                <div class="btn-group border qty-counter">
                  <button type="button" class="btn btn-light rounded-0" @click="minusPcs">-</button>
                  <input type="text" class="input-qty" readonly v-model="product.num" />
                  <button type="button" class="btn btn-light rounded-0" @click=" product.num++ ">+</button>
                </div>
              </div>
              <div class="col-12 mb-4">
                <a
                  href="#"
                  class="btn btn-dark rounded-0 w-100"
                  @click.prevent="addtoCart(product.id, product.num, product.size)"
                >{{ this.product.size === "請選擇尺寸" ? "尚未選擇尺寸" : "加入購物車" }}</a>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-12">
                <ul class="nav nav-tab" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a
                      class="tab-link active"
                      id="description-tab"
                      data-toggle="tab"
                      href="#description"
                    >
                      <span class="d-block">DESCRIPTION</span>商品描述
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="tab-link" id="laundry-tab" data-toggle="tab" href="#laundry">
                      <span class="d-block">LAUNDRY</span>洗滌方式
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="tab-link" id="sizechart-tab" data-toggle="tab" href="#sizechart">
                      <span class="d-block">SIZE GUIDE</span>尺寸表
                    </a>
                  </li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content">
                  <div class="tab-pane active" id="description">
                    <p>*實品顏色依單品照為主</p>
                    <p>棉 95% 聚酯纖維 5%</p>
                    <p>素材產地 / 中國</p>
                    <p>加工產地 / 中國</p>

                    <p>商品長度/正常</p>
                    <p>商品版型/適中</p>
                    <p>商品彈性/稍有</p>
                    <p>*此款材質吸濕性較一般材質大，故洗滌後些微縮水屬正常現象。</p>
                  </div>
                  <div class="tab-pane" id="laundry">
                    <p>1.深淺色請分開洗滌，以避免造成互相移染。</p>
                    <p>2.請放入大小適中之細網洗衣袋中弱速水洗，以保持商品型態。</p>
                    <p>3.洗滌時，水溫請低於30°C；請使用中性洗劑；請勿長時間浸泡。</p>
                    <p>4.請勿使用漂白劑、螢光增白劑及衣物柔軟劑，以免破壞布料。</p>
                    <p>5.不可濕放，以免衣物染色；請弱速輕脫水，不可烘乾，以免衣物縮水。</p>
                    <p>6.請採用陰乾方式晾乾，不可擰扭；如需整燙，請以低溫墊布熨燙。(針織商品請平放晾乾)</p>
                    <p>7.穿著時，請留意避免與配件包包等它物接觸摩擦而造成移染情況發生。</p>
                    <p>8.皮革、羊毛、毛尼等毛衣針織商品建議使用乾洗或乾洗溶劑清洗以避免造成縮水捲縮等..情況發生。</p>
                  </div>
                  <div class="tab-pane" id="sizechart">
                    <div class="sizechart text-center">
                      <img src="@/assets/img/size.jpg" alt />
                      <table class="table">
                        <tbody>
                          <tr style="font-weight:bold;">
                            <td>SIZE(CM)</td>
                            <td>S</td>
                            <td>M</td>
                            <td>L</td>
                          </tr>
                          <tr>
                            <td>肩寬</td>
                            <td>41</td>
                            <td>44</td>
                            <td>47</td>
                          </tr>
                          <tr>
                            <td>胸寬</td>
                            <td>54</td>
                            <td>56</td>
                            <td>59</td>
                          </tr>
                          <tr>
                            <td>袖長</td>
                            <td>55</td>
                            <td>57</td>
                            <td>59</td>
                          </tr>
                          <tr>
                            <td>衣長</td>
                            <td>66</td>
                            <td>67</td>
                            <td>68</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productId: "",
      product: {
        size: ""
      }
    };
  },
  methods: {
    getDetail() {
      const vm = this;
      const url = `${process.env.VUE_APP_SERVERPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.productId}`;
      vm.$http.get(url).then(res => {
        vm.product = res.data.product;
        vm.$set(vm.product, "num", 1);
        vm.$set(vm.product, "size", "請選擇尺寸");
      });
    },
    minusPcs() {
      this.product.num <= 1 ? (this.product.num = 1) : this.product.num--;
    },
    addtoCart(product_id, qty = 1, size) {
      if (this.product.size === "請選擇尺寸") return;
      this.$store.dispatch("addToCart", { product_id, qty, size });
    }
  },
  computed: {
    categoryCompute() {
      let category = this.product.category;
      switch (category) {
        case "shirts":
          return "襯衫";

        case "outer":
          return "外套";

        case "pants":
          return "長褲";

        case "t-shirt":
          return "全部上衣";

        case "t-shirt/longsleeve":
          return "長袖上衣";

        case "t-shirt/shortsleeve":
          return "短袖上衣";
        default:
          return " ";
      }
    }
  },
  created() {
    this.productId = this.$route.params.productid;
    this.getDetail();
  }
};
</script>