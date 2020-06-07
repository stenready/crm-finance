<template>
  <div class="card">
    <span class="header_card_categories"> {{ 'create_category' | localize }} </span>
    <div class="card-content">
      <form @submit.prevent="category_handler">
        <div class="input-field">
          <input
            :class="{ 'invalid': $v.desc.$error, 'valid': !$v.desc.$invalid }"
            id="title_categories_add"
            type="text"
            v-model="desc"
          />
          <label for="title_categories_add">{{'Введите название категории' | localize}}</label>
          <small
            class="helper-text invalid_msg_class"
            v-if="($v.desc.$dirty && !$v.desc.required)"
          >{{'Поле не может быть пустым' | localize}}</small>
        </div>
        <div class="input-field">
          <input
            :class="{ 'invalid': $v.limit.$error, 'valid': !$v.limit.$invalid }"
            id="number_categories_add"
            type="number"
            v-model.number="limit"
          />
          <label for="number_categories_add">{{'Лимит на данную категорию' | localize}}</label>
          <small
            class="helper-text invalid_msg_class"
            v-if="($v.limit.$dirty && !$v.limit.required)"
          >{{'Поле не может быть пустым' | localize}}</small>
          <small
            class="helper-text invalid_msg_class"
            v-if="($v.limit.$dirty && !$v.limit.minValue)"
          >{{'Не должно быть меньше чем 1' | localize}}</small>
        </div>
        <button
          style="width: 100%;"
          type="submit"
          class="waves-effect waves-light btn-small"
        >{{'Создать категорию' | localize}}</button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      desc: "",
      limit: 1
    };
  },
  mounted() {
    M.updateTextFields();
  },
  validations: {
    desc: { required },
    limit: { required, minValue: minValue(1) }
  },
  methods: {
    ...mapActions(["add_category"]),

    async category_handler() {
      if (!!this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        const category = await this.add_category({ title: this.desc, limit: this.limit }); //return category object @id, title, limit
        this.desc = ""
        this.limit = 1
        this.$v.$reset()
        this.$message("Новая категория была добавлена", 2000);
        this.$emit('create_category', category)
      } catch (e) {}
    }
  }
};
</script>

<style lang="scss">
</style>