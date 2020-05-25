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
        <a href="#" class="waves-effect waves-orange pointer">{{ link.desc }}</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      links: [
        { to: "/", desc: "Счёт", exact: true },
        { to: "/history", desc: "История" },
        { to: "/planning", desc: "Планирование" },
        { to: "/record", desc: "Новая запись" },
        { to: "/categories", desc: "Категория" }
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