<template>
  <b-form-group
    :label="label"
    :label-for="name"
    class="mb-3"
    label-class="small"
  >
    <b-form-textarea
      :id="name"
      v-model="inputVal"
      required
      row="2"
      max-rows="4"
      :placeholder="placeholder"
      :state="errors[name] ? false : null"
    />
    <div
      class="invalid-feedback"
      :id="name + '-errors'"
      v-if="errors[name] && errors[name].length > 0"
    >
      <div v-for="error in errors[name]" :key="error">
        {{ error }}
      </div>
    </div>
  </b-form-group>
</template>
<script>
export default {
  props: ["label", "name", "value", "errors", "placeholder"],
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>
