<template>
  <div class="categories_update">
    <div class="card">
      <span class="header_card_categories">Редактировать категорию</span>
      <div class="card-content">
        <form @submit.prevent="updateCategoryHandler">
          <div class="input-field">
            <select v-model="current">
              <option
                v-for="(cat, i) of categories"
                :value="cat.id"
                :key="i + `string`"
              >{{ cat.title}}</option>
            </select>
            <label>Materialize Select</label>
          </div>

          <div class="input-field">
            <input
              :class="{ 'invalid': $v.desc.$error, 'valid': !$v.desc.$invalid }"
              id="title_categories_update"
              type="text"
              v-model="desc"
            />
            <label for="title_categories_update">Введите название категории</label>
            <small
              class="helper-text invalid_msg_class"
              v-if="($v.desc.$dirty && !$v.desc.required)"
            >Поле не может быть пустым</small>
          </div>

          <div class="input-field">
            <input
              :class="{ 'invalid': $v.limit.$error, 'valid': !$v.limit.$invalid }"
              id="number_categories_update"
              type="number"
              v-model.number="limit"
            />
            <label for="number_categories_update">Лимит на данную категорию</label>
            <small
              class="helper-text invalid_msg_class"
              v-if="($v.limit.$dirty && !$v.limit.required)"
            >Поле не может быть пустым</small>
            <small
              class="helper-text invalid_msg_class"
              v-if="($v.limit.$dirty && !$v.limit.minValue)"
            >минимальное значение 1</small>
          </div>

          <button
            style="margin-right: 1rem"
            type="submit"
            class="waves-effect waves-light btn-small"
          >Изменить</button>
          <button
            @click="delete_category"
            type="button"
            class="waves-effect waves-light btn-small"
          >Удалить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
export default {
  name: "CategoriesUpdate",
  props: {
    categories: { type: Array, required: true }
  },
  data() {
    return {
      select: null,
      desc: "",
      limit: 1,
      current: null
    };
  },
  validations: {
    desc: { required },
    limit: { required, minValue: minValue(1) }
  },
  watch: {
    current(val_id) {
      const { limit, title } = this.categories.find(c => c.id === val_id);
      this.desc = title;
      this.limit = limit;
    }
  },
  methods: {
    async delete_category(){
      const res = await this.$store.dispatch('delete_category', {id: this.current})
      this.$emit('delete_category', this.current)
    },
    async updateCategoryHandler() {
      if (!!this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        const data = { id: this.current, title: this.desc, limit: this.limit }
        await this.$store.dispatch('update_category', data)
        this.$message("Категория обновлена!", 2000);
        this.$emit('update_category', data)
      } catch (e) {}
    }
  },
  mounted() {
    const elems = document.querySelectorAll("select");
    this.select = M.FormSelect.init(elems);
    M.updateTextFields();
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.desc = title;
    this.limit = limit;
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
};
</script>

<style lang="scss">
</style>