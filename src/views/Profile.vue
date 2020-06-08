<template>
  <div class="profile">
    <span>
      <div class="page_title_app">
        <span class="text">{{ 'profile' | localize }}</span>
      </div>

      <div class="row">
        <div class="card col s12 m6">
          <div class="card-content">
            <form @submit.prevent="submitForm">
              <div class="input-field">
                <input
                  v-model="name"
                  :class="{ 'invalid': $v.name.$error, 'valid': !$v.name.$invalid }"
                  id="profile_name"
                  type="text"
                />
                <label for="profile_name"> {{ 'update_name_profile' | localize }} </label>
                <small
                  v-if="($v.name.$dirty && !$v.name.required)"
                  class="helper-text invalid_msg_class"
                >Поле не может быть пустым</small>
              </div>
              <div class="switch">
                <label>
                  English
                  <input v-model="isRuLocale" type="checkbox" />
                  <span class="lever"></span>
                  Русский
                </label>
              </div>
              <button
                style="margin-top: 1.5rem;"
                type="submit"
                class="waves-effect waves-light btn-small updateProfile"
              >
                {{ 'update' | localize }}
                <i style="margin-left: 1rem;" class="material-icons">filter_vintage</i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  metaInfo(){
    return {
      title: this.$title('profile')
    }
  },
  data() {
    return {
      name: "",
      isRuLocale: true
    };
  },
  validations: {
    name: { required }
  },
  computed: {
    ...mapGetters(["info"])
  },
  mounted() {
    this.name = this.info.name;
    this.isRuLocale = this.info.locale === 'ru-Ru'
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  methods: {
    async submitForm() {
      if (!!this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        await this.$store.dispatch("update_info", { name: this.name, locale: this.isRuLocale ? 'ru-Ru' : 'en-Us' });
        this.$message('Обновлено', 500)
      } catch (e) {}
    }
  }
};
</script>

<style lang="scss">
.updateProfile {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
}
</style>