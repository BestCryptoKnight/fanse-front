<template>
  <div>
    <app-search
      class="pt-3"
      v-model="q"
      @search="search"
      v-if="$route.name != 'search'"
    />
    <app-suggestions />
     <app-footer />
  </div>
</template>
<script>
import AppSearch from "./AppSearch.vue";
import AppSuggestions from "./AppSuggestions.vue";
import AppFooter from "./AppFooter.vue";
export default {
  data: function () {
    return {
      q: "",
    };
  },
  components: { AppSuggestions, AppSearch,AppFooter },
  methods: {
    search() {
      this.$router.push("/search?q=" + encodeURIComponent(this.q));
    },
  },
};
</script>
