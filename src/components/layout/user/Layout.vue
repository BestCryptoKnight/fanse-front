<template>
  <layout-authorized v-if="isLoggedIn || !isLoggedIn" />
  <layout-landing v-else />
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
    else{
      var jsonObj = {
  "id": 2,
  "name": "Yainv",
  "username": "user6666345",
  "email": "yaniv@ybhltd.com",
  "role": 1,
  "bio": "Love is in the air",
  "location": null,
  "website": null,
  "cover": "https://fanse.co/api/storage/profile/cover/2.jpg",
  "avatar": "https://fanse.co/api/storage/profile/avatar/2.jpg?1622",
  "price": 0,
  "is_subscribed": false,
  "bundles": [],
  "updates": {
    "notifications": 0,
    "messages": 0
  }
}
      this.$saveUser(jsonObj);
    }
  },
};
</script>
