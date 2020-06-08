<template>
  <div class="categories">
    <div class="page_title_app">
      <span class="text">{{ 'category' | localize }}</span>
    </div>
    <Loader v-if="loading" />
    <div class="row" v-else>
      <div class="col s12 m6">
        <CategoryCreate @create_category="addNewCategory" />
      </div>

      <div class="col s12 m6" v-if="categories.length">
        <CategoryUpdate
          :key="categories.length + number_m"
          @delete_category="delete_cat"
          @update_category="update_category"
          :categories="categories"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CategoryCreate from "../components/CategoriesCreate";
import CategoryUpdate from "../components/CategoriesUpdate";
export default {
  name: "Category",
  metaInfo() {
    return {
      title: this.$title("categories")
    };
  },
  async mounted() {
    try {
      this.categories = await this.$store.dispatch("fetch_all_categories");
      console.log(this.categories);
      this.loading = false;
    } catch (e) {}
  },
  data() {
    return {
      categories: [],
      loading: true,
      number_m: 0
    };
  },
  components: { CategoryCreate, CategoryUpdate },
  methods: {
    delete_cat(id) {
      console.log(id);
      this.categories = this.categories.filter(c => c.id !== id);
    },
    addNewCategory(cat) {
      this.categories.push(cat);
    },
    update_category(val) {
      const idx = this.categories.findIndex(c => c.id === val.id);
      this.categories[idx].title = val.title;
      this.categories[idx].limit = val.limit;
      this.number_m++;
    }
  }
};
</script>

<style lang="scss">
.categories {
  .header_card_categories {
    padding: 1rem 0 0 24px;
    display: block;
    font-size: 2rem;
  }
  .card-content {
    padding-top: 0 !important;
  }
}
</style>