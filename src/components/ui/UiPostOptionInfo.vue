<template>
  <div
    class="
      d-flex
      bg-light
      border
      rounded
      px-2
      py-1
      mb-1
      small
      align-items-center
    "
  >
    <div>{{ info }}</div>
    <b-link class="ml-1" @click.prevent="close()"
      ><i class="bi-x-circle-fill"
    /></b-link>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: String,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
