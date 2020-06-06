<template>
  <div class="history">
    <div class="page_title_app">
      <span class="text">История записей</span>
    </div>

    <Loader v-if="loading" />

    <span v-else-if="!records.length">Записей еще нет</span>

    <span v-else>
      <div class="history_chart">
        <canvas></canvas>
      </div>

      <section>
        <HistoryTable :records="items" />
      </section>
      <section>
        <Paginate
          v-model="page"
          :page-count="pageCount"
          :click-handler="pageChangeHandler"
          :prev-text="'Назад'"
          :next-text="'Вперёд'"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
        >></Paginate>
      </section>
    </span>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import PaginationMixin from "../mixins/pagination.mixins";
export default {
  name: "history",
  mixins: [PaginationMixin],
  data() {
    return {
      loading: true,
      records: []
    };
  },
  async mounted() {
    const categories = await this.$store.dispatch("fetch_all_categories");
    this.records = await this.$store.dispatch("fetch_all_records");

    this.setupPagination(
      this.records.map(record => {
        return {
          ...record,
          category_name: categories.find(c => c.id === record.categoryId).title,
          type_class: record.type === "income" ? "green" : "red",
          type_text: record.type === "income" ? "Доход" : "Расход"
        };
      })
    );

    this.loading = false;
  },
  components: { HistoryTable }
};
</script>

<style lang="scss">
.pagination {
  li:focus {
    outline: none !important;
  }
}
</style>