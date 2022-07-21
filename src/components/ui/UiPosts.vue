<template>
  <div class="posts">
    <b-row v-for="(post, key) in posts" :key="key">
      <ui-post v-model="posts[key]" />
    </b-row>
  </div>
</template>
<script>
import UiPost from "../ui/UiPost.vue";
export default {
  props: {
    value: [],
  },
  computed: {
    posts: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  components: {
    UiPost,
  },
};
</script>
