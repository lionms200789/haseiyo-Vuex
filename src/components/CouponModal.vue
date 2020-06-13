<template>
  <div>
    <transition name="fade">
      <div class="bg-cover" v-if="this.$store.state.couponModalStatus" @click.self="closeCoupon">
        <div class="coupon-container" v-if="this.$store.state.couponModalStatus">
          <div class="dismiss-btn" @click="closeCoupon">+</div>
          <div class="coupon-title">
            <p>hello!</p>
            <span>haseiyo.com</span>
          </div>
          <div class="coupon-body">
            <p>歡慶HaSeiYo盛大開幕</p>
            <p>
              結帳輸入優惠碼
              <span style="font-size:18px">NEWOPEN20</span>
            </p>
            <p class="mb-0">
              即享
              <span class="number">9</span>折限時優惠
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  methods: {
    closeCoupon() {
      this.$store.commit("COUPON_MODAL", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.bg-cover {
  width: 100%;
  height: 100%;
  background: rgba(40, 40, 40, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 110;
  display: flex;
  justify-content: center;
  align-items: center;
  .coupon-container {
    position: relative;
    width: 300px;
    height: 200px;
    background: rgb(233, 233, 232);
    color: #656565;
    border-radius: 2px;
    .dismiss-btn {
      position: absolute;
      z-index: 130;
      top: -10px;
      right: 5px;
      font-size: 2rem;
      transform: rotate(45deg);
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    .coupon-title {
      text-align: center;
      & > p {
        font-size: 36px;
        margin: 0;
        animation: hello 1s infinite;
        @keyframes hello {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      }
      & > span {
        font-size: 12px;
        display: block;
        color: #fff;
        margin-top: -5px;
        background: #656565;
      }
    }
    .coupon-body {
      margin-top: 10px;
      text-align: center;
      .number {
        font-size: 1.25rem;
      }
    }
  }
}
.fade-enter,
.fade-leave {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
</style>