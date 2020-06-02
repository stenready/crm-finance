<template>
  <div class="planning">
    <Loader v-if="loading" />

    <p v-else-if="categories.length === 0">
      Для того чтобы создать запись нужно прикрепить её к категории, а у вас нет ни одной категории. Содайте её
      <router-link to="/categories">тут</router-link>
    </p>

    <div class="wrap" v-else>
      <div class="page_title_app" style="align-items: center;">
        <span class="text">Планирование</span>
        <span style="font-weight: 700;">Текущий баланс: {{ info.bill }} UAH</span>
      </div>

      <div class="wrap_planning" v-tooltipe="cat.tooltipe" v-for="cat of categories" :key="cat.id">
        <span v-if="cat.spend > 0">
          <div class="sub_title">
            <span>
              <span class="category_name">{{ cat.title }}</span>
              <span
                class="spend"
                style="font-size: 1.2rem;"
              >Потрачено: {{ cat.spend }} UAH из {{ cat.limit }} UAH</span>
            </span>
          </div>
          <div class="progress">
            <div
              class="determinate"
              :class="[cat.progress_color]"
              :style="{width: cat.progress + `%`}"
            ></div>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "planing",
  data() {
    return {
      loading: true,
      categories: []
    };
  },
  computed: {
    ...mapGetters(["info"])
  },
  async mounted() {
    const catgs = await this.$store.dispatch("fetch_all_categories");
    const all_record = await this.$store.dispatch("fetch_all_records");

    this.categories = catgs.map(cat => {
      let spend = all_record.filter(rec => cat.id === rec.categoryId);
      spend = spend.filter(rec => rec.type === "outcome");
      spend = spend.reduce((total, rec) => {
        return (total += +rec.amount);
      }, 0);

      const procent = (100 * spend) / cat.limit;
      const progress = procent > 100 ? 100 : procent;
      const progress_color =
        procent < 60 ? "green" : procent < 100 ? "yellow" : "red";

      const tooltipe_value = cat.limit - spend;
      const tooltipe = `${
        tooltipe_value < 0
          ? "Вы потратили больше чем нужно. Дифицит категории ="
          : "Вы можете потратить еще "
      } ${Math.abs(tooltipe_value)} UAH `;
      return { ...cat, spend, progress, progress_color, tooltipe };
    });

    this.loading = false;
  }
};
</script>

<style lang="scss">
.planning {
  .category_name {
    font-size: 1.3rem;
    font-weight: 500;
    margin-right: 1rem;
  }
}
</style>