<template>
  <b-form class="p-5 border rounded bg-light" @submit.prevent="submitForm">
    <div v-if="errors._ && errors._.length > 0">
      <div class="alert alert-danger" v-for="error in errors._" :key="error">
        {{ error }}
      </div>
    </div>

    <ui-form-input
      type="text"
      name="username"
      v-model="username"
      :errors="errors"
      :label="$t('general.username')"
    />

    <ui-form-input
      type="password"
      name="password"
      v-model="password"
      :errors="errors"
      :label="$t('general.password')"
    />

    <b-button type="submit" variant="primary" class="w-100 mb-3">{{
      $t("general.login")
    }}</b-button>
  </b-form>
</template>
<script>
import UiFormInput from "../../ui/UiFormInput.vue";
export default {
  components: { UiFormInput },
  data() {
    return {
      username: "",
      password: "",
      errors: {},
    };
  },
  methods: {
    submitForm() {
      this.errors = {};
      this.$aPost(
        "/auth/login",
        {
          username: this.username,
          password: this.password,
        },
        (data) => {
          this.$saveToken(data.token);
          this.$saveUser(data.user);
          this.$router.replace("/admin");
        },
        (errors) => {
          this.errors = errors;
        }
      );
    },
  },
};
</script>