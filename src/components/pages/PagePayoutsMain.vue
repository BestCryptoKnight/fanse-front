<template>
  <b-row class="payouts-main" v-if="settings != null">
    <b-col>
      <b-row class="border-bottom sticky-top bg-white page-header">
        <div class="d-flex align-items-center w-100 mx-3">
          <b-link @click="$router.go(-1)">
            <i class="bi-arrow-left" />
          </b-link>
          <h5 class="text-uppercase p-0 my-3 mx-2 flex-grow-1">
            {{ $t("general.payouts") }}
          </h5>
        </div>
      </b-row>
      <b-row>
        <ui-payouts-stats v-model="stats" :settings="settings" />
      </b-row>
      <b-row>
        <ui-payouts-method
          v-model="method"
          :verification="verification"
          :gateways="gateways"
        />
      </b-row>
      <b-row>
        <b-card no-body class="w-100 m-3">
          <b-tabs card lazy>
            <b-tab :title="$t('general.earnings')" active>
              <ui-earnings />
            </b-tab>
            <b-tab :title="$t('general.payouts')">
              <ui-payouts />
            </b-tab>
          </b-tabs>
        </b-card>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import PayoutMethod from "../models/PayoutMethod";
import Payout from "../models/Payout";
import UiPayoutsStats from "../ui/UiPayoutsStats.vue";
import UiPayoutsMethod from "../ui/UiPayoutsMethod.vue";
import Verification from "../models/Verification";
import UiPayouts from "../ui/UiPayouts.vue";
import UiEarnings from "../ui/UiEarnings.vue";
export default {
  props: {
    verification: Verification,
  },
  components: {
    UiPayoutsStats,
    UiPayoutsMethod,
    UiPayouts,
    UiEarnings,
  },
  data: function () {
    return {
      amount: "",
      method: null,
      stats: {},
      settings: null,
      errors: {},
      gateways: [],
    };
  },
  computed: {
    canWithdraw() {
      return this.stats.balance >= this.settings.payout;
    },
  },
  mounted() {
    this.loadInfo();
  },
  methods: {
    loadInfo() {
      this.$get(
        "/payouts/info",
        (data) => {
          this.method = data.method ? new PayoutMethod(data.method) : null;
          data.stats.withdraw = data.stats.withdraw
            ? new Payout(data.stats.withdraw)
            : null;
          this.stats = data.stats;
          this.settings = data.settings;
          this.gateways = data.gateways;
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
  },
};
</script>
