<template>
  <div class="super_root">
    <div class="mein-layout">
      <NavBar @open_close_click="showNavBar = !showNavBar" />
      <SideBar
        v-model="showNavBar"
        :key="info.locale"
      />

      <main class="home-container">
        <div class="app-content">
          <div
            @click="show_sidebar_mini_screen"
            class="app-page"
            style="padding-right: 2rem;"
            :class="{full: !!showNavBar}"
          >
            <router-view />
          </div>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large waves-effect waves-light red"
          tag="a"
          to="/record"
        >
          <i class="material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/app/NavBar";
import SideBar from "../components/app/SideBar";
import { mapActions, mapGetters } from "vuex";
import messages from "@/utils/message.keys";
export default {
  name: "mein-layout",
  data() {
    return {
      showNavBar: true,
      close_sidebar_on_click: false
    };
  },
  computed: {
    ...mapGetters(["info", "error"])
  },
  watch: {
    error(e) {
      console.log(e);
      this.$error(messages[e.code] || "что-то пошло не так");
    },
    close_sidebar_on_click(e) {
      if (e) return true;
      return false;
    }
  },
  methods: {
    ...mapActions(["fetchInformation"]),

    onResize(event) {
      if (+window.innerWidth < 576) {
        this.close_sidebar_on_click = true;
      } else {
        this.close_sidebar_on_click = false;
      }
    },
    show_sidebar_mini_screen() {
      if (this.close_sidebar_on_click) {
        return (this.showNavBar = true);
      }
      return;
    }
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    this.fetchInformation()
      .then(() => {})
      .catch(() => {});
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  components: { NavBar, SideBar }
};
</script>

<style lang="scss">
.home-container {
  width: 100%;
  height: 100%;
}
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
  @media all and (max-width: 576px) {
    .app-content {
      width: 100% !important;
      .app-page {
        width: 97% !important;
        margin: 0 auto !important;
      }
      .app-page.full {
        padding: 0 !important;
      }
    }
  }
}
</style>