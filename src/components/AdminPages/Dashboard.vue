<template>
  <div>
    <AdminNavbar />
    <div class="container-fluid">
      <div class="row">
        <AdminSidebar />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default {
  components: {
    AdminSidebar,
    AdminNavbar
  }
};
</script>