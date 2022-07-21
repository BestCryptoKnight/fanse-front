<template>
  <b-form @submit.prevent="search">
    <b-input-group>
      <b-form-input
        id="search"
        v-model="q"
        type="text"
        :placeholder="$t('general.search-posts')"
      />
      <b-input-group-append>
        <b-button type="submit" variant="icon" :disabled="this.q.length < 3">
          <i class="bi-search text-muted"></i
        ></b-button>
      </b-input-group-append>
    </b-input-group>
  </b-form>
</template>
<style scoped lang="scss">
.form-control {
  border-right: none;
}
.btn {
  border: 1px solid #ced4da;
  border-left: none;
}
</style>
<script>
export default {
  props: ["value"],
  computed: {
    q: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    search() {
      if (this.q.length >= 3) {
        this.$emit("search");
      }
    },
  },
};
</script>
