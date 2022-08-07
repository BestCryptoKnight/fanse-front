<template>
  <b-row class="users-edit" v-if="user != null">
    <b-col>
      <b-row class="border-bottom sticky-top bg-white page-header">
        <div class="d-flex align-items-center w-100 mx-3">
          <b-link @click="$router.go(-1)">
            <i class="bi-arrow-left" />
          </b-link>
          <h5 class="text-uppercase p-0 my-3 mx-2 flex-grow-1">
            {{ $t("admin.edit-user") }}
          </h5>
          <b-button @click.prevent="saveSettings">{{
            $t("general.save")
          }}</b-button>
        </div>
      </b-row>
      <b-form @submit="saveSettings">
        <b-row>
          <b-card :header="$t('admin.commission')" class="w-100 m-3">
            <ui-form-input
              type="text"
              name="commission"
              v-model="user.commission"
              append="%"
              :placeholder="$t('admin.default')"
              :description="$t('admin.leave-empty-for-default', [commission])"
              :errors="errors"
            />
          </b-card>
        </b-row>
        <b-row>
          <div class="w-100 mx-3 mt-3">
            <ui-form-input
              type="text"
              name="username"
              v-model="user.username"
              :errors="errors"
              :label="$t('general.username')"
            />
            <ui-form-input
              type="text"
              name="name"
              v-model="user.name"
              :errors="errors"
              :label="$t('general.full-name')"
            />
            <ui-form-textarea
              name="bio"
              v-model="user.bio"
              :errors="errors"
              :label="$t('general.bio')"
            />
            <ui-form-input
              type="text"
              name="location"
              v-model="user.location"
              :errors="errors"
              :label="$t('general.location')"
            />
            <ui-form-input
              type="url"
              name="website"
              v-model="user.website"
              :errors="errors"
              :label="$t('general.website')"
            />
            <ui-form-input
              type="url"
              name="instagram"
              v-model="user.instagram"
              :errors="errors"
              :label="$t('general.instagram')"
            />
            <ui-form-input
              type="url"
              name="twitter"
              v-model="user.twitter"
              :errors="errors"
              :label="$t('general.twitter')"
            />
            <ui-form-input
              type="url"
              name="snapchat"
              v-model="user.snapchat"
              :errors="errors"
              :label="$t('general.snapchat')"
            />
            <ui-form-input
              type="url"
              name="tiktok"
              v-model="user.tiktok"
              :errors="errors"
              :label="$t('general.tiktok')"
            />
            <ui-form-input
              type="email"
              name="email"
              v-model="email"
              :errors="errors"
              :label="$t('general.email')"
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
          </div>
        </b-row>
      </b-form>
    </b-col>
  </b-row>
</template>
<script>
import User from "../../models/User";
import UiFormInput from "../../ui/UiFormInput.vue";
import UiFormTextarea from "../../ui/UiFormTextarea.vue";
export default {
  data: function () {
    return {
      user: null,
      email: null,
      newPassword: null,
      newPasswordConfirm: null,
      errors: {},
    };
  },
  components: {
    UiFormInput,
    UiFormTextarea,
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
    commission() {
      return process.env.VUE_APP_COMMISSION + "%";
    },
  },
  mounted() {
    this.loadUser();
  },
  methods: {
    loadUser() {
      this.$aGet(
        "/users/" + this.userId,
        (data) => {
          this.user = new User(data);
          this.user.commission =
            data.commission == process.env.VUE_APP_COMMISSION
              ? null
              : data.commission;
          this.email = data.email;
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    saveSettings() {
      this.errors = {};
      this.$aPost(
        "/users/" + this.userId,
        {
          _method: "PUT",
          username: this.user.username,
          name: this.user.name,
          bio: this.user.bio,
          location: this.user.location,
          website: this.user.website,
          instagram: this.user.instagram,
          twitter: this.user.twitter,
          snapchat: this.user.snapchat,
          tiktok: this.user.tiktok,
          email: this.email,
          new_password: this.newPassword,
          new_password_confirmation: this.newPasswordConfirm,
          commission: this.user.commission,
        },

        (data) => {
          this.user = new User(data);
          this.user.commission =
            data.commission == process.env.VUE_APP_COMMISSION
              ? null
              : data.commission;
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
