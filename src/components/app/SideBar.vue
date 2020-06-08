<template>
  <div class="stas_sidebar">
    <ul class="sidenav app-sidenav" :class="{open: !value}">
      <router-link
        v-for="(link, i) of links"
        :key="i"
        tag="li"
        active-class="active"
        :to="link.to"
        :exact="link.exact"
      >
        <a   href="#" class="waves-effect waves-orange pointer">{{ link.desc }}</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
import localizeFilter from '../../filters/localize.filter'
export default {
  props: ["value"],
  data() {
    return {
      links: [
        { to: "/", desc: localizeFilter('score'), exact: true },
        { to: "/history", desc: localizeFilter('history') },
        { to: "/planning", desc: localizeFilter('planning') },
        { to: "/record", desc: localizeFilter('record') },
        { to: "/categories", desc: localizeFilter('categories') }
      ]
    };
  }
};
</script>

<style lang="scss">
.stas_sidebar {
  position: relative;
  z-index: 99;
  .sidenav {
    transition: all 0.3s ease-in;
    padding-top: 70px;
  }
  .sidenav.open {
    transform: translate(0, 0);
  }
  .collection {
    border: none;

    .collection-item {
      border: none;
    }
  }
  @media screen and (max-width: 576px) {
    .sidenav {
      width: 220px;
    }
  }
}
</style>