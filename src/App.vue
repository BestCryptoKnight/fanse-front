<template>
  <div id="app">
    <router-view></router-view>
    <ui-photo-swipe
      v-if="swiperItems.length > 0"
      :options="swiperOptions"
      :items="swiperItems"
      @close="hidePhotoSwipe"
    />
    <ui-add-to-list />
    <ui-buy />
    <ui-cookies />
  </div>
</template>
<script>
import UiAddToList from "./components/ui/UiAddToList.vue";
import UiBuy from "./components/ui/UiBuy.vue";
import UiCookies from "./components/ui/UiCookies.vue";
import UiPhotoSwipe from "./components/ui/UiPhotoSwipe.vue";
import Pusher from "pusher-js";
export default {
  components: { UiPhotoSwipe, UiAddToList, UiBuy, UiCookies },
  computed: {
    swiperItems() {
      return this.$store.state.swiperItems;
    },
    swiperOptions() {
      return this.$store.state.swiperOptions;
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
  mounted() {
    this.listen();
  },
  watch: {
    currentUser() {
      this.listen();
    },
  },
  methods: {
    hidePhotoSwipe() {
      this.$store.state.swiperItems = [];
    },
    listen() {
      if (this.currentUser) {
        this.$store.state.pusher = new Pusher(
          process.env.VUE_APP_PUSHER_APP_KEY,
          {
            cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER,
            authEndpoint:
              process.env.VUE_APP_API_URL +
              "/" +
              process.env.VUE_APP_API_VERSION +
              "/broadcasting/auth",
            auth: {
              headers: { Authorization: "Bearer " + this.$store.state.token },
            },
          }
        );
        this.$store.state.pusher.subscribe(
          "private-users." + this.currentUser.id
        );
        this.$store.state.pusher.bind_global((_, data) => {
          if (data.updates) {
            this.$store.state.updates = {
              notifications: data.updates.notifications,
              messages: data.updates.messages,
            };
          }
        });
      }
    },
  },
};
</script>