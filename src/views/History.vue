<template>
  <div class="history">
    <div class="page_title_app">
      <span class="text">История записей</span>
    </div>

    <Loader v-if="loading" />

    <span v-else>
      <div class="history_chart">
        <canvas></canvas>
      </div>

      <section>
        <HistoryTable :records="records" />
      </section>
    </span>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
export default {
  name: "history",
  data() {
    return {
      loading: true,
      records: [],
      categories: []
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetch_all_categories");
    const records = await this.$store.dispatch("fetch_all_records");
    this.records = records.map(record => {
      return {
        ...record,
        category_name: this.categories.find(c => c.id === record.categoryId)
          .title,
        type_class: record.type === "income" ? "green" : "red",
        type_text: record.type === "income" ? "Доход" : "Расход"
      };
    });

    this.loading = false;
  },
  components: { HistoryTable }
};
</script>

<style lang="scss">
</style>