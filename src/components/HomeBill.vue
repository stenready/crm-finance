<template>
  <div class="home_bill">
    <div class="left_column col s12 m6 l4">
      <div class="card light-blue">
        <div class="card-content white-text">
          <span class="card-header">Счёта ( в пересчёте на валюты )</span>
          <div class="currency_wrap">
            <span>{{ info.bill }}</span>
            <span>UAH</span>
          </div>
          <div class="currency_wrap" v-for="(el, i) of currency" :key="i">
            <span>{{ get_rate_currency(el)  }}</span>
            <span>{{ el.ccy }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.home_bill {
  .currency_wrap {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    font-size: 1.4rem;
  }
  .card-header {
    display: block;
    margin-bottom: 1rem;
  }
}
</style>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["currency"],
  data() {
    return {
      USD: 0,
      EUR: 0,
      RUB: 0
    };
  },
  computed: {
    ...mapGetters(["info"])
  },
  methods: {
    get_rate_currency(currency) {
      return (this.info.bill / currency.sale) > 0 ? (this.info.bill / currency.sale).toFixed(2) : 0
    }
  }
};
</script>