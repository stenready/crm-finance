<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import AuthLayout from './layouts/AuthLayout';
import MeinLayout from './layouts/MeinLayout';
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'auth') + '-layout'
    }
  },
  components: {
    AuthLayout,
    MeinLayout
  }
}
</script>

<style lang="scss">
  @import '../node_modules/materialize-css/dist/css/materialize.min.css';
  @import './sass/index.scss';
</style>
