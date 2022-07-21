<template>
  <page-home v-if="isLoggedIn" />
  <page-login v-else />
</template>
<script>
import PageHome from "./PageHome.vue";
import PageLogin from "./PageLogin.vue";
export default {
  components: { PageHome, PageLogin },
  computed: {
    isLoggedIn: function () {
      return this.$store.state.token != null;
    },
  },
};
</script>