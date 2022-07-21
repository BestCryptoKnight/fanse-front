<template>
  <b-form-group
    :label="label"
    :label-for="name"
    :description="description"
    class="mb-3"
    label-class="small"
  >
    <b-input-group :prepend="prepend" :append="append">
      <b-form-input
        :id="name"
        v-model="inputVal"
        :type="type"
        v-mask="mask"
        :state="errors[name] ? false : null"
        :placeholder="placeholder"
        :disabled="disabled"
      />
    </b-input-group>
    <b-form-invalid-feedback
      :id="name + '-errors'"
      class="d-block"
      v-if="errors[name] && errors[name].length > 0"
    >
      <div v-for="error in errors[name]" :key="error">
        {{ error }}
      </div>
    </b-form-invalid-feedback>
  </b-form-group>
</template>
<script>
export default {
  props: [
    "label",
    "name",
    "value",
    "errors",
    "type",
    "placeholder",
    "prepend",
    "append",
    "disabled",
    "mask",
    "description",
  ],
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
