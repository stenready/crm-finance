<template>
  <div class="right_column col s12 m6 l8">
    <div class="card orange darken-3">
      <div class="card-content white-text">
        <div class="card-header"> {{ 'course_currency' | localize }} </div>
        <table>
          <thead>
            <tr>
              <th> {{ 'currency' | localize }} </th>
              <th> {{ 'can_buy' | localize }} </th>
              <th>{{ 'can_seil' | localize }} </th>
              <th> {{ 'date' | localize }} </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(el, i) of currency" :key="i + currency">
              <td> {{ el.ccy }} </td>
              <td> {{ el.sale | fixed_to }} </td>
              <td> {{ el.buy | fixed_to }} </td>
              <td> {{ new Date() | date('date') }} </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
</style>

<script>
export default {
  props: ['currency'],
  filters: {
    fixed_to(v) {
      return (+v).toFixed(2)
    }
  }
};
</script>