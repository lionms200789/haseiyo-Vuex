<template>
  <div class="col-sm-6 col-lg-3 mb-3" :class="view">
    <div class="card border-0 shadow-0 mb-3">
      <div class="wishlist-icon">
        <a href="#" @click.prevent="$store.commit('WISHLIST', carddata.id)">
          <i :class="heartStyle"></i>
        </a>
      </div>
      <a href="#" class="card-img-wrapper" @click.prevent="goDetail(carddata.id)" :style="soldOut">
        <div class="soldout-msg" v-if="!carddata.is_enabled">SOLD OUT</div>
        <img class="card-image" :src="carddata.imageUrl" />
      </a>
      <div class="card-body p-0">
        <h5 class="card-title">
          <a
            href="#"
            class="text-dark text-decoration-none"
            @click.prevent="goDetail(carddata.id)"
            :style="soldOut"
          >{{ carddata.title }}</a>
        </h5>
        <div class="price">
          <div v-if="!carddata.price">NT.{{ carddata.origin_price | currency}}</div>
          <del v-if="carddata.price">NT.{{ carddata.origin_price | currency}}</del>
          <div class="text-danger" v-if="carddata.price">NT{{ carddata.price | currency}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["carddata", "view"],
  data() {
    return {
      soldOutStyle: {
        opacity: "0.6",
        pointerEvents: "none"
      }
    };
  },
  methods: {
    goDetail(id) {
      this.$router.push(`/productdetail/${id}`);
    }
  },
  computed: {
    heartStyle() {
      return this.$store.state.wishlist.includes(this.carddata.id)
        ? "fas fa-heart fa-lg"
        : "far fa-heart fa-lg";
    },
    soldOut() {
      return this.carddata.is_enabled === 0 ? this.soldOutStyle : "";
    }
  }
};
</script>