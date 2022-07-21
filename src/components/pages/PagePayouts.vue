<template>
  <page-payouts-main
    :verification="verification"
    v-if="isLoaded && isVerified"
  />
  <page-verification :verification="verification" v-else-if="isLoaded" />
</template>
<script>
import Verification from "../models/Verification";
import PageVerification from "./PageVerification.vue";
import PagePayoutsMain from "./PagePayoutsMain.vue";
export default {
  data: function () {
    return {
      verification: null,
      isLoaded: false,
    };
  },
  components: {
    PageVerification,
    PagePayoutsMain,
  },
  computed: {
    isVerified() {
      return (
        this.verification &&
        this.verification.status == Verification.STATUS_APPROVED
      );
    },
  },
  mounted() {
    this.loadInfo();
  },
  methods: {
    loadInfo() {
      this.$get(
        "/payouts/verification",
        (data) => {
          this.isLoaded = true;
          this.verification = data.verification
            ? new Verification(data.verification)
            : null;
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
  },
};
</script>
