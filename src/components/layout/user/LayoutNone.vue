<template>
  <layout-none-authorized v-if="isLoggedIn" />
  <layout-landing v-else />
</template>
<script>
import LayoutNoneAuthorized from "./LayoutNoneAuthorized.vue";
import LayoutLanding from "./LayoutLanding.vue";
export default {
  computed: {
    isLoggedIn: function () {
      return true;
    },
  },
  components: { LayoutNoneAuthorized, LayoutLanding },
};
</script>
