<template>
  <div>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 pt-5 text-muted"
        >
          <span class="h5 mb-1">管理員</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link to="/admin/product" class="nav-link">
              <i class="fa fa-archive"></i>
              產品列表
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/admin/coupon" class="nav-link">
              <i class="fas fa-cogs"></i>
              優惠券管理
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/admin/orders" class="nav-link">
              <i class="fa fa-clipboard-list"></i>
              訂單管理
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>