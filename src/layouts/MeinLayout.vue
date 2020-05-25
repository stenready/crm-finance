<template>
  <div class="mein-layout">
    <NavBar @open_close_click="showNavBar = !showNavBar" /> 
    <SideBar v-model="showNavBar" />

    <main>
      <div class="app-content container">
        <div class="app-page" :class="{full: !!showNavBar}">
          <router-view />
        </div>
      </div>
    </main>

     <div class="fixed-action-btn">
       <router-link class="btn-floating btn-large waves-effect waves-light red" tag="a" to="/record"><i class="material-icons">add</i></router-link>
     </div>
  </div>
</template>

<script>
import NavBar from "../components/app/NavBar";
import SideBar from "../components/app/SideBar";
export default {
  name: "mein-layout",
  data() {
    return {
      showNavBar: true
    };
  },
  components: { NavBar, SideBar }
};
</script>

<style lang="scss">
.mein-layout {
  .app-content {
    padding-top: 2rem;
  }
  .app-page {
    transition: all 0.2s ease-in;
    margin-left: 10rem;
    &.full {
      margin-left: 0 !important;
    }
  }
}
</style>