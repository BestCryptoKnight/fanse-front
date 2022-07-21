<template>
  <b-row class="settings">
    <b-col>
      <b-row class="border-bottom sticky-top page-header">
        <div class="d-flex align-items-center w-100 mx-3">
          <b-link @click="$router.go(-1)">
            <i class="bi-arrow-left" />
          </b-link>
          <h5 class="text-uppercase p-0 my-3 mx-2 flex-grow-1">
            {{ $t("general.email") }}
          </h5>
          <b-button @click.prevent="saveSettings">{{
            $t("general.save")
          }}</b-button>
        </div>
      </b-row>
      <b-row>
        <b-form @submit="saveSettings" class="w-100 mx-3 mt-3">
          <ui-form-input
            type="email"
            name="email"
            v-model="email"
            :errors="errors"
            :label="$t('general.email')"
          />
          <ui-form-input
            type="password"
            name="password"
            v-model="password"
            :errors="errors"
            :label="$t('general.password')"
          />
        </b-form>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import UiFormInput from "../ui/UiFormInput.vue";
export default {
  data: function () {
    return {
      email: "",
      password: "",
      errors: {},
    };
  },
  mounted() {
    this.loadUser();
  },
  components: {
    UiFormInput,
  },
  methods: {
    loadUser() {
      this.$get(
        "/auth/me",
        (data) => {
          this.email = data.email;
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    saveSettings() {
      this.errors = {};
      this.$post(
        "/profile/email",
        {
          email: this.email,
          password: this.password,
        },
        () => {
          this.$bvToast.toast(this.$t("general.settings-saved"), {
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
