<template>
  <div class="history_table">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th> {{  'amount' | localize }} </th>
          <th> {{ 'date' | localize }} </th>
          <th> {{ 'category' | localize }} </th>
          <th> {{ 'type' | localize }} </th>
          <th> {{ 'open' | localize }} </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(el, i) of records"  :key="el.id">
          <td> {{ i + 1 }} </td>
          <td> {{ el.amount }} </td>
          <td> {{ el.date | date('datetime') }} </td>
          <td> {{ el.category_name }} </td>
          <td>
            <span class="white-text badge" :class="[el.type_class]"> {{ el.type_text | localize }} </span>
          </td>
          <td>
            <button class="btn btn-small" @click="$router.push('/detail/' + el.id)">
              <i class="material-icons">comment</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
   name: "history_table",
   props: {
     records: {
       required: true,
       type: Array
     }
   }
};
</script>

<style lang="scss">
</style>