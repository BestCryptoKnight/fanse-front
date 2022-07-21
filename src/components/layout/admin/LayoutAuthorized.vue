<template>
  <div>
    <b-container>
      <b-row>
        <b-col lg="3" md="2" sm="2" class="d-none d-sm-block">
          <b-nav vertical class="sticky-top">
            <b-nav-item to="/admin" link-classes="m-0 py-0">
              <h5 class="text-uppercase p-0 mx-0 my-3">
                <span class="d-none d-lg-block">
                  {{ $t("admin.admin-console") }}
                </span>
                <span class="d-lg-none"> AC </span>
              </h5>
            </b-nav-item>
            <b-nav-item to="/admin" exact>
              <i class="bi-bar-chart" />
              <span class="d-none d-lg-inline ml-3">{{
                $t("admin.dashboard")
              }}</span>
            </b-nav-item>
            <b-nav-item to="/admin/users">
              <i class="bi-people" />
              <span class="d-none d-lg-inline ml-3">{{
                $t("admin.users")
              }}</span>
            </b-nav-item>
            <b-nav-item to="/admin/posts">
              <i class="bi-stickies" />
              <span class="d-none d-lg-inline ml-3">{{
                $t("admin.posts")
              }}</span>
            </b-nav-item>
            <b-nav-item to="/admin/subscriptions">
              <i class="bi-calendar" />
              <span class="d-none d-lg-inline ml-3">{{
                $t("admin.subscriptions")
              }}</span>
            </b-nav-item>
            <b-nav-item to="/admin/payments">
              <i class="bi-credit-card" />
              <span class="d-none d-lg-inline ml-3">{{
                $t("admin.payments")
              }}</span>
            </b-nav-item>
            <b-nav-item to="/admin/payouts">
              <i class="bi-coin" />
              <span class="d-none d-lg-inline ml-3">{{
                $t("admin.payouts")
              }}</span>
            </b-nav-item>
            <b-nav-item @click.prevent="logOut()">
              <i class="bi-box-arrow-left" />
              <span class="d-none d-lg-inline ml-3">{{
                $t("general.logout")
              }}</span>
            </b-nav-item>
          </b-nav>
        </b-col>
        <b-col sm="9" cols="12" class="border-left border-right content">
          <router-view></router-view>
          <div class="spinner" v-if="spinner">
            <b-spinner variant="secondary" />
          </div>
        </b-col>
      </b-row>
    </b-container>
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
  font-size: 120%;
  padding: 0.75rem 1rem;
}
.icon {
  position: relative;
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
export default {
  computed: {
    spinner() {
      return this.$store.state.spinner == true;
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
      //location = process.env.VUE_APP_APP_URL + "/admin";
    },
  },
};
</script>
