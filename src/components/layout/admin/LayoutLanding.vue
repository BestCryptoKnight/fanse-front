<template>
  <div class="d-flex content flex-column">
    <div class="border-bottom">
      <h3 class="p-0 my-3 text-center">{{ $t("admin.admin-console") }}</h3>
    </div>
    <div class="flex-grow-1">
      <b-container class="middle">
        <b-row>
          <b-col md="6" offset-md="3">
            <router-view name="login"></router-view>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <app-footer />
  </div>
</template>
<script>
import AppFooter from "../AppFooter.vue";
export default {
  components: { AppFooter },
};
</script>