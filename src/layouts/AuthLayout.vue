<template>
  <div class="auth_layout">
    <nav style="position: relative; z-index: 1000;">
      <div class="nav-wrapper">
        <a href="#" @click.prevent class="brand-logo hide-on-med-and-down">Sten Ready Finance</a>
        <ul id="nav-mobile" class="right">
          <li>
            <router-link tag="a" to="/login">Login</router-link>
          </li>
          <li>
            <router-link tag="a" to="/register">Register</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="overlay_section"></div>

    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "@/sass/index.scss";
.auth_layout {
  //layout style
  .overlay_section {
    height: calc(100vh - 64px);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($color: lawngreen, $alpha: 0.1);
    position: relative;
    z-index: 100;
  }
  .nav-wrapper {
    background-color: $nav_color;
    padding: 0 2rem;
    .router-link-exact-active {
      color: cornflowerblue;
    }
    .brand-logo {
      color: chocolate;
      text-transform: uppercase;
      font-size: 1.3rem;
      letter-spacing: 2px;
    }
  }
  // auth style
  .body_l {
    .auth_title {
      margin: 0 0 1rem 0;
    }
    i {
      right: -5px !important;
    }
    .valid_icon{
      color: #4CAF50 ;
    }
    .invalid_icon, .invalid_icon.active{
      color: red;
    }
    label {
      margin-left: -10px !important;
    }
    .super_input {
      padding-right: 44px !important;
      margin-left: 0 !important;
      width: calc(100% - 44px);
    }
    .card {
      width: 30%;
      position: absolute;
      z-index: 120;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .card-content {
        padding-bottom: 0;
      }
    }
    .invalid_msg_class {
      margin-left: 0 !important;
      color: red !important;
    }
    @media screen and (max-width: 992px) {
      .card {
        width: 50% !important;
      }
    }

    @media screen and (max-width: 768px) {
      .card {
        width: 60% !important;
      }
    }

    @media screen and (max-width: 576px) {
      .card {
        width: 85% !important;
      }
    }
  }
}
</style>