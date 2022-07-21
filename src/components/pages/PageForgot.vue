<template>
  <b-form @submit.prevent="submitForm">
    <div v-if="errors._ && errors._.length > 0">
      <div class="alert alert-danger" v-for="error in errors._" :key="error">
        {{ error }}
      </div>
    </div>

    <ui-form-input
      type="text"
      name="email"
      v-model="email"
      :errors="errors"
      :label="$t('general.email')"
    />

    <b-button type="submit" variant="primary" class="w-100 mb-3">{{
      $t("general.restore-password")
    }}</b-button>

    <div class="d-flex small align-items-center justify-content-center">
      <b-link to="/">{{ $t("general.login") }}</b-link>
      <i class="bi-dot" />
      <b-link to="/signup">{{ $t("general.create-new-account") }}</b-link>
    </div>
  </b-form>
</template>
<script>
import UiFormInput from "../ui/UiFormInput.vue";
export default {
  components: { UiFormInput },
  data() {
    return {
      email: "",
      errors: {},
    };
  },
  methods: {
    submitForm() {
      this.errors = {};
      this.$post(
        "/forgot-password",
        {
          email: this.email,
        },
        () => {
          this.$bvToast.toast(this.$t("general.password-reset-link-sent"), {
            autoHideDelay: 2000,
            title: this.$t("general.success"),
            solid: true,
            toaster: "b-toaster-bottom-left",
          });
        },
        (errors) => {
          this.errors = errors;
        }
      );
    },
  },
};
</script>