<template>
  <div class="d-flex flex-column content landing">
    <div class="flex-grow-1 d-flex flex-row">
      <div class="w-50 promo position-relative d-none d-md-block">
        <div class="middle">
          <ui-logo class="logo mb-3" />
          <h2>{{ $t("general.signup-slogan") }}</h2>
        </div>
      </div>
      <div class="w-50 position-relative">
        <div class="middle main main-login">
          <!-- <div class="px-5 pb-5">
            <ui-logo class="logo d-md-none text-primary" />
          </div> -->
          <router-view name="login"></router-view>
        </div>
      </div>
    </div>
    <app-footer />
  </div>
</template>
<style scoped lang="scss">
@import "~@/assets/scss/_variables.scss";
.promo {
  background: $primary;
  color: $white;
  .middle {
    width: 100%;
    max-width: 344px;
    .logo {
      height: 4rem;
    }
    h2 {
      font-weight: normal;
    }
  }
}
@media only screen and (min-width: 800px) {
 .main-login
{
  width: 45% !important;
}
}

.main {
  width: 344px;
  .logo {
    width: 80%;
    max-height: 4rem;
    margin: 0 auto;
  }
}
@include media-breakpoint-down(sm) {
  .w-50 {
    width: 100% !important;
  }
  .main {
    width: 90%;
  }
}
</style>
<script>
import AppFooter from "../AppFooter.vue";
import UiLogo from "../../ui/UiLogo.vue";
export default {
  components: { AppFooter, UiLogo },
  computed: {
    appname() {
      return process.env.VUE_APP_APP_NAME;
    },
    logo() {
      return require("@/assets/logo.svg");
    },
  },
};
</script>