<template>
  <layout-authorized v-if="isLoggedIn" />
  <layout-authorized v-else />
</template>
<script>
import LayoutAuthorized from "./LayoutAuthorized.vue";
import LayoutLanding from "./LayoutLanding.vue";
export default {
  computed: {
    isLoggedIn: function () {
      return this.$store.state.token != null;
    },
  },
  components: { LayoutAuthorized, LayoutLanding },
  mounted() {
    if (this.isLoggedIn) {
      this.$get(
        "/auth/me",
        (data) => {
          this.$saveUser(data);
        },
        () => {}
      );
    }
  },
};
</script>
