<template>
  <div class="home">
    <div class="page_title_app">
      <span class="text">{{ 'score' | localize }}</span>
      <button class="btn my_button waves-effect waves-light" @click="refresh">
        <i class="large material-icons">autorenew</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <HomeBill :currency="currency" />

      <HomeCurency :currency="currency" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeBill from "@/components/HomeBill";
import HomeCurency from "@/components/HomeCurrency";
import { mapActions } from "vuex";
export default {
  name: "Home",
  metaInfo() {
    return {
      title: this.$title("score")
    };
  },
  methods: {
    ...mapActions(["fetch_currency"]),
    async refresh() {
      this.loading = true;
      await this.fetch_currency();
      this.loading = false;
    }
  },
  mounted() {
    this.fetch_currency()
      .then(res => {
        res.pop();
        this.currency = res;
        this.loading = false;
      })
      .catch(err => {});
  },
  data() {
    return {
      loading: true,
      currency: null
    };
  },
  components: {
    HomeBill,
    HomeCurency
  }
};
</script>

<style lang="scss">
.page_title_app {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 2rem;
  .text {
    font-size: 2rem;
    font-weight: 500;
  }
}
</style>
