<template>
  <b-card :header="$t('general.payout-method')" class="w-100 mt-3 mr-3 ml-3">
    <div v-if="!editing">
      <div v-if="method != null" class="d-flex align-items-center">
        <i :class="getIcon()" class="mr-2" />
        {{ getInfo() }}
        <b-button size="sm" @click.prevent="edit" class="ml-2">{{
          $t("general.edit")
        }}</b-button>
      </div>
      <div v-else>
        <b-button size="sm" @click.prevent="edit">{{
          $t("general.add")
        }}</b-button>
      </div>
    </div>
    <b-form v-if="editing">
      <div class="d-flex mb-3">
        <b-form-radio
          v-model="gateway"
          value="paypal"
          v-if="hasGateway('paypal')"
        >
          <i class="bi-paypal" /> PayPal
        </b-form-radio>
        <b-form-radio
          v-model="gateway"
          value="bank"
          class="ml-3"
          v-if="hasGateway('bank')"
        >
          <i class="bi-bank" /> {{ $t("general.bank") }}
        </b-form-radio>
      </div>
      <div v-if="gateway == 'paypal'">
        <ui-form-input
          type="text"
          name="paypal"
          v-model="paypal"
          :errors="errors"
          :label="$t('general.paypal-address')"
        />
      </div>
      <div v-else-if="gateway == 'bank'">
        <ui-form-input
          type="text"
          name="first_name"
          v-model="verification.info.first_name"
          :errors="errors"
          disabled
          :label="$t('general.first-name')"
        />
        <ui-form-input
          type="text"
          name="last_name"
          v-model="verification.info.last_name"
          :errors="errors"
          disabled
          :label="$t('general.last-name')"
        />

        <b-form-group
          :label="$t('general.bank-country')"
          label-for="country"
          class="mb-3"
          label-class="small"
        >
          <b-form-select
            id="country"
            v-model="verification.country"
            required
            disabled
            :options="countries"
            :state="errors['country'] ? false : null"
            aria-describedby="country-errors"
          />
          <b-form-invalid-feedback id="country-errors">
            <div v-for="error in errors['country']" :key="error">
              {{ error }}
            </div>
          </b-form-invalid-feedback>
        </b-form-group>

        <ui-form-input
          type="text"
          name="name"
          v-model="name"
          :errors="errors"
          :label="$t('general.bank-name')"
        />
        <ui-form-input
          type="text"
          name="address"
          v-model="address"
          :errors="errors"
          :label="$t('general.bank-address')"
        />
        <ui-form-input
          type="text"
          name="swift"
          v-model="swift"
          :errors="errors"
          :label="$t('general.swift')"
        />
        <ui-form-input
          type="text"
          name="account"
          v-model="account"
          :errors="errors"
          :label="$t('general.account-number')"
        />
      </div>
      <b-button @click.prevent="unedit" variant="secondary" class="mr-2">{{
        $t("general.cancel")
      }}</b-button>
      <b-button @click.prevent="save" variant="primary">{{
        $t("general.save")
      }}</b-button>
    </b-form>
  </b-card>
</template>
<script>
import PayoutMethod from "../models/PayoutMethod";
import UiFormInput from "./UiFormInput.vue";
import Countries from "../helpers/Countries";
export default {
  components: { UiFormInput },
  props: ["value", "verification", "gateways"],
  data: function () {
    return {
      gateway: this.value ? this.value.gateway : this.gateways[0].id,
      paypal: this.value ? this.value.info.paypal : "",
      name: this.value ? this.value.info.name : "",
      address: this.value ? this.value.info.address : "",
      swift: this.value ? this.value.info.swift : "",
      account: this.value ? this.value.info.account : "",
      errors: {},
      editing: false,
    };
  },
  computed: {
    method: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    countries() {
      let countries = [];
      for (let k in Countries) {
        countries.push({
          value: k,
          text: Countries[k],
        });
      }
      return countries;
    },
  },
  methods: {
    hasGateway(id) {
      for (let g of this.gateways) {
        if (g.id == id) {
          return true;
        }
      }
      return false;
    },
    getIcon() {
      switch (this.method.gateway) {
        case "paypal":
          return "bi-paypal";
        case "bank":
          return "bi-bank";
      }
    },
    getInfo() {
      switch (this.method.gateway) {
        case "paypal":
          return this.method.info.paypal;
        case "bank":
          return this.$t("general.bank-info", [
            this.method.info.name,
            this.method.info.account.slice(0, 2) +
              "..." +
              this.method.info.account.slice(-2),
          ]);
      }
    },
    edit() {
      this.editing = true;
    },
    unedit() {
      this.gateway = this.method ? this.method.gateway : this.gateways[0].id;
      this.editing = false;
    },
    save() {
      this.errors = {};
      let fields = { gateway: this.gateway };
      switch (this.gateway) {
        case "paypal":
          fields.paypal = this.paypal;
          break;
        case "bank":
          fields.name = this.name;
          fields.address = this.address;
          fields.swift = this.swift;
          fields.account = this.account;
          break;
      }
      this.$post(
        "/payouts/method",
        fields,
        (data) => {
          this.method = new PayoutMethod(data);
          this.editing = false;
        },
        (errors) => {
          this.errors = errors;
        }
      );
    },
  },
};
</script>
