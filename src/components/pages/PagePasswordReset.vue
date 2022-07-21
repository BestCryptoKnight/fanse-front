<template>
  <b-form @submit.prevent="submitForm">
    <h5>{{ $t("general.password-reset") }}</h5>

    <div v-if="errors._ && errors._.length > 0">
      <div class="alert alert-danger" v-for="error in errors._" :key="error">
        {{ error }}
      </div>
    </div>

    <ui-form-input
      type="password"
      name="password"
      v-model="password"
      :errors="errors"
      :label="$t('general.new-password')"
    />
    <ui-form-input
      type="password"
      name="password_confirmation"
      v-model="passwordConfirm"
      :errors="errors"
      :label="$t('general.confirm-password')"
    />

    <b-button type="submit" variant="primary" class="w-100 mb-3">{{
      $t("general.save")
    }}</b-button>
  </b-form>
</template>
<script>
import UiFormInput from "../ui/UiFormInput.vue";
export default {
  components: { UiFormInput },
  data: function () {
    return {
      password: "",
      passwordConfirm: "",
      errors: {},
    };
  },
  methods: {
    submitForm() {
      this.errors = {};
      this.$post(
        "/reset-password",
        {
          email: this.$route.query.email,
          token: this.$route.query.token,
          password: this.password,
          password_confirmation: this.passwordConfirm,
        },
        () => {
          this.$router.replace("/");
        },
        (errors) => {
          this.errors = errors;
        }
      );
    },
  },
};
</script>