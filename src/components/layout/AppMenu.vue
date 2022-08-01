<template>
  <b-sidebar id="sidebar" no-header backdrop>
    <b-container fluid class="border-bottom p-3">
      <b-row class="gy-2">
        <b-col cols="6">
          <b-avatar
            :text="currentUser.initials"
            :src="currentUser.avatar"
            :to="currentUser.url"
            class="bg-secondary text-white"
          />
        </b-col>
        <b-col class="text-end" cols="6">
          <b-button-close class="btn" v-b-toggle.sidebar>
            <i class="bi-x" />
          </b-button-close>
        </b-col>
        <b-col cols="12" class="overflow-hidden">
          <ui-username :user="currentUser" />
          <div class="small text-secondary username">
            @{{ currentUser.username }}
          </div>
        </b-col>
      </b-row>
    </b-container>
    <b-nav vertical class="border-bottom py-2">
      <b-nav-item :to="currentUser.url" exact>
        <i class="bi-person" /> {{ $t("general.my-profile") }}
      </b-nav-item>
      <b-nav-item to="/bookmarks">
        <i class="bi-bookmark" /> {{ $t("general.bookmarks") }}
      </b-nav-item>
      <b-nav-item to="/lists">
        <i class="bi-list" /> {{ $t("general.lists") }}
      </b-nav-item>
      <b-nav-item to="/subscriptions">
        <i class="bi-heart" /> {{ $t("general.subscriptions") }}
      </b-nav-item>
      <b-nav-item to="/settings">
        <i class="bi-gear" /> {{ $t("general.settings") }}
      </b-nav-item>
      <b-nav-item to="/payments">
        <i class="bi-coin" /> {{ $t("general.payments") }}
      </b-nav-item>
      <b-nav-item to="/payouts">
        <i class="bi-bank" /> {{ $t("general.payouts") }}
      </b-nav-item>
    </b-nav>
    <b-nav vertical class="py-2">
      <b-nav-item @click.prevent="logOut()">
        <i class="bi-box-arrow-left" /> {{ $t("general.logout") }}
      </b-nav-item>
    </b-nav>
  </b-sidebar>
</template>
<style scoped lang="scss">
.nav-item {
  line-height: 1.2rem;
  i {
    font-size: 1.2rem;
    line-height: 1.2rem;
    margin-right: 0.75rem;
  }
  a {
    color: black !important;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
<script>
import UiUsername from "../ui/UiUsername.vue";
export default {
  components: { UiUsername },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
  methods: {
    logOut() {
      this.$post(
        "/auth/logout",
        {},
        () => {},
        (errors) => {
          console.log(errors);
        }
      );
      this.$saveToken(null);
      this.$saveUser(null);
      this.$router.replace("/");
      //location = process.env.VUE_APP_APP_URL;
    },
  },
};
</script>
