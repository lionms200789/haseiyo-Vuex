<template>
  <div class="message-alert">
    <div class="alert alert-dismissible" v-for="(item, i) in AlertMessage" :key="i">
      {{ item.msg }}
      <button
        type="button"
        class="close"
        @click="$store.commit('REMOVE_MESSAGE', item.timestamp)"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  computed:{
    AlertMessage(){
      return this.$store.state.alertMsg;     
    }
  }
};
</script>

<style lang="scss" scoped>
.message-alert {
  position: fixed;
  width: 220px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1100;
  .alert {
    border-radius: 0;
    background: #343a40;
    color: #fff;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    .close {
      padding-top: 0.35rem;
      padding-bottom: 0.35rem;
    }
  }
}
</style>