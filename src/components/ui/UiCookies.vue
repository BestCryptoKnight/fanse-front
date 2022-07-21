<template>
  <div>
    <b-toast
      id="cookiesConsent"
      :title="$t('general.cookies')"
      no-auto-hide
      no-close-button
      toaster="b-toaster-bottom-full"
      solid
    >
      <i18n path="general.cookies-consent" tag="span">
        <template v-slot:privacy>
          <b-link :href="url + '/privacy.html'" target="_blank">{{
            $t("general.privacy-policy")
          }}</b-link>
        </template>
      </i18n>
      <div class="text-right mt-2">
        <b-button @click.prevent="allow" variant="primary">{{
          $t("general.ok")
        }}</b-button>
      </div>
    </b-toast>
  </div>
</template>
<script>
export default {
  mounted() {
    this.checkAllow();
  },
  computed: {
    url() {
      return process.env.VUE_APP_APP_URL;
    },
  },
  methods: {
    checkAllow() {
      if (!localStorage.allowCookies) {
        this.$bvToast.show("cookiesConsent");
      }
    },
    allow() {
      localStorage.allowCookies = true;
      this.$bvToast.hide("cookiesConsent");
    },
  },
};
</script>
