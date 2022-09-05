<template>
  <b-sidebar id="sidebar" no-header backdrop>
    <b-container fluid class="border-bottom p-3">
      <b-row class="gy-2">
        <b-col cols="6" v-if="this.$store.state.token">
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
        <b-col cols="12" class="overflow-hidden" v-if="this.$store.state.token">
          <ui-username :user="currentUser" />
          <div class="small text-secondary username">
            @{{ currentUser.username }}  &nbsp;&middot;&nbsp;&nbsp; {{this.fans}} Fans
          </div>
        </b-col>
      </b-row>
    </b-container>
    <b-nav vertical class="border-bottom py-2">
      <b-nav-item :to="currentUser.url" exact v-if="this.$store.state.token">
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
     <b-nav v-if="this.$store.state.token && !currentUser.isCreator" vertical class=" border-bottom py-2">
      <b-nav-item to="/payouts">
        <svg xmlns="http://www.w3.org/2000/svg" width="23px" height="23px" class="verified " fill="#FC3C80" viewBox="0 0 512 512" style="vertical-align: middle; margin-right: 0.5rem; margin-top:-3px;"><title> Explore our Creators - STFU | Support Creators Content</title><path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm74.69,252.82c-9.38,11.44-26.4,29.73-65.7,56.41a15.93,15.93,0,0,1-18,0c-39.3-26.68-56.32-45-65.7-56.41-20-24.37-29.58-49.4-29.3-76.5.31-31.06,25.22-56.33,55.53-56.33,20.4,0,35,10.63,44.1,20.41a6,6,0,0,0,8.72,0c9.11-9.78,23.7-20.41,44.1-20.41,30.31,0,55.22,25.27,55.53,56.33C360.27,251.42,350.68,276.45,330.69,300.82Z"></path></svg>
        {{ $t("general.become") }}
      </b-nav-item>
    </b-nav>
      <b-nav vertical class=" border-bottom py-2">
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
import List from "../models/List";
import UiUsername from "../ui/UiUsername.vue";
export default {
  data: function () {
    return {
      lists: [],
      fans: 0,
    };
  },
  components: { UiUsername },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
  mounted() {
    this.loadLists();
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
    loadLists() {
      this.$get(
        "/lists/message",
        (data) => {
          for (let d of data.lists) {
            const l = new List(d, this);
            if (l.listeesCount > 0 && l.id == 1) {
              this.fans = l.listeesCount;
            }
          }
        },
        () => {}
      );
    },
  },
  
};
</script>
