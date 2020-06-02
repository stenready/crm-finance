<template>
  <div class="record">
    <div class="page_title_app">
      <span class="text">Записи</span>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="ctegories.length === 0">
      Для того чтобы создать запись нужно прикрепить её к категории, а у вас нет ни одной категории. Содайте её
      <router-link to="/categories">тут</router-link>
    </p>

    <div class="row" v-else>
      <div class="card col s12 m6">
        <div class="card-content">
          <form @submit.prevent="submitHandler">
            <div class="input-field">
              <select v-model="category">
                <option v-for="el of ctegories" :key="el.id" :value="el.id">{{ el.title }}</option>
              </select>
              <label>Выбор нужой категории</label>
            </div>

            <p>
              <label>
                <input v-model="type_oper" value="income" type="radio" />
                <span>Доход</span>
              </label>
            </p>
            <p>
              <label>
                <input v-model="type_oper" value="outcome" type="radio" />
                <span>Расход</span>
              </label>
            </p>

            <div class="input-field">
              <input
                :class="{ 'invalid': $v.amount.$error, 'valid': !$v.amount.$invalid }"
                id="amount"
                type="number"
                v-model.number="amount"
              />
              <label for="title_categories_update">Сумма</label>
              <small
                class="helper-text invalid_msg_class"
                v-if="($v.amount.$dirty && !$v.amount.required)"
              >Обязательное поле</small>
              <small
                class="helper-text invalid_msg_class"
                v-if="($v.amount.$dirty && !$v.amount.minValue)"
              >Не должно быть меньше чем 1</small>
            </div>

            <div class="input-field">
              <input
                :class="{ 'invalid': $v.description.$error, 'valid': !$v.description.$invalid }"
                id="description"
                type="text"
                v-model="description"
              />
              <label for="title_categories_update">Описание</label>
              <small
                v-if="($v.description.$dirty && !$v.description.required)"
                class="helper-text invalid_msg_class"
              >Поле не может быть пустым</small>
            </div>

            <button type="submit" class="waves-effect waves-light btn-small">Добавить</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  name: "Record",
  computed: {
    ...mapGetters(["info"]),
    is_can_create() {
      if (this.type_oper === "income") return true;
      return this.info.bill >= this.amount;
    }
  },
  data() {
    return {
      type_oper: "outcome",
      ctegories: [],
      loading: true,
      category: null,
      select: null,
      amount: 1,
      description: ""
    };
  },
  validations: {
    description: { required },
    amount: { required, minValue: minValue(1) }
  },
  methods: {
    async submitHandler() {
      if (!!this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      //valid all fields
      if (this.is_can_create) {
        try {
          await this.$store.dispatch("create_record", {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type_oper,
            date: new Date().toJSON()
          });
          const bill =
            this.type_oper === "income"
              ? this.info.bill + this.amount
              : this.info.bill - this.amount
          await this.$store.dispatch('update_info', { bill })
          this.$message('запись успешно создана')
          this.amount = 1
          this.description = ""
          this.$v.$reset()
        } catch (e) {}
      } else {
        this.$message(
          ` не хватает денег ( ${this.amount - this.info.bill} ) UAH `
        );
      }
    }
  },
  async mounted() {
    this.ctegories = await this.$store.dispatch("fetch_all_categories");
    this.loading = false;

    if (this.ctegories.length) this.category = this.ctegories[0].id;

    setTimeout(() => {
      const elems = document.querySelectorAll("select");
      this.select = M.FormSelect.init(elems);
      M.updateTextFields();
    }, 0);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
};
</script>

<style lang="scss">
.record {
  .page_title_app {
    margin-bottom: 1rem !important;
  }
}
</style>