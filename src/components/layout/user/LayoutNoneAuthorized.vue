<template>
  <div>
    <b-container>
      <b-row>
        <b-col lg="3" md="2" sm="2" class="d-none d-sm-block">
          <b-nav vertical class="sticky-top">
            <b-nav-item class ="nav-hover" to="/" exact>
              <div class="icon d-inline-block"><i class="bi-house" /></div>
              <span class="d-none d-lg-inline ml-3">{{
                $t("general.home")
              }}</span>
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
    </b-nav>
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
};
</script>
