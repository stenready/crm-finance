<template>
  <div class="history">
    <div class="page_title_app">
      <span class="text">История записей</span>
    </div>

    <div class="history_chart" style="background: aliceblue;" v-show="records.length">
      <canvas width="600" height="400" ref="canvas" id="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <span v-else-if="!records.length">Записей еще нет</span>

    <span v-else>
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
import { Bar} from "vue-chartjs";
export default {
  name: "history",
  extends: Bar,
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
    ///////
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
    //chart js//
    this.renderChart(
      {
        labels: categories.map(c => {
          const array = []
           this.records.map( r => {
            if( r.categoryId === c.id &&   r.type === "outcome"  && r.amount > 0) {
              array.push(c.title)
            }
          } )
          return array
        }),
        datasets: [
          {
            label: "Расходы по категориям",
            data: categories.map(c => {
              return this.records.reduce((total, r) => {
                if (r.categoryId === c.id && r.type === "outcome") {
                  total += +r.amount;
                }
                return total;
              }, 0);
            }),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false
      }
    );

    //////all good finish render page////
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
#canvas {
  height: 300px !important;
  width: auto !important;
}
</style>