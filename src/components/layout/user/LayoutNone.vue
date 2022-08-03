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
      return true;
    },
  },
  components: { LayoutAuthorized, LayoutLanding },
};
</script>
