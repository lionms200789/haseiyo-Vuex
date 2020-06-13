<template>
  <div>
    <form class="form-signin" @submit.prevent="login">
      <h1 class="h3 mb-3 font-weight-normal text-center">管理者登入</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
        v-model="user.username"
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
        v-model="user.password"
      />
      <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
      <p class="mt-3 mb-3 text-muted">&copy;2019</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      const vm = this;
      const url = `${process.env.VUE_APP_SERVERPATH}/admin/signin`;
      vm.$http.post(url, vm.user).then(response => {
        if (response.data.success) {
          vm.$router.push("/admin/product");
        }
      });
    }
  }
};
</script>