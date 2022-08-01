<template>
  <div>
    <b-container>
      <b-row>
        <b-col lg="3" md="2" sm="2" class="d-none d-sm-block">
          <b-nav vertical class="sticky-top">
            <b-nav-item v-b-toggle.sidebar>
              <b-avatar
                :text="currentUser.initials"
                :src="currentUser.avatar"
                class="bg-secondary text-white"
              />
            </b-nav-item>
            <b-nav-item class ="nav-hover" to="/" exact>
              <div class="icon d-inline-block"><i class="bi-house" /></div>
              <span class="d-none d-lg-inline ml-3">{{
                $t("general.home")
              }}</span>
            </b-nav-item>
            <b-nav-item class ="nav-hover" :to="currentUser.url" exact>
              <div class="icon d-inline-block"><i class="bi-person" /></div>
              <span class="d-none d-lg-inline ml-3">{{
                $t("general.my-profile")
              }}</span>
            </b-nav-item>
            <b-nav-item class ="nav-hover" to="/notifications">
              <div class="icon d-inline-block">
                <i class="bi-bell" />
                <i class="bi-dot" v-if="updates.notifications > 0" />
              </div>
              <span class="d-none d-lg-inline ml-3">{{
                $t("general.notifications")
              }}</span>
            </b-nav-item>
            <b-nav-item class ="nav-hover" to="/messages">
              <div class="icon d-inline-block">
                <i class="bi-chat" />
                <i class="bi-dot" v-if="updates.messages > 0" />
              </div>
              <span class="d-none d-lg-inline ml-3">{{
                $t("general.messages")
              }}</span>
            </b-nav-item>
            <b-nav-item class ="nav-hover" to="/bookmarks" exact>
              <div class="icon d-inline-block"><i class="bi-bookmark" /></div>
              <span class="d-none d-lg-inline ml-3">{{
                $t("general.bookmarks")
              }}</span>
            </b-nav-item>
            <b-nav-item class ="nav-hover" to="/lists">
              <div class="icon d-inline-block"><i class="bi-list" /></div>
              <span class="d-none d-lg-inline ml-3">{{
                $t("general.lists")
              }}</span>
            </b-nav-item>
            <b-nav-item  class ="nav-hover" to="/subscriptions">
              <div class="icon d-inline-block"><i class="bi-heart" /></div>
              <span class="d-none d-lg-inline ml-3">{{
                $t("general.subscriptions")
              }}</span>
            </b-nav-item>
            <b-nav-item class ="nav-hover" v-b-toggle.sidebar>
              <div class="icon d-inline-block"><i class="bi-three-dots" /></div>
              <span class="d-none d-lg-inline ml-3">{{
                $t("general.more")
              }}</span>
            </b-nav-item>
            <b-nav-item>
              <b-button
                class="w-100 d-lg-block d-md-none d-sm-none"
                :to="currentUser.isCreator ? '/posts/create' : '/payouts'"
                variant="primary"
                >{{ $t("general.new-post") }}</b-button
              >
              <b-button
                class="w-100 d-md-block d-sm-block d-lg-none p-2"
                :to="currentUser.isCreator ? '/posts/create' : '/payouts'"
                variant="primary"
              >
                <div class="icon d-inline-block">
                  <i class="bi-plus" style="font-size: 150%; line-height: 1" />
                </div>
              </b-button>
            </b-nav-item>
          </b-nav>
        </b-col>
        <b-col
          :lg="
            $route.name == 'subscriptions' ||
            $route.name == 'list' ||
            $route.name == 'messages' ||
            $route.name == 'chat'
              ? 9
              : 6
          "
          md="9"
          sm="9"
          cols="12"
          class="border-left border-right content"
        >
          <router-view></router-view>
          <div class="spinner" v-if="spinner">
            <b-spinner variant="secondary" />
          </div>
        </b-col>
        <b-col md="3" class="d-none d-lg-block">
          <router-view name="side" class="sticky-top"></router-view>
        </b-col>
      </b-row>
    </b-container>
    <b-nav
      class="
        position-fixed
        footer
        w-100
        bg-white
        border-top
        justify-content-between
        align-items-center
        d-flex d-sm-none
      "
    >
      <b-nav-item to="/" exact>
        <div class="icon d-inline-block"><i class="bi-house" /></div>
      </b-nav-item>
      <b-nav-item to="/notifications">
        <div class="icon d-inline-block">
          <div class="icon d-inline-block"><i class="bi-bell" /></div>
          <div class="icon d-inline-block">
            <i class="bi-dot badge" v-if="updates.notifications > 0" />
          </div>
        </div>
      </b-nav-item>
      <b-nav-item :to="currentUser.isCreator ? '/posts/create' : '/payouts'">
        <div class="icon d-inline-block"><i class="bi-plus-circle" /></div>
      </b-nav-item>
      <b-nav-item to="/messages">
        <div class="icon d-inline-block">
          <div class="icon d-inline-block"><i class="bi-chat" /></div>
          <div class="icon d-inline-block">
            <i class="bi-dot bagde" v-if="updates.messages > 0" />
          </div>
        </div>
      </b-nav-item>
      <b-nav-item v-b-toggle.sidebar>
        <b-avatar
          :text="currentUser.initials"
          :src="currentUser.avatar"
          class="bg-secondary text-white"
        />
      </b-nav-item>
    </b-nav>
    <app-menu />
  </div>
</template>
<style scoped lang="scss">
@import "~@/assets/scss/_variables.scss";
@include media-breakpoint-down(md) {
  .nav {
    text-align: center;
  }
}
@include media-breakpoint-up(lg) {
  .nav {
    text-align: left;
  }
}

a.nav-link {
  font-size: 1.2rem;
  line-height: 1.4rem;
  padding: 0.75rem 1rem;
  vertical-align: middle;
  color :#8a96a3;
}
.nav-link.router-link-active {
    color: #000!important;
}
li.nav-hover:hover {
  color :#000000;
  background-color: #00aff01a;
  border-radius: 30px;
}


.nav-item{font-size: 19px;
    line-height: 24px;
    font-weight: 500;  
    padding-top: 5px;
    padding-bottom: 5px;
    }
.icon {
  position: relative;
  font-size: 1.4rem;
  line-height: 1.4rem;
  .bi-dot {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 3.5rem;
    line-height: 1;
    margin: -1.8rem;
    color: #8a96a3;
  }
}
.footer {
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1001;
}
.spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
}
</style>
<script>
import AppMenu from "../AppMenu.vue";
export default {
  computed: {
    spinner() {
      return this.$store.state.spinner == true;
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
    updates() {
      return this.$store.state.updates;
    },
  },
  components: { AppMenu },
};
</script>
