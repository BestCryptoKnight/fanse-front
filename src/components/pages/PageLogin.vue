<template>
  <div>
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

    <ui-form-input
      type="password"
      name="password"
      v-model="password"
      :errors="errors"
      :label="$t('general.password')"
    />

    <vue-recaptcha
      :sitekey="site_key"
      @verify="onCaptchaVerify"
    />

    <span
      v-if="recaptcha_error"
      class="error-message"
    >
      Please confirm you are not a robot.
    </span>

    <b-button
      variant="primary"
      class="w-100 mb-3"
      @click.prevent="submitForm"
      >{{ $t("general.login") }}</b-button
    >

    <div class="d-flex small align-items-center justify-content-center">
      <b-link to="/forgot">{{ $t("general.forgot-password") }}</b-link>
      <i class="bi-dot" />
      <b-link to="/signup">{{ $t("general.create-new-account") }}</b-link>
    </div>

    <GoogleLogin
      :params="google.params"
      :onSuccess="googleSuccess"
      :onFailure="failure"
      class="mt-5 w-100 btn btn-google"
    >
      <div class="icon">
        <b-img :src="google.icon" />
      </div>
      {{ $t("general.sign-in-with-google") }}
    </GoogleLogin>
  </div>
</template>
<style scoped lang="scss">
@import "~@/assets/scss/_variables.scss";
.btn-google {
  background-color: #4285f4;
  color: #ffffff;
  position: relative;
  .icon {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 2.5rem;
    background: #ffffff;
    display: flex;
    border-top-left-radius: $border-radius;
    border-bottom-left-radius: $border-radius;
    img {
      display: block;
      margin: auto;
      height: 60%;
    }
  }
}
</style>
<script>
import GoogleLogin from "vue-google-login";
import User from "../models/User";
import UiFormInput from "../ui/UiFormInput.vue";
import { VueRecaptcha } from 'vue-recaptcha';
export default {
  components: { UiFormInput, GoogleLogin, VueRecaptcha },
  data() {
    return {
      recaptcha_error: false,
      email: "",
      password: "",
      errors: {},
      captchaToken: "",
    };
  },
  computed: {
    google() {
      return {
        params: {
          client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
          scope: "profile email",
        },
        renderParams: {
          longtitle: true,
          height: 36,
          theme: "dark",
        },
        icon: require("@/assets/google.svg"),
      };
    },
    site_key() {
      return process.env.VUE_APP_RECAPTCHA_SITE_KEY
    },
  },
  methods: {
    onCaptchaVerify(token) {
      // Provide the token response to the form object.
      this.captchaToken = token;
    },
    submitForm() {
      if (!this.captchaToken) {
        // Show error after submit.
        this.recaptcha_error = true;
      } else {
        this.login(User.CHANNEL_EMAIL);
      }
    },
    googleSuccess(googleUser) {
      this.login(
        User.CHANNEL_GOOGLE,
        googleUser.getAuthResponse().access_token
      );
    },
    login(type, token) {
      this.errors = {};
      let fields = {
        channel_type: type,
      };
      if (type == User.CHANNEL_EMAIL) {
        fields.email = this.email;
        fields.password = this.password;
        fields.captchaToken = this.captchaToken;
      } else {
        fields.token = token;
      }
      this.$post(
        "/auth/login",
        fields,
        (data) => {
          this.$saveToken(data.token);
          this.$saveUser(data.user);
        },
        (errors) => {
          this.errors = errors;
        }
      );
    },
    failure() {
      this.$bvToast.toast(this.$t("general.login-failed"), {
        autoHideDelay: 2000,
        title: this.$t("general.error"),
        solid: true,
        toaster: "b-toaster-bottom-left",
      });
    },
  },
};
</script>