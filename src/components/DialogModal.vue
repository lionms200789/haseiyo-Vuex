<template>
  <div>
    <transition name="fade">
      <div class="bg-cover" v-if="modalshow" @click.self="$emit('closehandler')">
        <div class="popup-content">
          <span class="dismiss-btn" @click="$emit('closehandler')">+</span>
          <div class="popup-header" style="font-size:12px; margin-bottom:10px;">貼心提醒</div>
          <div class="popup-body">請輸入查詢文字</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    modalshow: {
      type: Boolean,
      default: false,
      required: true
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
  .popup-content {
    width: 320px;
    padding: 20px 10px;
    background-color: #f6f6f5;
    border: 1px solid darkgray;
    box-shadow: 0 0 2px 0 rgba(40, 40, 40, 0.5);
    text-align: center;
    position: relative;
    z-index:120;
    .dismiss-btn {
      position: absolute;
      top: -5px;
      right: 5px;
      font-size: 1.5rem;
      transform: rotate(45deg);
      cursor: pointer;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>