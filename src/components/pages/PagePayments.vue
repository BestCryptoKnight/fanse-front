<template>
  <b-row>
    <b-col>
      <b-row class="border-bottom sticky-top bg-white page-header">
        <div class="d-flex align-items-center w-100 mx-3">
          <b-link @click="$router.go(-1)">
            <i class="bi-arrow-left" />
          </b-link>
          <h5 class="text-uppercase p-0 my-3 mx-2 flex-grow-1">
            {{ $t("general.payments") }}
          </h5>
        </div>
      </b-row>
      <b-row>
        <ui-payment-methods />
      </b-row>
      <b-row>
        <ui-payments-history />
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import UiPaymentMethods from "../ui/UiPaymentMethods.vue";
import UiPaymentsHistory from "../ui/UiPaymentsHistory.vue";
export default {
  components: { UiPaymentsHistory, UiPaymentMethods },
};
</script>
