<template>
  <div>
    <Navbar />
    <div class="container set-mt">
      <Alertmsg />
      <router-view></router-view>
      <button class="backtop" @click="backTop">
        <i class="fas fa-arrow-up backtop-arrow"></i>
      </button>
    </div>
    <Footer />
  </div>
</template>

<script>
import $ from "jquery";
import Alertmsg from "../components/AlertMsg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default {
  components: {
    Alertmsg,
    Navbar,
    Footer
  },
  methods: {
    backTop() {
      $("html, body").animate({ scrollTop: 0 }, 500);
    }
  },
  created() {
    $(window).scroll(showBtn);

    function showBtn() {
      if ($(window).scrollTop() > 550) {
        $(".backtop").fadeIn("fast");
      } else {
        $(".backtop").fadeOut("fast");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.set-mt {
  margin-top: 55px;
  @media (max-width: 992px) {
    margin-top: 0;
  }
}

.backtop {
  position: fixed;
  display: none;
  right: 4rem;
  bottom: 4rem;
  width: 2rem;
  height: 2rem;
  padding: 0;
  margin: 0;
  background: #826c61;
  border-radius: 50%;
  border: none;
  outline: 0;
  opacity: 0.8;
  z-index: 50;
  @media (max-width: 768px) {
    right: 1rem;
  }
  .backtop-arrow {
    color: white;
  }
}
</style>