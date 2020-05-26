<template>
  <div class="register">
    <div class="wrap_body">
      <div class="body_l">
        <form @submit.prevent="register_app">
          <div class="card">
            <div class="card-content">
              <h4 class="auth_title">Регистрация</h4>

              <div class="input-field col s12">
                <i
                  class="material-icons prefix"
                  :class="{'valid_icon': !$v.register_email.$invalid, 'invalid_icon': $v.register_email.$error}"
                >account_circle</i>
                <input
                  :class="{ 'invalid': $v.register_email.$error, 'valid': !$v.register_email.$invalid }"
                  id="email"
                  type="text"
                  class="super_input"
                  v-model.trim="register_email"
                />
                <label for="email">Email</label>
                <small
                  class="helper-text invalid_msg_class"
                  v-if="($v.register_email.$dirty && !$v.register_email.required)"
                >Поле логин обзательно</small>
                <small
                  class="helper-text invalid_msg_class"
                  v-if="($v.register_email.$dirty && !$v.register_email.email)"
                >Введите корректный email</small>
              </div>

              <div class="input-field col s12">
                <i
                  class="material-icons prefix"
                  :class="{'valid_icon': !$v.register_password.$invalid, 'invalid_icon': $v.register_password.$error}"
                >https</i>
                <input
                  id="password"
                  type="password"
                  class="super_input"
                  v-model="register_password"
                  :class="{ 'invalid': $v.register_password.$error, 'valid': !$v.register_password.$invalid }"
                />
                <label for="password">Введите пароль</label>
                <small
                  class="helper-text invalid_msg_class"
                  v-if="($v.register_password.$dirty && !$v.register_password.required)"
                >Поле пароль обзательно</small>
                <small
                  class="helper-text invalid_msg_class"
                  v-if="($v.register_password.$dirty && !$v.register_password.minLength)"
                >Длинна пароля должна быть не мене {{ $v.register_password.$params.minLength.min }} сейчас {{ register_password.length }}</small>
              </div>

              <div class="input-field col s12">
                <i
                  class="material-icons prefix"
                  :class="{'valid_icon': !$v.register_name.$invalid, 'invalid_icon': $v.register_name.$error}"
                >insert_emoticon</i>
                <input
                  id="name"
                  type="text"
                  class="super_input"
                  v-model="register_name"
                  :class="{ 'invalid': $v.register_name.$error, 'valid': !$v.register_name.$invalid }"
                />
                <label for="name">Ваше имя</label>
                <small
                  class="helper-text invalid_msg_class"
                  v-if="($v.register_name.$dirty && !$v.register_name.required)"
                >Имя - обязательно поле</small>
              </div>

              <p style="margin-bottom: 1rem;">
                <label>
                  <input type="checkbox" class="filled-in" v-model="agree" />
                  <span>
                    <div
                      class="span_label_check"
                      style="transform: translateY(-2px);"
                    >Cогласен с правилами</div>
                  </span>
                </label>
              </p>
            </div>

            <div class="card-action">
              <button
                style="width: 100%;"
                type="submit"
                class="waves-effect waves-light btn-small"
              >Регистрация</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      register_email: "",
      register_password: "",
      register_name: "",
      agree: false
    };
  },
  validations: {
    register_email: { email, required },
    register_password: { required, minLength: minLength(6) },
    register_name: { required },
    agree: { checked: v => v }
  },
  methods: {
    ...mapActions(["register"]),
    register_app() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const data = {
        email: this.register_email,
        password: this.register_password,
        name: this.register_name
      };
      this.register(data)
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {});
    }
  },
};
</script>

<style lang="scss">
</style>

<style lang="scss">
</style>