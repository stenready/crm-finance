<template>
  <div class="login">
    <div class="wrap_body">
      <div class="body_l">
        <form @submit.prevent="submit_form">
          <div class="card">
            <div class="card-content">
              <h4 class="auth_title">Вход в систему</h4>

              <div class="input-field col s12">
                <i
                  class="material-icons prefix"
                  :class="{'valid_icon': !$v.login_email.$invalid, 'invalid_icon': $v.login_email.$error}"
                >account_circle</i>
                <input
                  :class="{ 'invalid': $v.login_email.$error, 'valid': !$v.login_email.$invalid }"
                  id="first_name"
                  type="text"
                  class="super_input"
                  v-model.trim="login_email"
                />
                <label for="first_name">Email</label>
                <small
                  class="helper-text invalid_msg_class"
                  v-if="($v.login_email.$dirty && !$v.login_email.required)"
                >Поле логин обзательно</small>
                <small
                  class="helper-text invalid_msg_class"
                  v-if="($v.login_email.$dirty && !$v.login_email.email)"
                >Введите корректный email</small>
              </div>

              <div class="input-field col s12">
                <i
                  class="material-icons prefix"
                  :class="{'valid_icon': !$v.login_password.$invalid, 'invalid_icon': $v.login_password.$error}"
                >https</i>
                <input
                  id="last_name"
                  type="password"
                  class="super_input"
                  v-model="login_password"
                  :class="{ 'invalid': $v.login_password.$error, 'valid': !$v.login_password.$invalid }"
                />
                <label for="last_name">Введите пароль</label>
                <small
                  class="helper-text invalid_msg_class"
                  v-if="($v.login_password.$dirty && !$v.login_password.required)"
                >Поле пароль обзательно</small>
                <small
                  class="helper-text invalid_msg_class"
                  v-if="($v.login_password.$dirty && !$v.login_password.minLength)"
                >Длинна пароля должна быть не мене {{ $v.login_password.$params.minLength.min }} сейчас {{ login_password.length }}</small>
              </div>
            </div>

            <div class="card-action">
              <button
                style="width: 100%;"
                type="submit"
                class="waves-effect waves-light btn-small"
              >Вход в систему</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import keys from "@/utils/message.keys";
import { mapActions } from "vuex";
export default {
  name: "login",
  metaInfo() {
    return {
      title: 'Логин'
    };
  },
  data() {
    return {
      login_email: "",
      login_password: ""
    };
  },
  validations: {
    login_email: { email, required },
    login_password: { required, minLength: minLength(6) }
  },
  methods: {
    ...mapActions(["login"]),
    submit_form() {
      if (!!this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const data = {
        email: this.login_email,
        password: this.login_password
      };
      this.login(data)
        .then(res => {
          this.$router.push("/");
        })
        .catch(err => {});
    }
  },
  mounted() {
    if (this.$route.query.message) {
      console.log(keys[this.$route.query.message]);
      this.$message(keys[this.$route.query.message], 1500);
      return;
    }
  }
};
</script>

<style lang="scss">
</style>