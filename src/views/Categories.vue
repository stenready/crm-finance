<template>
  <div class="categories">
    <div class="page_title_app">
      <span class="text">Категории</span>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <CategoryCreate @create_category="addNewCategory" />
      </div>

      <div class="col s12 m6">
        <div class="card">
          <div
            class="card-content"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium voluptas impedit quidem ratione labore magnam nulla quos fugiat non. Veniam sint explicabo fugit maxime ipsam quod, nulla tempora voluptas atque.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryCreate from "../components/CategoriesCreate";
export default {
  data() {
    return {
      categories: []
    }
  },
  name: "Category",
  components: { CategoryCreate },
  methods: {
    addNewCategory(cat) {
      this.categories.push(cat)
      console.log(this.categories)
    }
  },
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