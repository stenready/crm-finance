<template>
  <div class="mein-layout">
    <NavBar @open_close_click="showNavBar = !showNavBar" />
    <SideBar v-model="showNavBar" />

    <main class="home-container">
      <div class="app-content">
        <div class="app-page" style="padding-right: 2rem;" :class="{full: !!showNavBar}">
          <router-view />
        </div>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large waves-effect waves-light red" tag="a" to="/record">
        <i class="material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/app/NavBar";
import SideBar from "../components/app/SideBar";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "mein-layout",
  data() {
    return {
      showNavBar: true
    };
  },
  computed: {
    ...mapGetters(["info"])
  },
  methods: {
    ...mapActions(["fetchInformation"])
  },
  mounted() {
    if (!Object.keys(this.info).length) {
      this.fetchInformation()
        .then(() => {})
        .catch(() => {});
    }
  },
  components: { NavBar, SideBar }
};
</script>

<style lang="scss">
.mein-layout {
  .app-content {
    padding-top: 2rem;
  }
  .app-content {
    display: flex !important;
    justify-content: flex-end !important;
   .app-page.full {
      width: calc(100%) !important;
      padding: 0 2rem !important;
      transition: width 0.5s ease-in !important;
    }
    .app-page {
      width: calc(100% - 320px) !important;
      transition: width 0.5s ease-in !important;
    }
  }
  @media screen and (max-width: 576px) {
    .app-content {
      .app-page {
        width: 97% !important;
        margin: 0 auto !important;
      }
    }
  }
}
</style>