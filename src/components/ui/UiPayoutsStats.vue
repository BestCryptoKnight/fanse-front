<template>
  <b-card
    :header="$t('general.current-balance', [$formatAmount(stats.balance)])"
    class="w-100 mt-3 mr-3 ml-3"
  >
    <div>
      {{ $t("general.minimum-withdrawal", [$formatAmount(settings.payout)]) }}
    </div>
    <div v-if="stats.withdraw" class="text-primary">
      <i class="bi-clock-history" />
      {{
        $t("general.pending-withdrawal", [$formatAmount(stats.withdraw.amount)])
      }}
    </div>
    <div v-if="!stats.withdraw && canWithdraw" class="mt-3">
      <b-form inline>
        <b-form-input
          id="amount"
          v-model="amount"
          type="text"
          :state="errors['amount'] ? false : null"
          :placeholder="$t('general.amount')"
          style="width: 6rem"
          class="mr-2 mb-2"
        />

        <b-button
          variant="primary"
          @click.prevent="submitRequest"
          class="mb-2"
          >{{ $t("general.request-withdrawal") }}</b-button
        >
      </b-form>
    </div>
    <b-form-invalid-feedback
      class="d-block"
      v-if="errors['amount'] && errors['amount'].length > 0"
    >
      <div v-for="error in errors['amount']" :key="error">
        {{ error }}
      </div>
    </b-form-invalid-feedback>
  </b-card>
</template>
<script>
import Payout from "../models/Payout";
export default {
  props: ["value", "settings"],
  data: function () {
    return {
      amount: "",
      errors: {},
    };
  },
  computed: {
    canWithdraw() {
      return this.stats.balance >= this.settings.payout;
    },
    stats: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    submitRequest() {
      this.$post(
        "/payouts",
        {
          amount: this.amount,
        },
        (data) => {
          let s = { ...this.stats };
          s.withdraw = new Payout(data);
          this.stats = s;
        },
        (errors) => {
          this.errors = errors;
        }
      );
    },
  },
};
</script>
