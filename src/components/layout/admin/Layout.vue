<template>
  <layout-authorized v-if="isLoggedIn" />
  <layout-landing v-else />
</template>
<script>
import LayoutAuthorized from "./LayoutAuthorized.vue";
import LayoutLanding from "./LayoutLanding.vue";
export default {
  computed: {
    isLoggedIn: function () {
      return (
        this.$store.state.token != null && this.$store.state.currentUser.isAdmin
      );
    },
  },
  components: { LayoutAuthorized, LayoutLanding },
};
</script>
