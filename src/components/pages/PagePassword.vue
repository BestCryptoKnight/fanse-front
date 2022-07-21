<template>
  <b-row class="settings">
    <b-col>
      <b-row class="border-bottom sticky-top page-header">
        <div class="d-flex align-items-center w-100 mx-3">
          <b-link @click="$router.go(-1)">
            <i class="bi-arrow-left" />
          </b-link>
          <h5 class="text-uppercase p-0 my-3 mx-2 flex-grow-1">
            {{ $t("general.password") }}
          </h5>
          <b-button @click.prevent="saveSettings">{{
            $t("general.save")
          }}</b-button>
        </div>
      </b-row>
      <b-row>
        <b-form @submit="saveSettings" class="w-100 mx-3 mt-3">
          <ui-form-input
            type="password"
            name="old_password"
            v-model="oldPassword"
            :errors="errors"
            :label="$t('general.old-password')"
          />
          <ui-form-input
            type="password"
            name="new_password"
            v-model="newPassword"
            :errors="errors"
            :label="$t('general.new-password')"
          />
          <ui-form-input
            type="password"
            name="new_password_confirmation"
            v-model="newPasswordConfirm"
            :errors="errors"
            :label="$t('general.confirm-password')"
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
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
      errors: {},
    };
  },
  components: {
    UiFormInput,
  },
  methods: {
    saveSettings() {
      this.errors = {};
      this.$post(
        "/profile/password",
        {
          old_password: this.oldPassword,
          new_password: this.newPassword,
          new_password_confirmation: this.newPasswordConfirm,
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
