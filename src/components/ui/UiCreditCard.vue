<template>
  <ui-cc-centrobill
    @token="token"
    ref="centrobill"
    v-if="cc.id == 'centrobill'"
  />
  <ui-cc-stripe
    :amount="amount"
    :message="message"
    @token="token"
    ref="stripe"
    v-else-if="cc.id == 'stripe'"
  />
</template>
<script>
import UiCcCentrobill from "./cc/UiCcCentrobill.vue";
import UiCcStripe from "./cc/UiCcStripe.vue";
export default {
  components: { UiCcCentrobill, UiCcStripe },
  props: ["cc", "amount", "message"],
  methods: {
    token(title, token) {
      this.$emit("token", title, token);
    },
    save() {
      switch (this.cc.id) {
        case "centrobill":
          this.$refs.centrobill.save();
          break;
        case "stripe":
          this.$refs.stripe.save();
          break;
      }
    },
  },
};
</script>
